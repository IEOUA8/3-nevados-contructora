"use client";

import Image from "next/image";
import Link from "next/link";

import { trackEvent } from "@/components/analytics/trackEvent";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Bloque 3 — Los proyectos. §10.1
 *
 * Toda la tarjeta es clicable, no solo el enlace: el área de toque completa es
 * lo que hace que esto funcione con un pulgar en un bus.
 *
 * Hover desktop: la imagen escala a 1.03 en 700ms. El resto no se mueve. Sin
 * sombras. §12
 */
export type ProjectCardData = {
  slug: string;
  name: string;
  category: string;
  line: string;
  image: { src: string; alt: string; width: number; height: number };
};

export function ProjectCards({ projects }: { projects: ProjectCardData[] }) {
  return (
    <ul className="grid gap-12 border-t border-border pt-6 md:grid-cols-12 md:gap-x-8 md:gap-y-16 md:pt-8">
      {projects.map((project, index) => (
        <Reveal
          as="li"
          key={project.slug}
          delay={index * 0.08}
          className={
            index === 0
              ? "md:col-span-7"
              : index === 1
                ? "md:col-span-5"
                : "md:col-span-12"
          }
        >
          <Link
            href={`/proyectos/${project.slug}`}
            className="group block"
            onClick={() =>
              trackEvent("select_project", { project_slug: project.slug })
            }
          >
            <div
              className={
                "relative aspect-[4/3] overflow-hidden bg-bg-alt " +
                (index === 0
                  ? "md:aspect-[7/6]"
                  : index === 1
                    ? "md:aspect-[5/6]"
                    : "md:aspect-[16/7]")
              }
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes={
                  index === 0
                    ? "(min-width: 768px) 57vw, 100vw"
                    : index === 1
                      ? "(min-width: 768px) 40vw, 100vw"
                      : "(min-width: 768px) 94vw, 100vw"
                }
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(24,28,25,0.78)_100%)]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-text-inverse md:p-10">
                <div>
                  <p className="text-[0.625rem] font-medium uppercase tracking-[0.22em] text-text-inverse/65">
                    {project.category} · 0{index + 1}
                  </p>
                  <h3 className="mt-3 max-w-2xl font-display text-[clamp(2.15rem,4vw,4.25rem)] leading-[0.92] tracking-[-0.035em]">
                    {project.name}
                  </h3>
                </div>
                <span className="flex size-12 shrink-0 items-center justify-center border border-text-inverse/45 transition-colors group-hover:bg-text-inverse group-hover:text-text">
                  <ArrowUpRight />
                </span>
              </div>
            </div>

            <div className="grid min-h-32 grid-cols-[1fr_auto] items-start gap-8 border-b border-border py-6 md:py-7">
              <p className="measure text-body text-text-muted">{project.line}</p>
              <span className="flex items-center gap-3 pt-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
                <span className="h-px w-7 bg-accent transition-[width] duration-300 group-hover:w-12" />
                Ver proyecto
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 13 13 5M6 5h7v7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
