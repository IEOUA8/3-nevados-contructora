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
    // R-11 — agregar. Sin URL confirmada no se pinta el enlace.
    linkedin: undefined,
    youtube: undefined,
  },

  // R-11 — Canales de contacto. Campos construidos; los valores los entrega la
  // marca en un solo envío. Sin `value` el canal no se pinta (R-14). Un cambio,
  // un lugar: este objeto alimenta pie, página de contacto y fichas.
  contact: {
    phoneFixed: { label: "Teléfono fijo" }, // PENDIENTE marca
    phoneAlt: { label: "Celular alterno" }, // PENDIENTE marca
    emailComercial: { label: "Correo comercial" }, // PENDIENTE marca
    emailAdministrativo: { label: "Correo administrativo" }, // PENDIENTE marca
    emailProveedores: { label: "Proveedores · trabaja con nosotros" }, // PENDIENTE marca
  },

  salesRoom: {
    // BLOQUEADO · §26 R5 — circulan dos direcciones en materiales distintos.
    // No se publica ninguna hasta que la marca confirme cuál es. Una dirección
    // equivocada daña la confianza y el SEO local.
    address: undefined,
    hours: undefined,
  },

  // R-10 — Aliados estratégicos y respaldo. Los logos vectoriales y la
  // autorización de uso los entrega la marca; hasta entonces se muestra el
  // nombre en texto. PRECISIÓN PENDIENTE: definir si participan Aval Fiduciaria
  // y Alianza Fiduciaria, en qué proyecto cada una y con qué nombre exacto.
  allies: {
    kicker: "Aliados estratégicos",
    note: "Los negocios se estructuran a través de fiducia y la construcción cuenta con respaldo de crédito constructor.",
    items: [
      { name: "Aval Fiduciaria" },
      { name: "Alianza Fiduciaria" },
      { name: "Bancolombia · crédito constructor" },
    ],
  },

  backing: [
    "Aval Fiduciaria",
    "Crédito constructor Grupo Bancolombia",
    "Armenia, Quindío",
  ],
};
