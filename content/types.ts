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
  /**
   * «Conoce más» · §10.4 — historia, antigüedad y entregas de la constructora,
   * más los videos institucionales. Mientras la marca no entregue los datos,
   * cada dato lleva `status: "pending"` y se pinta como un hueco visible, no se
   * inventa. Los videos sin `url` se muestran como marcador «Próximamente».
   */
  knowMore: {
    kicker: string;
    title: string;
    intro: string;
    /** Historia / «nosotros». Párrafos en voz de marca, sin cifras inventadas. */
    historia: string[];
    milestones: {
      label: string;
      value?: string;
      status: EssentialStatus;
    }[];
    videos: { label: string; url?: string }[];
  };
  seo: Seo;
};

/**
 * DOCUMENTOS LEGALES — §19.1
 *
 * Cada documento tiene su propia página de detalle y su propio estado. El
 * `status` es el que gobierna: mientras sea `draft`, la página se pinta con el
 * aviso de borrador y con `noindex`. Aprobar un documento es cambiar una
 * palabra en `content/legal.ts`, no tocar una plantilla.
 *
 * Los datos de identificación que la constructora todavía no ha entregado no se
 * inventan: se escriben como `{{clave}}` y se resuelven contra `LEGAL_PENDING`.
 * Una clave que no exista rompe la compilación, y un documento con pendientes
 * no se puede marcar como aprobado (lo verifica `assertLegalIsPublishable`).
 */
export type LegalBlock =
  | { kind: "text"; text: string }
  | { kind: "list"; items: string[] }
  /** Lista numerada: procedimientos con plazos, donde el orden importa. */
  | { kind: "steps"; items: string[] }
  | { kind: "definitions"; items: { term: string; text: string }[] };

export type LegalSection = {
  /** Ancla del índice lateral. Estable: se cita en correos y en respuestas. */
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  slug: string;
  order: number;
  title: string;
  /** Una línea: qué resuelve el documento y para quién. */
  summary: string;
  /** Norma que lo obliga. Se muestra en el índice de /legal. */
  basis: string;
  version: string;
  /** ISO 8601. Fecha de la última edición del texto, no del despliegue. */
  updatedAt: string;
  /** `draft` hasta que el área jurídica de la constructora lo apruebe. */
  status: "draft" | "approved";
  sections: LegalSection[];
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
