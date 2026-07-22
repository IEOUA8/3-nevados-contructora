import Image from "next/image";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import type { Pillar } from "@/content/types";

/**
 * Pilares — bloque opcional de Edén Medical. §20.4
 *
 * Ocupa la posición del bloque D cuando el proyecto no tiene tipologías. La
 * plantilla no puede dejar un hueco vertical donde falta un bloque: en un
 * diseño minimalista, un vacío no diseñado se lee como un error de desarrollo.
 *
 * No es una lista de amenidades. Es contenido con imagen.
 */
export function PillarsBlock({ pillars }: { pillars: Pillar[] }) {
  if (pillars.length === 0) return null;

  return (
    <Section tone="cool">
      <Container>
        <Kicker>Los tres pilares</Kicker>

        <ul className="mt-8 grid gap-10 md:grid-cols-3 md:gap-6">
          {pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.number} delay={index * 0.06}>
              <article className="border-t border-text/15 pt-5">
                {pillar.image && (
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 768px) 31vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="mt-6 grid grid-cols-[2rem_1fr] gap-3">
                  <p className="text-kicker font-medium uppercase text-secondary">
                    {pillar.number}
                  </p>
                  <div>
                    <h3 className="font-display text-display-m text-text">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-body-s text-text-muted">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
