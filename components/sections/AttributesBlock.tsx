import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/content/types";

/**
 * ATRIBUTOS DEL PROYECTO — R-05 (Book).
 *
 * Cuatro atributos con el mismo peso visual, sin iconografía decorativa. Es el
 * argumento de compra en cuatro frases; el texto lo entrega la marca.
 */
export function AttributesBlock({
  attributes,
}: {
  attributes: NonNullable<Project["attributes"]>;
}) {
  if (attributes.length === 0) return null;

  return (
    <Section tone="cream" className="section-space-sm border-t border-border-soft">
      <Container>
        <Kicker>Por qué Reserva</Kicker>
        <div className="mt-8 grid border-t border-border sm:grid-cols-2">
          {attributes.map((attribute, index) => (
            <Reveal key={attribute.title} delay={(index % 2) * 0.06}>
              <article
                className={
                  "border-b border-border py-7 sm:min-h-44 sm:px-8 " +
                  (index % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0")
                }
              >
                <h3 className="font-display text-[1.4rem] leading-tight text-text">
                  {attribute.title}
                </h3>
                <p className="mt-3 max-w-md text-body-s text-text-muted">
                  {attribute.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
