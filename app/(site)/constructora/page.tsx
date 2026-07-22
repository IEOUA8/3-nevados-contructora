import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
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

      <Container size="read">
        <Kicker>{company.kicker}</Kicker>
        <h1 className="mt-6 font-display text-display-l text-text">
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
                  "grid min-h-48 grid-cols-[2rem_1fr] gap-4 border-b border-border py-7 md:min-h-56 md:px-8 " +
                  (index % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0")
                }
              >
                <span className="text-[0.6875rem] text-secondary">0{index + 1}</span>
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

        <p className="mt-16">
          <Link
            href="/proyectos/tres-nevados-reserva"
            className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          >
            Ver los proyectos
          </Link>
        </p>
      </Container>
    </Section>
  );
}
