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

No hace falta ninguna variable de entorno. Sin credenciales, los adaptadores de
Supabase, CRM y analítica quedan inactivos y el sitio funciona igual.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:3000` |
| `npm run build` | Build de producción (todas las páginas estáticas) |
| `npm run typecheck` | TypeScript en modo estricto |
| `npm run lint` | ESLint, incluidas las reglas del compilador de React |
| `npm test` | Criterios de aprobación del brief, en Playwright |

## Estado

**Fases 1–5 del orden de construcción** (§27): setup, design system, home,
plantilla de ficha, y el resto de páginas. Sin integraciones.

Lo que funciona hoy: las seis páginas públicas, la plantilla replicable con los
dos proyectos poblados con contenido real de la marca, el formulario de lead de
punta a punta con validación, honeypot, control de tiempo y rate limit, y los
eventos de analítica listos para conectarse a GA4.

## Decisiones que se apartan del documento

| Decisión | Por qué |
|---|---|
| **Next 16**, no 15 | `create-next-app` ya no sirve la 15. Mismo App Router y mismos RSC. |
| **Fraunces + Inter**, no Instrument Serif | El PDF del brief incrusta justo esas dos familias: son las que la marca ya usa. Ambas libres (OFL) y servidas desde nuestro dominio por `next/font`. |
| **Contenido en `content/`, no en Sanity** | No hay credenciales todavía. Los tipos de `content/types.ts` son el espejo exacto del schema `project` del §9.1, y `lib/content.ts` es la única frontera: al conectar Sanity cambia ese archivo y ningún componente más. |
| **Escala de espaciado con la base de Tailwind** | Poner `--spacing: 0.5rem` para replicar la escala de 8px hacía que `h-6` fueran 48px en vez de 24. La disciplina de 8px se mantiene usando solo números pares. |

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
content/           Contenido tipado — espejo del schema de Sanity
lib/content.ts     ← el único archivo que cambia al conectar el CMS
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
