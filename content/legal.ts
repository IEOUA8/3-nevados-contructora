import type { LegalDocument } from "./types";

/**
 * TEXTOS LEGALES — §19.1
 *
 * QUÉ ES ESTO Y QUÉ NO ES. Estos cuatro documentos son un borrador redactado
 * por el proveedor web a partir de lo que el sitio hace de verdad: los campos
 * que pide el formulario, los datos técnicos que registra el endpoint y los
 * terceros que hoy intervienen. Sirven para que el área jurídica de la
 * constructora revise sobre algo concreto en vez de sobre una hoja en blanco.
 *
 * NO son asesoría jurídica y NO se publican como definitivos. Mientras
 * `status` sea `draft`, cada página se sirve con `noindex` y con el aviso de
 * borrador visible. El día que jurídica apruebe, se cambia `status` a
 * `approved`, se sube `version` y se actualiza `updatedAt`.
 *
 * DATOS PENDIENTES. La razón social, el NIT, el domicilio de notificaciones y
 * el correo de protección de datos no están confirmados. No se inventan: se
 * escriben como `{{clave}}` contra `LEGAL_PENDING` y se pintan como un hueco
 * visible. Un documento con huecos no puede pasar a `approved` — lo impide
 * `assertLegalIsPublishable` en `lib/content.ts`.
 */

/**
 * Huecos de identificación. La descripción es lo que se muestra en la página,
 * así que se escribe para que la lea el cliente, no el desarrollador.
 */
export const LEGAL_PENDING = {
  razon_social: "razón social completa",
  nit: "NIT",
  domicilio: "dirección de notificaciones",
  email_datos: "correo de protección de datos",
  telefono: "teléfono de atención",
  rep_legal: "representante legal",
} as const;

export type LegalPendingKey = keyof typeof LEGAL_PENDING;

const RESPONSABLE =
  "{{razon_social}}, identificada con {{nit}}, con domicilio en {{domicilio}}, Armenia, Quindío, Colombia";

const CANAL =
  "Correo electrónico {{email_datos}} · Teléfono {{telefono}} · WhatsApp 312 312 0407";

/* ─────────────────────────────────────────────────────────────────────────
 * 01 · Política de tratamiento de la información
 * Ley 1581 de 2012 · Decreto 1074 de 2015, Libro 2, Parte 2, Título 2.
 * ────────────────────────────────────────────────────────────────────── */

