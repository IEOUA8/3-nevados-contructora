import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

/**
 * Tarjeta para compartir. §16.4
 *
 * Esto importa más de lo que parece: el comportamiento real en Colombia es «le
 * mando el link a mi esposo/socio», así que la preview de WhatsApp es la
 * segunda impresión más importante del sitio después del hero. Una preview sin
 * imagen se lee como un enlace sospechoso.
 *
 * Fondo Pine Tree, nombre en serif, kicker en Light Taupe. Sin sombras, sin
 * degradados, sin adornos — las mismas reglas que el resto del sitio. §11.2
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Satori no lee woff2, así que estas dos son TTF y viven en `assets/`, fuera de
// `public/`: se usan solo en el servidor y nunca se sirven al navegador. Las
// que sí llegan al usuario las gestiona `next/font` en el layout raíz.
const FONTS_DIR = path.join(process.cwd(), "assets", "fonts");

async function cargarFuentes() {
  const [serif, sans] = await Promise.all([
    readFile(path.join(FONTS_DIR, "fraunces.ttf")),
    readFile(path.join(FONTS_DIR, "inter.ttf")),
  ]);

  return [
    { name: "Fraunces", data: serif, style: "normal" as const, weight: 400 as const },
    { name: "Inter", data: sans, style: "normal" as const, weight: 400 as const },
  ];
}

export async function renderOgImage({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#2C2A29",
          padding: "72px 80px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#B7926D",
          }}
        >
          {kicker}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: title.length > 22 ? 84 : 104,
              lineHeight: 1.05,
              color: "#F7F2E8",
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 30,
                color: "rgba(247, 242, 232, 0.72)",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "rgba(247, 242, 232, 0.55)",
          }}
        >
          <span>Tres Nevados Constructora</span>
          <span>Armenia, Quindío</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await cargarFuentes() },
  );
}
