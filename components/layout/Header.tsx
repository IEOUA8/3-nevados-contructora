"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,transform] duration-200",
          solid ? "bg-bg border-b border-border" : "bg-transparent border-b border-transparent",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="mx-auto flex h-16 max-w-site items-center justify-between px-6 md:h-20 md:px-8">
          <Link href="/" aria-label="Tres Nevados Constructora — inicio">
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
              className="h-6 w-auto md:h-7"
            />
          </Link>

          <DesktopNav solid={solid} />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={cn(
              "-mr-2 flex size-11 items-center justify-center md:hidden",
              solid ? "text-text" : "text-text-inverse",
            )}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
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

  return (
    <nav
      aria-label="Principal"
      className={cn(
        "hidden items-center gap-8 text-body-s md:flex",
        solid ? "text-text" : "text-text-inverse",
      )}
    >
      {NAV_ITEMS.map((item) =>
        item.children ? (
          // Desplegable por :hover y :focus-within — sin JS y accesible por teclado.
          <div key={item.label} className="group relative">
            <span className="cursor-default py-2">{item.label}</span>
            <div
              className={cn(
                "invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0",
                "transition-opacity duration-200",
                "group-hover:visible group-hover:opacity-100",
                "group-focus-within:visible group-focus-within:opacity-100",
              )}
            >
              <ul className="min-w-56 border border-border bg-bg py-2 text-text">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block px-4 py-2.5 hover:text-accent"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href!}
            className={cn(
              "py-2 transition-colors hover:text-accent",
              pathname === item.href && "text-accent",
            )}
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
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
