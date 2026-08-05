import "server-only";

import { statSync } from "node:fs";
import { join } from "node:path";

import {
  LEGAL_PENDING,
  legalDocuments,
  type LegalPendingKey,
} from "@/content/legal";
import { company, home, manifesto } from "@/content/pages";
import { eden } from "@/content/projects/eden-medical";
import { mall } from "@/content/projects/mall-comercial";
import { reserva } from "@/content/projects/tres-nevados-reserva";
import { site } from "@/content/site";
import type {
  CompanyContent,
  EssentialField,
  HomeContent,
  LegalDocument,
  ManifestoContent,
  Project,
  SiteSettings,
} from "@/content/types";

/**
 * ÚNICA FRONTERA CON LA FUENTE DE CONTENIDO.
 *
 * El proyecto no lleva CMS (decisión de julio 2026, ver `content/types.ts`).
 * Estas funciones leen de `content/` y las páginas no saben de dónde sale el
 * dato.
 *
 * Se mantienen `async` a propósito, aunque hoy no haga falta: si en el futuro
 * el contenido pasa a venir de una API, cambia este archivo y ninguna página
 * ni ningún componente se tocan. Es la parte barata de mantener abierta.
 */

const PROJECTS: Project[] = [reserva, eden, mall];

export async function getSettings(): Promise<SiteSettings> {
  return site;
}

export async function getHome(): Promise<HomeContent> {
  return home;
}

export async function getManifesto(): Promise<ManifestoContent> {
  return manifesto;
}

export async function getCompany(): Promise<CompanyContent> {
  return company;
}

export async function getProjects(): Promise<Project[]> {
  return PROJECTS.filter((p) => p.isPublished).sort((a, b) => a.order - b.order);
}

export async function getProject(slug: string): Promise<Project | null> {
  const project = PROJECTS.find((p) => p.slug === slug && p.isPublished);
  return project ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return (await getProjects()).map((p) => p.slug);
}

/**
 * R-16 — Límite duro de peso para toda pieza descargable: 10 MB. El tráfico
 * llega con datos móviles y una ficha pesada se abandona antes de abrirse.
 *
 * En el espíritu del contenido tipado (§types): esto no avisa, impide. Corre en
 * el render de la ficha (build estático), así que un PDF pesado rompe el build
 * en vez de publicarse. Si el archivo aún no existe (la marca no lo entregó),
 * no se rompe nada: solo un archivo presente y pesado es un error.
 */
const MAX_BROCHURE_MB = 10;

export function assertBrochureWithinLimit(project: Project): void {
  const brochure = project.brochure;
  if (!brochure) return;

  if (brochure.sizeMb >= MAX_BROCHURE_MB) {
    throw new Error(
      `[R-16] La ficha de «${project.name}» declara ${brochure.sizeMb} MB y alcanza o supera el límite de ${MAX_BROCHURE_MB} MB. Comprime el PDF antes de enlazarlo.`,
    );
  }

  try {
    const bytes = statSync(join(process.cwd(), "public", brochure.url)).size;
    if (bytes >= MAX_BROCHURE_MB * 1024 * 1024) {
      throw new Error(
        `[R-16] La ficha de «${project.name}» pesa ${(bytes / 1024 / 1024).toFixed(1)} MB y supera el límite de ${MAX_BROCHURE_MB} MB.`,
      );
    }
  } catch (error) {
    // Solo el archivo presente y pesado es un error. Un archivo que todavía no
    // existe (marca sin entregar) no rompe el build.
    if (error instanceof Error && error.message.startsWith("[R-16]")) throw error;
  }
}

/**
 * §6.3 — la ruta /proyectos existe en el sistema pero no es navegable hasta
 * que haya tres proyectos. Con dos, una página índice resta un clic de
 * conversión sin aportar nada.
 */
export async function isProjectIndexEnabled(): Promise<boolean> {
  return (await getProjects()).length >= 3;
}

/* ── Documentos legales · §19.1 ─────────────────────────────────────────── */

export async function getLegalDocuments(): Promise<LegalDocument[]> {
  return [...legalDocuments].sort((a, b) => a.order - b.order);
}

export async function getLegalDocument(
  slug: string,
): Promise<LegalDocument | null> {
  return legalDocuments.find((doc) => doc.slug === slug) ?? null;
}

export async function getLegalSlugs(): Promise<string[]> {
  return legalDocuments.map((doc) => doc.slug);
}

/** Un fragmento de texto legal ya resuelto: literal o hueco por llenar. */
export type LegalToken =
  | { kind: "text"; value: string }
  | { kind: "pending"; value: string };

const PLACEHOLDER = /\{\{(\w+)\}\}/g;

/**
 * Convierte `{{razon_social}}` en un hueco visible.
 *
 * Lanza si la clave no existe en `LEGAL_PENDING`. Como esto corre al renderizar
 * páginas estáticas, una clave mal escrita rompe el build en vez de publicar
 * «{{razon_socail}}» en un documento legal.
 */
export function resolveLegalText(text: string): LegalToken[] {
  const tokens: LegalToken[] = [];
  let cursor = 0;

  for (const match of text.matchAll(PLACEHOLDER)) {
    const key = match[1] as LegalPendingKey;
    const label = LEGAL_PENDING[key];

    if (!label) {
      throw new Error(
        `Texto legal con dato inexistente: {{${key}}}. Las claves válidas están en LEGAL_PENDING (content/legal.ts).`,
      );
    }

    if (match.index > cursor) {
      tokens.push({ kind: "text", value: text.slice(cursor, match.index) });
    }
    tokens.push({ kind: "pending", value: label });
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    tokens.push({ kind: "text", value: text.slice(cursor) });
  }

  return tokens;
}

/**
 * Un documento aprobado no puede tener huecos.
 *
 * Es la regla que impide el error caro: que alguien marque `approved` para
 * quitar el aviso de borrador y publique un texto legal que todavía dice
 * «razón social completa» donde debería ir el NIT. Corre en el render de cada
 * documento, así que falla en el build y nunca en producción.
 */
export function assertLegalIsPublishable(doc: LegalDocument): void {
  if (doc.status !== "approved") return;

  const pending = doc.sections.flatMap((section) =>
    section.blocks.flatMap((block) => {
      const texts =
        block.kind === "text"
          ? [block.text]
          : block.kind === "definitions"
            ? block.items.map((item) => item.text)
            : block.items;
      return texts.flatMap((text) =>
        resolveLegalText(text)
          .filter((token) => token.kind === "pending")
          .map((token) => token.value),
      );
    }),
  );

  if (pending.length > 0) {
    throw new Error(
      `El documento «${doc.title}» está marcado como aprobado pero conserva datos sin confirmar: ${[...new Set(pending)].join(", ")}.`,
    );
  }
}

/**
 * §20.2 — separa los campos confirmados de los pendientes.
 *
 * Los pendientes NO se ocultan (el usuario nota la ausencia y desconfía) ni se
 * mezclan con los confirmados (se lee como descuido). Van agrupados al final,
 * con estilo propio, y cuando hay dos o más se convierten en un motivo de
 * contacto.
 */
export function splitEssentials(fields: EssentialField[]): {
  confirmed: EssentialField[];
  pending: EssentialField[];
} {
  const visible = fields.filter((f) => f.status !== "hidden");
  return {
    confirmed: visible.filter((f) => f.status === "confirmed" && f.value),
    pending: visible.filter((f) => f.status === "pending"),
  };
}
