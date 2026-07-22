import { expect, test } from "@playwright/test";

/** SEO técnico. §16 */

const RUTAS_INDEXABLES = [
  "/",
  "/manifiesto",
  "/constructora",
  "/contacto",
  "/proyectos/tres-nevados-reserva",
  "/proyectos/eden-medical",
  "/proyectos/mall-comercial-tres-nevados",
];

async function leerJsonLd(page: import("@playwright/test").Page) {
  return page.$$eval('script[type="application/ld+json"]', (nodes) =>
    nodes.map((n) => JSON.parse(n.textContent ?? "{}")),
  );
}

test.describe("Metadata", () => {
  for (const ruta of RUTAS_INDEXABLES) {
    test(`${ruta} · título único, descripción y canonical`, async ({ page }) => {
      await page.goto(ruta);

      const titulo = await page.title();
      expect(titulo.length).toBeGreaterThan(10);
      // §16.2 — más de 60 caracteres se corta en el resultado de Google.
      expect(titulo.length, `título de ${titulo.length} caracteres`).toBeLessThanOrEqual(60);

      const descripcion = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(descripcion).toBeTruthy();
      expect(descripcion!.length).toBeLessThanOrEqual(155);

      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toContain("tresnevados.co");
    });
  }

  test("/gracias no se indexa", async ({ page }) => {
    await page.goto("/gracias");
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("noindex");
  });
});

test.describe("Open Graph · §16.4", () => {
  // El tráfico circula compartido por WhatsApp: la preview es la segunda
  // impresión más importante del sitio después del hero.
  for (const ruta of ["/", "/manifiesto", "/proyectos/tres-nevados-reserva"]) {
    test(`${ruta} · genera su tarjeta de 1200×630`, async ({ page, request }) => {
      await page.goto(ruta);

      const imagen = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");
      expect(imagen, "falta og:image").toBeTruthy();
      expect(imagen).toContain("opengraph-image");

      const ancho = await page
        .locator('meta[property="og:image:width"]')
        .getAttribute("content");
      expect(ancho).toBe("1200");

      // Que el meta exista no sirve de nada si la imagen no se genera.
      const respuesta = await request.get(imagen!);
      expect(respuesta.status()).toBe(200);
      expect(respuesta.headers()["content-type"]).toContain("image/png");
    });
  }
});

test.describe("Datos estructurados · §16.3", () => {
  for (const ruta of RUTAS_INDEXABLES) {
    test(`${ruta} · JSON-LD válido`, async ({ page }) => {
      await page.goto(ruta);
      const bloques = await leerJsonLd(page);

      for (const bloque of bloques) {
        expect(bloque["@context"]).toBe("https://schema.org");
        expect(bloque["@type"] ?? bloque["@graph"]).toBeTruthy();
      }
    });
  }

  test("no se emite ningún dato que la marca aún no confirmó", async ({ page }) => {
    // §26 R5 — circulan dos direcciones de sala de ventas. Publicar la
    // equivocada en JSON-LD alimenta el Knowledge Graph de Google con
    // información falsa, y corregir eso después cuesta mucho más.
    await page.goto("/contacto");
    const [negocio] = await leerJsonLd(page);
    expect(negocio.address).toBeUndefined();
    expect(negocio.openingHours).toBeUndefined();
  });

  test("la ficha no publica precio ni oferta", async ({ page }) => {
    await page.goto("/proyectos/tres-nevados-reserva");
    const bloques = await leerJsonLd(page);
    const ficha = bloques.find((b) => b["@type"] === "RealEstateListing");

    expect(ficha).toBeTruthy();
    expect(ficha.offers).toBeUndefined();
    expect(ficha.price).toBeUndefined();
  });

  test("sitemap y robots responden", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);

    const cuerpo = await sitemap.text();
    for (const ruta of RUTAS_INDEXABLES) {
      expect(cuerpo).toContain(`tresnevados.co${ruta === "/" ? "" : ruta}`);
    }
    // /gracias no debe estar en el sitemap.
    expect(cuerpo).not.toContain("/gracias");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Disallow: /gracias");
  });
});
