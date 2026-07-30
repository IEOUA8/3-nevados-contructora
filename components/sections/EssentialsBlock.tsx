import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Isotipo } from "@/components/ui/Isotipo";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { splitEssentials } from "@/lib/content";
import type { EssentialField } from "@/content/types";

/**
 * BLOQUE C — «Lo esencial». §10.3
 *
 * El componente más importante del sitio: el 80% de los usuarios viene a buscar
 * exactamente esto. Se presenta como una ficha técnica —panel con relieve en
 * escritorio— para que comunique de forma profesional, no como un listado suelto.
 *
 * OBJETIVO DURO (móvil): legible completo en una pantalla de 375×667 sin scroll
 * interno. Por eso el tratamiento de tarjeta y el titular son solo `md:` — en
 * móvil se mantiene la matriz compacta.
 *
 * NO EXISTE CAMPO DE PRECIO. No está en `EssentialField` ni en el contrato.
 */
export function EssentialsBlock({
  fields,
  whatsappNumber,
  whatsappMessage,
  projectSlug,
}: {
  fields: EssentialField[];
  whatsappNumber: string;
  whatsappMessage: string;
  projectSlug: string;
}) {
  const { confirmed, pending } = splitEssentials(fields);

  if (confirmed.length === 0 && pending.length === 0) return null;

  return (
    <Section
      id="lo-esencial"
      tone="cream"
      className="scroll-mt-16 py-10 md:scroll-mt-20 md:section-space-md"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Kicker>Lo esencial</Kicker>
            <h2 className="mt-4 hidden max-w-[14rem] font-display text-display-m text-text md:block">
              Lo que necesitas saber.
            </h2>
            <Isotipo className="mt-10 hidden w-16 text-cool md:block" />
          </div>

          <div className="md:col-span-8">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-0 md:gap-x-10 md:rounded-[2px] md:border md:border-border md:bg-bg-alt md:p-8 md:shadow-[0_12px_44px_rgb(44_41_41/0.06)] lg:p-10">
              {confirmed.map((field) => (
                <EssentialRow key={field.label} field={field} />
              ))}

              {/* §20.2 — los pendientes van agrupados AL FINAL, con estilo propio. */}
              {pending.map((field) => (
                <EssentialRow key={field.label} field={field} pending />
              ))}
            </dl>

            {/* Con dos o más pendientes, la ausencia es un motivo de contacto. §20.2 */}
            {pending.length >= 2 && (
              <p className="mt-4 text-body-s text-text-muted">
                Estos datos se confirman con el equipo comercial.{" "}
                <WhatsAppLink
                  number={whatsappNumber}
                  message={whatsappMessage}
                  projectSlug={projectSlug}
                  location="essentials_pending"
                  className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
                >
                  Escribir por WhatsApp
                </WhatsAppLink>
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

const ROW =
  "border-b border-border-soft py-3 last:border-b-0 md:py-4 md:[&:nth-last-child(-n+2)]:border-b-0";
const LABEL =
  "text-[0.6875rem] font-medium uppercase leading-tight tracking-[0.18em] text-secondary";

function EssentialRow({
  field,
  pending = false,
}: {
  field: EssentialField;
  pending?: boolean;
}) {
  return (
    <div className={ROW}>
      <dt className={LABEL}>{field.label}</dt>
      {pending ? (
        <dd className="mt-2">
          <span className="inline-flex items-center rounded-full border border-secondary/45 px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-secondary">
            Por confirmar
          </span>
        </dd>
      ) : (
        <dd className="mt-1.5 text-[1rem] font-medium leading-snug text-text md:text-[1.0625rem]">
          {field.value}
        </dd>
      )}
    </div>
  );
}
