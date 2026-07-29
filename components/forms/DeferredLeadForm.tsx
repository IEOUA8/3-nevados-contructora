"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Carga diferida del formulario. §17.1
 *
 * POR QUÉ. `zod` + `react-hook-form` pesan 76,5 KB comprimidos, y en el home y
 * en las fichas el formulario vive al final de la página: hoy todo el mundo
 * paga esos kilobytes durante la hidratación, incluido quien nunca baja hasta
 * ahí. Diferirlo saca ese peso de la carga inicial de las cinco rutas más
 * pesadas del sitio.
 *
 * CUÁNDO NO USARLO. En /contacto el formulario es la página: ahí se monta
 * directo (`ContactBlock` con `defer={false}`), porque diferir lo que el
 * usuario vino a usar es una pesimización.
 *
 * `rootMargin: 700px` es lo que hace que esto sea invisible: el chunk empieza a
 * bajar aproximadamente una pantalla y media antes de que el bloque aparezca,
 * así que en scroll normal el formulario ya está montado al llegar.
 *
 * `ssr: false` no quita nada: el envío es un `fetch` a /api/lead, de modo que
 * sin JavaScript el formulario tampoco funcionaba antes.
 */

const LeadForm = dynamic(
  () => import("./LeadForm").then((mod) => mod.LeadForm),
  { ssr: false, loading: () => <FormPlaceholder /> },
);

type LeadFormProps = {
  projects: { slug: string; name: string }[];
  defaultProjectSlug?: string;
  lockProject?: boolean;
  formLocation: string;
  inverse?: boolean;
};

/**
 * `defer={false}` monta el formulario apenas hidrata la página, sin esperar al
 * scroll. El componente se pasa por props y no con un import estático de
 * `LeadForm` desde `ContactBlock` a propósito: bastaba ese import para que el
 * chunk volviera al grafo de todas las páginas y la optimización no midiera nada.
 *
 * Los dos modos son componentes distintos, no una rama con estado. Así el caso
 * «no diferir» renderiza el mismo árbol en servidor y cliente (lo resuelve el
 * propio `dynamic`), sin el desajuste de hidratación que aparece al arrancar el
 * estado en `true`.
 */
export function DeferredLeadForm({
  defer = true,
  ...props
}: LeadFormProps & { defer?: boolean }) {
  return defer ? <LazyLeadForm {...props} /> : <EagerLeadForm {...props} />;
}

/**
 * Monta el formulario apenas termina la hidratación, sin esperar al scroll.
 *
 * `LeadForm` es un `dynamic(ssr:false)`, que no renderiza nada en el servidor.
 * Renderizarlo directo dejaría el servidor con el placeholder y el cliente con
 * el formulario: desajuste de hidratación. `useSyncExternalStore` es justo el
 * caso: entrega `false` en el servidor y en la primera pasada del cliente, y
 * `true` enseguida, así el árbol coincide y el swap ocurre sin parpadeo.
 */
function EagerLeadForm(props: LeadFormProps) {
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  return hydrated ? <LeadForm {...props} /> : <FormPlaceholder />;
}

function LazyLeadForm(props: LeadFormProps) {
  const anchor = useRef<HTMLDivElement>(null);
  // Arranca en `false` para coincidir con el placeholder que sirve el servidor.
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = anchor.current;
    if (!element) return;

    // Sin IntersectionObserver (navegadores muy viejos), se monta de una vez:
    // el formulario nunca puede quedar inalcanzable por una optimización. Se
    // agenda en un microtask en vez de llamar setState en el cuerpo del efecto,
    // que dispara renders en cascada.
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setShouldLoad(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={anchor}>
      {shouldLoad ? <LeadForm {...props} /> : <FormPlaceholder />}
    </div>
  );
}

/**
 * Reserva exactamente el alto del formulario real: cuatro campos, la casilla de
 * autorización, el botón y la nota final. Si esto no coincide, la optimización
 * se paga en CLS, que es justo lo que veníamos a mejorar.
 */
function FormPlaceholder() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6">
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="h-3 w-24 bg-border-soft" />
          <div className="h-11 w-full border-b border-border" />
        </div>
      ))}
      <div className="mt-2 flex gap-3">
        <div className="mt-0.5 h-5 w-5 shrink-0 border border-border" />
        <div className="flex w-full flex-col gap-2">
          <div className="h-3 w-full bg-border-soft" />
          <div className="h-3 w-2/3 bg-border-soft" />
        </div>
      </div>
      <div className="mt-2 h-14 w-full bg-border-soft" />
      <div className="h-3 w-3/4 bg-border-soft" />
    </div>
  );
}
