import { z } from "zod";

/**
 * Validación compartida cliente/servidor. §13.1
 * El servidor vuelve a validar siempre — el cliente es conveniencia, no defensa.
 */

/** Texto exacto del consentimiento. Se versiona: queda guardado con el lead. §19.1 */
export const CONSENT_TEXT =
  "Autorizo el tratamiento de mis datos personales conforme a la política de tratamiento de datos.";
export const CONSENT_VERSION = "2026-07-v1";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(80)
    .regex(/^[\p{L}\s'.-]+$/u, "Solo letras."),

  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s()-]/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^(\+?57)?3\d{9}$/,
          "Escribe un celular colombiano de 10 dígitos.",
        ),
    ),

  email: z.string().trim().toLowerCase().email("Revisa el correo."),

  projectSlug: z.string().min(1, "Elige un proyecto."),

  consent: z.literal(true, { error: "Necesitamos tu autorización." }),

  /** Honeypot — debe llegar vacío. §19 */
  website: z.string().max(0).optional(),
});

/**
 * `renderedAt` NO va en este schema a propósito.
 *
 * Es una señal antibot que el cliente adjunta al enviar, no un campo del
 * formulario: si viviera aquí, el resolver del cliente bloquearía cada envío
 * por un dato que el usuario no puede llenar. El servidor lo comprueba por su
 * cuenta antes de validar. §14.1
 */

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;

export const downloadSchema = z.object({
  email: z.string().trim().toLowerCase().email("Revisa el correo."),
  projectSlug: z.string().min(1),
  consent: z.literal(true, { error: "Necesitamos tu autorización." }),
  website: z.string().max(0).optional(),
});

export type DownloadInput = z.input<typeof downloadSchema>;

/** Normaliza a +573123120407 para el CRM. §14.2 */
export function toInternationalPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const local = digits.slice(-10);
  return `+57${local}`;
}
