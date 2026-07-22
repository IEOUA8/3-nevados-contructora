import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";

/** TÉRMINOS DE USO — texto legal a cargo del cliente. Bloqueante de lanzamiento. */
export const metadata: Metadata = {
  title: "Términos de uso",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <Section tone="cream" className="pt-32 md:pt-40">
      <Container size="read">
        <Kicker>Legal</Kicker>
        <h1 className="mt-6 font-display text-display-l text-text">
          Términos de uso
        </h1>
        <p className="mt-12 measure text-body-l text-text-muted">
          El texto de estos términos lo entrega el área jurídica de Tres Nevados
          Constructora. Se publica antes del lanzamiento.
        </p>
      </Container>
    </Section>
  );
}
