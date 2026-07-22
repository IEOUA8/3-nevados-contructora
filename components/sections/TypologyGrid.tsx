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

  if (typologies.length === 0) return null;

  return (
    <Section tone="cream">
      <Container>
        <Kicker>Tipologías</Kicker>

        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {typologies.map((typology, index) => (
            <Reveal as="li" key={typology.name} delay={index * 0.08}>
              <button
                type="button"
                className="group block w-full text-left"
                onClick={() => {
                  setOpen(typology);
                  trackEvent("view_typology", {
                    project_slug: projectSlug,
                    typology_name: typology.name,
                    area: typology.area,
                  });
                }}
              >
                <div className="relative aspect-3/4 overflow-hidden bg-bg-alt">
                  <Image
                    src={typology.image.src}
                    alt={typology.image.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 font-display text-display-m text-text">
                  {typology.name}
                </h3>
                <p className="mt-1 text-body-s text-text-muted">{typology.area}</p>
                {typology.tower && (
                  <p className="mt-1 text-body-s text-text-muted">
                    Torre {typology.tower}
                  </p>
                )}
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
        {typology.name} · {typology.area}
      </p>
    </div>
  );
}
