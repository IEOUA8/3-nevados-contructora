import Image from "next/image";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteSettings } from "@/content/types";

/**
 * FRANJA DE RESPALDO — R-10.
 *
 * Aliados estratégicos con jerarquía propia, en tres páginas del sitio (Reserva,
 * Edén y Constructora). Franja horizontal sobre fondo crema, sin animación ni
 * carrusel. Los logos se muestran en una sola tinta (grises) cuando la marca
 * entrega el vectorial y autoriza el uso; mientras tanto va el nombre en texto.
 * Ningún logo se publica sin esa autorización.
 */
export function BackingStrip({ allies }: { allies: SiteSettings["allies"] }) {
  if (allies.items.length === 0) return null;

  return (
    <Section tone="cream" className="section-space-sm border-t border-border-soft">
      <Container>
        <Reveal>
          <Kicker>{allies.kicker}</Kicker>
          <ul className="mt-6 flex flex-col gap-6 border-y border-border py-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-14 sm:gap-y-6">
            {allies.items.map((ally) => (
              <li key={ally.name} className="flex items-center">
                {ally.logo ? (
                  // Una sola tinta: se apaga el color y se sube apenas la opacidad
                  // al pasar, sin animación llamativa.
                  <Image
                    src={ally.logo.src}
                    alt={ally.logo.alt}
                    width={ally.logo.width}
                    height={ally.logo.height}
                    className="h-8 w-auto opacity-70 grayscale transition-opacity hover:opacity-100 md:h-9"
                  />
                ) : (
                  <span className="font-display text-[1.35rem] leading-none text-text-muted">
                    {ally.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {allies.note && (
            <p className="mt-5 measure text-body-s text-text-muted">
              {allies.note}
            </p>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
