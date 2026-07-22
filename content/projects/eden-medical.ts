import type { Project } from "../types";

/**
 * Contenido de Edén Medical.
 * Fuente: Brief de desarrollo web, §6 «Contenido — Edén Medical».
 *
 * Este proyecto tiene cinco campos «Por confirmar» en el bloque C. No se
 * inventa ninguno ni se ocultan: se agrupan al final con tratamiento propio y
 * se convierten en un motivo de contacto. §20.2
 *
 * No tiene tipologías todavía; el bloque D no se renderiza y los Pilares
 * ocupan esa posición. §20.4
 */
export const eden: Project = {
  name: "Edén Medical",
  slug: "eden-medical",
  order: 2,
  isPublished: true,

  // — A · Entrada —
  heroImage: {
    src: "/images/eden/hero.jpg",
    alt: "Fachada de la torre médica Edén Medical, con la cordillera al fondo.",
    width: 2400,
    height: 1350,
  },
  tagline: "El espacio donde un especialista ejerce mejor.",

  cardImage: {
    src: "/images/eden/card.jpg",
    alt: "Acceso peatonal de Edén Medical, con el frente de consultorios.",
    width: 1400,
    height: 788,
  },
  cardLine:
    "Consultorios médicos. Infraestructura diseñada desde cero para salud.",

  // — B · Qué se vive aquí —
  experience: [
    "Un consultorio no es un cuarto con una camilla.",
    "Es el lugar donde alguien confía.",
    "Aquí la infraestructura no estorba. Acompaña.",
  ],

  // — C · Lo esencial —
  essentials: [
    { label: "Tipo", value: "Torre médica especializada", status: "confirmed" },
    {
      label: "Infraestructura",
      value: "Diseñada desde cero para salud",
      status: "confirmed",
    },
    {
      label: "Normativa",
      value: "Cumple accesibilidad, bioseguridad y ventilación vigentes",
      status: "confirmed",
    },
    {
      label: "Habilitación",
      value:
        "Espacios habilitables para cualquier especialidad, escalables y acreditables",
      status: "confirmed",
    },
    // PENDIENTE marca · §26 R1 — fecha límite fin de semana 5.
    { label: "Ubicación", status: "pending" },
    { label: "Tipologías", status: "pending" },
    { label: "Áreas", status: "pending" },
    { label: "Respaldo", status: "pending" },
    { label: "Estado", status: "pending" },
  ],

  // — D · Tipologías — todavía no existen. El bloque no se renderiza.
  typologies: undefined,

  // — Pilares · ocupan la posición del bloque D —
  pillars: [
    {
      number: "01",
      title: "Ecosistema que conecta",
      text: "Toda la salud en un edificio.",
      image: {
        src: "/images/eden/g-2.jpg",
        alt: "Acceso al lobby principal de Edén Medical.",
        width: 1800,
        height: 1012,
      },
    },
    {
      number: "02",
      title: "Infraestructura que eleva",
      text: "Habilitable para cualquier especialidad.",
      image: {
        src: "/images/eden/g-3.jpg",
        alt: "Hall de elevadores de la torre médica.",
        width: 1800,
        height: 1012,
      },
    },
    {
      number: "03",
      title: "Especialidades que potencia",
      text: "Un mercado sin saturar.",
      image: {
        src: "/images/eden/g-1.jpg",
        alt: "Fachada de acceso de Edén Medical desde la calle.",
        width: 1800,
        height: 1012,
      },
    },
  ],

  // — E · Infraestructura —
  galleryTitle: "Infraestructura",
  gallery: [
    {
      src: "/images/eden/g-1.jpg",
      alt: "Fachada de acceso de Edén Medical desde la calle.",
      width: 1800,
      height: 1012,
      caption: "El acceso",
    },
    {
      src: "/images/eden/g-2.jpg",
      alt: "Lobby principal de doble altura, con luz natural.",
      width: 1800,
      height: 1012,
      caption: "El lobby",
    },
    {
      src: "/images/eden/g-3.jpg",
      alt: "Hall de elevadores de la torre médica.",
      width: 1800,
      height: 1012,
      caption: "Hall de elevadores",
    },
    {
      src: "/images/eden/g-4.jpg",
      alt: "Café de la terraza, con barra y zona de mesas.",
      width: 1800,
      height: 1012,
      caption: "El café",
    },
    {
      src: "/images/eden/g-5.jpg",
      alt: "Terraza superior de la torre al final de la tarde.",
      width: 1724,
      height: 2027,
      caption: "La terraza",
    },
    {
      src: "/images/eden/g-6.jpg",
      alt: "Zona exterior de la terraza con vegetación y mobiliario.",
      width: 1800,
      height: 1012,
      caption: "La terraza",
    },
  ],

  // — F · Ubicación — PENDIENTE marca. Sin coordenadas no se pinta mapa. §20.5
  location: {
    lat: undefined,
    lng: undefined,
    address: undefined,
    context: [],
  },

  brochure: undefined,

  whatsappMessage: "Hola, quiero información sobre Edén Medical.",

  audience: [
    "Un médico que quiere atender mejor",
    "Un especialista de otra ciudad evaluando el Eje",
    "Un inversionista del sector salud",
  ],

  seo: {
    // Título completo: la ficha no recibe el sufijo de marca del layout.
    title: "Edén Medical · Consultorios en Armenia | Tres Nevados",
    description:
      "Torre médica especializada en Armenia, Quindío. Infraestructura diseñada desde cero para salud, habilitable para cualquier especialidad.",
  },

  crmProjectId: "",
};
