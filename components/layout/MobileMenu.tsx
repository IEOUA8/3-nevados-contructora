"use client";

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
      <div className="flex h-16 items-center justify-end px-6">
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 flex size-11 items-center justify-center text-text"
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

      <nav aria-label="Principal" className="px-6 pt-8">
        <ul className="flex flex-col gap-6">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <li key={item.label}>
                <p className="text-kicker font-medium uppercase text-secondary">
                  {item.label}
                </p>
                <ul className="mt-4 flex flex-col gap-4 pl-0">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="font-display text-display-m text-text"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href!}
                  onClick={onClose}
                  className="font-display text-display-m text-text"
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </div>
  );
}
