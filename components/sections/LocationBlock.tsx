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
  const hasContext = location.context.length > 0;

  if (!hasMap && !hasContext && !location.address) return null;

  const mapsUrl = hasMap
    ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
    : null;

  return (
    <Section tone="cream">
      <Container>
        <Kicker>Ubicación</Kicker>

        {location.address && (
          <p className="mt-4 measure text-body-l text-text">{location.address}</p>
        )}

        {/* PENDIENTE · el mapa estático (Mapbox Static Images con estilo en los
            tonos de la paleta) se genera cuando la marca entregue las
            coordenadas del lote. Sin ellas no se dibuja nada: un pin en el
            lugar equivocado es peor que ningún mapa. */}
        {mapsUrl && (
          <p className="mt-6">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
            >
              Ver en el mapa
            </a>
          </p>
        )}

        {hasContext && (
          <>
            <h3 className="mt-12 font-display text-display-m text-text">
              Qué hay alrededor
            </h3>
            {/* Texto puro, sin iconos. §10.3.F */}
            <dl className="mt-6 max-w-read">
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
      </Container>
    </Section>
  );
}
