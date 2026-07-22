"use client";

import type { ReactNode } from "react";

import { trackEvent } from "@/components/analytics/trackEvent";
import { whatsappUrl } from "@/lib/utils";

/**
 * Enlace a WhatsApp con mensaje precargado. §10.3.H
 * Dispara `whatsapp_click`, que sí es conversión. §15.2
 */
export function WhatsAppLink({
  number,
  message,
  projectSlug,
  location,
  children,
  className,
}: {
  number: string;
  message: string;
  /** Vacío en páginas sin proyecto (home, contacto). */
  projectSlug: string;
  /** Dónde estaba el enlace: `hero`, `essentials_pending`, `action_bar`… */
  location: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackEvent("whatsapp_click", { project_slug: projectSlug, location })
      }
    >
      {children}
    </a>
  );
}
