/**
 * Menú del sitio. §6.2 — cuatro entradas más el logo. Nada más.
 *
 * «Proyectos» no lleva a una página índice: despliega los dos proyectos
 * directamente. Con dos proyectos, una página intermedia es un paso muerto que
 * resta un clic de conversión. §6.3
 */
export type NavItem = {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/manifiesto", label: "Manifiesto" },
  {
    label: "Proyectos",
    children: [
      { href: "/proyectos/tres-nevados-reserva", label: "Tres Nevados Reserva" },
      { href: "/proyectos/eden-medical", label: "Edén Medical" },
    ],
  },
  { href: "/constructora", label: "La constructora" },
  { href: "/contacto", label: "Contacto" },
];
