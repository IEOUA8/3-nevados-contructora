/**
 * Inserta un bloque de datos estructurados. §16.3
 *
 * El JSON se escapa antes de imprimirlo: los valores vienen de `content/`, pero
 * si algún día vinieran de una fuente externa, un `</script>` dentro de un
 * string cerraría la etiqueta y convertiría el resto en HTML ejecutable.
 * Escapar siempre cuesta nada y elimina la clase de bug entera.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
