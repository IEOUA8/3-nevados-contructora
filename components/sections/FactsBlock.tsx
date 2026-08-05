import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/content/types";

/**
 * CIFRAS DEL PROYECTO — R-05 (Book).
 *
 * Datos duros en línea, con tratamiento sobrio y sin iconografía decorativa.
 * Se pinta solo cuando `facts.published` es true: hoy queda construido pero
 * desactivado hasta que la marca unifique el área mínima publicable (26 vs 33 m²).
 */
export function FactsBlock({
  facts,
}: {
  facts: NonNullable<Project["facts"]>;
}) {
  if (!facts.published || facts.items.length === 0) return null;

  return (
    <Section tone="cream" className="section-space-sm border-t border-border-soft">
      <Container>
        <Kicker>El proyecto en cifras</Kicker>
        <Reveal>
          <ul className="mt-8 grid gap-x-10 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {facts.items.map((item) => (
              <li
                key={item}
                className="border-b border-border py-5 text-body-l text-text"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
