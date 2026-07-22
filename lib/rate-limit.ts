/**
 * Rate limit por IP. §19 — 5 envíos por 10 minutos.
 *
 * Implementación en memoria: sirve en desarrollo y en una sola instancia, pero
 * NO sirve en producción serverless, donde cada invocación puede tener su
 * propio proceso. Antes de lanzar hay que cambiar el almacén por Upstash Redis
 * (§19 lo especifica). La firma de `checkRateLimit` no cambia al hacerlo.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { ok: boolean } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { ok: false };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true };
}

/** §19 — la IP nunca se guarda en claro. Solo su hash. */
export async function hashIp(ip: string): Promise<string> {
  const salt = process.env.IP_HASH_SALT ?? "dev-salt-no-usar-en-produccion";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
