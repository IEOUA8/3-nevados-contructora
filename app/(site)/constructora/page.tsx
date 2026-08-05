import type { Metadata } from "next";

import { BackingStrip } from "@/components/sections/BackingStrip";
import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCompany, getSettings } from "@/lib/content";
import { companyJsonLd } from "@/lib/seo/jsonld";

/**
 * LA CONSTRUCTORA — reestructurada según ajustes v2 (R-07, R-08, R-09, R-10).
 *
 * Orden: entrada · la alianza (R-07) · de dónde viene el nombre (R-08) · cómo
 * trabajamos, tres focos (R-07) · respaldo, logos de aliados (R-10) · videos.
 * Se eliminó el bloque de entregas previas (R-09): la historia que sostiene a
 * la constructora es la de las dos empresas que la fundan. La página gana aire.
 */

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany();
  return {
    title: company.seo.title,
    description: company.seo.description,
    alternates: { canonical: "/constructora" },
  };
}

export default async function CompanyPage() {
  const [company, settings] = await Promise.all([getCompany(), getSettings()]);

  return (
    <Section tone="cream" className="pt-32 md:pt-40">
      <JsonLd data={companyJsonLd(settings)} />

      {/* 1 · Entrada — */}
      <Container id="conoce-mas" className="scroll-mt-24">
        <Kicker>{company.kicker}</Kicker>
        <h1 className="mt-6 max-w-4xl font-display text-display-l text-text">
          {company.title}
        </h1>
      </Container>

      {/* 2 · Qué es Tres Nevados · la alianza — R-07 */}
      <Container size="read" className="mt-20 md:mt-28">
        <Reveal>
          <Kicker>{company.alliance.kicker}</Kicker>
          <h2 className="mt-5 font-display text-display-m text-text">
            {company.alliance.title}
          </h2>
          <div className="mt-8 flex flex-col gap-5">
            {company.alliance.body.map((line) => (
              <p key={line} className="measure text-body-l text-text">
                {line}
              </p>
            ))}
          </div>
          {company.alliance.pendingNote && (
            <p className="mt-8 border-l-2 border-border pl-4 text-body-s text-text-muted">
              {company.alliance.pendingNote}
            </p>
          )}
        </Reveal>
      </Container>

      {/* 3 · De dónde viene el nombre — R-08. Mucho aire, sin CTA. */}
      <Container size="read" className="mt-24 md:mt-36">
        <Reveal>
          <Kicker>{company.nameOrigin.kicker}</Kicker>
          <div className="mt-8 flex flex-col gap-4">
            {company.nameOrigin.lines.map((line) => (
              <p
                key={line}
                className="measure font-display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.28] text-text"
              >
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* 4 · Cómo trabajamos · tres focos — R-07. Mismo peso, sin iconografía. */}
      <Container className="mt-24 md:mt-36">
        <Kicker>Cómo trabajamos</Kicker>
        <div className="mt-8 grid border-t border-border md:grid-cols-3">
          {company.focuses.map((focus, index) => (
            <Reveal key={focus.title} delay={index * 0.06}>
              <article
                className={
                  "border-b border-border py-8 md:min-h-72 md:px-8 " +
                  (index === 0 ? "md:pl-0" : "") +
                  (index < company.focuses.length - 1 ? " md:border-r" : "") +
                  (index === company.focuses.length - 1 ? " md:pr-0" : "")
                }
              >
                <h3 className="font-display text-display-m text-text">
                  {focus.title}
                </h3>
                <p className="mt-4 measure text-body text-text-muted">
                  {focus.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-kicker font-medium uppercase text-secondary">
              {company.whereWeBuild.title}
            </span>
            <span className="text-body-s text-text-muted">
              {company.whereWeBuild.text}
            </span>
          </p>
          <TextLink href="/manifiesto">Leer el manifiesto</TextLink>
        </div>
      </Container>

      {/* 5 · Respaldo · logos de aliados — R-10 */}
      <BackingStrip allies={settings.allies} />

      {/* 6 · Institucional · videos — */}
      <Container id="videos" className="mt-24 scroll-mt-24 md:mt-32">
        <Reveal>
          <Kicker>Videos institucionales</Kicker>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {company.videos.map((video) => (
              <div
                key={video.label}
                className="relative flex aspect-video items-center justify-center overflow-hidden border border-border bg-bg-alt"
              >
                <div className="flex flex-col items-center gap-3 text-text-muted">
                  <PlayBadge />
                  <span className="text-body-s">{video.label}</span>
                  <span className="text-[0.625rem] uppercase tracking-[0.16em] text-secondary/70">
                    Próximamente
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="mt-16">
          <TextLink href="/proyectos">Explorar los proyectos</TextLink>
        </p>
      </Container>
    </Section>
  );
}

function PlayBadge() {
  return (
    <span className="flex size-12 items-center justify-center rounded-full border border-border">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M4 2.5v11l9-5.5z" />
      </svg>
    </span>
  );
}
