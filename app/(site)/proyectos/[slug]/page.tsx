import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AttributesBlock } from "@/components/sections/AttributesBlock";
import { BackingStrip } from "@/components/sections/BackingStrip";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { EssentialsBlock } from "@/components/sections/EssentialsBlock";
import { FactsBlock } from "@/components/sections/FactsBlock";
import { Gallery } from "@/components/sections/Gallery";
import { HeroFullBleed } from "@/components/sections/HeroFullBleed";
import { LocationBlock } from "@/components/sections/LocationBlock";
import { PillarsBlock } from "@/components/sections/PillarsBlock";
import { PriceBlock } from "@/components/sections/PriceBlock";
import { ProductTypesBlock } from "@/components/sections/ProductTypesBlock";
import { RelatedOfferingBlock } from "@/components/sections/RelatedOfferingBlock";
import { TypologyGrid } from "@/components/sections/TypologyGrid";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  assertBrochureWithinLimit,
  getProject,
  getProjectSlugs,
  getSettings,
} from "@/lib/content";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo/jsonld";

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
    // `absolute` evita que el layout raíz añada « | Tres Nevados»: el nombre de
    // Reserva ya lleva la marca, y con el sufijo el título se pasaba de los 60
    // caracteres que Google muestra. Cada ficha controla su título entero.
    title: { absolute: project.seo.title },
    description: project.seo.description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url: `/proyectos/${project.slug}`,
      // Sin `images` a propósito: declararlas aquí pisa la tarjeta de
      // `opengraph-image.tsx`, que es la que pide el §16.4. Un render sin
      // texto encima se parece demasiado a un enlace de spam en WhatsApp;
      // la tarjeta con el nombre del proyecto se lee como algo legítimo.
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

  // R-16 — ninguna descarga por encima de 10 MB. Rompe el build si se incumple.
  assertBrochureWithinLimit(project);

  return (
    <>
      <JsonLd data={projectJsonLd(project, settings)} />
      <JsonLd
        data={breadcrumbJsonLd(settings, [
          { name: "Inicio", path: "/" },
          { name: project.name, path: `/proyectos/${project.slug}` },
        ])}
      />

      <div className={`project-theme--${project.theme}`}>
        {/* — A · Entrada — */}
        <HeroFullBleed
          image={project.heroImage}
          title={project.name}
          subtitle={project.tagline}
          subtitleLabel="Idea del proyecto"
          category={project.category}
          brandLogo={project.brandLogo}
        />

        {/* — Introducción al proyecto · R-04 — qué es, dónde, para quién. */}
        {project.intro && (
          <Section
            tone="cream"
            id="introduccion"
            className="section-space-sm scroll-mt-24"
          >
            <Container size="read">
              <Reveal>
                <p className="measure text-[clamp(1.15rem,2.2vw,1.5rem)] leading-relaxed text-text">
                  {project.intro}
                </p>
              </Reveal>
            </Container>
          </Section>
        )}

        {/* — B · Qué se vive aquí — */}
        <Section tone="cream" className="section-space-lg">
          <Container size="read">
            <Reveal>
              <p className="mb-6 text-kicker font-medium uppercase tracking-[0.18em] text-secondary">
                {project.category}
              </p>
              <div className="measure-narrow flex flex-col gap-3 font-display text-[clamp(1.75rem,3vw,2.65rem)] leading-[1.18] text-text">
                {project.experience.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* — C · Lo esencial — no más de dos scrolls desde el hero. §10.3
            R-14: los campos sin dato no se muestran. */}
        <EssentialsBlock fields={project.essentials} />

        {/* — R-05 · Cifras del Book — construido; se pinta solo si published. */}
        {project.facts && <FactsBlock facts={project.facts} />}

        {/* — R-05 · Atributos del Book — */}
        {project.attributes && project.attributes.length > 0 && (
          <AttributesBlock attributes={project.attributes} />
        )}

        {project.productTypes && project.productTypes.length > 0 && (
          <ProductTypesBlock products={project.productTypes} />
        )}

        {/* — D · Tipologías, o Pilares en su lugar cuando no hay. §20.4 */}
        {project.typologies && project.typologies.length > 0 && (
          <TypologyGrid typologies={project.typologies} projectSlug={project.slug} />
        )}
        {project.pillars && project.pillars.length > 0 && (
          <PillarsBlock pillars={project.pillars} />
        )}

        {/* — E · Zonas comunes / Infraestructura — R-05: párrafo de entrada. */}
        {project.gallery && (
          <Gallery
            title={project.galleryTitle}
            images={project.gallery}
            intro={project.galleryIntro}
          />
        )}

        {/* — F · Ubicación — */}
        <LocationBlock location={project.location} />

        {project.relatedOffering && (
          <RelatedOfferingBlock offering={project.relatedOffering} />
        )}

        {/* — Respaldo · aliados estratégicos — R-10. En Reserva y Edén, después
            de ubicación y antes del cierre de contacto. El Mall no la lleva. */}
        {project.theme !== "mall" && (
          <BackingStrip allies={settings.allies} />
        )}

        {(project.brochure || project.disclaimer) && (
          <Section tone="cream" id="descargar-ficha" className="section-space-sm border-t border-border-soft">
            <Container>
              <div className="grid gap-5 md:grid-cols-2 md:items-start md:gap-12">
                <p className="text-body-s text-text-muted">
                  {project.disclaimer}
                </p>
                <div className="md:text-right">
                  {project.brochure ? (
                    <a
                      href={project.brochure.url}
                      download
                      className="inline-flex min-h-12 items-center gap-3 border border-accent bg-accent px-5 text-body-s font-medium text-text-inverse shadow-[0_6px_18px_rgb(114_122_77/0.35)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-accent-hover motion-safe:hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgb(114_122_77/0.48)]"
                    >
                      Descargar ficha · PDF {project.brochure.sizeMb} MB
                      <span aria-hidden="true">↓</span>
                    </a>
                  ) : (
                    <p className="text-body-s text-text-muted">
                      La ficha vigente se solicita por{" "}
                      <WhatsAppLink
                        number={settings.whatsapp.number}
                        message={`Hola, quiero la ficha de ${project.name}.`}
                        projectSlug={project.slug}
                        location="brochure_fallback"
                        className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
                      >
                        WhatsApp
                      </WhatsAppLink>
                    </p>
                  )}
                </div>
              </div>
            </Container>
          </Section>
        )}

        {/* — R-05 · Punto de precio — construido; se pinta solo si published. */}
        {project.priceFrom && <PriceBlock price={project.priceFrom} />}

        {/* — H · Contacto — con el proyecto resuelto y bloqueado. */}
        <ContactBlock
          title="Hablemos."
          projectSlug={project.slug}
          whatsappMessage={project.whatsappMessage}
          formLocation="ficha"
        />
      </div>
    </>
  );
}
