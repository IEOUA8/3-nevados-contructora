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
  category: "Salud",
  theme: "eden",
  brandLogo: {
    src: "/images/eden/brand/logo-wordmark.png",
    alt: "Edén Medical",
    width: 1784,
    height: 700,
  },

  // — A · Entrada —
  heroImage: {
    src: "/images/eden/hero.jpg",
    alt: "Fachada de la torre médica Edén Medical, con la cordillera al fondo.",
    width: 2400,
    height: 1350,
  },
  tagline: "Atender bien empieza por el lugar donde atiendes.",

  cardImage: {
    src: "/images/eden/card.jpg",
    alt: "Acceso peatonal de Edén Medical, con el frente de consultorios.",
    width: 1400,
    height: 788,
  },
  cardLine:
    "Consultorios, suites y espacios especializados para ejercer la medicina.",

  // — B · Qué se vive aquí —
  experience: [
    "La confianza también se construye con luz, silencio y recorridos claros.",
    "Edén reúne las condiciones para que la medicina ocurra.",
    "Armonía en bienestar.",
  ],

  productTypes: [
    {
      name: "Consultorios",
      range: "22–44 m²",
      description: "Espacios médicos para distintas especialidades.",
    },
    {
      name: "Consultorios VIP",
      range: "28–41 m²",
      description: "Ambientes de atención con una experiencia más privada.",
    },
    {
      name: "Suites médicas",
      range: "Rango por confirmar",
      description: "Espacios para atención y permanencia médica especializada.",
    },
    {
      name: "Quirófanos",
      range: "Infraestructura especializada",
      description: "Espacios planteados para procedimientos y atención clínica.",
    },
    {
      name: "Locales",
      range: "34–140 m²",
      description: "Servicios complementarios dentro del ecosistema médico.",
    },
  ],

  // — C · Lo esencial —
  essentials: [
    { label: "Tipo", value: "Ecosistema médico", status: "confirmed" },
    {
      label: "Área",
      value: "Más de 18.000 m²",
      status: "confirmed",
    },
    {
      label: "Niveles médicos",
      value: "10 niveles",
      status: "confirmed",
    },
    {
      label: "Sótanos",
      value: "5 niveles",
      status: "confirmed",
    },
    {
      label: "Ubicación",
      value: "Sector médico de Armenia",
      status: "confirmed",
    },
    {
      label: "Productos",
      value: "Consultorios, suites, quirófanos y locales",
      status: "confirmed",
    },
    { label: "Respaldo", status: "pending" },
    { label: "Estado", status: "pending" },
  ],

  // — D · Tipologías — todavía no existen. El bloque no se renderiza.
  typologies: undefined,

  // — Pilares · ocupan la posición del bloque D —
  pillars: [
    {
      number: "01",
      title: "Confort",
      text: "Espacios pensados para recibir, esperar y atender con calma.",
      image: {
        src: "/images/eden/g-2.jpg",
        alt: "Acceso al lobby principal de Edén Medical.",
        width: 1800,
        height: 1012,
      },
    },
    {
      number: "02",
      title: "Conexión",
      text: "Servicios médicos y complementarios reunidos en un mismo lugar.",
      image: {
        src: "/images/eden/g-3.jpg",
        alt: "Hall de elevadores de la torre médica.",
        width: 1800,
        height: 1012,
      },
    },
    {
      number: "03",
      title: "Celebración",
      text: "Una visión del bienestar que también reconoce la vida cotidiana.",
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

  location: {
    lat: undefined,
    lng: undefined,
    address: "Calle 3 Norte #12-87, Armenia, Quindío",
    mapImage: {
      src: "/images/eden/location/localizacion.jpg",
      alt: "Plano de localización de Edén Medical en el sector médico de Armenia.",
      width: 2019,
      height: 1615,
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Calle+3+Norte+12-87+Armenia+Quindio",
    context: [
      { place: "Parque de la Vida", distance: "Cercano" },
      { place: "Parque de los Fundadores", distance: "Cercano" },
      { place: "Oncólogos de Occidente", distance: "En el sector" },
      { place: "Clínica Central", distance: "En el sector" },
      { place: "Clínica del Café", distance: "En el sector" },
    ],
  },

  disclaimer:
    "Las imágenes son representaciones ilustrativas y pueden presentar modificaciones durante el desarrollo del proyecto.",

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
