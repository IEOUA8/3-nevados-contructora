import type { SiteSettings } from "./types";

export const site: SiteSettings = {
  siteName: "Tres Nevados Constructora",
  siteUrl: "https://tresnevados.co",

  whatsapp: {
    number: "573123120407",
    display: "312 312 0407",
    defaultMessage: "Hola, quiero información sobre los proyectos.",
  },

  social: {
    // PENDIENTE marca · §23 tarea 0.4 — URLs reales de las cuentas.
    instagram: "https://instagram.com/tresnevadosconstructora",
    facebook: "https://facebook.com/tresnevadosconstructora",
  },

  salesRoom: {
    // BLOQUEADO · §26 R5 — circulan dos direcciones en materiales distintos.
    // No se publica ninguna hasta que la marca confirme cuál es. Una dirección
    // equivocada daña la confianza y el SEO local.
    address: undefined,
    hours: undefined,
  },

  backing: [
    "Aval Fiduciaria",
    "Crédito constructor Grupo Bancolombia",
    "Armenia, Quindío",
  ],
};
