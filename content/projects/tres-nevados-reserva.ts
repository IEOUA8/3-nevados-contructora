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
  category: "Residencial",
  theme: "reserva",

  // — A · Entrada —
  heroImage: {
    src: "/images/reserva/hero.jpg",
    alt: "Fachada de Tres Nevados Reserva al atardecer, sobre la vía del norte de Armenia.",
    width: 1672,
    height: 941,
  },
  tagline: "El día empieza con la luz antes que con el ruido.",

  cardImage: {
    src: "/images/reserva/card.jpg",
    alt: "Fachada iluminada de Tres Nevados Reserva vista desde la vía principal.",
    width: 1535,
    height: 1024,
  },
  cardLine:
    "Apartamentos en el norte de Armenia, con la cordillera en el horizonte.",

  // — B · Qué se vive aquí —
  experience: [
    "Hay mañanas que empiezan con una vista.",
    "Hay regresos que se sienten como volver al lugar correcto.",
    "Aquí la inmensidad hace parte de la vida cotidiana.",
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
      value: "15 configuraciones en torres B y C",
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

  // Los códigos corresponden a los planos entregados para las torres B y C.
  // Las áreas particulares se mantienen fuera hasta validar la ficha vigente.
  typologies: [
    ...Array.from({ length: 8 }, (_, index) => ({
      code: `RTB T${index + 1}`,
      name: `Tipo ${index + 1}`,
      tower: "B",
      image: {
        src: `/images/reserva/typologies/rtb-t${index + 1}.jpg`,
        alt: `Plano ambientado RTB T${index + 1} de la Torre B de Tres Nevados Reserva.`,
        width: 1600,
        height: 1200,
      },
    })),
    ...Array.from({ length: 7 }, (_, index) => ({
      code: `RTC T${index + 1}`,
      name: `Tipo ${index + 1}`,
      tower: "C",
      image: {
        src: `/images/reserva/typologies/rtc-t${index + 1}.jpg`,
        alt: `Plano ambientado RTC T${index + 1} de la Torre C de Tres Nevados Reserva.`,
        width: 1600,
        height: 1200,
      },
    })),
  ],

  // — E · Zonas comunes —
  galleryTitle: "Zonas comunes",
  gallery: [
    {
      src: "/images/reserva/g-1.jpg",
      alt: "Piscina exterior entre las torres, con terraza en madera y arborización.",
      width: 1536,
      height: 1024,
      caption: "La piscina",
    },
    {
      src: "/images/reserva/g-2.jpg",
      alt: "Piscina y terraza al final de la tarde, con la cordillera en el horizonte.",
      width: 1536,
      height: 1024,
      caption: "La piscina al atardecer",
    },
    {
      src: "/images/reserva/g-3.jpg",
      alt: "Recorrido junto a la piscina, con jardineras y zonas de descanso.",
      width: 1536,
      height: 1024,
      caption: "La terraza de piscina",
    },
    {
      src: "/images/reserva/g-4.jpg",
      alt: "Alameda interior entre las torres, vista desde lo alto hacia la cordillera.",
      width: 1536,
      height: 1024,
      caption: "La alameda",
    },
    {
      src: "/images/reserva/g-5.jpg",
      alt: "Senderos peatonales y jardineras entre las torres del conjunto.",
      width: 1536,
      height: 1024,
      caption: "Los senderos",
    },
    {
      src: "/images/reserva/g-6.jpg",
      alt: "Pérgola de madera y bancas en la zona social exterior.",
      width: 1536,
      height: 1024,
      caption: "La zona social",
    },
    {
      src: "/images/reserva/g-7.jpg",
      alt: "Zona social con pérgola iluminada al caer la tarde.",
      width: 1536,
      height: 1024,
      caption: "La zona social al atardecer",
    },
    {
      src: "/images/reserva/g-8.jpg",
      alt: "Zona de juegos infantiles y cancha múltiple, con vista a la montaña.",
      width: 1536,
      height: 1024,
      caption: "Juego y deporte",
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

  relatedOffering: {
    slug: "mall-comercial-tres-nevados",
    category: "Comercial",
    name: "Mall Comercial Tres Nevados",
    text: "Una oferta comercial con acceso directo desde la vía y relación con el entorno residencial.",
    image: {
      src: "/images/mall/hero.jpg",
      alt: "Acceso al Bulevar Comercial Tres Nevados, con locales y zona verde.",
      width: 1672,
      height: 941,
    },
  },

  disclaimer:
    "Los planos y renders son ilustrativos. Áreas particulares, disponibilidad y especificaciones se confirman con el equipo comercial.",

  // — G · Ficha —
  // Borrador descargable mientras la marca entrega la ficha comercial definitiva.
  brochure: {
    url: "/fichas/tres-nevados-reserva.pdf",
    sizeMb: 0.1,
  },

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
};
