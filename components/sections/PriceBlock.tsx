import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import type { Project } from "@/content/types";

/**
 * PUNTO DE PRECIO — R-05 (Book). CONSTRUIDO Y DESACTIVADO.
 *
 * El sitio no publica precios por decisión (§10.3). Este módulo es la única
 * excepción prevista, y nace apagado: se pinta solo cuando `priceFrom.published`
 * es true, lo que exige confirmación de gerencia comercial. Activarlo es una
 * sola edición en el contenido; ningún otro campo de precio existe en el sitio.
 */
export function PriceBlock({
  price,
}: {
  price: NonNullable<Project["priceFrom"]>;
}) {
  if (!price.published) return null;

  return (
    <Section tone="cream" className="section-space-sm border-t border-border-soft">
      <Container>
        <div className="grid gap-3 md:grid-cols-[auto_1fr] md:items-baseline md:gap-10">
          <Kicker>Inversión</Kicker>
          <div>
            <p className="font-display text-display-m text-text">{price.value}</p>
            {price.note && (
              <p className="mt-3 max-w-xl text-body-s text-text-muted">
                {price.note}
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