const privacidad: LegalDocument = {
  slug: "privacidad",
  order: 1,
  title: "Política de tratamiento de datos personales",
  summary:
    "Qué datos recogemos cuando escribes por la web, para qué los usamos, cuánto los guardamos y cómo pides que los corrijamos o los borremos.",
  basis: "Ley 1581 de 2012 · Decreto 1074 de 2015",
  version: "borrador-2026-07-v1",
  updatedAt: "2026-07-23",
  status: "draft",
  sections: [
    {
      id: "responsable",
      title: "Responsable del tratamiento",
      blocks: [
        {
          kind: "text",
          text: `El responsable del tratamiento de tus datos personales es ${RESPONSABLE}.`,
        },
        {
          kind: "text",
          text: `Puedes contactarnos por cualquiera de estos canales: ${CANAL}.`,
        },
        {
          kind: "text",
          text: "El área encargada de atender consultas y reclamos sobre datos personales es la Dirección Comercial, salvo que la constructora designe por escrito otra dependencia.",
        },
      ],
    },
    {
      id: "alcance",
      title: "Alcance",
      blocks: [
        {
          kind: "text",
          text: "Esta política se aplica a los datos personales que recogemos a través de este sitio web y de los canales de contacto publicados en él. Los datos que recogemos en la sala de ventas, en ferias o por medios distintos se rigen por la política general de la constructora.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Titular",
              text: "La persona natural a quien se refieren los datos. En este sitio, quien llena el formulario.",
            },
            {
              term: "Dato personal",
              text: "Cualquier información vinculada o que pueda asociarse a una persona natural determinada o determinable.",
            },
            {
              term: "Dato sensible",
              text: "El que afecta la intimidad o cuyo uso indebido puede generar discriminación: salud, origen étnico, orientación política, datos biométricos. Este sitio no pide ninguno.",
            },
            {
              term: "Tratamiento",
              text: "Cualquier operación sobre los datos: recolección, almacenamiento, uso, circulación o supresión.",
            },
            {
              term: "Autorización",
              text: "El consentimiento previo, expreso e informado del titular para tratar sus datos.",
            },
            {
              term: "Encargado",
              text: "Quien trata los datos por cuenta del responsable. Nuestros proveedores tecnológicos, por ejemplo.",
            },
          ],
        },
      ],
    },
    {
      id: "datos",
      title: "Qué datos recogemos",
      blocks: [
        {
          kind: "text",
          text: "Solo los que tú escribes en el formulario y los que el navegador envía por el simple hecho de cargar una página. La lista completa es esta:",
        },
        {
          kind: "list",
          items: [
            "Nombre.",
            "Número de celular.",
            "Correo electrónico.",
            "Proyecto sobre el que pides información.",
            "Fecha y hora de la solicitud.",
            "Página desde la que enviaste el formulario y, si llegaste desde una campaña, los parámetros de esa campaña (utm_source, utm_medium, utm_campaign, utm_content).",
            "El texto exacto de la autorización que aceptaste y su versión, como prueba del consentimiento.",
            "Una versión cifrada e irreversible de tu dirección IP, que usamos únicamente para limitar envíos automatizados.",
          ],
        },
        {
          kind: "text",
          text: "Tu dirección IP no se almacena en claro en ningún momento. Se guarda como un resumen criptográfico del que no se puede recuperar la dirección original.",
        },
      ],
    },
    {
      id: "no-recogemos",
      title: "Qué no recogemos",
      blocks: [
        {
          kind: "list",
          items: [
            "Datos sensibles. El formulario no los pide y pedimos que no los escribas en ningún campo libre.",
            "Datos financieros, bancarios o de tarjetas. Este sitio no procesa pagos.",
            "Datos de menores de edad. El sitio se dirige a mayores de 18 años.",
            "Documentos de identidad. Si un proceso comercial posterior los requiere, se piden por fuera de la web y con una autorización aparte.",
          ],
        },
      ],
    },
    {
      id: "finalidades",
      title: "Para qué usamos tus datos",
      blocks: [
        {
          kind: "text",
          text: "Usamos tus datos únicamente para estas finalidades:",
        },
        {
          kind: "list",
          items: [
            "Responder tu solicitud de información y orientarte sobre el proyecto que te interesa.",
            "Contactarte por teléfono, WhatsApp o correo para continuar esa conversación.",
            "Enviarte la información comercial del proyecto sobre el que preguntaste: disponibilidad, tipologías, avances de obra y condiciones vigentes.",
            "Dejar constancia de tu autorización y atender requerimientos de autoridades competentes.",
            "Medir de forma agregada qué proyectos y qué canales generan interés, sin identificarte individualmente en esos informes.",
          ],
        },
        {
          kind: "text",
          text: "No usamos tus datos para enviarte publicidad de terceros, no los vendemos y no los cedemos a otras empresas con fines comerciales.",
        },
      ],
    },
    {
      id: "autorizacion",
      title: "Tu autorización",
      blocks: [
        {
          kind: "text",
          text: "La autorización se obtiene con una casilla que tú marcas antes de enviar el formulario. No viene marcada por defecto y sin ella el formulario no se envía.",
        },
        {
          kind: "text",
          text: "Guardamos el texto exacto que aceptaste y la versión de ese texto. Si la política cambia, la constancia de lo que autorizaste sigue siendo la que estaba vigente ese día.",
        },
        {
          kind: "text",
          text: "Puedes retirar tu autorización en cualquier momento por los canales de esta política, salvo que exista un deber legal o contractual que nos obligue a conservar el dato.",
        },
      ],
    },
    {
      id: "derechos",
      title: "Tus derechos",
      blocks: [
        {
          kind: "text",
          text: "Como titular de los datos, el artículo 8 de la Ley 1581 de 2012 te reconoce estos derechos:",
        },
        {
          kind: "list",
          items: [
            "Conocer, actualizar y rectificar tus datos.",
            "Solicitar prueba de la autorización que otorgaste.",
            "Ser informado sobre el uso que le hemos dado a tus datos.",
            "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.",
            "Revocar la autorización o solicitar la supresión de los datos cuando no exista un deber legal o contractual que lo impida.",
            "Acceder de forma gratuita a tus datos personales.",
          ],
        },
        {
          kind: "text",
          text: "Estos derechos los ejerce el titular, sus causahabientes, su representante o apoderado, o quien actúe por estipulación a favor de otro. Para atenderte necesitamos verificar tu identidad.",
        },
      ],
    },
    {
      id: "consultas",
      title: "Cómo hacer una consulta",
      blocks: [
        {
          kind: "text",
          text: "Una consulta es una solicitud de información: qué datos tenemos tuyos y qué hemos hecho con ellos.",
        },
        {
          kind: "steps",
          items: [
            "Escríbenos a {{email_datos}} con el asunto «Consulta de datos personales», tu nombre completo y un documento que permita verificar tu identidad.",
            "Te respondemos en un plazo máximo de diez (10) días hábiles contados desde el día siguiente al recibo de la solicitud.",
            "Si no podemos atenderla en ese plazo, te informamos los motivos y la fecha en que la atenderemos, que no superará los cinco (5) días hábiles siguientes al vencimiento del primer plazo.",
          ],
        },
      ],
    },
    {
      id: "reclamos",
      title: "Cómo presentar un reclamo",
      blocks: [
        {
          kind: "text",
          text: "Un reclamo es una solicitud de corrección, actualización o supresión, o la denuncia de un presunto incumplimiento de la ley.",
        },
        {
          kind: "steps",
          items: [
            "Envía tu reclamo a {{email_datos}} con tu identificación, la descripción de los hechos, la dirección de contacto y los documentos que quieras aportar.",
            "Si el reclamo está incompleto, te lo informamos dentro de los cinco (5) días siguientes para que lo completes. Si pasan dos (2) meses sin que respondas, entendemos que desististe.",
            "Si no somos competentes para resolverlo, trasladamos el reclamo a quien corresponda en un máximo de dos (2) días hábiles y te informamos.",
            "Una vez recibido el reclamo completo, incluimos en la base de datos la leyenda «reclamo en trámite» y el motivo, en un plazo no mayor a dos (2) días hábiles, hasta que el reclamo se decida.",
            "Resolvemos el reclamo en un máximo de quince (15) días hábiles desde el día siguiente a su recibo. Si no es posible, te informamos los motivos y la nueva fecha, que no superará los ocho (8) días hábiles siguientes al vencimiento del primer plazo.",
          ],
        },
        {
          kind: "text",
          text: "El reclamo ante nosotros es requisito previo para presentar una queja ante la Superintendencia de Industria y Comercio.",
        },
      ],
    },
    {
      id: "terceros",
      title: "Quién más interviene",
      blocks: [
        {
          kind: "text",
          text: "Para operar el sitio y atender tu solicitud nos apoyamos en proveedores que actúan como encargados del tratamiento y solo pueden usar los datos siguiendo nuestras instrucciones:",
        },
        {
          kind: "list",
          items: [
            "El proveedor de alojamiento y entrega del sitio web.",
            "El proveedor de correo electrónico con el que te respondemos y con el que el equipo comercial recibe tu solicitud.",
            "El equipo comercial de la constructora y, cuando corresponda, la sala de ventas del proyecto por el que preguntaste.",
          ],
        },
        {
          kind: "text",
          text: "Algunos de estos proveedores almacenan información en servidores fuera de Colombia. Al aceptar esta política autorizas esa transferencia internacional, que se realiza con proveedores que ofrecen estándares de seguridad equivalentes a los exigidos por la ley colombiana.",
        },
      ],
    },
    {
      id: "conservacion",
      title: "Cuánto tiempo conservamos los datos",
      blocks: [
        {
          kind: "text",
          text: "Conservamos tus datos mientras dure la relación comercial y, terminada esta, durante el término necesario para cumplir obligaciones legales, contables y de defensa jurídica.",
        },
        {
          kind: "text",
          text: "Si tu solicitud no deriva en una relación comercial, los datos se conservan por el término que la constructora defina en su política de retención y se suprimen al vencerse, salvo que pidas antes su supresión.",
        },
      ],
    },
    {
      id: "seguridad",
      title: "Seguridad",
      blocks: [
        {
          kind: "text",
          text: "Aplicamos medidas técnicas y administrativas razonables para proteger tus datos: el sitio se sirve cifrado de extremo a extremo, el acceso a la información de contacto está restringido al personal que la necesita y la dirección IP nunca se guarda en claro.",
        },
        {
          kind: "text",
          text: "Ninguna medida elimina por completo el riesgo. Si ocurre un incidente que afecte tus datos, lo reportamos a la Superintendencia de Industria y Comercio en los términos que exige la ley.",
        },
      ],
    },
    {
      id: "menores",
      title: "Menores de edad",
      blocks: [
        {
          kind: "text",
          text: "Este sitio no está dirigido a menores de edad y no recogemos sus datos de forma consciente. Si detectamos que recibimos datos de un menor sin autorización de sus representantes legales, los suprimimos.",
        },
      ],
    },
    {
      id: "rnbd",
      title: "Registro Nacional de Bases de Datos",
      blocks: [
        {
          kind: "text",
          text: "Las bases de datos de la constructora se registran ante el Registro Nacional de Bases de Datos de la Superintendencia de Industria y Comercio, conforme al Decreto 1074 de 2015 y a las circulares vigentes.",
        },
      ],
    },
    {
      id: "vigencia",
      title: "Vigencia y cambios",
      blocks: [
        {
          kind: "text",
          text: "Esta política rige desde su publicación. Si la modificamos, publicamos la nueva versión en esta misma página con su fecha, y la versión que aceptaste queda registrada junto a tu solicitud.",
        },
        {
          kind: "text",
          text: "Las bases de datos se conservan durante la vigencia de las finalidades descritas y mientras subsistan las obligaciones legales derivadas.",
        },
      ],
    },
  ],
  seo: {
    title: "Política de tratamiento de datos personales",
    description:
      "Qué datos personales recogemos en este sitio, para qué los usamos y cómo ejercer tus derechos como titular.",
  },
};

