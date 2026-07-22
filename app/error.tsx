"use client";

import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

/**
 * 500 — §20.5
 * Con el WhatsApp visible: si el sitio falla, el camino al equipo no falla.
 */
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-svh items-center bg-bg">
      <div className="mx-auto w-full max-w-read px-6 md:px-8">
        <h1 className="font-display text-display-l text-text">
          Algo falló de nuestro lado.
        </h1>

        <div className="mt-12 flex flex-col gap-4">
          <a
            href={whatsappUrl(site.whatsapp.number, site.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          >
            Escribir por WhatsApp {site.whatsapp.display}
          </a>
          <button
            type="button"
            onClick={reset}
            className="self-start text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          >
            Reintentar
          </button>
        </div>
      </div>
    </main>
  );
}
