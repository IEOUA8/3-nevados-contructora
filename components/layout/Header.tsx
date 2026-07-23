"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_ITEMS } from "@/components/layout/nav";
import { cn } from "@/lib/utils";

/**
 * Header. §6.2
 *
 * · Transparente sobre el hero; sólido (Cream + borde al 12%) tras 80px.
 * · En /manifiesto se oculta al bajar y reaparece al subir. El brief pide
 *   explícitamente «sin menú flotante insistiendo». Es una excepción del
 *   sistema, no un descuido.
 */
export function Header() {
  const pathname = usePathname();
  const isManifesto = pathname === "/manifiesto";

  // Solo el home y las fichas abren con imagen a sangre. En el resto el fondo
  // es Cream desde el píxel cero, así que el header nace sólido: un logo Cream
  // sobre Cream sería invisible.
  const hasHero = pathname === "/" || pathname.startsWith("/proyectos/");

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);

      if (isManifesto) {
        // Umbral de 8px: evita que un temblor de trackpad haga parpadear el header.
        if (y > lastY + 8 && y > 120) setHidden(true);
        else if (y < lastY - 8) setHidden(false);
      } else {
        setHidden(false);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isManifesto]);

  const solid = !hasHero || scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,transform,box-shadow] duration-200",
          solid
            ? "border-b border-border bg-bg/95 shadow-[0_1px_0_rgb(44_42_41/0.04)] backdrop-blur-md"
            : "border-b border-text-inverse/20 bg-transparent",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="mx-auto flex h-16 max-w-site items-center justify-between px-6 md:h-24 md:px-8">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              aria-label="Tres Nevados Constructora — inicio"
              className="shrink-0"
            >
            {/* `unoptimized`: el logo es una marca plana de dos colores. Pasarlo
                por el optimizador no ahorra bytes y además hace que sharp se
                cuelgue codificando el PNG de paleta a AVIF.
                PENDIENTE brandbook — reemplazar por el SVG oficial. */}
            <Image
              src={solid ? "/images/brand/logo-dark.png" : "/images/brand/logo-light.png"}
              alt="Tres Nevados Constructora"
              width={416}
              height={120}
              priority
              unoptimized
              className="h-7 w-auto md:h-8"
            />
            </Link>

            <div
              className={cn(
                "hidden border-l pl-5 lg:block",
                solid ? "border-border" : "border-text-inverse/30",
              )}
            >
              <p
                className={cn(
                  "text-[0.625rem] font-medium uppercase leading-[1.45] tracking-[0.2em]",
                  solid ? "text-text-muted" : "text-text-inverse/75",
                )}
              >
                Constructora
                <br />
                Armenia · Quindío
              </p>
            </div>
          </div>

          <DesktopNav key={pathname} solid={solid} />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={cn(
              "-mr-1 flex min-h-12 items-center gap-3 border px-3.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] md:hidden",
              solid
                ? "border-text/25 text-text"
                : "border-text-inverse/45 text-text-inverse",
            )}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span aria-hidden="true">Menú</span>
            <MenuIcon />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function DesktopNav({ solid }: { solid: boolean }) {
  const pathname = usePathname();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsMenuRef = useRef<HTMLDivElement>(null);
  const projectsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!projectsMenuRef.current?.contains(event.target as Node)) {
        setProjectsOpen(false);
      }
    };

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setProjectsOpen(false);
      projectsButtonRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  return (
    <nav
      aria-label="Principal"
      className={cn("hidden items-stretch md:flex", solid ? "text-text" : "text-text-inverse")}
    >
      {NAV_ITEMS.map((item, index) =>
        item.children ? (
          <div
            key={item.label}
            ref={projectsMenuRef}
            className="group relative flex"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
            onFocusCapture={() => setProjectsOpen(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setProjectsOpen(false);
              }
            }}
          >
            <button
              ref={projectsButtonRef}
              type="button"
              onClick={() => setProjectsOpen(true)}
              aria-haspopup="menu"
              aria-expanded={projectsOpen}
              className={cn(
                "flex min-h-12 items-center gap-2.5 border-l px-5 text-left transition-colors",
                solid
                  ? "border-border hover:bg-text/5"
                  : "border-text-inverse/20 hover:bg-text-inverse/10",
              )}
            >
              <span className={cn("text-[0.625rem]", solid ? "text-text-muted" : "text-text-inverse/60")}>02</span>
              <span className="text-body-s">{item.label}</span>
              <ChevronDown />
            </button>
            <div
              className={cn(
                "invisible absolute right-0 top-full w-[26rem] pt-3 opacity-0",
                "translate-y-1 transition-[opacity,transform] duration-200",
                projectsOpen && "visible translate-y-0 opacity-100",
              )}
            >
              <div className="border border-border bg-bg p-2 text-text shadow-[0_20px_60px_rgb(44_42_41/0.12)]">
                <p className="px-4 pb-3 pt-2 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-text-muted">
                  Elige un proyecto
                </p>
                <ul>
                  {item.children.map((child, childIndex) => (
                    <li key={child.href} className="border-t border-border">
                    <Link
                      href={child.href}
                      onClick={() => setProjectsOpen(false)}
                      className="group/link grid min-h-20 grid-cols-[2rem_1fr_auto] items-center gap-3 px-4 transition-colors hover:bg-cool/45"
                    >
                      <span className="text-[0.6875rem] text-text-muted">0{childIndex + 1}</span>
                      <span>
                        <span className="block text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-secondary">
                          {child.category}
                        </span>
                        <span className="mt-1 block font-display text-[1.35rem] leading-tight">
                          {child.label}
                        </span>
                      </span>
                      <ArrowUpRight className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : item.href === "/contacto" ? (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "ml-3 flex min-h-12 items-center gap-3 border px-5 text-body-s font-medium transition-colors",
              solid
                ? "border-accent bg-accent text-text-inverse hover:bg-accent-hover"
                : "border-text-inverse/55 bg-text-inverse/10 text-text-inverse hover:bg-text-inverse hover:text-text",
            )}
          >
            Hablemos
            <ArrowUpRight />
          </Link>
        ) : (
          <Link
            key={item.href}
            href={item.href!}
            className={cn(
              "flex min-h-12 items-center gap-2.5 border-l px-5 text-body-s transition-colors",
              solid
                ? "border-border hover:bg-text/5"
                : "border-text-inverse/20 hover:bg-text-inverse/10",
              pathname === item.href && (solid ? "bg-text/5" : "bg-text-inverse/10"),
            )}
          >
            <span className={cn("text-[0.625rem]", solid ? "text-text-muted" : "text-text-inverse/60")}>
              0{index + 1}
            </span>
            <span>{item.label}</span>
          </Link>
        ),
      )}
    </nav>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M4 11 11 4M5 4h6v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** §11.2 — iconos solo funcionales, trazo 1.5px, sin relleno. */
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M2 7h18M2 15h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
