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
export function TypologyGrid({
  typologies,
  projectSlug,
}: {
  typologies: Typology[];
  projectSlug: string;
}) {
  const [open, setOpen] = useState<Typology | null>(null);
  const towers = Array.from(
    new Set(typologies.map((typology) => typology.tower).filter(Boolean)),
  ) as string[];
  const [selectedTower, setSelectedTower] = useState(towers[0] ?? "");
  const visibleTypologies = selectedTower
    ? typologies.filter((typology) => typology.tower === selectedTower)
    : typologies;

  if (typologies.length === 0) return null;

  return (
    <Section tone="cream" className="border-t border-border-soft">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker>Tipologías</Kicker>
            <h2 className="mt-4 max-w-xl font-display text-display-l text-text">
              Explora cada planta.
            </h2>
            <p className="mt-4 max-w-xl text-body-s text-text-muted">
              Los códigos corresponden a los planos entregados. Áreas y disponibilidad se confirman con el equipo comercial.
            </p>
          </div>

          {towers.length > 1 && (
            <div className="flex gap-2" aria-label="Filtrar tipologías por torre">
              {towers.map((tower) => (
                <button
                  key={tower}
                  type="button"
                  onClick={() => setSelectedTower(tower)}
                  aria-pressed={selectedTower === tower}
                  className={
                    "min-h-12 border px-5 text-body-s transition-colors " +
                    (selectedTower === tower
                      ? "border-accent bg-accent text-text-inverse"
                      : "border-border bg-transparent text-text hover:border-accent")
                  }
                >
                  Torre {tower}
                </button>
              ))}
            </div>
          )}
        </div>

        <ul className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {visibleTypologies.map((typology, index) => (
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
                <h3 className="mt-4 font-display text-[1.6rem] leading-tight text-text">
                  {typology.code ?? typology.name}
                </h3>
                <p className="mt-1 text-body-s text-text-muted">
                  Torre {typology.tower}{typology.area ? ` · ${typology.area}` : ""}
                </p>
              </button>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Lightbox typology={open} onClose={() => setOpen(null)} />
    </Section>
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
        {typology.code ?? typology.name}
        {typology.area ? ` · ${typology.area}` : ""}
      </p>
    </div>
  );
}
