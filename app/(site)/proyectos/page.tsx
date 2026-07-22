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
        <Kicker>Los proyectos</Kicker>
        <div className="mt-8">
          <ProjectCards
            projects={projects.map((project) => ({
              slug: project.slug,
              name: project.name,
              line: project.cardLine,
              image: project.cardImage,
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}
