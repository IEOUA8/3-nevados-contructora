/**
 * Contratos de contenido — Documento maestro §9.1.
 *
 * DECISIÓN (julio 2026): el proyecto NO lleva CMS. Xian queda como proveedor de
 * cambios, así que el contenido vive aquí, tipado, y cada ajuste pasa por un
 * commit y un despliegue.
 *
 * La ventaja de que sea TypeScript y no un formulario web: si alguien borra un
 * campo obligatorio o escribe una imagen sin `alt`, la compilación falla antes
 * de llegar a producción. Un CMS avisa; esto impide.
 *
 * Estos tipos siguen el schema `project` del §9.1 al pie de la letra. Si algún
 * día entra un CMS, este archivo es el contrato que tendría que satisfacer.
 *
 * REGLA ESTRUCTURAL (§10.3): no existe ningún campo de precio. Agregarlo por
 * error es imposible porque no hay dónde ponerlo.
 */

export type ImageRef = {
  /** Ruta dentro de /public, procesada con `npm run images`. */
  src: string;
  /** Obligatorio y descriptivo. Validado en el CMS. §18 */
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectTheme = "reserva" | "eden" | "mall";

/** §9.1 bloque C — el estado gobierna cómo se pinta el campo. §20.2 */
export type EssentialStatus = "confirmed" | "pending" | "hidden";

export type EssentialField = {
  label: string;
  value?: string;
  status: EssentialStatus;
};

export type Typology = {
  /** Código comercial del plano: RTB T1, RTC T3, etc. */
  code?: string;
  name: string;
  /** Se omite mientras la ficha comercial no lo haya validado. */
  area?: string;
  tower?: string;
  /** Planta o render, ratio 3:4. */
  image: ImageRef;
};

export type Pillar = {
  number: string;
  title: string;
  text: string;
  image?: ImageRef;
};

export type NearbyPlace = {
  place: string;
  distance: string;
};

export type ProjectLocation = {
  lat?: number;
  lng?: number;
  address?: string;
  context: NearbyPlace[];
  mapImage?: ImageRef;
  mapUrl?: string;
};

export type ProductType = {
  name: string;
  range: string;
  description: string;
};

export type RelatedOffering = {
  slug: string;
  category: string;
  name: string;
  text: string;
  image: ImageRef;
};

export type Brochure = {
  url: string;
  /** Se muestra al usuario antes de descargar. §10.3.G */
  sizeMb: number;
};

export type Seo = {
  title: string;
  description: string;
  ogImage?: ImageRef;
};

export type Project = {
  // — Identidad —
  name: string;
  slug: string;
  order: number;
  isPublished: boolean;
  category: string;
  theme: ProjectTheme;
  /** Logotipo de la submarca cuando existe y está aprobado. */
  brandLogo?: ImageRef;

  // — A · Entrada —
  heroImage: ImageRef;
  /** Una sola frase. Presente. Sin exclamaciones. Máx 80. */
  tagline: string;

  /** Imagen de la tarjeta del home, ratio 4:5. §10.1 bloque 3 */
  cardImage: ImageRef;

  /** Línea descriptiva de la tarjeta del home. */
  cardLine: string;

  // — B · Qué se vive aquí —
  experience: string[];

  /** Portafolio o soluciones disponibles dentro del proyecto. */
  productTypes?: ProductType[];

  // — C · Lo esencial · máx 9 campos —
  essentials: EssentialField[];

  // — D · Tipologías (opcional) —
  typologies?: Typology[];

  // — E · Galería (opcional) —
  galleryTitle: string;
  gallery?: ImageRef[];

  // — Pilares (opcional, Edén Medical) —
  pillars?: Pillar[];

  // — F · Ubicación —
  location: ProjectLocation;

  /** Conecta ofertas cercanas sin mezclarlas en una misma ficha. */
  relatedOffering?: RelatedOffering;

  disclaimer?: string;

  // — G · Ficha descargable (opcional) —
  brochure?: Brochure;

  // — H · Contacto —
  whatsappMessage: string;

  // — Interno —
  audience: string[];
  seo: Seo;
  crmProjectId: string;
};

export type HomeContent = {
  hero: {
    image: ImageRef;
    title: string;
    subtitle: string;
  };
  idea: {
    text: string;
    linkLabel: string;
  };
  projectsKicker: string;
  backing: { label: string; value: string }[];
  contact: {
    kicker: string;
    title: string;
  };
  seo: Seo;
};

export type ManifestoContent = {
  kicker: string;
  title: string;
  stanzas: string[][];
  image?: ImageRef;
  outroLabel: string;
  seo: Seo;
};

export type CompanyContent = {
  kicker: string;
  title: string;
  origin: string[];
  principles: { title: string; text: string }[];
  whereWeBuild: { title: string; text: string };
  backing: { title: string; items: string[] };
  trajectory: { title: string; text: string };
  seo: Seo;
};

export type SiteSettings = {
  siteName: string;
  siteUrl: string;
  whatsapp: {
    /** Formato internacional sin signos: 573123120407 */
    number: string;
    display: string;
    defaultMessage: string;
  };
  social: { instagram: string; facebook: string };
  salesRoom: {
    /** Bloqueado hasta resolver la ambigüedad de las dos direcciones. §26 R5 */
    address?: string;
    hours?: string;
  };
  backing: string[];
};
