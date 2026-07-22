import type { Metadata } from "next";
import Link from "next/link";

import { ContactBlock } from "@/components/sections/ContactBlock";
import { HeroFullBleed } from "@/components/sections/HeroFullBleed";
import { ProjectCards } from "@/components/sections/ProjectCards";
import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHome, getProjects, getSettings } from "@/lib/content";
import { homeJsonLd } from "@/lib/seo/jsonld";

/**
 * HOME — §10.1
 *
 * Cinco bloques. Se lee de arriba a abajo. El home no explica todo: orienta.
 *
 * Entre el aterrizaje y la bifurcación a los proyectos no puede haber más de
 * dos gestos de scroll deliberados en móvil. Todo lo demás compite con el
 * momento de la verdad. §3.3
 */

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();
  return {
    title: home.seo.title,
    description: home.seo.description,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [home, projects, settings] = await Promise.all([
    getHome(),
    getProjects(),
    getSettings(),
  ]);

  const cards = projects.map((project) => ({
    slug: project.slug,
    name: project.name,
    line: project.cardLine,
    image: project.cardImage,
  }));

  return (
    <>
      <JsonLd data={homeJsonLd(settings)} />

      {/* — Bloque 1 · Entrada — sin CTA. Se hace scroll. */}
      <HeroFullBleed
        image={home.hero.image}
        title={home.hero.title}
        subtitle={home.hero.subtitle}
      />

      {/* — Bloque 2 · La idea — */}
      <Section tone="cream" className="py-24 md:py-48">
        <Container size="read">
          <Reveal>
            <p className="measure-narrow mx-auto text-center text-body-l text-text">
              {home.idea.text}
            </p>
            <p className="mt-8 text-center">
              <Link
                href="/manifiesto"
                className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
              >
                {home.idea.linkLabel}
              </Link>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* — Bloque 3 · Los proyectos — la bifurcación crítica. §3.3 */}
      <Section tone="cream">
        <Container>
          <Kicker>{home.projectsKicker}</Kicker>
          <div className="mt-8">
            <ProjectCards projects={cards} />
          </div>
        </Container>
      </Section>

      {/* — Bloque 4 · Respaldo — sin iconos. §10.1 */}
      <Section tone="cream" className="py-24 md:py-48">
        <Container>
          <ul className="flex flex-col gap-6 md:flex-row md:gap-0">
            {home.backing.map((item, index) => (
              <li
                key={item.label}
                className={
                  "md:flex-1 md:px-8 md:first:pl-0 md:last:pr-0 " +
                  (index > 0
                    ? "border-t border-border pt-6 md:border-l md:border-t-0 md:pt-0"
                    : "")
                }
              >
                <p className="text-kicker font-medium uppercase text-secondary">
                  {item.label}
                </p>
                <p className="mt-2 text-body-s text-text">{item.value}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* — Bloque 5 · Contacto — la inversión cromática cierra el home. */}
      <ContactBlock
        kicker={home.contact.kicker}
        title={home.contact.title}
        formLocation="home"
      />
    </>
  );
}
