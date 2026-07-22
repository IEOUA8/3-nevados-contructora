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

        <ul className="mt-8 flex flex-col gap-12 md:gap-24">
          {pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.number}>
              <div
                className={
                  "grid items-center gap-6 md:grid-cols-2 md:gap-16 " +
                  // Alterna el lado de la imagen. Ritmo, no decoración.
                  (index % 2 === 1 ? "md:[&>*:first-child]:order-2" : "")
                }
              >
                {pillar.image && (
                  <div className="relative aspect-4/5 overflow-hidden md:aspect-square">
                    <Image
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div>
                  <p className="text-kicker font-medium uppercase text-secondary">
                    {pillar.number}
                  </p>
                  <h3 className="mt-3 font-display text-display-m text-text">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 measure text-body-l text-text">
                    {pillar.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
