import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { splitEssentials } from "@/lib/content";
import type { EssentialField } from "@/content/types";

/**
 * BLOQUE C — «Lo esencial». §10.3
 *
 * El componente más importante del sitio. El 80% de los usuarios viene a
 * buscar exactamente esto.
 *
 * OBJETIVO DURO: legible completo en una pantalla de 375×667 sin scroll interno.
 * Verificado por test visual de Playwright. Si no cabe, se reduce contenido —
 * nunca se reduce el tamaño del tipo.
 *
 * NO EXISTE CAMPO DE PRECIO. No está en el tipo `EssentialField`, no está en el
 * contrato de contenido, no está aquí. Agregarlo por error es imposible.
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
    // Ancla directa: los anuncios de Meta y los mensajes de WhatsApp llevan
    // al usuario aquí sin dos scrolls de por medio. §25.1 E
    //
    // Este es el único bloque que no cumple el piso de aire de §5.3 en móvil.
    // Es deliberado: cuando el criterio «cabe en una pantalla de celular»
    // choca con el de espaciado, manda el primero — el brief dice que si hay
    // que sacrificar algo de diseño para que quepa, se sacrifica.
    <Section
      id="lo-esencial"
      tone="cream"
      // scroll-mt-16 = exactamente la altura del header en móvil. Un valor
      // mayor regala píxeles de la única pantalla que importa.
      className="scroll-mt-16 py-8 md:scroll-mt-20 md:py-48"
    >
      <Container size="read">
        <Kicker>Lo esencial</Kicker>

        <dl className="mt-4 md:mt-6 md:grid md:grid-cols-2 md:gap-x-8">
          {confirmed.map((field) => (
            <EssentialRow key={field.label} field={field} />
          ))}

          {/* §20.2 — los pendientes van agrupados AL FINAL, con estilo propio.
              Ni ocultos (el usuario nota la ausencia y desconfía) ni mezclados
              con los confirmados (se lee como descuido). */}
          {pending.map((field) => (
            <EssentialRow key={field.label} field={field} pending />
          ))}
        </dl>

        {/* Cuando hay dos o más pendientes, la ausencia se convierte en un
            motivo de contacto en lugar de una fuga. §20.2 */}
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
      </Container>
    </Section>
  );
}

/** Sin bordes de tabla. Solo una línea de 1px al 8% entre filas. §10.3 */
const ROW = "border-b border-border-soft py-2 last:border-b-0 md:last:border-b";
const LABEL =
  "text-[0.75rem] font-medium uppercase leading-tight tracking-[0.18em] text-secondary";

function EssentialRow({
  field,
  pending = false,
}: {
  field: EssentialField;
  pending?: boolean;
}) {
  // Los pendientes van en una sola línea, etiqueta a la izquierda y valor a la
  // derecha, tal como el esquema del §10.3. Ocupan la mitad de alto que una
  // fila normal, que es exactamente lo que hace que el bloque quepa.
  if (pending) {
    return (
      <div className={`${ROW} flex items-baseline justify-between gap-4`}>
        <dt className={LABEL}>{field.label}</dt>
        <dd className="text-[0.9375rem] italic text-secondary">Por confirmar</dd>
      </div>
    );
  }

  return (
    <div className={ROW}>
      <dt className={LABEL}>{field.label}</dt>
      <dd className="mt-1 text-[0.9375rem] font-medium leading-snug text-text">
        {field.value}
      </dd>
    </div>
  );
}
