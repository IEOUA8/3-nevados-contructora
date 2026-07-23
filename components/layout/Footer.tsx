import Image from "next/image";
import Link from "next/link";

import { getSettings } from "@/lib/content";
import { whatsappUrl } from "@/lib/utils";

/**
 * Cierre editorial del sitio.
 *
 * La navegación, el contacto y los respaldos viven en planos claramente
 * diferenciados. En móvil cada enlace principal conserva un área táctil
 * generosa; en escritorio, la retícula y la numeración sostienen la jerarquía.
 */
export async function Footer() {
  const settings = await getSettings();
  const year = new Date().getFullYear();
  const whatsapp = whatsappUrl(
    settings.whatsapp.number,
    settings.whatsapp.defaultMessage,
  );

  return (
    <footer className="overflow-hidden bg-bg-inverse text-text-inverse">
      <div className="mx-auto max-w-site px-6 pb-8 pt-14 md:px-8 md:pb-10 md:pt-20">
        <div className="grid gap-12 border-b border-text-inverse/20 pb-14 md:grid-cols-12 md:gap-8 md:pb-16">
          <div className="md:col-span-6">
            <Image
              src="/images/brand/logo-light.png"
              alt="Tres Nevados Constructora"
              width={416}
              height={120}
              unoptimized
              className="h-9 w-auto"
            />
            <p className="mt-6 max-w-sm font-display text-[1.75rem] leading-tight text-text-inverse/80">
              Construimos las condiciones para que la vida ocurra.
            </p>
            <p className="mt-5 text-body-s text-text-inverse/55">
              Armenia, Quindío · Colombia
            </p>
          </div>

          <FooterColumn number="01" title="Explorar">
            <FooterLink href="/manifiesto">Manifiesto</FooterLink>
            <FooterLink href="/constructora">La constructora</FooterLink>
            <FooterLink href="/contacto">Contacto</FooterLink>
          </FooterColumn>

          <FooterColumn number="02" title="Proyectos">
            <FooterLink href="/proyectos/tres-nevados-reserva">
              Tres Nevados Reserva
            </FooterLink>
            <FooterLink href="/proyectos/eden-medical">Edén Medical</FooterLink>
            <FooterLink href="/proyectos/mall-comercial-tres-nevados">
              Mall Comercial
            </FooterLink>
          </FooterColumn>

          <FooterColumn number="03" title="Conectar">
            <FooterExternal href={settings.social.instagram}>Instagram</FooterExternal>
            <FooterExternal href={settings.social.facebook}>Facebook</FooterExternal>
            <FooterExternal href={whatsapp}>WhatsApp</FooterExternal>
          </FooterColumn>
        </div>

        <div className="border-t border-text-inverse/20">
          <div className="grid gap-6 py-7 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-secondary">
              Respaldo
            </p>
            <ul className="flex flex-col gap-2 text-body-s text-text-inverse/65 md:flex-row md:gap-8">
              {settings.backing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-text-inverse/20 pt-7 text-[0.75rem] text-text-inverse/50 md:flex-row md:items-center">
          <span>© {year} Tres Nevados Constructora</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:ml-auto">
            <Link href="/legal/privacidad" className="min-h-11 content-center hover:text-text-inverse">
              Política de datos
            </Link>
            <Link href="/legal/terminos" className="min-h-11 content-center hover:text-text-inverse">
              Términos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:col-span-2">
      <p className="flex items-center gap-3 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-secondary">
        <span className="text-text-inverse/35">{number}</span>
        {title}
      </p>
      <div className="mt-4 flex flex-col border-t border-text-inverse/15 md:border-0">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex min-h-12 items-center justify-between gap-3 border-b border-text-inverse/15 text-body-s transition-colors hover:text-secondary md:min-h-10 md:border-0"
    >
      {children}
      <FooterArrow />
    </Link>
  );
}

function FooterExternal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-12 items-center justify-between gap-3 border-b border-text-inverse/15 text-body-s transition-colors hover:text-secondary md:min-h-10 md:border-0"
    >
      {children}
      <FooterArrow external />
    </a>
  );
}

function FooterArrow({ external = false }: { external?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="text-text-inverse/35 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-secondary"
    >
      {external ? "↗" : "→"}
    </span>
  );
}
