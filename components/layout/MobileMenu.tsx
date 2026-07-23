"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { NAV_ITEMS } from "@/components/layout/nav";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const listVariants = {
  closed: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  open: { transition: { delayChildren: 0.16, staggerChildren: 0.045 } },
};
const itemVariants = {
  closed: { opacity: 0, y: 12 },
  open: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const openerRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
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
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-50 overflow-hidden bg-bg md:hidden"
          initial={reduced ? false : { y: "-100%" }}
          animate={{ y: 0 }}
          exit={reduced ? undefined : { y: "-100%" }}
          transition={{ duration: reduced ? 0 : 0.48, ease: EASE_OUT }}
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 top-12 font-display text-[18rem] leading-none text-accent/[0.055]"
            initial={reduced ? false : { opacity: 0, rotate: -5, scale: 0.92 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          >
            3
          </motion.span>

          <motion.div
            className="relative flex h-20 items-center justify-between border-b border-border px-6"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12, ease: EASE_OUT }}
          >
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
            <motion.button
              type="button"
              onClick={onClose}
              whileTap={reduced ? undefined : { scale: 0.9, rotate: 4 }}
              className="-mr-1 flex size-12 items-center justify-center border border-text/25 text-text transition-colors hover:bg-text hover:text-text-inverse"
              aria-label="Cerrar menú"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M5 5l12 12M17 5 5 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          </motion.div>

          <div className="relative flex h-[calc(100%-5rem)] flex-col overflow-y-auto">
            <nav aria-label="Principal" className="px-6 pb-8 pt-7">
              <motion.p
                className="mb-5 text-[0.625rem] font-medium uppercase tracking-[0.22em] text-text-muted"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14, duration: 0.4 }}
              >
                Navegación
              </motion.p>
              <motion.ul
                className="border-t border-border"
                variants={listVariants}
                initial={reduced ? false : "closed"}
                animate="open"
                exit="closed"
              >
                {NAV_ITEMS.map((item, index) =>
                  item.children ? (
                    <motion.li key={item.label} variants={itemVariants} className="border-b border-border py-5">
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
                              aria-current={pathname === child.href ? "page" : undefined}
                              className={cn(
                                "group grid min-h-[4.75rem] grid-cols-[1.5rem_1fr_auto] items-center gap-3 border-t border-border-soft font-display text-[1.45rem] leading-tight text-text transition-[padding,color] duration-200 active:pl-1",
                                pathname === child.href && "text-accent",
                              )}
                            >
                              <span className="font-sans text-[0.625rem] text-text-muted">0{childIndex + 1}</span>
                              <span>
                                <span className="block font-sans text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-secondary">
                                  {child.category}
                                </span>
                                <span className="mt-1 block">{child.label}</span>
                              </span>
                              <span className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1">
                                <ArrowIcon />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.li>
                  ) : (
                    <motion.li key={item.href} variants={itemVariants} className="border-b border-border">
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={cn(
                          "group grid min-h-[5.25rem] grid-cols-[1.5rem_1fr_auto] items-center gap-3 font-display text-[1.65rem] leading-tight text-text transition-[padding,color] duration-200 active:pl-1",
                          pathname === item.href && "text-accent",
                        )}
                      >
                        <span className="font-sans text-[0.625rem] text-text-muted">0{index + 1}</span>
                        {item.label}
                        <span className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </Link>
                    </motion.li>
                  ),
                )}
              </motion.ul>
            </nav>

            <motion.div
              className="mt-auto grid grid-cols-[1fr_auto] border-t border-text/20 bg-bg-inverse text-text-inverse"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: EASE_OUT }}
            >
              <Link href="/contacto" onClick={onClose} className="flex min-h-20 flex-col justify-center px-6">
                <span className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-secondary">Contacto directo</span>
                <span className="mt-1 font-display text-[1.45rem]">Hablemos.</span>
              </Link>
              <Link
                href="/contacto"
                onClick={onClose}
                aria-label="Ir a contacto"
                className="flex min-h-20 min-w-20 items-center justify-center border-l border-text-inverse/20 transition-colors hover:bg-text-inverse hover:text-text"
              >
                <ArrowIcon />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
