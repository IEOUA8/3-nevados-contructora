import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { getCompany } from "@/lib/content";

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
  const company = await getCompany();

  return (
    <Section tone="cream" className="pt-32 md:pt-40">
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

        <Reveal>
          <div className="mt-16">
            <Kicker>{company.whereWeBuild.title}</Kicker>
            <p className="mt-3 text-body-l text-text">
              {company.whereWeBuild.text}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16">
            <Kicker>{company.backing.title}</Kicker>
            <ul className="mt-3 flex flex-col gap-1">
              {company.backing.items.map((item) => (
                <li key={item} className="text-body-l text-text">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

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
