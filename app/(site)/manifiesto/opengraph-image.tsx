import { getManifesto } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/seo/og";

export const alt = "Manifiesto · Espacios para la vida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const manifesto = await getManifesto();
  return renderOgImage({ kicker: manifesto.kicker, title: manifesto.title });
}
