/**
 * Menú del sitio. §6.2
 *
 * Reestructurado según los ajustes de la marca (jul 2026): cuatro entradas, cada
 * una con submenú, más el botón de Contáctanos. El título de cada entrada lleva
 * a su página; el submenú salta a las secciones concretas dentro de ella.
 */
export type NavItem = {
  href?: string;
  label: string;
  /** Encabezado del panel desplegable. */
  menuLabel?: string;
  /** Prefijo de ruta para marcar el ítem como activo. */
  activeMatch?: string;
  children?: { href: string; label: string; category: string }[];
};

const EDEN = "/proyectos/eden-medical";
const RESERVA = "/proyectos/tres-nevados-reserva";
const MALL = "/proyectos/mall-comercial-tres-nevados";

export const NAV_ITEMS: NavItem[] = [
  {
    href: EDEN,
    label: "Edén Médical",
    menuLabel: "Los espacios de Edén Médical",
    activeMatch: EDEN,
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
    href: RESERVA,
    label: "Tres Nevados Reserva",
    menuLabel: "Tres Nevados Reserva",
    activeMatch: RESERVA,
    children: [
      { href: `${RESERVA}#tipologias`, label: "Apartamento 1 hab.", category: "Desde 33 m²" },
      { href: `${RESERVA}#tipologias`, label: "Apartamento 2 hab.", category: "Desde 45 m²" },
      { href: `${RESERVA}#tipologias`, label: "Apartamento 3 hab.", category: "Desde 61 m²" },
      { href: `${RESERVA}#galeria`, label: "Amenities", category: "Zonas comunes" },
    ],
  },
  {
    href: MALL,
    label: "Mall Comercial",
    menuLabel: "Mall Comercial Tres Nevados",
    activeMatch: MALL,
    children: [
      { href: `${MALL}#productos`, label: "Locales", category: "Comercio y servicios" },
      { href: `${MALL}#productos`, label: "Plazoleta", category: "Encuentro" },
      { href: `${MALL}#productos`, label: "Accesos", category: "Frente a la vía" },
    ],
  },
  {
    href: "/constructora",
    label: "Constructora",
    menuLabel: "La constructora",
    activeMatch: "/constructora",
    children: [
      { href: "/constructora#conoce-mas", label: "Conoce más", category: "Nosotros" },
      { href: "/constructora#videos", label: "Videos", category: "Institucional" },
    ],
  },
  { href: "/contacto", label: "Contáctanos" },
];
