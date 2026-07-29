import { NextResponse } from "next/server";

import { getProject } from "@/lib/content";
import { notifyTeam } from "@/lib/leads/notify";
import { insertLead, updateLeadDelivery } from "@/lib/leads/store";
import { checkRateLimit, hashIp } from "@/lib/rate-limit";
import {
  CONSENT_TEXT,
  CONSENT_VERSION,
  leadSchema,
  toInternationalPhone,
} from "@/lib/validation/schemas";

/**
 * POST /api/lead — §14.1
 *
 * EL ORDEN DE LOS PASOS NO ES NEGOCIABLE. El registro propio ocurre ANTES de
 * avisar al equipo comercial. Si el correo está caído, el lead ya está a salvo
 * y el usuario ve éxito.
 *
 * El CRM Smarthome quedó fuera del alcance el 23 de julio de 2026, así que el
 * paso 5 es hoy el aviso por correo. El orden y el contrato son los mismos: lo
 * que cambió es a quién se le entrega el lead, no cuándo.
 *
 * Principio: el usuario nunca paga el precio de una falla de infraestructura.
 * Si el paso 4 tuvo éxito, la respuesta es 200 aunque todo lo demás falle. La
 * recuperación es problema interno, no suyo.
 */
export async function POST(request: Request) {
  // 1 · Rate limit por IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // 2 · Honeypot vacío y tiempo de render mayor a 2 s
  if (typeof body.website === "string" && body.website.length > 0) {
    // Se responde 200 a propósito: un bot no debe aprender que fue detectado.
    return NextResponse.json({ ok: true });
  }

  if (
    typeof body.renderedAt !== "number" ||
    Date.now() - body.renderedAt < 2_000
  ) {
    return NextResponse.json({ ok: true });
  }

  // 3 · Validación Zod en el servidor. El cliente es conveniencia, no defensa.
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const lead = parsed.data;
  const project = await getProject(lead.projectSlug);
  if (!project) {
    return NextResponse.json({ error: "unknown_project" }, { status: 400 });
  }

  const url = new URL(request.url);
  const utm = {
    source: url.searchParams.get("utm_source") ?? undefined,
    medium: url.searchParams.get("utm_medium") ?? undefined,
    campaign: url.searchParams.get("utm_campaign") ?? undefined,
    content: url.searchParams.get("utm_content") ?? undefined,
  };

  // 4 · Registro propio PRIMERO. Si esto falla, y solo si esto falla, el
  //     usuario ve un error.
  let record;
  try {
    record = await insertLead({
      ...lead,
      ...utm,
      landingPage: request.headers.get("referer") ?? undefined,
      referrer: request.headers.get("referer") ?? undefined,
      consentText: CONSENT_TEXT,
      consentVersion: CONSENT_VERSION,
      ipHash: await hashIp(ip),
    });
  } catch (error) {
    console.error("[lead] no se pudo registrar", error);
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  // 5 · Aviso al equipo comercial, con timeout y reintentos. A partir de aquí
  //     nada puede hacer que el usuario vea un error.
  const delivery = await notifyTeam(
    { ...record, phone: toInternationalPhone(record.phone) },
    project.name,
  );

  if (delivery.status === "sent") {
    await updateLeadDelivery(record.id, "sent", delivery.attempts);
  } else if (delivery.status === "failed") {
    await updateLeadDelivery(record.id, "failed", delivery.attempts);
    // TODO Fase 3.1 — registrar en `integration_errors` y disparar la alerta
    // interna. Sin esto, un lead cuyo correo falló solo existe en la base y
    // nadie se entera: el compromiso de 15 minutos no es verificable. §14.1
    console.error("[lead] el aviso falló definitivamente", {
      id: record.id,
      error: delivery.error,
    });
  }

  // 6 · TODO Fase 3.4 — en paralelo y sin bloquear: Meta CAPI (con event_id
  //     para deduplicar con el Pixel) y GA4 Measurement Protocol. §15.1

  // 7 · El paso 4 tuvo éxito, así que el usuario ve éxito.
  return NextResponse.json({ ok: true });
}
