import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ManifestoTracker } from "@/components/analytics/ManifestoTracker";
import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { getManifesto } from "@/lib/content";

/**
 * MANIFIESTO — §10.2
 *
 * Esta página tiene reglas propias, y son excepciones deliberadas del sistema:
 *
 * · Sin formulario. <ContactBlock> no se renderiza aquí.
 * · Sin botón de venta. Solo un enlace de texto al final.
 * · Sin menú insistiendo. El header se oculta al bajar (ver Header.tsx).
 * · Sin barra de acción persistente.
 * · Fondo Cream puro, sin imágenes de fondo.
 * · Mucho espacio vertical entre párrafos. Sí, es mucho. Es intencional.
 *
 * Esta página no convierte. Se lee y se sale. Esa es la función.
 *
 * MEDICIÓN: solo scroll_depth y time_on_page. `manifesto_read` NO tiene valor
 * de conversión en GA4 y no debe adquirirlo nunca — si se mide como página
 * comercial, alguien la va a «optimizar» y se pierde el activo diferencial.
 */

export async function generateMetadata(): Promise<Metadata> {
  const manifesto = await getManifesto();
  return {
    title: manifesto.seo.title,
    description: manifesto.seo.description,
    alternates: { canonical: "/manifiesto" },
  };
}

export default async function ManifestoPage() {
  const manifesto = await getManifesto();

  return (
    <Section tone="cream" className="pt-32 md:pt-40">
      <Container size="read">
        <Kicker>{manifesto.kicker}</Kicker>
        <h1 className="mt-6 font-display text-display-l text-text">
          {manifesto.title}
        </h1>

        {/* measure 48ch, line-height 1.8, --space-12 entre párrafos. §10.2 */}
        <div className="mt-16 flex flex-col gap-24">
          {manifesto.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="measure-narrow text-body-l leading-[1.8] text-text"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>

      {/* Máximo una imagen, a mitad de lectura, full-bleed, sin texto encima. */}
      {manifesto.image && (
        <div className="relative mt-24 aspect-video w-full">
          <Image
            src={manifesto.image.src}
            alt={manifesto.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <Container size="read">
        <p className="mt-24">
          <Link
            href="/proyectos/tres-nevados-reserva"
            className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          >
            {manifesto.outroLabel}
          </Link>
        </p>
      </Container>

      <ManifestoTracker />
    </Section>
  );
}
