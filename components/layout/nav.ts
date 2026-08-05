/**
 * Menú del sitio. §6.2
 *
 * Reestructurado según los ajustes de la marca (ajustes v2, ago 2026):
 *
 * · R-01 — Tres Nevados Reserva abre la navegación; luego Edén Médical,
 *   Constructora y Contáctanos. Mismo orden en escritorio, móvil, pie y sitemap.
 * · R-02 — El Mall Comercial deja de ser primer nivel: entra como último ítem
 *   del desplegable de Reserva. La ruta se conserva.
 * · R-03 — Cada desplegable abre con una introducción al proyecto (`intro`),
 *   tratada como contexto y no como producto, separada del listado por una línea.
 * · R-13 — Grafía definitiva del proyecto médico: «Edén Médical» (con tilde).
 */
export type NavIntroLink = {
  href: string;
  /** Antetítulo de categoría: Residencial · Norte de Armenia / Salud · Armenia. */
  category: string;
  label: string;
  /** Dos o tres líneas de descripción. Contexto, no ficha técnica. */
  blurb: string;
  /** «Conocer el proyecto». */
  cta: string;
};

export type NavItem = {
  href?: string;
  label: string;
  /** Encabezado del panel desplegable. */
  menuLabel?: string;
  /** Prefijo de ruta para marcar el ítem como activo. */
  activeMatch?: string;
  /** R-03 — bloque de introducción al proyecto, primero y distinto. */
  intro?: NavIntroLink;
  children?: { href: string; label: string; category: string }[];
};

const EDEN = "/proyectos/eden-medical";
const RESERVA = "/proyectos/tres-nevados-reserva";
const MALL = "/proyectos/mall-comercial-tres-nevados";

export const NAV_ITEMS: NavItem[] = [
  {
    href: RESERVA,
    label: "Tres Nevados Reserva",
    menuLabel: "Tres Nevados Reserva",
    activeMatch: RESERVA,
    intro: {
      href: RESERVA,
      category: "Residencial · Norte de Armenia",
      label: "El proyecto",
      blurb:
        "Siete torres en la entrada norte de Armenia. Más de seiscientos apartamentos con vista a la cordillera y a los tres nevados.",
      cta: "Conocer el proyecto",
    },
    children: [
      { href: `${RESERVA}#tipologias`, label: "Tipo 1", category: "1 habitación · desde 33 m²" },
      { href: `${RESERVA}#tipologias`, label: "Tipo 2", category: "2 habitaciones · desde 45 m²" },
      { href: `${RESERVA}#tipologias`, label: "Tipo 3", category: "3 habitaciones · desde 61 m²" },
      { href: `${RESERVA}#galeria`, label: "Amenities", category: "Zonas comunes" },
      { href: MALL, label: "Mall Comercial", category: "Zona comercial de Reserva" },
    ],
  },
  {
    href: EDEN,
    label: "Edén Médical",
    menuLabel: "Los espacios de Edén Médical",
    activeMatch: EDEN,
    intro: {
      href: EDEN,
      category: "Salud · Armenia",
      label: "El proyecto",
      blurb:
        "Una torre de salud en Armenia. Consultorios, plantas libres, suites, locales y quirófanos pensados para ejercer al nivel de cada especialidad.",
      cta: "Conocer el proyecto",
    },
    children: [
      { href: `${EDEN}#productos`, label: "Consultorio standard", category: "22–44 m²" },
      { href: `${EDEN}#productos`, label: "Consultorio VIP", category: "28–41 m²" },
      { href: `${EDEN}#productos`, label: "Plantas libres", category: "Área configurable" },
      { href: `${EDEN}#productos`, label: "Suites", category: "Permanencia" },
      { href: `${EDEN}#productos`, label: "Locales comerciales", category: "34–140 m²" },
      { href: `${EDEN}#productos`, label: "Quirófanos", category: "Infraestructura clínica" },
    ],
  },
  {
    href: "/constructora",
    label: "Constructora",
    menuLabel: "La constructora",
    activeMatch: "/constructora",
    children: [
      { href: "/constructora", label: "Quiénes somos", category: "Nosotros" },
      { href: "/manifiesto", label: "Manifiesto", category: "Espacios para la vida" },
      { href: "/constructora#videos", label: "Institucional", category: "Videos" },
    ],
  },
  { href: "/contacto", label: "Contáctanos" },
];
