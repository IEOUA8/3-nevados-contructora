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

## Estado

**Fases 1–5 y 9** del orden de construcción (§27): setup, design system, home,
plantilla de ficha, el resto de páginas y el SEO técnico. Sin integraciones.

Lo que funciona hoy: las seis páginas públicas, la plantilla replicable con los
dos proyectos poblados con contenido real de la marca, el formulario de lead de
punta a punta con validación, honeypot, control de tiempo y rate limit, los
eventos de analítica listos para conectarse a GA4, y la capa de SEO completa.

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
| Edén Medical | 582px | 602px | cabe |
| Tres Nevados Reserva | 647px | 602px | **se pasa por 45px** |

El espacio disponible descuenta los 65px del header fijo.

Reserva no cabe porque tres valores ocupan dos líneas: *Ubicación*, *Incluye* y
*Respaldo*. El brief prevé exactamente este caso — «si hay que sacrificar algo
de diseño para que quepa en una pantalla, se sacrifica» — pero acortar textos de
la marca es decisión de la marca, no del proveedor. Recortar cualquiera de esos
tres a una línea cierra la brecha.

La prueba queda en rojo a propósito. Es el marcador del criterio 02, y en verde
solo debe ponerse arreglando la causa.

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
