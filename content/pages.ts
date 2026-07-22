import type { CompanyContent, HomeContent, ManifestoContent } from "./types";

/**
 * Contenido de las páginas fijas.
 * Fuente: Brief de desarrollo web §2, §3 y §7. Textos de la marca, sin retoque.
 */

export const home: HomeContent = {
  hero: {
    image: {
      src: "/images/home/hero-nevados.jpg",
      alt: "Los nevados del Ruiz y Santa Isabel sobre la cordillera, vistos desde el Eje Cafetero.",
      width: 1160,
      height: 653,
    },
    title: "Espacios para la vida.",
    subtitle: "Armenia, Quindío.",
  },

  idea: {
    text: "Hay lugares que le devuelven tiempo al día. Luz a la mañana. Cercanía a lo que importa. Construimos esas condiciones.",
    linkLabel: "Leer el manifiesto",
  },

  projectsKicker: "Los proyectos",

  backing: [
    { label: "Territorio", value: "Armenia, Quindío" },
    { label: "Proyectos", value: "Vivienda, salud y comercio" },
    { label: "Respaldo", value: "Aval Fiduciaria · Grupo Bancolombia" },
  ],

  contact: {
    kicker: "Contacto",
    title: "Hablemos.",
  },

  seo: {
    title: "Tres Nevados Constructora · Armenia, Quindío",
    description:
      "Constructora en Armenia, Quindío. Tres Nevados Reserva y Edén Medical. Construimos las condiciones para que la vida ocurra.",
  },
};

/** Manifiesto cultural definitivo · Espacios para la vida, página 7. */
export const manifesto: ManifestoContent = {
  kicker: "Manifiesto",
  title: "Espacios para la vida",
  stanzas: [
    [
      "Hay ciudades que prometen mucho y le quitan a uno todo.",
      "Te quitan el silencio.",
      "Te quitan la mañana.",
      "Te quitan el tiempo con los tuyos.",
      "Te quitan la posibilidad de mirar lejos.",
    ],
    [
      "Nosotros no construimos contra esa ciudad.",
      "Construimos lo que esa ciudad no puede dar.",
    ],
    [
      "Construimos espacios donde el día empieza con vista,",
      "donde el aire entra antes que el ruido,",
      "donde la naturaleza es la primera ventana de la mañana.",
    ],
    [
      "No construimos edificios.",
      "Construimos las condiciones para que la vida ocurra.",
      "Espacios para la vida.",
      "Y la vida está pasando ahora.",
    ],
  ],
  image: undefined,
  outroLabel: "Ver los proyectos",
  seo: {
    title: "Manifiesto · Espacios para la vida",
    description:
      "La vida está pasando ahora. Construimos las condiciones para que ocurra.",
  },
};

export const company: CompanyContent = {
  kicker: "La constructora",
  title: "Construimos las condiciones.",
  origin: [
    "La marca nace de tres nevados: el Ruiz, el Tolima, Santa Isabel.",
    "Regulan la temperatura del Eje Cafetero.",
    "Crean las condiciones para que la vida ocurra.",
    "Eso hacemos. Construimos las condiciones.",
  ],
  principles: [
    {
      title: "La vida ocurre ahora",
      text: "Diseñamos para el presente: la mañana, el trabajo y el tiempo compartido.",
    },
    {
      title: "La inmensidad cabe cerca",
      text: "Una vista, una ventana y la cordillera pueden cambiar la escala de un día.",
    },
    {
      title: "La verdad antes que el adjetivo",
      text: "Primero la experiencia. Después, los datos que la sostienen.",
    },
    {
      title: "Personas, no perfiles",
      text: "Hablamos de cómo alguien vive, atiende, regresa o decide quedarse.",
    },
    {
      title: "Comunidad, no clientela",
      text: "Cada proyecto se piensa como parte de una ciudad y de una vida compartida.",
    },
    {
      title: "La naturaleza es socia",
      text: "No funciona como fondo. Orienta la luz, la vista y la manera de habitar.",
    },
  ],
  whereWeBuild: {
    title: "Dónde construimos",
    text: "Armenia, Quindío. Eje Cafetero.",
  },
  backing: {
    title: "Respaldo financiero",
    items: ["Aval Fiduciaria", "Crédito constructor Grupo Bancolombia"],
  },
  // PENDIENTE marca · §10.4 punto 4. Sin cifras infladas ni contadores.
  trajectory: {
    title: "Trayectoria",
    text: "",
  },
  seo: {
    // El layout raíz ya añade «| Tres Nevados». Repetir la marca aquí gasta
    // caracteres de los 60 que Google muestra. §16.2
    title: "La constructora",
    description:
      "Constructora en Armenia, Quindío. Respaldo de Aval Fiduciaria y crédito constructor de Grupo Bancolombia.",
  },
};
