import Link from "next/link";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import { assertLegalIsPublishable, resolveLegalText } from "@/lib/content";
import type { LegalBlock, LegalDocument } from "@/content/types";

/**
 * Página de detalle de un documento legal. §19.1
 *
 * Es un componente de servidor a propósito: un texto legal se lee, no se
 * manipula. Cero JavaScript de cliente, índice con anclas nativas y `scroll-mt`
 * para compensar el header fijo. La navegación por anclas es la única
 * interacción, y el navegador ya la resuelve.
 *
 * El aviso de borrador no es decorativo: mientras esté, el documento no cumple
 * el requisito de consentimiento «informado» del artículo 9 de la Ley 1581.
 * Quitarlo es cambiar `status` en `content/legal.ts`, y eso obliga a que no
 * queden datos sin confirmar.
 */
export function LegalArticle({ doc }: { doc: LegalDocument }) {
  assertLegalIsPublishable(doc);

  return (
    <Section tone="cream" className="pt-32 md:pt-40">
      <Container>
        <header className="max-w-read">
          <Kicker>Legal</Kicker>
          <h1 className="mt-6 font-display text-display-l text-text">
            {doc.title}
          </h1>
          <p className="mt-6 measure text-body-l text-text-muted">
            {doc.summary}
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6 text-body-s text-text-muted">
            <Meta label="Actualizado">{formatLegalDate(doc.updatedAt)}</Meta>
            <Meta label="Versión">{doc.version}</Meta>
            <Meta label="Marco">{doc.basis}</Meta>
          </dl>
        </header>

        {doc.status === "draft" && <DraftNotice />}

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-10">
          <nav
            aria-label="Contenido del documento"
            className="md:col-span-4 lg:col-span-3"
          >
            <div className="md:sticky md:top-28">
              <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-secondary">
                Contenido
              </p>
              <ol className="mt-4 flex flex-col border-t border-border-soft">
                {doc.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-11 items-baseline gap-3 border-b border-border-soft py-2 text-body-s text-text-muted transition-colors hover:text-accent"
                    >
                      <span className="text-[0.6875rem] tabular-nums text-text-muted/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="md:col-span-8 lg:col-span-8 lg:col-start-5">
            {doc.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-border pt-8 first:border-0 first:pt-0 [&+section]:mt-14"
              >
                <h2 className="flex items-baseline gap-4 font-display text-display-m text-text">
                  <span className="text-body-s tabular-nums text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-6 flex flex-col gap-5">
                  {section.blocks.map((block, blockIndex) => (
                    <Block key={blockIndex} block={block} />
                  ))}
                </div>
              </section>
            ))}

            <footer className="mt-16 border-t border-border pt-8">
              <p className="text-body-s text-text-muted">
                Los demás documentos legales del sitio están en{" "}
                <Link
                  href="/legal"
                  className="text-accent underline underline-offset-4"
                >
                  el índice legal
                </Link>
                .
              </p>
            </footer>
          </article>
        </div>
      </Container>
    </Section>
  );
}

function Meta({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <dt className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-secondary">
        {label}
      </dt>
      <dd className="mt-1 text-text">{children}</dd>
    </div>
  );
}

/**
 * Aviso de borrador. Cream sobre Cream no bastaría: lleva borde de acento y
 * peso tipográfico porque su función es que nadie lo confunda con texto
 * vigente, ni el visitante ni el equipo.
 */
function DraftNotice() {
  return (
    <aside
      role="note"
      className="mt-12 max-w-read border-l-2 border-accent bg-bg-alt px-6 py-6"
    >
      <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-accent">
        Borrador · no vigente
      </p>
      <p className="mt-3 text-body-s text-text">
        Este texto es una propuesta preparada por el proveedor web a partir de lo
        que el sitio hace de verdad. Está pendiente de revisión y aprobación del
        área jurídica de Tres Nevados Constructora, y no produce efectos hasta
        entonces.
      </p>
      <p className="mt-3 text-body-s text-text-muted">
        Los datos resaltados son los que la constructora aún no ha confirmado. Se
        muestran como huecos en lugar de suponerlos.
      </p>
    </aside>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <p className="measure text-body text-text-muted">
          <LegalText text={block.text} />
        </p>
      );

    case "list":
      return (
        <ul className="measure flex flex-col gap-3">
          {block.items.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-body text-text-muted before:mt-[0.7em] before:h-px before:w-3 before:shrink-0 before:bg-secondary before:content-['']"
            >
              <LegalText text={item} />
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="measure flex flex-col gap-4">
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-4 text-body text-text-muted">
              <span className="mt-[0.15em] text-body-s tabular-nums text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <LegalText text={item} />
              </span>
            </li>
          ))}
        </ol>
      );

    case "definitions":
      return (
        <dl className="measure flex flex-col gap-4 border-t border-border-soft pt-4">
          {block.items.map((item, index) => (
            <div key={index}>
              <dt className="text-body font-medium text-text">{item.term}</dt>
              <dd className="mt-1 text-body text-text-muted">
                <LegalText text={item.text} />
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

/** Pinta el texto y convierte los datos sin confirmar en huecos visibles. */
function LegalText({ text }: { text: string }) {
  return (
    <>
      {resolveLegalText(text).map((token, index) =>
        token.kind === "text" ? (
          <span key={index}>{token.value}</span>
        ) : (
          <mark
            key={index}
            title="Dato pendiente de confirmación por la constructora"
            className="bg-secondary/20 px-1.5 py-0.5 text-text decoration-secondary decoration-dotted underline-offset-4 [text-decoration-line:underline]"
          >
            {token.value}
          </mark>
        ),
      )}
    </>
  );
}

/**
 * `new Date("2026-07-23")` se interpreta en UTC y en Bogotá retrocede al 22.
 * Para una fecha legal eso no es un detalle, así que se formatea a mano.
 */
const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function formatLegalDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} de ${MONTHS[month - 1]} de ${year}`;
}
