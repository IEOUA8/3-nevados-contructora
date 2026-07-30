import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCompany, getSettings } from "@/lib/content";
import { companyJsonLd } from "@/lib/seo/jsonld";

/**
 * LA CONSTRUCTORA — §10.4
 *
 * Página corta, una sola columna de lectura.
 * Sin equipo con fotos. Sin timeline animado. Sin contadores de «años de
 * experiencia». Nada de eso corresponde a la voz.
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

      <Container>
        <Kicker>{company.kicker}</Kicker>
        <h1 className="mt-6 max-w-4xl font-display text-display-l text-text">
          {company.title}
        </h1>

        <Reveal>
          <div className="mt-12 flex flex-col gap-4">
            {company.origin.map((line) => (
              <p key={line} className="measure-narrow text-body-l text-text">
                {line}
              </p>
            ))}
          </div>
        </Reveal>

      </Container>

      <Container className="mt-20 md:mt-28">
        <Kicker>Cómo decidimos</Kicker>
        <div className="mt-8 grid border-t border-border md:grid-cols-2">
          {company.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={(index % 2) * 0.06}>
              <article
                className={
                  "min-h-48 border-b border-border py-7 md:min-h-56 md:px-8 " +
                  (index % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0")
                }
              >
                <div>
                  <h2 className="font-display text-display-m text-text">
                    {principle.title}
                  </h2>
                  <p className="mt-4 max-w-md text-body-s text-text-muted">
                    {principle.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container size="read" className="mt-20 md:mt-28">
        <div className="grid gap-12 border-y border-border py-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div>
              <Kicker>{company.whereWeBuild.title}</Kicker>
              <p className="mt-3 text-body-l text-text">
                {company.whereWeBuild.text}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <Kicker>{company.backing.title}</Kicker>
              <ul className="mt-3 flex flex-col gap-1">
                {company.backing.items.map((item) => (
                  <li key={item} className="text-body text-text">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* PENDIENTE marca — sin texto de trayectoria, la sección no se pinta.
            Un titular con el cuerpo vacío se lee como un sitio sin terminar. */}
        {company.trajectory.text && (
          <Reveal>
            <div className="mt-16">
              <Kicker>{company.trajectory.title}</Kicker>
              <p className="mt-3 measure text-body-l text-text">
                {company.trajectory.text}
              </p>
            </div>
          </Reveal>
        )}

      </Container>

      {/* — Conoce más · historia, trayectoria, entregas y videos. §10.4 — */}
      <Container id="conoce-mas" className="mt-24 scroll-mt-24 md:mt-32">
        <Reveal>
          <Kicker>{company.knowMore.kicker}</Kicker>
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
            <div>
              <h2 className="font-display text-display-l text-text">
                {company.knowMore.title}
              </h2>
              <p className="mt-5 measure text-body-l text-text-muted">
                {company.knowMore.intro}
              </p>
              <div className="mt-6 flex flex-col gap-4">
                {company.knowMore.historia.map((parrafo) => (
                  <p key={parrafo} className="measure text-body text-text">
                    {parrafo}
                  </p>
                ))}
              </div>
            </div>
            <dl className="border-t border-border">
              {company.knowMore.milestones.map((milestone) => (
                <div
                  key={milestone.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-4"
                >
                  <dt className="text-body-s text-text">{milestone.label}</dt>
                  <dd
                    className={
                      "shrink-0 text-right text-body-s " +
                      (milestone.status === "confirmed"
                        ? "text-text-muted"
                        : "text-secondary/70")
                    }
                  >
                    {milestone.status === "confirmed"
                      ? milestone.value
                      : "Por confirmar"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal>
          <div id="videos" className="mt-14 scroll-mt-24">
            <Kicker>Videos institucionales</Kicker>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {company.knowMore.videos.map((video) => (
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
