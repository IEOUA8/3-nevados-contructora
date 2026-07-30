"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { ImageRef } from "@/content/types";

/**
 * Bloque 1 · Entrada del home — slider de proyectos. §10.1
 *
 * La marca pidió que el hero de inicio muestre una imagen por proyecto y rote
 * solo. Se conserva el lenguaje de HeroFullBleed (parallax, gradiente de tres
 * paradas, marco y pista de scroll); lo que cambia es que hay varias imágenes
 * que se cruzan y un rótulo por slide que enlaza a su ficha.
 *
 * Accesibilidad: sin CTA impuesto, la rotación respeta `prefers-reduced-motion`
 * (se detiene y muestra el primer slide) y se pausa con el cursor encima. Los
 * indicadores dan control manual. §4.1 — crear condiciones, no imponer.
 */
export type HeroSlide = {
  image: ImageRef;
  name: string;
  category: string;
  href: string;
};

export function HeroSlider({
  slides,
  title,
  interval = 5500,
}: {
  slides: HeroSlide[];
  title: string;
  interval?: number;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.2]);

  const total = slides.length;
  const autoRotate = !reduced && !isHovering && total > 1;

  useEffect(() => {
    if (!autoRotate) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, interval);
    return () => window.clearInterval(id);
  }, [autoRotate, interval, activeIndex, total]);

  if (total === 0) return null;

  const active = slides[activeIndex];

  return (
    <section
      ref={heroRef}
      aria-label="Proyectos de Tres Nevados"
      aria-roledescription="carrusel"
      className="relative h-svh min-h-[560px] w-full overflow-hidden bg-bg-inverse md:h-[96vh]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        data-motion="hero-media"
        className="absolute inset-x-0 -inset-y-[8%]"
        initial={reduced ? false : { scale: 1.045 }}
        animate={reduced ? undefined : { scale: 1 }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        style={reduced ? undefined : { y: imageY }}
      >
        {slides.map((slide, index) => (
          <Image
            key={slide.href}
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            priority={index === 0}
            // Los demás slides se cargan de una (no lazy): así el cruce no
            // muestra un hueco oscuro la primera vez que rotan. §17.1
            loading={index === 0 ? undefined : "eager"}
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="100vw"
            className={`object-cover object-[center_45%] transition-opacity duration-[1200ms] ease-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </motion.div>

      {/* §5.5 — gradiente de tres paradas, nunca un negro plano al 50%. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(24,28,25,0.52) 0%, rgba(24,28,25,0.10) 46%, rgba(24,28,25,0.80) 100%)",
        }}
      />
      {/* Franja superior: asegura el contraste del header sobre cielos claros. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28 md:h-40"
        style={{ background: "linear-gradient(180deg, rgba(24,28,25,0.42), transparent)" }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-6 top-16 border border-text-inverse/[0.08] md:inset-x-8 md:bottom-8 md:top-24"
        initial={reduced ? false : { opacity: 0, scale: 0.985 }}
        animate={reduced ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute inset-0 flex items-end"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="mx-auto w-full max-w-site px-10 pb-20 md:px-16 md:pb-20"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="mb-5 text-[0.625rem] font-medium uppercase tracking-[0.24em] text-text-inverse/70 md:mb-7">
                Tres Nevados · Constructora
              </p>
              <h1 className="max-w-5xl font-display text-[clamp(3.25rem,7.5vw,7.25rem)] leading-[0.92] tracking-[-0.04em] text-text-inverse">
                {title}
              </h1>
            </div>

            {/* Rótulo del slide activo: identifica el proyecto y enlaza a su ficha. */}
            <div className="md:col-span-4 md:pb-2">
              <Link
                href={active.href}
                aria-label={`Ver ${active.name}`}
                className="group block border-t border-text-inverse/35 pt-4 transition-colors hover:border-text-inverse"
              >
                <span className="flex items-center justify-between text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-text-inverse/75">
                  <span>{active.category}</span>
                  <span className="tabular-nums text-text-inverse/55">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </span>
                <span className="mt-2 flex items-center gap-2 text-body text-text-inverse">
                  {active.name}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </span>
              </Link>

              {/* Indicadores: control manual y pista de la rotación. */}
              {total > 1 && (
                <div className="mt-5 flex items-center gap-2" role="tablist" aria-label="Elegir proyecto">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.href}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-label={`Ir a ${slide.name}`}
                      onClick={() => setActiveIndex(index)}
                      className="group/dot h-3 flex-1 py-[5px]"
                    >
                      <span
                        className={`block h-px w-full transition-colors ${
                          index === activeIndex
                            ? "bg-text-inverse"
                            : "bg-text-inverse/35 group-hover/dot:bg-text-inverse/70"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* El único adorno permitido en todo el sitio: aclara que hay más abajo. */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-10 hidden items-center gap-3 md:flex md:right-16"
      >
        <span className="text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-text-inverse/55">Descubre</span>
        <span className="scroll-hint block h-8 w-px bg-text-inverse" />
      </div>
    </section>
  );
}
