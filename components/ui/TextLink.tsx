import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Enlace editorial para cierres de sección y siguientes pasos.
 * Mantiene un lenguaje consistente: línea, verbo claro y dirección visible.
 */
export function TextLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "group inline-flex min-h-12 items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-accent",
    className,
  );
  const content = (
    <>
      <span
        aria-hidden="true"
        className="h-px w-7 bg-current transition-[width] duration-300 group-hover:w-11"
      />
      <span>{children}</span>
      <ArrowUpRight />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

function ArrowUpRight() {
  return (
    <svg
      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 10 10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
