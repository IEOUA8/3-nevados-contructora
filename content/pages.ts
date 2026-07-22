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
    text: "La vida está pasando ahora. Muchas personas viven como si pasara después. Construimos las condiciones para que ocurra.",
    linkLabel: "Leer el manifiesto",
  },

  projectsKicker: "Los proyectos",

  backing: [
    { label: "Respaldo", value: "Aval Fiduciaria" },
    { label: "Crédito constructor", value: "Grupo Bancolombia" },
    { label: "Dónde", value: "Armenia, Quindío" },
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

/**
 * MANIFIESTO — §10.2
 *
 * PENDIENTE MARCA · bloqueante de la Fase 1.6.
 * El brief es explícito: «El manifiesto completo lo entrega la marca. El
 * proveedor no redacta ni resume.» Los párrafos de abajo son los únicos textos
 * de manifiesto que existen hoy, tomados literalmente del brief (§1 «Quiénes
 * somos» y §2 bloque 2). Sirven para validar el ritmo, la tipografía y el
 * espaciado de la página; NO son el manifiesto final.
 *
 * Al recibir el texto definitivo: reemplazar `paragraphs` completo y verificar
 * que no exceda 600 palabras (§10.2). Si excede, se reporta a la marca — no se
 * recorta unilateralmente.
 */
export const manifesto: ManifestoContent = {
  kicker: "Manifiesto",
  title: "Espacios para la vida",
  paragraphs: [
    "La vida está pasando ahora.",
    "Muchas personas viven como si pasara después.",
    "Construimos las condiciones para que ocurra.",
    "La marca nace de tres nevados: el Ruiz, el Tolima, Santa Isabel. Regulan la temperatura del Eje Cafetero. Crean las condiciones para que la vida ocurra.",
    "Eso hacemos. Construimos las condiciones.",
    "No vendemos apartamentos. No vendemos consultorios. Vendemos el lugar donde la mañana entra por la ventana. Donde el médico atiende mejor. Donde alguien decide quedarse.",
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