/* ─────────────────────────────────────────────────────────────────────────
 * 02 · Aviso de privacidad
 * Decreto 1074 de 2015, art. 2.2.2.25.3.2 — versión corta y comunicable.
 * ────────────────────────────────────────────────────────────────────── */

const avisoPrivacidad: LegalDocument = {
  slug: "aviso-privacidad",
  order: 2,
  title: "Aviso de privacidad",
  summary:
    "La versión corta de la política: quién responde por tus datos, para qué los usamos y dónde ejerces tus derechos.",
  basis: "Decreto 1074 de 2015, art. 2.2.2.25.3.2",
  version: "borrador-2026-07-v1",
  updatedAt: "2026-07-23",
  status: "draft",
  sections: [
    {
      id: "responsable",
      title: "Quién es el responsable",
      blocks: [
        {
          kind: "text",
          text: `${RESPONSABLE}. Canales de atención: ${CANAL}.`,
        },
      ],
    },
    {
      id: "tratamiento",
      title: "Qué hacemos con tus datos",
      blocks: [
        {
          kind: "text",
          text: "Tratamos el nombre, el celular, el correo y el proyecto de interés que escribes en el formulario, junto con los datos técnicos de la solicitud, para responderte, orientarte sobre el proyecto y enviarte su información comercial.",
        },
        {
          kind: "text",
          text: "No vendemos tus datos ni los usamos para publicidad de terceros.",
        },
      ],
    },
    {
      id: "derechos",
      title: "Tus derechos",
      blocks: [
        {
          kind: "text",
          text: "Puedes conocer, actualizar, rectificar y suprimir tus datos, solicitar prueba de la autorización, revocarla y presentar quejas ante la Superintendencia de Industria y Comercio.",
        },
        {
          kind: "text",
          text: "Para ejercerlos escribe a {{email_datos}} con el asunto «Datos personales». La política completa detalla los plazos y el procedimiento.",
        },
      ],
    },
    {
      id: "politica",
      title: "Dónde consultar la política completa",
      blocks: [
        {
          kind: "text",
          text: "El texto íntegro está publicado de forma permanente en la página «Política de tratamiento de datos personales» de este sitio, y también te lo enviamos por correo si lo pides.",
        },
      ],
    },
  ],
  seo: {
    title: "Aviso de privacidad",
    description:
      "Versión corta de la política de tratamiento de datos de Tres Nevados Constructora.",
  },
};

