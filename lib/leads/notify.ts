import "server-only";

import type { LeadRecord } from "@/lib/leads/store";

/**
 * Aviso del lead al equipo comercial. §14.1
 *
 * POR QUÉ EXISTE. El CRM Smarthome quedó fuera del alcance (decisión del 23 de
 * julio de 2026). Sin él, el correo es el canal de entrega del lead, no un
 * respaldo: es lo único que convierte un registro en una llamada. El brief
 * promete respuesta humana en 15 minutos y esa promesa depende de este archivo.
 *
 * ORDEN. Se llama DESPUÉS del registro propio y nunca puede hacer que el
 * usuario vea un error. Si el correo falla, el lead ya está guardado y el fallo
 * es un problema interno.
 *
 * SIN CREDENCIALES queda inactivo y el flujo completo sigue siendo probable en
 * local. La configuración vive en `RESEND_API_KEY`, `LEAD_EMAIL_TO` y
 * `LEAD_EMAIL_FROM`.
 */

export type NotifyResult =
  | { status: "sent"; attempts: number }
  | { status: "failed"; attempts: number; error: string }
  | { status: "skipped"; reason: string };

const ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = 8_000;
const BACKOFF_MS = [1_000, 3_000];

export async function notifyTeam(
  lead: LeadRecord,
  projectName: string,
): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    return { status: "skipped", reason: "correo sin configurar" };
  }

  const payload = {
    from,
    to: to.split(",").map((address) => address.trim()),
    // El nombre en el asunto es lo que el comercial ve en el celular sin abrir.
    subject: `Lead · ${projectName} · ${lead.name}`,
    text: buildMessage(lead, projectName),
    reply_to: lead.email,
  };

  let lastError = "";

  for (let attempt = 0; attempt <= BACKOFF_MS.length; attempt++) {
    if (attempt > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, BACKOFF_MS[attempt - 1]),
      );
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (response.ok) return { status: "sent", attempts: attempt + 1 };
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : "error desconocido";
    }
  }

  return { status: "failed", attempts: BACKOFF_MS.length + 1, error: lastError };
}

/**
 * Texto plano a propósito: llega íntegro al celular, no lo recorta ningún
 * cliente de correo y se puede copiar de un tirón al llamar.
 */
function buildMessage(lead: LeadRecord, projectName: string): string {
  const when = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Bogota",
  }).format(new Date(lead.createdAt));

  const campaign = [
    lead.source && `origen: ${lead.source}`,
    lead.medium && `medio: ${lead.medium}`,
    lead.campaign && `campaña: ${lead.campaign}`,
    lead.content && `contenido: ${lead.content}`,
  ].filter(Boolean);

  // `null` es «esta línea no aplica»; la cadena vacía es un salto deliberado.
  const lines: (string | null)[] = [
    `${lead.name} pidió información sobre ${projectName}.`,
    "",
    `Celular:  ${lead.phone}`,
    `Correo:   ${lead.email}`,
    `Proyecto: ${projectName}`,
    `Fecha:    ${when}`,
    "",
    campaign.length > 0 ? `Campaña — ${campaign.join(" · ")}` : "Llegada directa.",
    lead.landingPage ? `Página de origen: ${lead.landingPage}` : null,
    "",
    `Autorización aceptada: «${lead.consentText}» (${lead.consentVersion})`,
    `Identificador interno: ${lead.id}`,
    "",
    "El compromiso del brief es responder en 15 minutos.",
  ];

  return lines.filter((line) => line !== null).join("\n");
}
