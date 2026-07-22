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
  line: string;
  image: { src: string; alt: string; width: number; height: number };
};

export function ProjectCards({ projects }: { projects: ProjectCardData[] }) {
  return (
    <ul className="grid gap-12 md:grid-cols-2 md:gap-8">
      {projects.map((project, index) => (
        <Reveal as="li" key={project.slug} delay={index * 0.08}>
          <Link
            href={`/proyectos/${project.slug}`}
            className="group block"
            onClick={() =>
              trackEvent("select_project", { project_slug: project.slug })
            }
          >
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <p className="mt-6 text-kicker font-medium uppercase text-secondary">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-display-m text-text">
              {project.name}
            </h3>
            <p className="mt-3 measure text-body-s text-text-muted">
              {project.line}
            </p>
            <p className="mt-4 text-body-s text-accent underline underline-offset-4 decoration-accent/40 group-hover:decoration-accent">
              Ver proyecto
            </p>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
