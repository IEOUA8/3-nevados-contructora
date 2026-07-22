"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@/components/analytics/trackEvent";

/**
 * Mide la lectura del manifiesto al 90% de scroll. §15.2
 *
 * ADVERTENCIA PARA QUIEN VENGA DESPUÉS: `manifesto_read` no es una conversión
 * y no debe marcarse como tal en GA4. El manifiesto se mide por tiempo de
 * lectura, no por conversión. Si alguien lo convierte en objetivo, el siguiente
 * paso inevitable es «optimizarlo», y ahí se pierde lo único que separa a esta
 * marca del resto del mercado inmobiliario del Eje. §2.3 · §10.2
 */
export function ManifestoTracker() {
  const fired = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (fired.current) return;

      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;

      if (total > 0 && scrolled / total >= 0.9) {
        fired.current = true;
        trackEvent("manifesto_read", {});
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
