import Image from "next/image";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import type { ProjectLocation } from "@/content/types";

/**
 * Bloque F — Ubicación. §10.3 · §25.2 H
 *
 * NUNCA el iframe de Google Maps: carga ~800 KB y se lleva por delante el
 * presupuesto de performance completo. Se usa imagen estática y el click abre
 * la app nativa.
 *
 * «Qué hay alrededor» es un bloque de contenido de primera clase, no un pie de
 * mapa. Para quien se está mudando, esto pesa más que los acabados.
 *
 * §20.5 — sin coordenadas se muestra solo el entorno, sin mapa. Si tampoco hay
 * entorno, el bloque entero no se renderiza.
 */
export function LocationBlock({ location }: { location: ProjectLocation }) {
  const hasMap = typeof location.lat === "number" && typeof location.lng === "number";
  const hasMapImage = Boolean(location.mapImage);
  const hasContext = location.context.length > 0;

  if (!hasMap && !hasMapImage && !hasContext && !location.address) return null;

  const mapsUrl = location.mapUrl ?? (hasMap
    ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
    : null);

  return (
    <Section tone="cream" className="border-t border-border-soft">
      <Container>
        <div className={hasMapImage ? "grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start" : ""}>
          {location.mapImage && (
            <a
              href={mapsUrl ?? undefined}
              target={mapsUrl ? "_blank" : undefined}
              rel={mapsUrl ? "noopener noreferrer" : undefined}
              className="group relative block aspect-[1.25/1] overflow-hidden border border-border bg-bg-alt"
              aria-label={mapsUrl ? "Abrir ubicación en mapas" : undefined}
            >
              <Image
                src={location.mapImage.src}
                alt={location.mapImage.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            </a>
          )}

          <div>
            <Kicker>Ubicación</Kicker>
            {location.address && (
              <p className="mt-4 measure text-body-l text-text">{location.address}</p>
            )}
            {mapsUrl && (
              <p className="mt-5">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
                >
                  Abrir en mapas
                </a>
              </p>
            )}

            {hasContext && (
              <>
                <h3 className="mt-10 font-display text-display-m text-text">
                  En el entorno
                </h3>
                <dl className="mt-5 max-w-read">
                  {location.context.map((item) => (
                    <div
                      key={item.place}
                      className="flex justify-between gap-6 border-b border-border-soft py-3"
                    >
                      <dt className="text-body-s text-text">{item.place}</dt>
                      <dd className="shrink-0 text-body-s text-text-muted">
                        {item.distance}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
