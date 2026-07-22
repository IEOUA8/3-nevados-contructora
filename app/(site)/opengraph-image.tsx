import { getHome } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/seo/og";

export const alt = "Tres Nevados Constructora · Espacios para la vida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const home = await getHome();
  // Sin subtítulo: el del hero es «Armenia, Quindío.» y el pie de la tarjeta ya
  // lo dice. Repetirlo en la misma imagen sobra, y sobrar es justo lo que la
  // marca no hace.
  return renderOgImage({ kicker: "Constructora", title: home.hero.title });
}
