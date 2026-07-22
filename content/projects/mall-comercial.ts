import type { Project } from "../types";

/**
 * Oferta comercial separada del relato residencial de Reserva.
 * Las cifras contradictorias del brochure permanecen como pendientes hasta
 * que exista una ficha comercial vigente y firmada por la marca.
 */
export const mall: Project = {
  name: "Mall Comercial Tres Nevados",
  slug: "mall-comercial-tres-nevados",
  order: 3,
  isPublished: true,
  category: "Comercial",
  theme: "mall",

  heroImage: {
    src: "/images/mall/hero.jpg",
    alt: "Fachada del Mall Comercial Tres Nevados sobre la vía principal.",
    width: 1600,
    height: 900,
  },
  tagline: "Comercio que encuentra a las personas en su recorrido cotidiano.",

  cardImage: {
    src: "/images/mall/plazoleta.jpg",
    alt: "Plazoleta comercial exterior con locales y vegetación.",
    width: 1600,
    height: 900,
  },
  cardLine:
    "Locales y espacios comerciales integrados al entorno residencial del norte de Armenia.",

  experience: [
    "Una vía visible. Un entorno que crece. Personas que ya pasan por aquí.",
    "El Mall conecta comercio, vivienda y ciudad en un mismo recorrido.",
  ],

  productTypes: [
    {
      name: "Locales",
      range: "Disponibilidad por confirmar",
      description: "Espacios para servicios, comercio y gastronomía.",
    },
    {
      name: "Plazoleta",
      range: "Encuentro y permanencia",
      description: "Una relación abierta entre los locales y el espacio exterior.",
    },
    {
      name: "Accesos",
      range: "Frente sobre la vía",
      description: "Visibilidad, bahías y conexión con el proyecto residencial.",
    },
  ],

  essentials: [
    { label: "Tipo", value: "Mall comercial", status: "confirmed" },
    {
      label: "Ubicación",
      value: "Entrada norte de Armenia",
      status: "confirmed",
    },
    {
      label: "Área comercial",
      value: "Aproximadamente 2.000 m²",
      status: "confirmed",
    },
    {
      label: "Entorno",
      value: "Zona de expansión residencial",
      status: "confirmed",
    },
    { label: "Locales", status: "pending" },
    { label: "Parqueaderos", status: "pending" },
    { label: "Disponibilidad", status: "pending" },
  ],

  typologies: undefined,
  galleryTitle: "El recorrido comercial",
  gallery: [
    {
      src: "/images/mall/hero.jpg",
      alt: "Acceso principal del Mall Comercial Tres Nevados desde la vía.",
      width: 1600,
      height: 900,
      caption: "El acceso",
    },
    {
      src: "/images/mall/fachada.jpg",
      alt: "Vista posterior del edificio y su basamento comercial.",
      width: 1600,
      height: 900,
      caption: "La relación con el edificio",
    },
    {
      src: "/images/mall/plazoleta.jpg",
      alt: "Plazoleta exterior del Mall con locales, mesas y parqueaderos.",
      width: 1600,
      height: 900,
      caption: "La plazoleta",
    },
    {
      src: "/images/mall/terraza.jpg",
      alt: "Zona de mesas junto a los locales del Mall Comercial Tres Nevados.",
      width: 1600,
      height: 900,
      caption: "La permanencia",
    },
  ],

  location: {
    address: "Entrada norte de Armenia, Quindío. Corredor de la Avenida Bolívar.",
    context: [
      { place: "Proyecto Tres Nevados Reserva", distance: "Integrado" },
      { place: "Autopistas del Café", distance: "Acceso directo" },
      { place: "Universidad Antonio Nariño", distance: "En el entorno" },
      { place: "Estación de servicio Oro Negro", distance: "En el entorno" },
    ],
  },

  brochure: undefined,
  disclaimer:
    "Los renders son ilustrativos. Áreas, parqueaderos, disponibilidad y especificaciones se confirman con el equipo comercial.",
  whatsappMessage:
    "Hola, quiero información sobre disponibilidad en el Mall Comercial Tres Nevados.",
  audience: [
    "Marcas y operadores comerciales",
    "Negocios de servicios y gastronomía",
    "Inversionistas en espacios comerciales",
  ],
  seo: {
    title: "Mall Comercial Tres Nevados · Locales en Armenia",
    description:
      "Espacios comerciales en el norte de Armenia, integrados a Tres Nevados Reserva y al corredor de la Avenida Bolívar.",
  },
  crmProjectId: "",
};
