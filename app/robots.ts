import type { MetadataRoute } from "next";

import { getSettings } from "@/lib/content";

/** §16.2 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/gracias", "/api/"],
    },
    sitemap: `${settings.siteUrl}/sitemap.xml`,
  };
}
