"use client";

import { useEffect, useState } from "react";

import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { cn } from "@/lib/utils";

/**
 * Barra de acción persistente en móvil. §10.3 · §25.1 C
 *
 * Aparece SOLO después de que el usuario pasa el bloque «Lo esencial».
 *
 * Por qué esto no viola la regla anti-urgencia: no hay cuenta regresiva, no
 * hay presión, no interrumpe. Aparece en el momento exacto en que el usuario
 * ya tiene la información para decidir. Es la mano tendida, no la persecución.
 * «Crear condiciones, no imponer» — §4.1.
 *
 * NO aparece en el manifiesto. Nunca. §10.2
 */
export function StickyActionBar({
  whatsappNumber,
  whatsappMessage,
  projectSlug,
  brochure,
}: {
  whatsappNumber: string;
  whatsappMessage: string;
  projectSlug: string;
  /** §20.3 — sin ficha cargada, el botón de descarga no existe. */
  brochure?: { sizeMb: number };
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const essentials = document.getElementById("lo-esencial");
    if (!essentials) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Visible cuando el bloque C ya quedó por encima del viewport.
        setVisible(entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: "0px" },
    );

    observer.observe(essentials);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 h-14 bg-bg-inverse transition-transform duration-200 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      // Fuera del orden de tabulación mientras está escondida: sin `inert`, el
      // usuario de teclado tabula a botones que no puede ver.
      inert={!visible}
    >
      <div className="grid h-full grid-cols-2 divide-x divide-text-inverse/15">
        {brochure ? (
          <a
            href="#descargar-ficha"
            className="flex items-center justify-center text-body-s text-text-inverse"
          >
            Descargar ficha
          </a>
        ) : (
          <a
            href="#contacto"
            className="flex items-center justify-center text-body-s text-text-inverse"
          >
            Dejar mis datos
          </a>
        )}

        <WhatsAppLink
          number={whatsappNumber}
          message={whatsappMessage}
          projectSlug={projectSlug}
          location="action_bar"
          className="flex items-center justify-center text-body-s text-text-inverse"
        >
          WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
