import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Botón del sistema. §11.1
 * Radio global 2px. Sin sombras. Sin degradados. Altura de toque ≥48px.
 */

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] " +
  "px-7 py-3.5 text-body-s font-medium transition-colors duration-[180ms] " +
  "disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-text-inverse hover:bg-accent-hover",
  secondary:
    "border border-text/30 text-text hover:border-text/60 bg-transparent",
  ghost:
    "min-h-0 px-0 py-0 text-accent underline underline-offset-4 " +
    "decoration-accent/40 hover:decoration-accent",
};

/** Variantes sobre fondo Pine Tree — §5.1, el contraste se invierte. */
const onInverse: Partial<Record<Variant, string>> = {
  secondary:
    "border border-text-inverse/35 text-text-inverse hover:border-text-inverse/70",
  ghost: "text-text-inverse decoration-text-inverse/40",
};

function classesFor(variant: Variant, inverse: boolean, className?: string) {
  return cn(
    base,
    variants[variant],
    inverse && onInverse[variant],
    className,
  );
}

export function Button({
  variant = "primary",
  inverse = false,
  loading = false,
  loadingLabel = "Enviando…",
  children,
  className,
  ...props
}: ComponentProps<"button"> & {
  variant?: Variant;
  inverse?: boolean;
  loading?: boolean;
  loadingLabel?: string;
}) {
  return (
    <button
      className={classesFor(variant, inverse, className)}
      // §13.2 — deshabilitado solo durante el envío, nunca antes.
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  inverse = false,
  href,
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  variant?: Variant;
  inverse?: boolean;
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("tel:");

  if (external) {
    return (
      <a
        href={href}
        className={classesFor(variant, inverse, className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classesFor(variant, inverse, className)}
      {...props}
    >
      {children}
    </Link>
  );
}

/** §12 — rotación 800ms lineal. La única animación en bucle además del hero. */
function Spinner() {
  return (
    <svg
      className="spin-slow size-3.5"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M13 7A6 6 0 0 0 7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
