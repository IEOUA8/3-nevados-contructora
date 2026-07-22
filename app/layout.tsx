import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import "./globals.css";

/**
 * Tipografía. §5.2
 *
 * El PDF del brief incrusta Inter y Fraunces: son las familias que la marca ya
 * está usando en sus propios documentos. Fraunces es exactamente el «serif
 * humanista de alto contraste» que pide el documento, y ambas son libres (OFL).
 *
 * `next/font/google` descarga y sirve las fuentes desde nuestro propio dominio
 * en tiempo de compilación — no hay petición a Google en tiempo de ejecución,
 * que es lo que exige §17.3.2. Subset latino, `display: swap`.
 *
 * Máximo dos pesos por familia. §11.2
 */
const fraunces = Fraunces({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  // `opsz` deja que el trazo se afine en los display grandes y engorde en los
  // tamaños pequeños. Es la única razón por la que se carga como variable.
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tresnevados.co"),
  title: {
    default: "Tres Nevados Constructora · Armenia, Quindío",
    template: "%s | Tres Nevados",
  },
  description:
    "Constructora en Armenia, Quindío. Construimos las condiciones para que la vida ocurra.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Tres Nevados Constructora",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F2E8",
  // §18 — sin maximum-scale. El usuario puede ampliar hasta 200%.
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
