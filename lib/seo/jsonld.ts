import type { Project, SiteSettings } from "@/content/types";

/**
 * Datos estructurados. §16.3
 *
 * REGLA: aquí no se inventa nada. Si un dato no existe todavía —la dirección de
 * la sala de ventas, las coordenadas del lote— el campo simplemente no se
 * emite. Un `address` inventado en JSON-LD alimenta el Knowledge Graph de
 * Google con información falsa, y corregir eso después cuesta mucho más que
 * haber esperado.
 *
 * `RealEstateListing` sin precio es válido: se omite `offers` en lugar de
 * inventar un rango. §16.3
 */

type Json = Record<string, unknown>;

/** Quita las claves vacías para no emitir `"address": undefined`. */
function limpiar(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === undefined || v === null || v === "") return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  );
}

function organizacion(settings: SiteSettings): Json {
  return limpiar({
    "@type": "Organization",
    "@id": `${settings.siteUrl}/#organization`,
    name: settings.siteName,
    url: settings.siteUrl,
    logo: `${settings.siteUrl}/images/brand/logo-dark.png`,
    telephone: `+${settings.whatsapp.number}`,
    areaServed: "Armenia, Quindío, Colombia",
    sameAs: [settings.social.instagram, settings.social.facebook].filter(Boolean),
    // PENDIENTE §26 R5 — sin dirección confirmada no se emite `address`.
    address: settings.salesRoom.address
      ? limpiar({
          "@type": "PostalAddress",
          streetAddress: settings.salesRoom.address,
          addressLocality: "Armenia",
          addressRegion: "Quindío",
          addressCountry: "CO",
        })
      : undefined,
  });
}

export function homeJsonLd(settings: SiteSettings): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizacion(settings),
      {
        "@type": "WebSite",
        "@id": `${settings.siteUrl}/#website`,
        url: settings.siteUrl,
        name: settings.siteName,
        inLanguage: "es-CO",
        publisher: { "@id": `${settings.siteUrl}/#organization` },
      },
    ],
  };
}

export function companyJsonLd(settings: SiteSettings): Json {
  return { "@context": "https://schema.org", ...organizacion(settings) };
}

export function contactJsonLd(settings: SiteSettings): Json {
  return {
    "@context": "https://schema.org",
    ...limpiar({
      "@type": "LocalBusiness",
      name: settings.siteName,
      url: `${settings.siteUrl}/contacto`,
      telephone: `+${settings.whatsapp.number}`,
      image: `${settings.siteUrl}/images/home/hero-nevados.jpg`,
      // PENDIENTE marca — horario y dirección de sala de ventas.
      openingHours: settings.salesRoom.hours,
      address: settings.salesRoom.address
        ? limpiar({
            "@type": "PostalAddress",
            streetAddress: settings.salesRoom.address,
            addressLocality: "Armenia",
            addressRegion: "Quindío",
            addressCountry: "CO",
          })
        : undefined,
    }),
  };
}

/**
 * Reserva es vivienda → `RealEstateListing`.
 * Edén es infraestructura de salud → `LocalBusiness` + `Place`.
 * §16.3
 */
export function projectJsonLd(project: Project, settings: SiteSettings): Json {
  const url = `${settings.siteUrl}/proyectos/${project.slug}`;
  const esVivienda = project.slug !== "eden-medical";

  const geo =
    typeof project.location.lat === "number" &&
    typeof project.location.lng === "number"
      ? {
          "@type": "GeoCoordinates",
          latitude: project.location.lat,
          longitude: project.location.lng,
        }
      : undefined;

  const direccion = project.location.address
    ? limpiar({
        "@type": "PostalAddress",
        streetAddress: project.location.address,
        addressLocality: "Armenia",
        addressRegion: "Quindío",
        addressCountry: "CO",
      })
    : undefined;

  return {
    "@context": "https://schema.org",
    ...limpiar({
      "@type": esVivienda ? "RealEstateListing" : "LocalBusiness",
      name: project.name,
      description: project.seo.description,
      url,
      image: `${settings.siteUrl}${project.heroImage.src}`,
      address: direccion,
      geo,
      // Sin `offers`: el sitio no publica precios y no se inventa un rango.
      //
      // Tampoco `numberOfRooms`: schema.org espera un número o un
      // QuantitativeValue, y aquí hay tres tipologías distintas. Meter
      // «1 alcoba · 2 alcobas · 3 alcobas» en un campo numérico es dato mal
      // formado, y un dato mal formado vale menos que ninguno.
      provider: { "@type": "Organization", name: settings.siteName },
    }),
  };
}

export function breadcrumbJsonLd(
  settings: SiteSettings,
  items: { name: string; path: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${settings.siteUrl}${item.path}`,
    })),
  };
}
