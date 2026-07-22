import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section } from "@/components/ui/Layout";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { getSettings } from "@/lib/content";

/**
 * GRACIAS — §10.6
 *
 * Página real, no un modal, por dos razones:
 * 1. URL única = conversión limpia en GA4 y Meta sin depender de eventos JS.
 * 2. Espacio para gestionar la expectativa del compromiso de 15 minutos.
 */
export const metadata: Metadata = {
  title: "Recibimos tus datos",
  robots: { index: false, follow: false },
};

export default async function ThanksPage() {
  const settings = await getSettings();

  return (
    <Section tone="cream" className="pt-32 md:pt-40">
      <Container size="read">
        <h1 className="font-display text-display-l text-text">
          Recibimos tus datos.
        </h1>
        <p className="mt-6 measure text-body-l text-text-muted">
          Alguien del equipo te escribe en los próximos 15 minutos.
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {/* Acelera el contacto mientras el lead está caliente. */}
          <WhatsAppLink
            number={settings.whatsapp.number}
            message={settings.whatsapp.defaultMessage}
            projectSlug=""
            location="gracias"
            className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          >
            Escribir por WhatsApp ahora
          </WhatsAppLink>

          {/* Cross-sell suave, no agresivo. */}
          <Link
            href="/proyectos/eden-medical"
            className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          >
            Ver el otro proyecto
          </Link>
        </div>
      </Container>
    </Section>
  );
}
