import { LeadForm } from "@/components/forms/LeadForm";
import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { getProjects, getSettings } from "@/lib/content";

/**
 * Bloque de contacto. §10.1 bloque 5 · §10.3.H
 *
 * Fondo Pine Tree: la inversión cromática es lo que marca el cierre de la
 * página. Aquí lo comercial ocupa su plano, sin contaminar el atmosférico.
 *
 * NO se renderiza en /manifiesto. Esa página no convierte porque no debe. §10.2
 */
export async function ContactBlock({
  title = "Hablemos.",
  kicker = "Contacto",
  projectSlug,
  whatsappMessage,
  formLocation,
}: {
  title?: string;
  kicker?: string;
  /** Preseleccionado y bloqueado cuando venimos de una ficha. */
  projectSlug?: string;
  whatsappMessage?: string;
  formLocation: string;
}) {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);

  return (
    <Section tone="inverse" id="contacto" className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute -right-4 top-8 font-display text-[11rem] leading-none text-text-inverse/[0.035] md:right-8 md:top-20 md:text-[22rem]"
      >
        03
      </span>
      <Container>
        <div className="relative grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 md:pr-8">
            <Kicker>{kicker}</Kicker>
            <h2 className="mt-5 max-w-md font-display text-[clamp(3.25rem,6vw,6.5rem)] leading-[0.92] tracking-[-0.04em] text-text-inverse">
              {title}
            </h2>

            <div className="mt-10 border-t border-text-inverse/25 pt-6 md:mt-16">
              <p className="max-w-sm text-body-s text-text-inverse/65">
                Elige el proyecto de interés y deja tus datos para iniciar la conversación.
              </p>
            </div>

            <div className="mt-10 border-y border-text-inverse/25 py-5">
              <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-secondary">
                Canal directo · WhatsApp
              </p>
              <p className="mt-3 flex items-center justify-between gap-4">
                <WhatsAppLink
                  number={settings.whatsapp.number}
                  message={whatsappMessage ?? settings.whatsapp.defaultMessage}
                  projectSlug={projectSlug ?? ""}
                  location={formLocation}
                  className="font-display text-[1.75rem] leading-none text-text-inverse"
                >
                  {settings.whatsapp.display}
                </WhatsAppLink>
                <ArrowUpRight />
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="bg-bg p-6 text-text md:p-10 lg:p-12">
              <div className="mb-9 flex items-end justify-between gap-6 border-b border-border pb-6">
                <div>
                  <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-secondary">
                    Información
                  </p>
                  <p className="mt-2 font-display text-[1.75rem] leading-tight">
                    Cuéntanos qué buscas.
                  </p>
                </div>
                <span className="hidden text-[0.6875rem] text-text-muted sm:block">4 datos</span>
              </div>

              <LeadForm
                projects={projects.map((p) => ({ slug: p.slug, name: p.name }))}
                defaultProjectSlug={projectSlug}
                lockProject={Boolean(projectSlug)}
                formLocation={formLocation}
              />
            </div>
          </div>
        </div>

        {settings.salesRoom.address && (
          <div className="relative mt-12 border-t border-text-inverse/20 pt-8 md:mt-16">
            <Kicker>Sala de ventas</Kicker>
            <p className="mt-3 text-body-s text-text-inverse/80">
              {settings.salesRoom.address}
            </p>
            {settings.salesRoom.hours && (
              <p className="mt-1 text-body-s text-text-inverse/60">
                {settings.salesRoom.hours}
              </p>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}

function ArrowUpRight() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden="true">
      <path d="M6 15 15 6M7.5 6H15v7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
