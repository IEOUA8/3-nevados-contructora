import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Etiqueta de sección. §11.1
 *
 * Light Taupe sobre Cream da 2.4:1 — insuficiente para texto de cuerpo. Aquí es
 * legítimo porque es uppercase, con tracking 0.18em y ≥13px, uso al que §5.1
 * lo restringe explícitamente. Nunca usar este color para párrafos.
 *
 * Sobre Pine Tree da 5.6:1 (AA), así que el mismo color sirve en ambos fondos.
 */
export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-kicker font-medium uppercase text-secondary", className)}>
      {children}
    </p>
  );
}
