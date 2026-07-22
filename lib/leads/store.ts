import "server-only";

import type { LeadData } from "@/lib/validation/schemas";

/**
 * Registro espejo de leads. §9.2 · §14.1 · §25.1 A
 *
 * POR QUÉ EXISTE: el brief promete respuesta humana en 15 minutos y dice que
 * «si un lead tarda en llegar al CRM, el sitio falló». Sin registro propio, una
 * caída del CRM no es un lead perdido: es un lead perdido e invisible. Con
 * espejo es un lead recuperable y una alerta.
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
  crmStatus: "pending" | "sent" | "failed";
  crmAttempts: number;
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
  record: Omit<LeadRecord, "id" | "createdAt" | "crmStatus" | "crmAttempts">,
): Promise<LeadRecord> {
  const lead: LeadRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    crmStatus: "pending",
    crmAttempts: 0,
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

export async function updateLeadCrmStatus(
  id: string,
  status: LeadRecord["crmStatus"],
  attempts: number,
): Promise<void> {
  if (!isConfigured) {
    console.info("[lead] estado CRM", { id, status, attempts });
    return;
  }

  // TODO Fase 3.1 — UPDATE crm_status, crm_sent_at, crm_attempts. §9.2
  throw new Error("Supabase configurado pero el adaptador aún no está escrito.");
}
