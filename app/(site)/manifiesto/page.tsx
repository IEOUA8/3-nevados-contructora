import type { Metadata } from "next";
import Image from "next/image";

import { ManifestoTracker } from "@/components/analytics/ManifestoTracker";
import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { TextLink } from "@/components/ui/TextLink";
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

        <div className="mt-16 border-l border-border pl-6 md:mt-24 md:pl-10">
          {manifesto.stanzas.map((stanza, index) => (
            <div
              key={stanza[0]}
              className="relative mb-16 last:mb-0 md:mb-24"
            >
              <span className="absolute -left-[2.15rem] top-1 text-[0.625rem] font-medium tracking-[0.18em] text-secondary md:-left-[3.15rem]">
                0{index + 1}
              </span>
              <div
                className={
                  "measure-narrow flex flex-col gap-2 text-text " +
                  (index === manifesto.stanzas.length - 1
                    ? "font-display text-[clamp(1.85rem,3.4vw,2.7rem)] leading-[1.2]"
                    : "text-body-l leading-[1.75]")
                }
              >
                {stanza.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
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
        <p className="mt-20 border-t border-border pt-8 md:mt-28">
          <TextLink href="/proyectos">
            {manifesto.outroLabel}
          </TextLink>
        </p>
      </Container>

      <ManifestoTracker />
    </Section>
  );
}
