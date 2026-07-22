import Image from "next/image";

import type { ImageRef } from "@/content/types";

/**
 * Bloque A / Bloque 1 — Entrada. §10.1
 *
 * · 100svh en móvil (svh, no vh: evita el salto de la barra del navegador).
 * · Sin CTA. Se hace scroll. Así lo pide el brief.
 * · La imagen es el LCP: `priority` + `fetchPriority=high`.
 */
export function HeroFullBleed({
  image,
  title,
  subtitle,
  showScrollHint = true,
}: {
  image: ImageRef;
  title: string;
  subtitle?: string;
  showScrollHint?: boolean;
}) {
  return (
    <section className="relative h-svh min-h-[560px] w-full md:h-[92vh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />

      {/* §5.5 — gradiente de tres paradas, nunca un negro plano al 50%. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(44,42,41,0.45) 0%, rgba(44,42,41,0.15) 55%, rgba(44,42,41,0.55) 100%)",
        }}
      />

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-site px-6 pb-24 md:px-8 md:pb-28 md:text-center">
          <h1 className="font-display text-display-xl text-text-inverse">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-body-l text-text-inverse/85">{subtitle}</p>
          )}
        </div>
      </div>

      {/* El único adorno permitido en todo el sitio: aclara que hay más abajo. */}
      {showScrollHint && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-8 flex justify-center"
        >
          <span className="scroll-hint block h-8 w-px bg-text-inverse" />
        </div>
      )}
    </section>
  );
}