/* ─────────────────────────────────────────────────────────────────────────
 * 03 · Términos de uso
 * ────────────────────────────────────────────────────────────────────── */

const terminos: LegalDocument = {
  slug: "terminos",
  order: 3,
  title: "Términos de uso",
  summary:
    "Las condiciones para usar este sitio y el alcance de la información que publicamos en él.",
  basis: "Ley 1480 de 2011 · Código de Comercio",
  version: "borrador-2026-07-v1",
  updatedAt: "2026-07-23",
  status: "draft",
  sections: [
    {
      id: "objeto",
      title: "Objeto y aceptación",
      blocks: [
        {
          kind: "text",
          text: `Este sitio es propiedad de ${RESPONSABLE} y se pone a disposición del público con fines informativos sobre sus proyectos inmobiliarios.`,
        },
        {
          kind: "text",
          text: "Al navegar por el sitio aceptas estos términos. Si no estás de acuerdo con ellos, te pedimos que no lo uses.",
        },
      ],
    },
    {
      id: "informacion",
      title: "Alcance de la información publicada",
      blocks: [
        {
          kind: "text",
          text: "La información de este sitio es de carácter ilustrativo y publicitario. No constituye oferta mercantil vinculante en los términos del Código de Comercio ni sustituye los documentos del proceso de compra.",
        },
        {
          kind: "list",
          items: [
            "Las imágenes, renders y recorridos son representaciones artísticas. Los acabados, mobiliario, vegetación y entorno son ilustrativos y pueden variar respecto de la obra terminada.",
            "Las áreas, tipologías y distribuciones son aproximadas y se sujetan a los planos aprobados por la autoridad competente y a la escritura pública.",
            "La disponibilidad, los estados de obra y las fechas de entrega pueden cambiar sin previo aviso.",
            "Las condiciones comerciales vinculantes son únicamente las que consten por escrito en el encargo fiduciario, la promesa de compraventa y demás documentos del negocio.",
          ],
        },
        {
          kind: "text",
          text: "Frente a cualquier diferencia entre lo publicado aquí y los documentos contractuales, prevalecen los documentos contractuales.",
        },
      ],
    },
    {
      id: "propiedad",
      title: "Propiedad intelectual",
      blocks: [
        {
          kind: "text",
          text: "Las marcas, logotipos, textos, fotografías, renders, planos, videos y el diseño del sitio están protegidos por las normas de propiedad industrial y derecho de autor, y pertenecen a la constructora o a terceros que autorizaron su uso.",
        },
        {
          kind: "text",
          text: "No se autoriza su reproducción, distribución, transformación ni comunicación pública sin permiso previo y escrito. Puedes compartir enlaces al sitio y citar su contenido indicando la fuente.",
        },
      ],
    },
    {
      id: "uso",
      title: "Uso permitido",
      blocks: [
        {
          kind: "text",
          text: "Te comprometes a usar el sitio conforme a la ley y a la buena fe. En particular, no puedes:",
        },
        {
          kind: "list",
          items: [
            "Suplantar la identidad de otra persona o enviar datos de terceros sin su autorización.",
            "Usar medios automatizados para extraer contenido, saturar los formularios o afectar el funcionamiento del sitio.",
            "Intentar acceder a áreas restringidas, vulnerar medidas de seguridad o introducir código malicioso.",
            "Usar el contenido con fines comerciales sin autorización escrita.",
          ],
        },
      ],
    },
    {
      id: "formularios",
      title: "Formularios y veracidad",
      blocks: [
        {
          kind: "text",
          text: "Al enviar un formulario declaras que los datos son tuyos y son verdaderos. Los datos se tratan conforme a la política de tratamiento de datos personales de este sitio.",
        },
        {
          kind: "text",
          text: "Aplicamos controles automáticos contra envíos masivos. Un envío puede ser rechazado si esos controles lo identifican como automatizado.",
        },
      ],
    },
    {
      id: "enlaces",
      title: "Enlaces a terceros",
      blocks: [
        {
          kind: "text",
          text: "El sitio enlaza a servicios de terceros como WhatsApp, redes sociales y aplicaciones de mapas. No controlamos su contenido ni sus políticas, y su uso se rige por las condiciones de cada proveedor.",
        },
      ],
    },
    {
      id: "disponibilidad",
      title: "Disponibilidad y responsabilidad",
      blocks: [
        {
          kind: "text",
          text: "Procuramos que el sitio esté disponible de forma continua, pero puede interrumpirse por mantenimiento, fallas técnicas o causas ajenas a nosotros. No garantizamos disponibilidad ininterrumpida.",
        },
        {
          kind: "text",
          text: "Nada en estos términos limita los derechos que la Ley 1480 de 2011 reconoce a los consumidores ni la responsabilidad que la ley no permite excluir.",
        },
      ],
    },
    {
      id: "modificaciones",
      title: "Modificaciones",
      blocks: [
        {
          kind: "text",
          text: "Podemos modificar estos términos y el contenido del sitio en cualquier momento. La versión vigente es siempre la publicada en esta página, con su fecha de actualización.",
        },
      ],
    },
    {
      id: "ley",
      title: "Ley aplicable",
      blocks: [
        {
          kind: "text",
          text: "Estos términos se rigen por la ley colombiana. Cualquier controversia se somete a los jueces de la República de Colombia.",
        },
        {
          kind: "text",
          text: `Para cualquier comunicación relacionada con estos términos: ${CANAL}.`,
        },
      ],
    },
  ],
  seo: {
    title: "Términos de uso",
    description:
      "Condiciones de uso del sitio de Tres Nevados Constructora y alcance de la información publicada.",
  },
};

