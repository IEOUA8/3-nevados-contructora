"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/components/analytics/trackEvent";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { cn } from "@/lib/utils";

/**
 * Botones flotantes de acceso directo. §10.3.H
 *
 * Acompañan al usuario en toda la navegación (fixed, esquina inferior derecha).
 * Un disparador «Conoce más» despliega los accesos: escribir por WhatsApp y
 * descargar el portafolio. Se pliega solo al hacer clic fuera o con Escape.
 *
 * En móvil se levanta por encima de la barra de acción de las fichas para no
 * chocar con ella. No aparece dentro del menú móvil porque este lo cubre (z).
 */
export function FloatingActions({
  whatsappNumber,
  whatsappMessage,
  brochureUrl,
}: {
  whatsappNumber: string;
  whatsappMessage: string;
  brochureUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-2.5 md:bottom-8 md:right-6"
    >
      {/* Accesos: aparecen encima del disparador. Fuera de foco cuando pliega. */}
      <div
        id="acciones-flotantes"
        inert={!open}
        className={cn(
          "flex flex-col items-end gap-2.5 transition-[opacity,transform] duration-300 ease-out",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <a
          href={brochureUrl}
          download
          onClick={() => trackEvent("download_brochure", { project_slug: "portafolio" })}
          className={ACTION_PILL}
        >
          <DocIcon />
          Brochure
        </a>
        <WhatsAppLink
          number={whatsappNumber}
          message={whatsappMessage}
          projectSlug=""
          location="floating_actions"
          className={ACTION_PILL}
        >
          <WhatsAppIcon />
          Escríbenos
        </WhatsAppLink>
      </div>

      {/* Disparador con protagonismo: verde de marca (Pine Tree), sombra propia
          y elevación al hover. §Guía de marca 05 · botones (no es el logo). */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="acciones-flotantes"
        className="inline-flex min-h-[3.25rem] items-center gap-3 rounded-full bg-accent px-6 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-text-inverse shadow-[0_12px_30px_rgb(114_122_77/0.45)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_18px_42px_rgb(114_122_77/0.55)] motion-reduce:transform-none"
      >
        Conoce más
        <ChevronUp className={cn("transition-transform duration-300", open && "rotate-180")} />
      </button>
    </div>
  );
}

/** Accesos: pastilla oscura sólida con sombra y elevación flotante al hover. */
const ACTION_PILL =
  "inline-flex min-h-12 items-center gap-2.5 rounded-full bg-bg-inverse px-5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-text-inverse shadow-[0_8px_24px_rgb(24_28_25/0.32)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgb(24_28_25/0.42)] motion-reduce:transform-none";

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="m3.5 8.5 3.5-3.5 3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M3.5 1.5h5l3 3v9h-8z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8.5 1.5v3h3M5 8h5M5 10.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 .8a7.2 7.2 0 0 0-6.1 11l-1 3.4 3.5-.9A7.2 7.2 0 1 0 8 .8Zm0 1.5a5.7 5.7 0 0 1 4.8 8.8 5.7 5.7 0 0 1-7.4 2.1l-.3-.2-2 .5.6-2-.2-.3A5.7 5.7 0 0 1 8 2.3Zm-2.2 3c-.1 0-.3 0-.4.2-.2.2-.6.6-.6 1.4 0 .8.6 1.6.7 1.7.1.2 1.2 1.9 3 2.6 1.5.6 1.8.5 2.1.4.3 0 1-.4 1.1-.8.1-.4.1-.7.1-.8l-.3-.2-1-.5c-.2 0-.3-.1-.4.1l-.5.6c-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.5-.9-.5-.5-.9-1-1-1.2-.1-.2 0-.3.1-.4l.3-.3.2-.3v-.4l-.5-1.2c-.1-.3-.3-.2-.4-.2h-.4Z"/>
    </svg>
  );
}
