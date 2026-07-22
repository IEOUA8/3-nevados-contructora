import type { Metadata } from "next";

import { ContactBlock } from "@/components/sections/ContactBlock";
import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSettings } from "@/lib/content";
import { contactJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp o déjanos tus datos. Armenia, Quindío.",
  alternates: { canonical: "/contacto" },
};

/** CONTACTO — §10.5 */
export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <JsonLd data={contactJsonLd(settings)} />

      <Section tone="cream" className="pb-0 pt-32 md:pt-40">
        <Container size="read">
          <Kicker>Contacto</Kicker>
          <h1 className="mt-6 font-display text-display-l text-text">
            Hablemos.
          </h1>

          {/* §26 R5 — circulan dos direcciones de sala de ventas en materiales
              distintos. No se publica ninguna hasta que la marca confirme cuál
              es: una dirección equivocada daña la confianza y el SEO local más
              de lo que ayuda tenerla. */}
          {!settings.salesRoom.address && (
            <p className="mt-8 measure text-body-s text-text-muted">
              La sala de ventas se confirma por WhatsApp.
            </p>
          )}
        </Container>
      </Section>

      <ContactBlock formLocation="contacto" />
    </>
  );
}
