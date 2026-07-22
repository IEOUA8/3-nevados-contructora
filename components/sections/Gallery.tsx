import Image from "next/image";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import type { ImageRef } from "@/content/types";

/**
 * Bloque E — Galería. §10.3 · §25.2 I
 *
 * Ordenada como un recorrido, no como una cuadrícula de amenidades: acceso →
 * zonas comunes → vista. Coherente con «observa y describe»: el sitio no
 * muestra amenidades, muestra una experiencia.
 *
 * SIN LISTA DE AMENIDADES. El brief lo prohíbe.
 * Solo la primera imagen carga sin lazy; el resto espera. §17.3
 */
export function Gallery({
  title,
  images,
}: {
  title: string;
  images: ImageRef[];
}) {
  if (images.length === 0) return null; // §20.5 — galería vacía no deja hueco.

  return (
    <Section tone="cream">
      <Container>
        <Kicker>{title}</Kicker>
      </Container>

      {/* Móvil: carrusel horizontal con snap. Desktop: rejilla asimétrica. */}
      <ul
        className={
          "mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 " +
          "md:mx-auto md:max-w-site md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-8 md:pb-0"
        }
      >
        {images.map((image, index) => (
          <li
            key={image.src}
            className={
              "w-[82vw] shrink-0 snap-center md:w-auto " +
              // Una imagen a todo el ancho cada cuatro rompe el ritmo de la rejilla.
              (index % 4 === 0 ? "md:col-span-2" : "")
            }
          >
            <div
              className={
                "relative overflow-hidden bg-bg-alt " +
                (index % 4 === 0 ? "aspect-4/5 md:aspect-video" : "aspect-4/5")
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes={
                  index % 4 === 0
                    ? "(min-width: 768px) 76vw, 82vw"
                    : "(min-width: 768px) 38vw, 82vw"
                }
                className="object-cover"
              />
            </div>
            {image.caption && (
              <p className="mt-3 text-body-s text-secondary">{image.caption}</p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
