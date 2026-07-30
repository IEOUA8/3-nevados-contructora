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

      <Section tone="cream" className="pb-20 pt-32 md:pb-28 md:pt-40">
        <Container>
          <div className="max-w-4xl">
            <Kicker>Contacto</Kicker>
            <h1 className="mt-6 font-display text-display-l text-text">
              Una conversación puede empezar aquí.
            </h1>
            <p className="mt-6 measure text-body-l text-text-muted">
              Escríbenos directamente por WhatsApp o déjanos tus datos y te
              contactamos.
              {!settings.salesRoom.address &&
                " Las visitas a la sala de ventas se coordinan por ese mismo canal."}
            </p>
          </div>

          {/* §26 R5 — circulan dos direcciones distintas en los materiales.
              No se publica ninguna hasta que la marca confirme cuál es. */}
        </Container>
      </Section>

      {/* Sin diferir: aquí el formulario es el motivo de la visita. §17.1 */}
      <ContactBlock
        kicker="Tu proyecto"
        title="Escríbenos."
        formLocation="contacto"
        defer={false}
      />
    </>
  );
}
