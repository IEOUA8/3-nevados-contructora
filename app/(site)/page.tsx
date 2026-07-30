import type { Metadata } from "next";
import Link from "next/link";

import { ContactBlock } from "@/components/sections/ContactBlock";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { ProjectCards } from "@/components/sections/ProjectCards";
import { Container, Section } from "@/components/ui/Layout";
import { Isotipo, IsotipoPattern } from "@/components/ui/Isotipo";
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
    category: project.category,
    line: project.cardLine,
    image: project.cardImage,
  }));

  // Un slide por proyecto para el hero de inicio. §10.1
  const heroSlides = projects.map((project) => ({
    image: project.heroImage,
    name: project.name,
    category: project.category,
    href: `/proyectos/${project.slug}`,
  }));

  return (
    <>
      <JsonLd data={homeJsonLd(settings)} />

      {/* — Bloque 1 · Entrada — slider con un proyecto por slide. */}
      <HeroSlider slides={heroSlides} title={home.hero.title} />

      {/* — Bloque 2 · La idea — */}
      <Section
        tone="cream"
        className="section-space-lg relative overflow-hidden border-b border-border-soft"
      >
        <Isotipo
          className="pointer-events-none absolute -right-16 -top-24 hidden w-[24rem] text-accent/[0.06] lg:block"
        />
        <Container>
          <div className="relative grid gap-12 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-5">
              <Kicker>La dirección</Kicker>
              <h2 className="mt-8 max-w-xl font-display text-[clamp(3.25rem,6vw,6.75rem)] leading-[0.86] tracking-[-0.045em] text-text">
                La vida está pasando ahora.
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:pt-16">
              <p className="max-w-2xl text-[clamp(1.25rem,2.1vw,1.8rem)] leading-[1.35] text-text">
                {home.idea.text}
              </p>
              <Link
                href="/manifiesto"
                className="group mt-12 grid grid-cols-[1fr_auto] items-center border-y border-border py-5 transition-colors hover:border-accent"
              >
                <span>
                  <span className="block text-[0.625rem] font-medium uppercase tracking-[0.2em] text-secondary">
                    Manifiesto cultural
                  </span>
                  <span className="mt-2 block font-display text-2xl text-text md:text-3xl">
                    {home.idea.linkLabel}
                  </span>
                </span>
                <span className="flex size-14 items-center justify-center bg-accent text-text-inverse transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </Link>
              <ul className="mt-8 grid grid-cols-3 gap-3 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-secondary">
                <li>Habitar</li>
                <li>Cuidar</li>
                <li>Encontrarse</li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* — Bloque 3 · Los proyectos — la bifurcación crítica. §3.3 */}
      <Section tone="cream" className="section-space-md">
        <Container>
          <Kicker>{home.projectsKicker}</Kicker>
          <div className="mt-8">
            <ProjectCards projects={cards} />
          </div>
        </Container>
      </Section>

      {/* — Bloque 4 · Respaldo — panel Columbia Blue con patrón del isotipo. §10.1 */}
      <Section
        tone="cool"
        className="section-space-sm relative overflow-hidden border-y border-border-soft"
      >
        <IsotipoPattern
          className="pointer-events-none absolute inset-0 text-bg-inverse/[0.05]"
          patternId="backing-iso"
        />
        <Container className="relative">
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
