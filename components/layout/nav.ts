/**
 * Menú del sitio. §6.2 — cuatro entradas más el logo. Nada más.
 *
 * «Proyectos» despliega las tres ofertas directamente para conservar un acceso
 * de un solo gesto desde cualquier página.
 */
export type NavItem = {
  href?: string;
  label: string;
  children?: { href: string; label: string; category: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/manifiesto", label: "Manifiesto" },
  {
    label: "Proyectos",
    children: [
      {
        href: "/proyectos/tres-nevados-reserva",
        label: "Tres Nevados Reserva",
        category: "Residencial",
      },
      { href: "/proyectos/eden-medical", label: "Edén Medical", category: "Salud" },
      {
        href: "/proyectos/mall-comercial-tres-nevados",
        label: "Mall Comercial",
        category: "Comercial",
      },
    ],
  },
  { href: "/constructora", label: "La constructora" },
  { href: "/contacto", label: "Contacto" },
];
