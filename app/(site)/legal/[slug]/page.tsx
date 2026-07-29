import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalArticle } from "@/components/sections/LegalArticle";
import { getLegalDocument, getLegalSlugs } from "@/lib/content";

/**
 * DOCUMENTOS LEGALES — una página de detalle por documento. §19.1
 *
 * Las rutas `/legal/privacidad` y `/legal/terminos` se conservan porque ya
 * están enlazadas desde el pie de página y desde el texto de consentimiento del
 * formulario. Cambiarlas rompería la trazabilidad de las autorizaciones ya
 * otorgadas, que apuntan a esa URL.
 *
 * `noindex` mientras el documento sea borrador: un texto legal sin aprobar
 * indexado por Google es peor que uno ausente, porque parece vigente.
 */

export async function generateStaticParams() {
  const slugs = await getLegalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getLegalDocument(slug);
  if (!doc) return {};

  return {
    title: doc.seo.title,
    description: doc.seo.description,
    alternates: { canonical: `/legal/${doc.slug}` },
    robots:
      doc.status === "approved"
        ? { index: true, follow: true }
        : { index: false, follow: true },
  };
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getLegalDocument(slug);
  if (!doc) notFound();

  return <LegalArticle doc={doc} />;
}