/* ─────────────────────────────────────────────────────────────────────────
 * 04 · Política de cookies
 *
 * Describe lo que el sitio hace HOY: solo lo estrictamente necesario, sin
 * analítica ni pixel activos. Si se conectan GA4 o Meta, hay que actualizar
 * este texto y publicar el banner de consentimiento previo — está anotado en
 * la sección `futuro`.
 * ────────────────────────────────────────────────────────────────────── */

const cookies: LegalDocument = {
  slug: "cookies",
  order: 4,
  title: "Política de cookies",
  summary:
    "Qué guarda este sitio en tu navegador. Hoy, lo mínimo para funcionar: ninguna cookie de publicidad ni de seguimiento.",
  basis: "Ley 1581 de 2012 · Circular Externa 002 de 2015 de la SIC",
  version: "borrador-2026-07-v1",
  updatedAt: "2026-07-23",
  status: "draft",
  sections: [
    {
      id: "que-son",
      title: "Qué son las cookies",
      blocks: [
        {
          kind: "text",
          text: "Son pequeños archivos que un sitio guarda en tu navegador para recordar información entre páginas o entre visitas. Tecnologías como el almacenamiento local del navegador cumplen una función parecida y esta política las cubre igual.",
        },
      ],
    },
    {
      id: "cuales-usamos",
      title: "Cuáles usa este sitio",
      blocks: [
        {
          kind: "text",
          text: "Hoy este sitio no instala cookies de publicidad, de seguimiento ni de perfilamiento. Tampoco usa cookies de analítica.",
        },
        {
          kind: "text",
          text: "Solo se emplean las estrictamente necesarias para que el sitio funcione y sea seguro:",
        },
        {
          kind: "list",
          items: [
            "Preferencias técnicas de la sesión de navegación, que se borran al cerrar el navegador.",
            "Controles de seguridad del proveedor de alojamiento, destinados a proteger el sitio frente a tráfico automatizado.",
          ],
        },
        {
          kind: "text",
          text: "Estas cookies no requieren tu consentimiento previo porque sin ellas el servicio que pediste no puede prestarse.",
        },
      ],
    },
    {
      id: "terceros",
      title: "Contenido de terceros",
      blocks: [
        {
          kind: "text",
          text: "Cuando abres un enlace a WhatsApp, a una red social o a una aplicación de mapas, sales de este sitio y entras a un servicio de un tercero que aplica sus propias cookies y su propia política.",
        },
      ],
    },
    {
      id: "gestion",
      title: "Cómo gestionarlas",
      blocks: [
        {
          kind: "text",
          text: "Puedes bloquear o borrar las cookies desde la configuración de tu navegador. Bloquear las estrictamente necesarias puede impedir que el formulario funcione.",
        },
      ],
    },
    {
      id: "futuro",
      title: "Si en el futuro medimos el tráfico",
      blocks: [
        {
          kind: "text",
          text: "La constructora podrá activar herramientas de analítica o de medición de campañas. El día que ocurra, este sitio pedirá tu consentimiento previo mediante un banner antes de instalar cualquier cookie que no sea estrictamente necesaria, y esta política se actualizará con el detalle de cada herramienta, su finalidad y su tiempo de conservación.",
        },
      ],
    },
    {
      id: "vigencia",
      title: "Vigencia",
      blocks: [
        {
          kind: "text",
          text: "Esta política rige desde su publicación y se actualiza cada vez que cambien las tecnologías empleadas por el sitio.",
        },
      ],
    },
  ],
  seo: {
    title: "Política de cookies",
    description:
      "Qué guarda este sitio en tu navegador y cómo gestionarlo. Hoy, solo lo estrictamente necesario.",
  },
};

export const legalDocuments: LegalDocument[] = [
  privacidad,
  avisoPrivacidad,
  terminos,
  cookies,
];
