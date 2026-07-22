import type { MetadataRoute } from "next";

import { getProjects, getSettings } from "@/lib/content";

/** §16.2 — sitemap generado desde el contenido, no escrito a mano. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  const base = settings.siteUrl;
  const lastModified = new Date();

  const staticRoutes = ["", "/manifiesto", "/constructora", "/contacto"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified,
      priority: route === "" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${base}/proyectos/${project.slug}`,
      lastModified,
      priority: 0.9,
    })),
  ];
}
