import type { Metadata } from "next";
import Link from "next/link";

import { formatLegalDate } from "@/components/sections/LegalArticle";
import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { getLegalDocuments } from "@/lib/content";

/**
 * Índice legal. §19.1
 *
 * Existe para que los cuatro documentos se puedan revisar y citar como un
 * conjunto: jurídica entra por aquí y ve de un vistazo qué está aprobado y qué
 * sigue en borrador. El pie de página enlaza los documentos de uso corriente;
 * este índice es la vista completa.
 */
export const metadata: Metadata = {
  title: "Información legal",
  description:
    "Políticas y términos que rigen el uso del sitio de Tres Nevados Constructora.",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: true },
};

export default async function LegalIndexPage() {
  const docs = await getLegalDocuments();
  const drafts = docs.filter((doc) => doc.status === "draft").length;

  return (
    <Section tone="cream" className="pt-32 md:pt-40">
      <Container>
        <header className="max-w-read">
          <Kicker>Legal</Kicker>
          <h1 className="mt-6 font-display text-display-l text-text">
            Información legal
          </h1>
          <p className="mt-6 measure text-body-l text-text-muted">
            Las condiciones que rigen el uso de este sitio y el tratamiento de
            los datos que nos compartes. Cada documento tiene su propia página.
          </p>
          {drafts > 0 && (
            <p className="mt-6 measure text-body-s text-text-muted">
              {drafts === docs.length
                ? "Los cuatro documentos están en revisión jurídica y todavía no son vigentes."
                : `${drafts} de estos documentos siguen en revisión jurídica y todavía no son vigentes.`}
            </p>
          )}
        </header>

        <ul className="mt-16 border-t border-border md:mt-20">
          {docs.map((doc, index) => (
            <li key={doc.slug}>
              <Link
                href={`/legal/${doc.slug}`}
                className="group grid gap-4 border-b border-border py-8 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="text-body-s tabular-nums text-secondary md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="md:col-span-5">
                  <span className="block font-display text-display-m text-text transition-colors group-hover:text-accent">
                    {doc.title}
                  </span>
                  <span className="mt-2 block text-body-s text-text-muted">
                    {doc.basis}
                  </span>
                </span>

                <span className="measure text-body-s text-text-muted md:col-span-4">
                  {doc.summary}
                </span>

                <span className="flex flex-wrap items-center gap-x-3 gap-y-2 md:col-span-2 md:flex-col md:items-end">
                  <StatusTag status={doc.status} />
                  <span className="whitespace-nowrap text-body-s text-text-muted/70">
                    {formatLegalDate(doc.updatedAt)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function StatusTag({ status }: { status: "draft" | "approved" }) {
  const isDraft = status === "draft";
  return (
    <span
      className={
        isDraft
          ? "border border-secondary/50 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-secondary"
          : "border border-accent/40 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-accent"
      }
    >
      {isDraft ? "Borrador" : "Vigente"}
    </span>
  );
}
