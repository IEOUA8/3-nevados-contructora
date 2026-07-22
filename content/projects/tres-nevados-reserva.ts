import type { Project } from "../types";

/**
 * Contenido de Tres Nevados Reserva.
 * Fuente: Brief de desarrollo web, §5 «Contenido — Tres Nevados Reserva».
 * Todos los textos son los entregados por la marca. No se redactó ninguno.
 */
export const reserva: Project = {
  name: "Tres Nevados Reserva",
  slug: "tres-nevados-reserva",
  order: 1,
  isPublished: true,

  // — A · Entrada —
  heroImage: {
    src: "/images/reserva/hero.jpg",
    alt: "Fachada de Tres Nevados Reserva al atardecer, sobre la vía del norte de Armenia.",
    width: 1535,
    height: 1024,
  },
  tagline: "Vive viendo los nevados.",

  cardImage: {
    src: "/images/reserva/card.jpg",
    alt: "Apartamentos de Tres Nevados Reserva vistos desde la alameda interior.",
    width: 1400,
    height: 788,
  },
  cardLine:
    "Apartamentos de 1, 2 y 3 alcobas. Norte de Armenia. Vista a los nevados.",

  // — B · Qué se vive aquí —
  experience: [
    "Hay días que empiezan con ruido.",
    "Y hay días que empiezan con luz.",
    "Aquí la mañana entra por la ventana antes que el resto del día.",
  ],

  // — C · Lo esencial · 9 campos, el máximo. §10.3 —
  essentials: [
    {
      label: "Ubicación",
      value: "Entrada norte de Armenia, Quindío. Zona de expansión urbanística.",
      status: "confirmed",
    },
    {
      label: "Tipologías",
      value: "Apartamentos de 1, 2 y 3 alcobas",
      status: "confirmed",
    },
    {
      label: "Áreas construidas",
      value: "Desde 33 m² · desde 45 m² · desde 61 m²",
      status: "confirmed",
    },
    { label: "Acabados", value: "Totalmente terminados", status: "confirmed" },
    {
      label: "Incluye",
      value:
        "Zonas sociales, zonas comerciales, parqueadero para todos los propietarios",
      status: "confirmed",
    },
    {
      label: "Vista",
      value: "Directa a la cordillera y a los tres nevados",
      status: "confirmed",
    },
    {
      label: "Respaldo",
      value: "Aval Fiduciaria · Crédito constructor Grupo Bancolombia",
      status: "confirmed",
    },
    // PENDIENTE marca · §26 decisión con fecha límite fin de semana 5.
    { label: "Estado", status: "pending" },
    { label: "Entrega", status: "pending" },
  ],

  // — D · Tipologías —
  // TODO verificar con la marca qué planta corresponde a cada tipología antes
  // de publicar. El orden de los archivos de render no lo confirma.
  typologies: [
    {
      name: "1 alcoba",
      area: "Desde 33 m²",
      tower: "B · C",
      image: {
        src: "/images/reserva/t-1.jpg",
        alt: "Planta amoblada del apartamento de una alcoba, vista superior.",
        width: 1200,
        height: 1080,
      },
    },
    {
      name: "2 alcobas",
      area: "Desde 45 m²",
      tower: "B · C",
      image: {
        src: "/images/reserva/t-2.jpg",
        alt: "Planta amoblada del apartamento de dos alcobas, vista superior.",
        width: 1200,
        height: 994,
      },
    },
    {
      name: "3 alcobas",
      area: "Desde 61 m²",
      tower: "B · C",
      image: {
        src: "/images/reserva/t-3.jpg",
        alt: "Planta amoblada del apartamento de tres alcobas, vista superior.",
        width: 1200,
        height: 741,
      },
    },
  ],

  // — E · Zonas comunes —
  galleryTitle: "Zonas comunes",
  gallery: [
    {
      src: "/images/reserva/g-1.jpg",
      alt: "Piscina exterior entre las torres, con terraza y arborización.",
      width: 1536,
      height: 1024,
      caption: "La piscina",
    },
    {
      src: "/images/reserva/g-2.jpg",
      alt: "Zona de juegos y cancha múltiple en el interior del conjunto.",
      width: 1536,
      height: 1024,
      caption: "Zonas de juego",
    },
    {
      src: "/images/reserva/g-3.jpg",
      alt: "Acceso peatonal al conjunto, con jardineras y vegetación.",
      width: 1536,
      height: 1024,
      caption: "El acceso",
    },
    {
      src: "/images/reserva/g-4.jpg",
      alt: "Alameda interior entre torres al final de la tarde.",
      width: 1536,
      height: 1024,
      caption: "La alameda",
    },
    {
      src: "/images/reserva/g-5.jpg",
      alt: "Pérgola de madera y bancas en la zona social exterior.",
      width: 1536,
      height: 1024,
      caption: "La zona social",
    },
    {
      src: "/images/reserva/g-6.jpg",
      alt: "Frente comercial del proyecto sobre la vía, al atardecer.",
      width: 1672,
      height: 941,
      caption: "Las zonas comerciales",
    },
  ],

  // — F · Ubicación —
  location: {
    // PENDIENTE marca · coordenadas exactas del lote.
    lat: undefined,
    lng: undefined,
    address: "Entrada norte de Armenia, Quindío",
    // PENDIENTE marca · §25 H — distancias reales a verificar.
    context: [],
  },

  // — G · Ficha —
  // PENDIENTE marca · sin PDF cargado, el botón no se renderiza. §20.3
  brochure: undefined,

  // — H · Contacto —
  whatsappMessage: "Hola, quiero información sobre Tres Nevados Reserva.",

  audience: [
    "Una pareja que quiere quedarse",
    "Alguien que trabaja solo y necesita luz",
    "Alguien que arrienda",
    "Alguien que se fue del Eje y está pensando en volver",
  ],

  seo: {
    title: "Tres Nevados Reserva · Apartamentos en Armenia",
    description:
      "Apartamentos de 1, 2 y 3 alcobas en el norte de Armenia, Quindío. Desde 33 m². Vista directa a los tres nevados.",
  },

  // PENDIENTE proveedor CRM · §14.2 punto 3.
  crmProjectId: "",
};
