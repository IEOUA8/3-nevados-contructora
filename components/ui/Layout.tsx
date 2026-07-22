import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Contenedor y sección. §5.3 · §5.4
 *
 * REGLA DE AIRE, NO NEGOCIABLE EN QA: el padding vertical de sección nunca baja
 * de --space-12 (96px) en móvil ni de --space-24 (192px) en desktop. Es donde
 * muere el minimalismo cuando alguien «aprovecha el espacio».
 */

export function Container({
  children,
  className,
  size = "site",
}: {
  children: ReactNode;
  className?: string;
  /** `read` centra la columna de lectura a 720px. §5.4 */
  size?: "site" | "read";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8",
        size === "site" ? "max-w-site" : "max-w-read",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  as: Component = "section",
  tone = "cream",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `inverse` marca cierre o cambio de plano. §10.1 bloque 5 */
  tone?: "cream" | "inverse" | "cool" | "plain";
  id?: string;
}) {
  const tones = {
    cream: "bg-bg text-text",
    inverse: "bg-bg-inverse text-text-inverse",
    cool: "bg-cool text-text",
    plain: "",
  } as const;
  const hasExplicitSpacing = className?.includes("section-space-");

  return (
    <Component
      id={id}
      className={cn(!hasExplicitSpacing && "section-space-md", tones[tone], className)}
    >
      {children}
    </Component>
  );
}
