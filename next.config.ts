import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad · Documento maestro §19.
 *
 * CSP: hoy permite 'unsafe-inline' en script-src porque Next inyecta scripts de
 * bootstrap inline. Migrar a CSP con nonce en la Fase 10 (optimización), junto
 * con la carga de GA4 y Meta Pixel vía next/script.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // §17.3 — AVIF primero, WebP como respaldo.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Sin cabecera que revele el framework.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
