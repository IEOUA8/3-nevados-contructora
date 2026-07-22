import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";

/**
 * POLÍTICA DE TRATAMIENTO DE DATOS — §19.1
 *
 * BLOQUEANTE DE LANZAMIENTO. El texto de esta página es un documento legal bajo
 * la Ley 1581 de 2012 y lo redacta el área jurídica de la constructora, no el
 * proveedor web. No se publica un borrador: el formulario pide consentimiento
 * expreso e informado, y «informado» significa que este texto es el real.
 *
 * Además, fuera del alcance del desarrollo pero igual de obligatorio: la
 * constructora debe registrar la base de datos ante la SIC (RNBD).
 */
export const metadata: Metadata = {
  title: "Política de tratamiento de datos",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section tone="cream" className="pt-32 md:pt-40">
      <Container size="read">
        <Kicker>Legal</Kicker>
        <h1 className="mt-6 font-display text-display-l text-text">
          Política de tratamiento de datos
        </h1>
        <p className="mt-12 measure text-body-l text-text-muted">
          El texto de esta política lo entrega el área jurídica de Tres Nevados
          Constructora. Se publica antes del lanzamiento.
        </p>
      </Container>
    </Section>
  );
}
