import "server-only";

import type { LeadData } from "@/lib/validation/schemas";

/**
 * Registro de leads. §9.2 · §14.1 · §25.1 A
 *
 * POR QUÉ EXISTE: el brief promete respuesta humana en 15 minutos. Sin registro
 * propio, un fallo del canal de aviso no es un lead demorado: es un lead
 * perdido e invisible. Con registro es un lead recuperable y una alerta.
 *
 * Al quedar el CRM fuera del alcance (23 de julio de 2026), esta tabla dejó de
 * ser un espejo y pasó a ser la fuente única de verdad de los leads. Eso sube
 * la prioridad de conectar Supabase: hoy es el único lugar donde vivirían.
 *
 * ESTADO ACTUAL: sin credenciales de Supabase, este adaptador escribe en la
 * consola del servidor. Es suficiente para desarrollar y probar el flujo
 * completo, y NO es suficiente para producción.
 *
 * Al conectar Supabase se reemplaza el cuerpo de estas funciones por los
 * INSERT/UPDATE de §9.2. Las firmas ya son las definitivas.
 */

export type LeadRecord = LeadData & {
  id: string;
  createdAt: string;
  /** Estado del aviso al equipo comercial, hoy por correo. */
  deliveryStatus: "pending" | "sent" | "failed";
  deliveryAttempts: number;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  landingPage?: string;
  referrer?: string;
  consentText: string;
  consentVersion: string;
  ipHash: string;
};

const isConfigured = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function insertLead(
  record: Omit<
    LeadRecord,
    "id" | "createdAt" | "deliveryStatus" | "deliveryAttempts"
  >,
): Promise<LeadRecord> {
  const lead: LeadRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    deliveryStatus: "pending",
    deliveryAttempts: 0,
  };

  if (!isConfigured) {
    // El teléfono y el correo no se imprimen completos ni en desarrollo.
    console.info("[lead] registrado (sin Supabase)", {
      id: lead.id,
      projectSlug: lead.projectSlug,
      email: lead.email.replace(/(.{2}).*(@.*)/, "$1***$2"),
      source: lead.source,
    });
    return lead;
  }

  // TODO Fase 3.1 — INSERT en `leads` con service role. §9.2
  throw new Error("Supabase configurado pero el adaptador aún no está escrito.");
}

export async function updateLeadDelivery(
  id: string,
  status: LeadRecord["deliveryStatus"],
  attempts: number,
): Promise<void> {
  if (!isConfigured) {
    console.info("[lead] estado del aviso", { id, status, attempts });
    return;
  }

  // TODO Fase 3.1 — UPDATE delivery_status, delivered_at, delivery_attempts. §9.2
  throw new Error("Supabase configurado pero el adaptador aún no está escrito.");
}
