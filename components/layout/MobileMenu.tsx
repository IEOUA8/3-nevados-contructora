"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { NAV_ITEMS } from "@/components/layout/nav";
import { cn } from "@/lib/utils";

/**
 * Menú móvil. §6.2 · §18
 *
 * Overlay a pantalla completa sobre Cream. Animación: fade + translate 8px,
 * 240ms. Nada más.
 *
 * Accesibilidad obligatoria: role="dialog", aria-modal, focus trap, cierre con
 * Esc y retorno de foco al botón que lo abrió.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    // Bloquea el scroll del fondo mientras el overlay está abierto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      // `hidden` cuando está cerrado saca su contenido del orden de tabulación
      // sin depender de que la animación haya terminado.
      hidden={!open}
      className={cn(
        "fixed inset-0 z-50 bg-bg transition-[opacity,transform] duration-[240ms] ease-out md:hidden",
        open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
      )}
    >
      <div className="flex h-20 items-center justify-between border-b border-border px-6">
        <Link href="/" onClick={onClose} aria-label="Tres Nevados — inicio">
          <Image
            src="/images/brand/logo-dark.png"
            alt="Tres Nevados Constructora"
            width={416}
            height={120}
            unoptimized
            className="h-7 w-auto"
          />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="-mr-1 flex size-12 items-center justify-center border border-text/25 text-text"
          aria-label="Cerrar menú"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="M5 5l12 12M17 5L5 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex h-[calc(100%-5rem)] flex-col overflow-y-auto">
        <nav aria-label="Principal" className="px-6 pb-8 pt-7">
          <p className="mb-5 text-[0.625rem] font-medium uppercase tracking-[0.22em] text-text-muted">
            Navegación
          </p>
          <ul className="border-t border-border">
          {NAV_ITEMS.map((item, index) =>
            item.children ? (
              <li key={item.label} className="border-b border-border py-5">
                <p className="flex items-center gap-3 text-kicker font-medium uppercase text-secondary">
                  <span className="text-[0.625rem] text-text-muted">0{index + 1}</span>
                  {item.label}
                </p>
                <ul className="mt-3">
                  {item.children.map((child, childIndex) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="grid min-h-[4.75rem] grid-cols-[1.5rem_1fr_auto] items-center gap-3 border-t border-border-soft font-display text-[1.45rem] leading-tight text-text"
                      >
                        <span className="font-sans text-[0.625rem] text-text-muted">0{childIndex + 1}</span>
                        <span>
                          <span className="block font-sans text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-secondary">
                            {child.category}
                          </span>
                          <span className="mt-1 block">{child.label}</span>
                        </span>
                        <ArrowIcon />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href} className="border-b border-border">
                <Link
                  href={item.href!}
                  onClick={onClose}
                  className="grid min-h-[5.25rem] grid-cols-[1.5rem_1fr_auto] items-center gap-3 font-display text-[1.65rem] leading-tight text-text"
                >
                  <span className="font-sans text-[0.625rem] text-text-muted">0{index + 1}</span>
                  {item.label}
                  <ArrowIcon />
                </Link>
              </li>
            ),
          )}
          </ul>
        </nav>

        <div className="mt-auto grid grid-cols-[1fr_auto] border-t border-text/20 bg-bg-inverse text-text-inverse">
          <Link
            href="/contacto"
            onClick={onClose}
            className="flex min-h-20 flex-col justify-center px-6"
          >
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-secondary">Contacto directo</span>
            <span className="mt-1 font-display text-[1.45rem]">Hablemos.</span>
          </Link>
          <Link
            href="/contacto"
            onClick={onClose}
            aria-label="Ir a contacto"
            className="flex min-h-20 min-w-20 items-center justify-center border-l border-text-inverse/20"
          >
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
