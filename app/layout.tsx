import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

/**
 * Tipografía. §5.2 · Guía de marca §06.
 *
 * Las tipografías oficiales de Tres Nevados son Clash Display (títulos) y Neue
 * Montreal (párrafos), ambas sans geométricas. Clash Display es libre (Fontshare)
 * y se sirve local. Neue Montreal es de pago: hasta contar con la licencia se
 * usa General Sans —también de Fontshare y del mismo foundry que Clash Display,
 * diseñada para combinar con ella— como sustituto muy cercano.
 *
 * Se sirven locales (woff2, subset ya optimizado) — sin petición externa en
 * runtime, como exige §17.3.2. `display: swap`.
 */
const clashDisplay = localFont({
  variable: "--font-display-family",
  display: "swap",
  src: [
    { path: "../assets/fonts/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
  ],
});

// Sustituto de Neue Montreal (pendiente licencia de la marca).
const generalSans = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../assets/fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
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
    <html
      lang="es-CO"
      data-scroll-behavior="smooth"
      className={`${clashDisplay.variable} ${generalSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
