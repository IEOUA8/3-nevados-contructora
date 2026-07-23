import { notFound } from "next/navigation";

import { ProjectCards } from "@/components/sections/ProjectCards";
import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { getProjects, isProjectIndexEnabled } from "@/lib/content";

/**
 * ÍNDICE DE PROYECTOS — §6.3
 *
 * La ruta existe en el sistema, pero no es navegable con dos proyectos: una
 * página índice sería un paso muerto que resta un clic de conversión. El
 * bloque 3 del home ya cumple esa función.
 *
 * Se activa sola cuando haya tres proyectos o más. Cuando ese día llegue, no
 * hace falta tocar este archivo: basta con publicar el tercer proyecto.
 */
export default async function ProjectsIndexPage() {
  if (!(await isProjectIndexEnabled())) notFound();

  const projects = await getProjects();

  return (
    <Section tone="cream" className="pt-32 md:pt-40">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Kicker>Los proyectos · 03</Kicker>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.25rem,7vw,7.5rem)] leading-[0.9] tracking-[-0.045em] text-text">
              Tres maneras de vivir la ciudad.
            </h1>
          </div>
          <p className="max-w-sm text-body text-text-muted md:col-span-4 md:pb-2">
            Vivienda, salud y comercio conectados por una misma forma de entender el entorno.
          </p>
        </div>
        <div className="mt-16 md:mt-24">
          <ProjectCards
            projects={projects.map((project) => ({
              slug: project.slug,
              name: project.name,
              category: project.category,
              line: project.cardLine,
              image: project.cardImage,
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}
