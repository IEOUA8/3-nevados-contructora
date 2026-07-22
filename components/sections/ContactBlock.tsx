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
    <Section tone="inverse" id="contacto">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="order-1">
            <Kicker>{kicker}</Kicker>
            <h2 className="mt-4 font-display text-display-l text-text-inverse">
              {title}
            </h2>

            <div className="mt-8">
              <LeadForm
                projects={projects.map((p) => ({ slug: p.slug, name: p.name }))}
                defaultProjectSlug={projectSlug}
                lockProject={Boolean(projectSlug)}
                formLocation={formLocation}
                inverse
              />
            </div>
          </div>

          <div className="order-2 flex flex-col gap-8 md:pt-20">
            <div>
              <Kicker>WhatsApp</Kicker>
              <p className="mt-3">
                <WhatsAppLink
                  number={settings.whatsapp.number}
                  message={whatsappMessage ?? settings.whatsapp.defaultMessage}
                  projectSlug={projectSlug ?? ""}
                  location={formLocation}
                  className="font-display text-display-m text-text-inverse underline underline-offset-8 decoration-text-inverse/30 hover:decoration-text-inverse"
                >
                  {settings.whatsapp.display}
                </WhatsAppLink>
              </p>
            </div>

            {settings.salesRoom.address && (
              <div>
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

            <div>
              <Kicker>Respaldo</Kicker>
              <ul className="mt-3 flex flex-col gap-1 text-body-s text-text-inverse/80">
                {settings.backing.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
