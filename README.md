# Tres Nevados Constructora — sitio web

Implementación del *Documento Maestro v1.0*. Las referencias `§` de los
comentarios del código apuntan a las secciones de ese documento; el objetivo es
que cualquier decisión rara del código se pueda rastrear hasta su razón.

> **Regla máxima, heredada del brief:** si hay que elegir entre convertir mejor
> o ser fiel a la marca, se elige la marca.

## Arrancar

```bash
npm install && npm run dev
```

Queda en **http://localhost:3007**, no en el 3000. El 3000 lo usa cualquier
proyecto y el navegador termina sirviendo la caché del último que corrió ahí.

No hace falta ninguna variable de entorno. Sin credenciales, los adaptadores de
Supabase, CRM y analítica quedan inactivos y el sitio funciona igual.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:3007` |
| `npm run build` | Build de producción (todas las páginas estáticas) |
| `npm run typecheck` | TypeScript en modo estricto |
| `npm run lint` | ESLint, incluidas las reglas del compilador de React |
| `npm test` | Criterios de aprobación del brief, en Playwright |
| `npm run images -- <origen> <destino>` | Redimensiona y comprime imágenes hacia `public/images/` |

## Editar el contenido

**El sitio no lleva CMS** (decisión de julio 2026). Xian queda como proveedor de
cambios, así que todo el contenido vive tipado en `content/` y cada ajuste es un
commit.

| Qué cambiar | Dónde |
|---|---|
| Textos y datos de un proyecto | `content/projects/<slug>.ts` |
| Home, manifiesto, la constructora | `content/pages.ts` |
| WhatsApp, redes, sala de ventas | `content/site.ts` |
| Políticas y términos legales | `content/legal.ts` |

Que sea TypeScript y no un formulario web tiene una ventaja concreta: si alguien
borra un campo obligatorio o sube una imagen sin `alt`, **la compilación falla
antes de llegar a producción**. Un CMS habría avisado; esto lo impide.

Antes de desplegar cualquier cambio de contenido: `npm run typecheck && npm test`.

### Agregar un proyecto nuevo

El requisito de «plantilla replicable» del brief sigue en pie. Crear el proyecto
3 no toca ni una línea de lógica:

1. Procesar las imágenes: `npm run images -- ~/renders/ proyecto-3/ --max 1800`
   El script imprime el `ImageRef` con las dimensiones ya medidas — hay que
   pegarlo tal cual y escribir el `alt`. Poner las dimensiones a ojo es la causa
   más común de CLS.
2. Copiar `content/projects/tres-nevados-reserva.ts`, cambiar los datos.
3. Registrarlo en el array `PROJECTS` de `lib/content.ts`.

Con tres proyectos, la página índice `/proyectos` se activa sola (§6.3). El
`order` controla la posición y `isPublished` permite prepararlo sin publicarlo.

### Cambiar una imagen

```bash
npm run images -- ~/Desktop/nuevo-render.jpg reserva/g-3.jpg --max 1800
```

Avisa si el resultado supera 400 KB. El presupuesto del §17.1 es de 900 KB para
el home completo; en 4G cada 100 KB de más son décimas de segundo de LCP.

## Textos legales

Cuatro documentos, cada uno con su página de detalle, más el índice `/legal`:

| Documento | Ruta | Marco |
|---|---|---|
| Política de tratamiento de datos | `/legal/privacidad` | Ley 1581 de 2012 · Decreto 1074 de 2015 |
| Aviso de privacidad | `/legal/aviso-privacidad` | Decreto 1074, art. 2.2.2.25.3.2 |
| Términos de uso | `/legal/terminos` | Ley 1480 de 2011 · Código de Comercio |
| Política de cookies | `/legal/cookies` | Circular Externa 002 de 2015 de la SIC |

**Los cuatro son borradores y ninguno es vigente.** Los redactó el proveedor web
a partir de lo que el sitio hace de verdad —los campos que pide el formulario,
los datos técnicos que registra el endpoint, los terceros que intervienen—, para
que jurídica revise sobre algo concreto en lugar de una hoja en blanco. No son
asesoría jurídica.

Mientras `status` sea `draft`, cada página se sirve con `noindex` y con el aviso
de borrador visible. Aprobar un documento es cambiar esa palabra en
`content/legal.ts`, subir `version` y actualizar `updatedAt`.

Los datos que la constructora todavía no confirmó —razón social, NIT, domicilio
de notificaciones, correo de protección de datos, teléfono— no se inventan: se
escriben como `{{clave}}` contra `LEGAL_PENDING` y se pintan como huecos
resaltados. Dos cosas se rompen solas si alguien se salta el proceso:

- una clave mal escrita (`{{razon_socail}}`) rompe la compilación en vez de
  publicar el literal en un documento legal;
- marcar `approved` un documento que conserva huecos también rompe la
  compilación, con el detalle de qué falta.

### Lo que falta para poder publicarlos

1. Que jurídica revise y apruebe los cuatro textos.
2. Los datos de identificación de `LEGAL_PENDING`.
3. El registro de la base de datos ante la SIC (RNBD), que es de la constructora
   y no del sitio.
4. Definir el plazo de conservación de los leads que no derivan en negocio: el
   texto lo remite hoy a «la política de retención de la constructora».

Ojo con la política de cookies: describe el sitio de hoy, que no instala ninguna
cookie de analítica ni de publicidad. **El día que se conecten GA4 o el Pixel de
Meta hay que actualizar ese texto y publicar un banner de consentimiento previo**
antes de instalar nada que no sea estrictamente necesario. La sección «Si en el
futuro medimos el tráfico» ya deja dicho ese compromiso.

## Estado

Actualizado el 23 de julio de 2026.

Del orden de construcción del documento maestro (§27) están hechas las **fases
1–5 y 9**. Encima de eso se ejecutó el [plan de ajustes de contenido y dirección
visual](PLAN_AJUSTES_CONTENIDO_DISENO.md), aprobado el 22 de julio:

| Fase del plan | Estado |
|---|---|
| 0 · Gobierno de contenido | Hecha — cada cifra puede declarar fuente, fecha y estado |
| 1 · Biblioteca y modelo de datos | Hecha — 43 imágenes procesadas, modelo ampliado |
| 2 · Corporativo y manifiesto | Hecha — el manifiesto publicado ya es el cultural 2026 |
| 3 · Edén Medical | Hecha — cinco tipos de producto, localización, CTAs separados |
| 4 · Reserva residencial | Hecha — narrativa residencial, galería depurada, tipologías |
| 5 · Mall Comercial | Hecha — página propia en `/proyectos/mall-comercial-tres-nevados` |
| 6 · QA y optimización | En curso — ver «Rendimiento» |

Lo que funciona hoy: nueve páginas públicas más las cuatro legales, la plantilla
replicable con los **tres** proyectos poblados con contenido real de la marca, el
formulario de lead de punta a punta con validación, honeypot, control de tiempo y
rate limit, los eventos de analítica listos para conectarse a GA4, y la capa de
SEO completa. Los 44 criterios ejecutables de `e2e/` pasan.

## Rendimiento

Medido sobre el build de producción, sumando los chunks que cada ruta referencia
en su HTML, comprimidos con gzip. Es el peso que el visitante descarga de
JavaScript, no una estimación.

| Ruta | Antes | Ahora |
|---|---|---|
| Fichas de proyecto | 328,5 KB | **253,3 KB** |
| Home | 325,9 KB | **250,9 KB** |
| Contacto | 323,8 KB | **248,8 KB** |
| Manifiesto, constructora, legales | 247,3 KB | 247,3 KB |

Lo que cambió: `zod` + `react-hook-form` pesan 76,5 KB comprimidos y se
descargaban en toda página que tuviera bloque de contacto, aunque el formulario
viviera al final del scroll. Ahora se cargan al acercarse a la pantalla
(`components/forms/DeferredLeadForm.tsx`). En `/contacto` no se difiere: ahí el
formulario es el motivo de la visita.

Los dos logotipos de marca pasaron de 43,9 KB a 22,1 KB con cuantización de
paleta. Son PNG planos: la diferencia máxima por subpíxel contra el original es
de 3 sobre 255, y ningún subpíxel supera 2. Van con `unoptimized`, así que ese
peso se descargaba tal cual en cada página.

**Lo que sigue pesando y no se tocó:** `motion` cuesta **56 KB gzip repartidos en
tres chunks y está en todas las rutas**, porque el layout monta la cortina de
transición y la barra de progreso de scroll. Reducirlo tiene dos caminos:
`LazyMotion` con `domAnimation` y el componente `m` (mecánico, conserva el
comportamiento, ahorro estimado 15–20 KB), o reimplementar `Reveal`, la cortina y
la barra con CSS e `IntersectionObserver` y sacar la librería del layout (ahorro
de los 56 KB completos, pero cambia el sistema de movimiento del §11.1 · §12 y
eso es una decisión de dirección, no de rendimiento). No se hizo ninguno de los
dos sin aprobación.

### SEO

- **Tarjetas para compartir** generadas por `opengraph-image.tsx` en home,
  manifiesto y cada ficha. Fondo Pine Tree, nombre en serif, sin adornos. Se
  prerrenderizan en el build, así que no cuestan nada en runtime.
  Las fuentes viven en `assets/fonts/` como TTF estáticos porque satori no lee
  woff2 ni fuentes variables; son solo para el servidor y nunca llegan al
  navegador (de esas se encarga `next/font`). Licencias OFL incluidas.
- **JSON-LD** por tipo de página, con una regla dura: **no se emite ningún dato
  que la marca no haya confirmado**. Sin dirección de sala de ventas, sin
  coordenadas, sin `offers`. Un `address` inventado alimenta el Knowledge Graph
  de Google con información falsa y corregirlo después cuesta mucho más que
  haber esperado. Hay una prueba que lo vigila.
- Metadata única por ruta, canonical absoluto, sitemap y `robots.txt`
  generados desde el contenido.

## Decisiones que se apartan del documento

| Decisión | Por qué |
|---|---|
| **Next 16**, no 15 | `create-next-app` ya no sirve la 15. Mismo App Router y mismos RSC. |
| **Fraunces + Inter**, no Instrument Serif | El PDF del brief incrusta justo esas dos familias: son las que la marca ya usa. Ambas libres (OFL) y servidas desde nuestro dominio por `next/font`. |
| **Sin CMS**, contra el §7.2 | El documento elegía Sanity para que el equipo interno editara sin código. El cliente decidió que Xian sea el proveedor de cambios, así que el CMS pierde su razón de ser. Ver la nota contractual abajo. |
| **Escala de espaciado con la base de Tailwind** | Poner `--spacing: 0.5rem` para replicar la escala de 8px hacía que `h-6` fueran 48px en vez de 24. La disciplina de 8px se mantiene usando solo números pares. |
| **Sin CRM**, contra el §14 | El CRM Smarthome quedó fuera del alcance el 23 de julio de 2026. El lead se entrega hoy por correo al equipo comercial. Ver la nota contractual abajo. |
| **Cuatro documentos legales redactados por el proveedor** | El brief los deja en manos del cliente y así sigue siendo: se entregan como borrador con `noindex` y aviso visible, para que jurídica revise sobre algo concreto. Nada se publica como vigente sin su aprobación. |

## Nota contractual sobre la decisión de no llevar CMS

El brief pedía dos cosas que ya no se cumplen, y conviene dejarlo por escrito
antes de la entrega en lugar de descubrirlo en la reunión de cierre:

- «El equipo interno edita textos, imágenes, tipologías y estado sin tocar
  código» — ahora cada cambio pasa por Xian.
- El entregable **#6, capacitación al equipo interno sobre el CMS**, queda sin
  objeto. Hay que reemplazarlo o retirarlo del alcance.

En su lugar debería quedar acordado un **acuerdo de soporte**: qué tiempo de
respuesta tiene un cambio de contenido y cómo se factura. El caso concreto que
va a aparecer primero es «Estado: Por confirmar» pasando a «En obra».

## Bloqueantes antes de lanzar

Ninguno es de código. Todos necesitan una decisión o una entrega externa.

1. **Textos legales.** `/legal/privacidad` y `/legal/terminos` están vacías a
   propósito. El formulario pide consentimiento «expreso e informado» bajo la
   Ley 1581: publicar un borrador redactado por el proveedor no cumple. Además,
   la constructora debe registrar la base ante la SIC (RNBD).
2. **Manifiesto.** El texto de `content/pages.ts` son las frases del brief, no
   el manifiesto. El brief dice que lo entrega la marca y que el proveedor no
   redacta ni resume.
3. **CRM Smarthome.** Sin endpoint, autenticación ni sandbox no se puede validar
   el criterio 05. Los siete puntos a pedir al proveedor están listados en
   `lib/crm/smarthome.ts`.
4. **Rate limit en memoria.** `lib/rate-limit.ts` no sirve en producción
   serverless, donde cada invocación puede tener su propio proceso. Cambiar el
   almacén por Upstash Redis; la firma no cambia.
5. **Dirección de sala de ventas.** Circulan dos versiones. No se publica
   ninguna hasta que la marca confirme: una dirección equivocada daña la
   confianza y el SEO local más de lo que ayuda tenerla.
6. **Coordenadas de los lotes, ficha PDF, datos de Edén, estado y entrega de
   Reserva.** Cada ausencia tiene hoy un tratamiento diseñado (§20), no un
   hueco.
7. **Logo en SVG** y renders definitivos. Los assets actuales salen de las
   carpetas de trabajo y sirven para evaluar composición, no para producción.

## El bloque «Lo esencial»

Es el componente que decide el proyecto y el único con una prueba que lo mide
en cada ejecución. Estado medido a 375×667:

| Proyecto | Contenido | Disponible | |
|---|---|---|---|
| Edén Medical | 488px | 602px | cabe |
| Tres Nevados Reserva | 598px | 602px | cabe |

El espacio disponible descuenta los 65px del header fijo.

En móvil, los nueve datos se organizan como una matriz técnica de dos columnas.
Esto conserva completos los textos de marca, mantiene el tamaño tipográfico y
reduce el recorrido vertical sin introducir scroll interno. El criterio 02
queda en verde para ambos proyectos.

## Estructura

```
app/(site)/        Páginas públicas, con header y footer
app/api/lead/      Flujo de lead — el orden de los pasos no es negociable (§14.1)
components/ui/     Primitivas del design system
components/sections/  Bloques de página
content/           Todo el contenido, tipado — aquí se edita el sitio
scripts/           Procesado de imágenes
lib/content.ts     Única frontera con la fuente de contenido
e2e/               Los criterios de aprobación del brief, ejecutables
```

## Reglas que el código impide romper

- **No hay campo de precio.** No existe en `EssentialField`, ni en el schema, ni
  en la UI. No se puede agregar por error porque no hay dónde ponerlo.
- **Una sola animación de entrada.** Vive en `components/ui/Reveal.tsx`. Ningún
  otro componente implementa la suya; centralizarla es lo que impide que el
  sitio se llene de movimiento decorativo con el tiempo.
- **`manifesto_read` no es una conversión.** Ni ahora ni después. Si el
  manifiesto se mide como página comercial, alguien lo va a optimizar y se
  pierde lo único que separa a esta marca del resto del mercado del Eje.
- **El usuario nunca paga una falla de infraestructura.** Si el lead quedó
  registrado, la respuesta es 200 aunque el CRM esté caído.
