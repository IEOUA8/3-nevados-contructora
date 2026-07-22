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
  subtitleLabel = "Dónde construimos",
  category,
  brandLogo,
  showScrollHint = true,
}: {
  image: ImageRef;
  title: string;
  subtitle?: string;
  subtitleLabel?: string;
  category?: string;
  brandLogo?: ImageRef;
  showScrollHint?: boolean;
}) {
  return (
    <section className="relative h-svh min-h-[560px] w-full overflow-hidden md:h-[96vh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover md:object-[center_45%]"
      />

      {/* §5.5 — gradiente de tres paradas, nunca un negro plano al 50%. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(24,28,25,0.48) 0%, rgba(24,28,25,0.08) 48%, rgba(24,28,25,0.76) 100%)",
        }}
      />

      <div aria-hidden="true" className="absolute inset-x-6 bottom-6 top-16 border border-text-inverse/20 md:inset-x-8 md:bottom-8 md:top-24" />

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-site px-10 pb-20 md:px-16 md:pb-20">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-9">
              <p className="mb-5 text-[0.625rem] font-medium uppercase tracking-[0.24em] text-text-inverse/70 md:mb-7">
                {category ? `${category} · Tres Nevados` : "Tres Nevados · Constructora"}
              </p>
              {brandLogo && (
                <Image
                  src={brandLogo.src}
                  alt={brandLogo.alt}
                  width={brandLogo.width}
                  height={brandLogo.height}
                  unoptimized
                  className="mb-5 h-12 w-44 object-contain object-left brightness-0 invert md:h-16 md:w-56"
                />
              )}
              <h1 className="max-w-5xl font-display text-[clamp(3.25rem,7.5vw,7.25rem)] leading-[0.92] tracking-[-0.04em] text-text-inverse">
                {title}
              </h1>
            </div>
            {subtitle && (
              <div className="border-t border-text-inverse/35 pt-4 md:col-span-3 md:pb-2">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-text-inverse/75">
                  {subtitleLabel}
                </p>
                <p className="mt-2 text-body text-text-inverse">{subtitle}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* El único adorno permitido en todo el sitio: aclara que hay más abajo. */}
      {showScrollHint && (
        <div
          aria-hidden="true"
          className="absolute bottom-8 right-10 hidden items-center gap-3 md:flex md:right-16"
        >
          <span className="text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-text-inverse/55">Descubre</span>
          <span className="scroll-hint block h-8 w-px bg-text-inverse" />
        </div>
      )}
    </section>
  );
}
