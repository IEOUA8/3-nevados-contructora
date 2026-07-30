import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import type { ProductType } from "@/content/types";

/**
 * Bloque de espacios/productos del proyecto. §10.3
 *
 * Lista editorial de dos columnas: el enunciado a la izquierda, los espacios a
 * la derecha. Cada fila lleva índice, nombre en Clash Display, descripción y el
 * rango como pastilla Columbia Blue; al hover aparece una barra de acento y un
 * tinte azul, para que se lea como una ficha de producto y no como un listado.
 */
export function ProductTypesBlock({ products }: { products: ProductType[] }) {
  if (products.length === 0) return null;

  return (
    <Section tone="cream" id="productos" className="scroll-mt-24 border-t border-border-soft">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Kicker>Espacios</Kicker>
            <h2 className="mt-4 max-w-sm font-display text-display-l text-text">
              Una respuesta para cada forma de estar aquí.
            </h2>
            <p className="mt-6 max-w-xs text-body-s text-text-muted">
              {products.length} tipos de espacio, cada uno pensado para un uso
              distinto.
            </p>
          </div>

          <ul className="border-t border-border md:col-span-8">
            {products.map((product, index) => (
              <Reveal as="li" key={product.name} delay={Math.min(index, 2) * 0.05}>
                <div className="group relative grid grid-cols-[1.75rem_1fr] items-start gap-x-4 gap-y-3 border-b border-border py-6 transition-colors duration-200 hover:bg-cool/40 sm:grid-cols-[1.75rem_1fr_auto] sm:items-center sm:gap-x-6 md:px-4">
                  {/* Barra de acento que aparece al hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[2px] origin-center scale-y-0 bg-accent transition-transform duration-200 group-hover:scale-y-100"
                  />
                  <span className="pt-1 font-display text-[0.9rem] leading-none text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.6rem] leading-tight text-text">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 max-w-md text-body-s text-text-muted">
                      {product.description}
                    </p>
                  </div>
                  <span className="col-start-2 justify-self-start whitespace-nowrap rounded-full bg-cool px-3.5 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-text sm:col-start-3 sm:justify-self-end">
                    {product.range}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
