import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import type { ProductType } from "@/content/types";

export function ProductTypesBlock({ products }: { products: ProductType[] }) {
  if (products.length === 0) return null;

  return (
    <Section tone="cream" className="border-t border-border-soft">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Kicker>Espacios</Kicker>
            <h2 className="mt-4 max-w-sm font-display text-display-l text-text">
              Una respuesta para cada forma de estar aquí.
            </h2>
          </div>

          <ul className="border-t border-border md:col-span-8">
            {products.map((product, index) => (
              <Reveal as="li" key={product.name} delay={Math.min(index, 2) * 0.05}>
                <div className="grid gap-3 border-b border-border py-6 sm:grid-cols-[1fr_0.75fr_1.3fr] sm:items-baseline sm:gap-6">
                  <h3 className="font-display text-[1.55rem] leading-tight text-text">
                    {product.name}
                  </h3>
                  <p className="text-body-s font-medium text-accent">{product.range}</p>
                  <p className="text-body-s text-text-muted">{product.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
