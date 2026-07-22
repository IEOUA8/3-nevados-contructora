/**
 * Plan de eventos. §15.2
 *
 * Los nombres y parámetros están cerrados aquí a propósito: un `string` libre
 * termina en `formulario_enviado_v2_final` seis meses después, y los informes
 * dejan de cuadrar.
 *
 * REGLA QUE NO SE TOCA (§10.2 · §15.2): `manifesto_read` NO es una conversión.
 * Nunca. Si el manifiesto se mide como página comercial, alguien lo va a
 * «optimizar» y se pierde el activo diferencial de la marca.
 */

type EventMap = {
  select_project: { project_slug: string };
  view_essentials: { project_slug: string };
  view_typology: {
    project_slug: string;
    typology_name: string;
    area: string;
  };
  generate_lead: { project_slug: string; form_location: string };
  whatsapp_click: { project_slug: string; location: string };
  download_brochure: { project_slug: string };
  manifesto_read: Record<string, never>;
  form_error: { field: string; error_type: string };
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      name: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function trackEvent<K extends keyof EventMap>(
  name: K,
  params: EventMap[K],
): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
