/**
 * Isotipo de Tres Nevados — la abstracción del «3» conformado por los nevados.
 * Guía de marca §03. Vector extraído del manual oficial (viewBox 0 0 153 180).
 *
 * Usa `currentColor`, así que se tiñe con el color de texto del contenedor.
 * Reemplaza las marcas de agua genéricas (el «3» en tipografía) por el signo
 * real de la marca.
 */
const ISOTIPO_D =
  "M138.43 79.56L71.66 79.56L121.66 20.51C128.3 12.57 122.65 0.48 112.29 0.48L69.38 0.48L0.13 79.56L0.13 89.31L80.85 89.31L2.26 179.48L2.26 179.52L76.46 179.52L144.76 101.11L147.3 98.12C153.34 90.67 148.05 79.56 138.43 79.56ZM33.01 5.71C34.74 3.65 33.26 0.49 30.56 0.49L0.13 0.49L0.13 9.37L0.13 35.42L7.24 35.42L33.01 5.71Z";

export function Isotipo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 153 180"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={ISOTIPO_D} />
    </svg>
  );
}

/**
 * Patrón del isotipo repetido — el key visual de la marca (Guía §07, sobre
 * Columbia Blue). Se usa como fondo decorativo a sangre. El color del signo se
 * hereda por `color`/`currentColor`; la opacidad se controla desde afuera.
 */
export function IsotipoPattern({
  className,
  tile = 168,
  patternId = "isotipo-pattern",
}: {
  className?: string;
  /** Tamaño de la celda en px. */
  tile?: number;
  /** Único por instancia si hay varias en la misma página. */
  patternId?: string;
}) {
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern
          id={patternId}
          width={tile}
          height={tile}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          {/* isotipo ~46px, centrado en la celda */}
          <g transform={`translate(${tile / 2 - 20}, ${tile / 2 - 24}) scale(0.26)`}>
            <path d={ISOTIPO_D} fill="currentColor" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
