import "server-only";

/**
 * Cliente del CRM Smarthome. §14
 *
 * BLOQUEANTE FORMAL (§14.2, §26 R2): antes de escribir este cliente de verdad
 * hace falta que el proveedor entregue:
 *   1. Endpoint y método de autenticación.
 *   2. Nombres exactos de campos y formato de teléfono aceptado.
 *   3. Identificador de proyecto en su sistema (`crmProjectId`).
 *   4. Respuesta en éxito y en error (código y cuerpo).
 *   5. Rate limits de su lado.
 *   6. Ambiente de pruebas (sandbox) — sin él no se puede validar el criterio
 *      de aprobación #05 «un lead llega al CRM en menos de un minuto».
 *   7. Si soportan idempotencia, para que los reintentos no dupliquen leads.
 *
 * Hasta entonces, `sendToCrm` devuelve `skipped` sin bloquear nada. El lead ya
 * quedó registrado antes de llegar aquí, que es lo que importa.
 */

export type SmarthomeLeadPayload = {
  nombre: string;
  telefono: string; // +573123120407
  email: string;
  proyecto: string; // crmProjectId
  origen: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  pagina_origen: string;
  fecha: string; // ISO 8601, America/Bogota
  observaciones?: string;
};

export type CrmResult =
  | { status: "sent"; attempts: number }
  | { status: "failed"; attempts: number; error: string }
  | { status: "skipped"; reason: string };

const TIMEOUT_MS = 8_000;
const BACKOFF_MS = [1_000, 3_000, 9_000];

export async function sendToCrm(
  payload: SmarthomeLeadPayload,
): Promise<CrmResult> {
  const endpoint = process.env.SMARTHOME_ENDPOINT;
  const apiKey = process.env.SMARTHOME_API_KEY;

  if (!endpoint || !apiKey) {
    return { status: "skipped", reason: "CRM sin configurar" };
  }

  let lastError = "";

  // Un intento más tres reintentos con backoff 1s · 3s · 9s. §14.1
  for (let attempt = 0; attempt <= BACKOFF_MS.length; attempt++) {
    if (attempt > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, BACKOFF_MS[attempt - 1]),
      );
    }

    try {
      const response = await fetch(endpoint, {
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

  return {
    status: "failed",
    attempts: BACKOFF_MS.length + 1,
    error: lastError,
  };
}
