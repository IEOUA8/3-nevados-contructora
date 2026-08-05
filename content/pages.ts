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
      "Constructora en Armenia, Quindío. Tres Nevados Reserva y Edén Médical. Construimos las condiciones para que la vida ocurra.",
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
  title: "Espacios para la vida.",

  // R-07 — Qué es Tres Nevados: la alianza que la funda.
  alliance: {
    kicker: "La constructora",
    title: "Dos empresas decidieron construir distinto.",
    body: [
      "Tres Nevados nace de la alianza entre Grupo Arona y Grupo Terra.",
      "Cada una llega con más de treinta y cinco años en construcción, desarrollo inmobiliario e infraestructura. Obra hecha, entregada y habitada.",
      "No se unieron para construir más. Se unieron para construir de otra manera: pensando primero en cómo se vive un lugar y después en cómo se levanta.",
      "De esa decisión salen todos nuestros proyectos.",
    ],
    // PENDIENTE marca · confirmar la grafía legal exacta de Grupo Arona y Grupo
    // Terra, y decidir si se publican sus logos junto al texto.
    pendingNote:
      "Pendiente de la marca: grafía legal de Grupo Arona y Grupo Terra, y decisión sobre sus logos.",
  },

  // R-08 — De dónde viene el nombre. Reemplaza cualquier explicación literal de
  // los tres nevados. El nombre no señala tres montañas: señala lo que baja.
  nameOrigin: {
    kicker: "De dónde viene el nombre",
    lines: [
      "El nombre no señala tres montañas.",
      "Señala lo que baja de ellas.",
      "El agua que nace arriba y llega hasta aquí.",
      "El aire frío que ordena la mañana.",
      "El verde que crece porque la montaña lo permite.",
      "Los nevados regulan la temperatura de esta tierra. Hacen que el café crezca. Hacen que este valle sea habitable.",
      "Nosotros hacemos lo mismo, a otra escala.",
      "Construimos las condiciones.",
      "Lo que pasa después lo hace la gente que vive ahí.",
    ],
  },

  // R-07 (continuación) — Cómo trabajamos: tres focos con el mismo peso visual.
  focuses: [
    {
      title: "Bienestar",
      text: "Un espacio no se mide en metros. Se mide en cómo se vive un martes cualquiera. Diseñamos pensando en la luz que entra, en el ruido que no entra y en el tiempo que la gente recupera.",
    },
    {
      title: "Sostenibilidad",
      // Deliberadamente general: no hay cifra publicable hasta que exista
      // acuerdo firmado y dato verificable de la campaña de compensación. §R-07
      text: "Construir cambia el lugar donde se construye. Nos hacemos cargo de eso con decisiones concretas y con datos que se pueden revisar, no con declaraciones.",
    },
    {
      title: "Urbanismo",
      text: "No hacemos edificios sueltos. Hacemos barrio: vivienda, comercio y servicios de salud en el mismo sector del norte de Armenia, conectados entre sí.",
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

  // Institucional · videos. PENDIENTE marca · sin URL se pintan como marcador.
  videos: [
    { label: "Video institucional" },
    { label: "Recorrido de proyectos" },
  ],

  seo: {
    // El layout raíz ya añade «| Tres Nevados». Repetir la marca aquí gasta
    // caracteres de los 60 que Google muestra. §16.2
    title: "La constructora",
    description:
      "Tres Nevados nace de la alianza entre Grupo Arona y Grupo Terra. Construimos las condiciones para que la vida ocurra en Armenia, Quindío.",
  },
};
