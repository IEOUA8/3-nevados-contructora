"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * LA ÚNICA ANIMACIÓN DE ENTRADA DEL SITIO. §11.1 · §12
 *
 * opacity 0→1 + translateY 12px→0 · 600ms · cubic-bezier(0.16, 1, 0.3, 1)
 *
 * Ningún otro componente implementa animaciones de entrada por su cuenta.
 * Centralizar aquí es lo que impide que el sitio se llene de movimiento
 * decorativo con el tiempo. Si algo necesita otra animación, la respuesta
 * por defecto es que no la necesita.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  /** Segundos. Úsese solo para escalonar hermanos, nunca más de 0.15. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Component>
  );
}
