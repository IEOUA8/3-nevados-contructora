import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactBlock } from "@/components/sections/ContactBlock";
import { EssentialsBlock } from "@/components/sections/EssentialsBlock";
import { Gallery } from "@/components/sections/Gallery";
import { HeroFullBleed } from "@/components/sections/HeroFullBleed";
import { LocationBlock } from "@/components/sections/LocationBlock";
import { PillarsBlock } from "@/components/sections/PillarsBlock";
import { StickyActionBar } from "@/components/sections/StickyActionBar";
import { TypologyGrid } from "@/components/sections/TypologyGrid";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { getProject, getProjectSlugs, getSettings } from "@/lib/content";

/**
 * FICHA DE PROYECTO — plantilla replicable. §10.3
 *
 * Los dos proyectos usan exactamente esta plantilla, en el orden A→H del brief.
 * Crear un tercer proyecto no requiere tocar este archivo.
 *
 * Los bloques opcionales (tipologías, pilares, galería, ubicación, ficha) no
 * dejan huecos verticales cuando están vacíos: cada uno decide por sí mismo si
 * se renderiza. §20.4
 */

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url: `/proyectos/${project.slug}`,
      images: [{ url: project.heroImage.src }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([getProject(slug), getSettings()]);

  if (!project) notFound();

  return (
    <>
      {/* — A · Entrada — */}
      <HeroFullBleed
        image={project.heroImage}
        title={project.name}
        subtitle={project.tagline}
      />

      {/* — B · Qué se vive aquí — */}
      <Section tone="cream" className="py-24 md:py-48">
        <Container size="read">
          <Reveal>
            <div className="measure-narrow mx-auto flex flex-col gap-2 text-body-l text-text">
              {project.experience.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* — C · Lo esencial — no más de dos scrolls desde el hero. §10.3 */}
      <EssentialsBlock
        fields={project.essentials}
        whatsappNumber={settings.whatsapp.number}
        whatsappMessage={project.whatsappMessage}
        projectSlug={project.slug}
      />

      {/* — D · Tipologías, o Pilares en su lugar cuando no hay. §20.4 */}
      {project.typologies && project.typologies.length > 0 && (
        <TypologyGrid typologies={project.typologies} projectSlug={project.slug} />
      )}
      {project.pillars && project.pillars.length > 0 && (
        <PillarsBlock pillars={project.pillars} />
      )}

      {/* — E · Zonas comunes / Infraestructura — */}
      {project.gallery && (
        <Gallery title={project.galleryTitle} images={project.gallery} />
      )}

      {/* — F · Ubicación — */}
      <LocationBlock location={project.location} />

      {/* — G · Descargar ficha —
          §20.3 — sin PDF cargado, el botón no se renderiza. En su lugar, el
          camino real: la ficha se pide por WhatsApp. */}
      <Section tone="cream" id="descargar-ficha" className="py-24 md:py-48">
        <Container size="read">
          {project.brochure ? (
            <p className="text-body-s text-text-muted">
              {/* El gate de correo llega en la fase de integraciones. §23 fase 3.3 */}
              Ficha del proyecto · PDF {project.brochure.sizeMb} MB
            </p>
          ) : (
            <p className="text-body-s text-text-muted">
              La ficha del proyecto se envía por WhatsApp.{" "}
              <WhatsAppLink
                number={settings.whatsapp.number}
                message={`Hola, quiero la ficha de ${project.name}.`}
                projectSlug={project.slug}
                location="brochure_fallback"
                className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
              >
                Solicitarla
              </WhatsAppLink>
            </p>
          )}
        </Container>
      </Section>

      {/* — H · Contacto — con el proyecto resuelto y bloqueado. */}
      <ContactBlock
        title="Hablemos."
        projectSlug={project.slug}
        whatsappMessage={project.whatsappMessage}
        formLocation="ficha"
      />

      <StickyActionBar
        whatsappNumber={settings.whatsapp.number}
        whatsappMessage={project.whatsappMessage}
        projectSlug={project.slug}
        brochure={project.brochure}
      />
    </>
  );
}
