import "server-only";

import { company, home, manifesto } from "@/content/pages";
import { eden } from "@/content/projects/eden-medical";
import { reserva } from "@/content/projects/tres-nevados-reserva";
import { site } from "@/content/site";
import type {
  CompanyContent,
  EssentialField,
  HomeContent,
  ManifestoContent,
  Project,
  SiteSettings,
} from "@/content/types";

/**
 * PUNTO DE INTERCAMBIO CON EL CMS.
 *
 * Este archivo es la única frontera entre las páginas y la fuente de contenido.
 * Hoy lee de `content/`; cuando existan las credenciales de Sanity, cada
 * función pasa a hacer su consulta GROQ y devuelve los mismos tipos. Ningún
 * componente ni ninguna página se toca en esa migración.
 *
 * Todas las funciones son async desde ahora, precisamente para que el cambio
 * no altere ninguna firma.
 */

const PROJECTS: Project[] = [reserva, eden];

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
 * §6.3 — la ruta /proyectos existe en el sistema pero no es navegable hasta
 * que haya tres proyectos. Con dos, una página índice resta un clic de
 * conversión sin aportar nada.
 */
export async function isProjectIndexEnabled(): Promise<boolean> {
  return (await getProjects()).length >= 3;
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
