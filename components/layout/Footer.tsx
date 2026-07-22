import Image from "next/image";
import Link from "next/link";

import { NAV_ITEMS } from "@/components/layout/nav";
import { getSettings } from "@/lib/content";
import { whatsappUrl } from "@/lib/utils";

/**
 * Footer. §6.4 — mínimo, fondo Pine Tree, texto Cream.
 * Sin newsletter. Sin «suscríbete». No corresponde a la voz.
 */
export async function Footer() {
  const settings = await getSettings();
  const year = new Date().getFullYear();

  const links = NAV_ITEMS.flatMap((item) =>
    item.children ? item.children : [{ href: item.href!, label: item.label }],
  );

  return (
    <footer className="bg-bg-inverse text-text-inverse">
      <div className="mx-auto max-w-site px-6 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div>
            <Image
              src="/images/brand/logo-light.png"
              alt="Tres Nevados Constructora"
              width={416}
              height={120}
              unoptimized
              className="h-7 w-auto"
            />
            <p className="mt-6 text-body-s text-text-inverse/70">
              Armenia, Quindío.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <ul className="flex flex-col gap-3 text-body-s">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 text-body-s">
            <a
              href={whatsappUrl(
                settings.whatsapp.number,
                settings.whatsapp.defaultMessage,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary"
            >
              WhatsApp {settings.whatsapp.display}
            </a>
            <a
              href={settings.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary"
            >
              Instagram
            </a>
            <a
              href={settings.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary"
            >
              Facebook
            </a>
            {settings.salesRoom.address && (
              <p className="mt-3 max-w-64 text-text-inverse/70">
                {settings.salesRoom.address}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-text-inverse/15 pt-6 md:mt-16">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-body-s text-text-inverse/70">
            {settings.backing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-body-s text-text-inverse/70">
            <Link href="/legal/privacidad" className="hover:text-secondary">
              Política de tratamiento de datos
            </Link>
            <Link href="/legal/terminos" className="hover:text-secondary">
              Términos de uso
            </Link>
            <span className="ml-auto">© {year} Tres Nevados Constructora</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
