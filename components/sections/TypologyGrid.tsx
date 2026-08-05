"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { trackEvent } from "@/components/analytics/trackEvent";
import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import type { Typology } from "@/content/types";

/**
 * Bloque D — Tipologías. §10.3
 *
 * Abrir la planta a tamaño completo es un gesto de alta intención comercial:
 * quien mira una planta está decidiendo, no navegando. Por eso `view_typology`
 * se mide, y por eso el lightbox permite zoom real (pinch en móvil, sin
 * maximum-scale que lo impida — §18).
 */
/** R-06 — «2 habitaciones», «1 habitación». Una sola línea con alcobas y área. */
function bedroomsLabel(bedrooms?: number): string | null {
  if (!bedrooms) return null;
  return `${bedrooms} ${bedrooms === 1 ? "habitación" : "habitaciones"}`;
}

function supportLine(typology: Typology): string | null {
  const parts = [bedroomsLabel(typology.bedrooms), typology.area].filter(
    Boolean,
  );
  return parts.length > 0 ? parts.join(" · ") : null;
}

export function TypologyGrid({
  typologies,
  projectSlug,
}: {
  typologies: Typology[];
  projectSlug: string;
}) {
  const [open, setOpen] = useState<Typology | null>(null);

  // R-06 — la primera división es por número de habitaciones, que es como busca
  // la gente. La torre queda como filtro secundario. Ambos filtros solo
  // aparecen cuando el dato existe; si la marca aún no entrega la tabla de
  // correspondencia (alcobas por plano), el bloque se muestra sin filtro de
  // habitaciones en lugar de inventar un dato.
  const bedroomOptions = Array.from(
    new Set(
      typologies
        .map((typology) => typology.bedrooms)
        .filter((value): value is number => typeof value === "number"),
    ),
  ).sort((a, b) => a - b);

  const towers = Array.from(
    new Set(typologies.map((typology) => typology.tower).filter(Boolean)),
  ) as string[];

  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedTower, setSelectedTower] = useState<string | null>(null);

  const visibleTypologies = typologies.filter((typology) => {
    if (selectedBedrooms !== null && typology.bedrooms !== selectedBedrooms) {
      return false;
    }
    if (selectedTower !== null && typology.tower !== selectedTower) {
      return false;
    }
    return true;
  });

  if (typologies.length === 0) return null;

  return (
    <Section tone="cream" id="tipologias" className="scroll-mt-24 border-t border-border-soft">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <Kicker>Tipologías</Kicker>
            <h2 className="mt-4 max-w-xl font-display text-display-l text-text">
              Explora cada planta.
            </h2>
            <p className="mt-4 max-w-xl text-body-s text-text-muted">
              {bedroomOptions.length > 1
                ? "Elige por número de habitaciones. Áreas y disponibilidad se confirman con el equipo comercial."
                : "Cada planta corresponde a un plano entregado. Áreas y disponibilidad se confirman con el equipo comercial."}
            </p>
          </div>

          {(bedroomOptions.length > 1 || towers.length > 1) && (
            <div className="flex flex-col gap-3">
              {/* Filtro primario · habitaciones. R-06 */}
              {bedroomOptions.length > 1 && (
                <div
                  className="flex flex-wrap gap-2"
                  aria-label="Filtrar tipologías por número de habitaciones"
                >
                  <FilterChip
                    active={selectedBedrooms === null}
                    onClick={() => setSelectedBedrooms(null)}
                  >
                    Todas
                  </FilterChip>
                  {bedroomOptions.map((bedrooms) => (
                    <FilterChip
                      key={bedrooms}
                      active={selectedBedrooms === bedrooms}
                      onClick={() => setSelectedBedrooms(bedrooms)}
                    >
                      {bedroomsLabel(bedrooms)}
                    </FilterChip>
                  ))}
                </div>
              )}

              {/* Filtro secundario · torre. */}
              {towers.length > 1 && (
                <div
                  className="flex flex-wrap gap-2"
                  aria-label="Filtrar tipologías por torre"
                >
                  <FilterChip
                    secondary
                    active={selectedTower === null}
                    onClick={() => setSelectedTower(null)}
                  >
                    Todas las torres
                  </FilterChip>
                  {towers.map((tower) => (
                    <FilterChip
                      key={tower}
                      secondary
                      active={selectedTower === tower}
                      onClick={() => setSelectedTower(tower)}
                    >
                      Torre {tower}
                    </FilterChip>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <ul className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {visibleTypologies.map((typology, index) => {
            const support = supportLine(typology);
            return (
              <Reveal
                as="li"
                key={typology.code ?? typology.name}
                delay={Math.min(index, 2) * 0.05}
                className="w-[78vw] shrink-0 snap-center sm:w-auto"
              >
                <button
                  type="button"
                  className="group block w-full text-left"
                  onClick={() => {
                    setOpen(typology);
                    trackEvent("view_typology", {
                      project_slug: projectSlug,
                      typology_name: typology.name,
                      area: typology.area ?? "por confirmar",
                    });
                  }}
                >
                  <div className="relative aspect-4/3 overflow-hidden border border-border-soft bg-bg-alt">
                    <Image
                      src={typology.image.src}
                      alt={typology.image.alt}
                      fill
                      sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  {/* R-06 — el nombre manda; el código va pequeño y tenue debajo. */}
                  <h3 className="mt-4 font-display text-[1.6rem] leading-tight text-text">
                    {typology.name}
                    {typology.tower ? (
                      <span className="text-text-muted"> · Torre {typology.tower}</span>
                    ) : null}
                  </h3>
                  {support && (
                    <p className="mt-1 text-body-s text-text-muted">{support}</p>
                  )}
                  {typology.code && (
                    <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-text-muted/60">
                      Plano {typology.code}
                    </p>
                  )}
                </button>
              </Reveal>
            );
          })}
        </ul>
      </Container>

      <Lightbox typology={open} onClose={() => setOpen(null)} />
    </Section>
  );
}

function FilterChip({
  active,
  secondary = false,
  onClick,
  children,
}: {
  active: boolean;
  secondary?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        (secondary ? "min-h-10 px-4 text-body-s " : "min-h-12 px-5 text-body-s ") +
        "border transition-colors " +
        (active
          ? "border-accent bg-accent text-text-inverse"
          : "border-border bg-transparent text-text hover:border-accent")
      }
    >
      {children}
    </button>
  );
}

/** §18 — mismo tratamiento que el menú móvil: dialog, focus, cierre con Esc. */
function Lightbox({
  typology,
  onClose,
}: {
  typology: Typology | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!typology) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [typology, onClose]);

  if (!typology) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Planta · ${typology.name}`}
      className="fixed inset-0 z-50 flex flex-col bg-bg-inverse/95 p-4 md:p-8"
      onClick={onClose}
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="flex size-11 items-center justify-center text-text-inverse"
          aria-label="Cerrar"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <Image
          src={typology.image.src}
          alt={typology.image.alt}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <p className="pt-4 text-center text-body-s text-text-inverse/80">
        {typology.name}
        {typology.tower ? ` · Torre ${typology.tower}` : ""}
        {supportLine(typology) ? ` · ${supportLine(typology)}` : ""}
        {typology.code ? (
          <span className="text-text-inverse/45"> · Plano {typology.code}</span>
        ) : null}
      </p>
    </div>
  );
}
