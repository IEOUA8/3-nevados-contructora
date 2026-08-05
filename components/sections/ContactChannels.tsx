import { Kicker } from "@/components/ui/Kicker";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { SiteSettings } from "@/content/types";

/**
 * CANALES DE CONTACTO — R-11.
 *
 * Se alimenta del dato maestro (`site.contact`, `site.salesRoom`, `site.social`)
 * para que un cambio se haga en un solo lugar. Cada canal se pinta solo si tiene
 * dato: los pendientes no se muestran como «por confirmar» (R-14), quedan
 * construidos en el contenido y aparecen en cuanto la marca entrega el valor.
 *
 * Todos los teléfonos y correos van en enlaces activos (`tel:` / `mailto:`),
 * nunca como texto plano.
 */
export function ContactChannels({
  settings,
  formLocation,
}: {
  settings: SiteSettings;
  formLocation: string;
}) {
  const { contact, salesRoom } = settings;

  const rows: { label: string; node: React.ReactNode }[] = [];

  rows.push({
    label: "WhatsApp comercial",
    node: (
      <WhatsAppLink
        number={settings.whatsapp.number}
        message={settings.whatsapp.defaultMessage}
        projectSlug=""
        location={formLocation}
        className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
      >
        {settings.whatsapp.display}
      </WhatsAppLink>
    ),
  });

  const phones = [contact.phoneFixed, contact.phoneAlt];
  for (const phone of phones) {
    if (phone?.value) {
      rows.push({
        label: phone.label,
        node: <ActiveLink href={phone.href ?? `tel:${phone.value}`}>{phone.value}</ActiveLink>,
      });
    }
  }

  const emails = [
    contact.emailComercial,
    contact.emailAdministrativo,
    contact.emailProveedores,
  ];
  for (const email of emails) {
    if (email?.value) {
      rows.push({
        label: email.label,
        node: <ActiveLink href={email.href ?? `mailto:${email.value}`}>{email.value}</ActiveLink>,
      });
    }
  }

  if (salesRoom.address) {
    rows.push({ label: "Sala de ventas", node: salesRoom.address });
  }
  if (salesRoom.hours) {
    rows.push({ label: "Horario de atención", node: salesRoom.hours });
  }

  return (
    <div>
      <Kicker>Canales</Kicker>
      <dl className="mt-5 border-t border-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <dt className="text-body-s text-text-muted">{row.label}</dt>
            <dd className="text-body text-text sm:text-right">{row.node}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ActiveLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
    >
      {children}
    </a>
  );
}
