import { expect, test } from "@playwright/test";

/**
 * Los criterios de aprobación del brief, convertidos en pruebas. §24.1
 *
 * La idea es que dejen de depender de que alguien se acuerde de revisarlos.
 * Un criterio que solo vive en un PDF se incumple en el tercer sprint.
 */

test.describe("Criterio 02 · «Lo esencial» se lee en una pantalla de celular", () => {
  for (const slug of [
    "tres-nevados-reserva",
    "eden-medical",
    "mall-comercial-tres-nevados",
  ]) {
    test(`${slug} · el bloque cabe en 375×667`, async ({ page }) => {
      await page.goto(`/proyectos/${slug}`);

      const block = page.locator("#lo-esencial");
      await expect(block).toBeVisible();

      // Se mide el contenido, no la sección: el padding vertical no es
      // información que el usuario tenga que leer.
      const kicker = block.locator("p").first();
      const last = block.locator("p").last();

      const top = await kicker.evaluate((el) => el.getBoundingClientRect().top);
      const bottom = await last.evaluate(
        (el) => el.getBoundingClientRect().bottom,
      );
      const headerHeight = await page
        .locator("header")
        .evaluate((el) => el.getBoundingClientRect().height);

      const contentHeight = bottom - top;
      const available = 667 - headerHeight;

      // Se reporta siempre, pase o falle: el número es lo que le sirve a la marca.
      console.log(
        `${slug}: contenido ${Math.round(contentHeight)}px · disponible ${Math.round(available)}px`,
      );

      expect(contentHeight).toBeLessThanOrEqual(available);
    });
  }

  test("no existe ningún campo de precio en la ficha", async ({ page }) => {
    await page.goto("/proyectos/tres-nevados-reserva");
    // innerText de <main>: lo que el usuario realmente lee. `textContent` del
    // body arrastra el payload de React que va en <script>.
    const texto = await page.locator("main").innerText();
    expect(texto).not.toMatch(/precio|\$\s?\d|COP\s?\d|millones/i);
  });
});

test.describe("Criterio 01 · no suena a anuncio inmobiliario", () => {
  const PROHIBIDAS = [
    "exclusivo",
    "premium",
    "único",
    "oportunidad",
    "increíble",
    "espectacular",
    "perfecto",
    "soñado",
    "ideal",
  ];

  const RUTAS = [
    "/",
    "/manifiesto",
    "/constructora",
    "/contacto",
    "/proyectos/tres-nevados-reserva",
    "/proyectos/eden-medical",
    "/proyectos/mall-comercial-tres-nevados",
  ];

  for (const ruta of RUTAS) {
    test(`${ruta} · sin palabras prohibidas ni signos de exclamación`, async ({
      page,
    }) => {
      await page.goto(ruta);

      // Incluye los textos alternativos, que son texto del sitio como cualquier otro.
      const texto = await page.evaluate(() => {
        const alts = [...document.querySelectorAll("img")]
          .map((img) => img.alt)
          .join(" ");
        return `${document.body.innerText} ${alts}`.toLowerCase();
      });

      for (const palabra of PROHIBIDAS) {
        expect(texto, `aparece «${palabra}»`).not.toContain(palabra);
      }
      expect(texto).not.toContain("!");
      expect(texto).not.toContain("¡");
    });
  }
});

test.describe("Reglas de la marca en el manifiesto · §10.2", () => {
  test("no tiene formulario, ni barra de acción, ni CTA de venta", async ({
    page,
  }) => {
    await page.goto("/manifiesto");

    await expect(page.locator("main form")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /enviar/i })).toHaveCount(0);
    // El WhatsApp del footer sí está: es cromo del sitio. Lo que el brief
    // prohíbe aquí es el botón flotante y cualquier CTA dentro de la lectura.
    await expect(
      page.locator("main").getByRole("link", { name: /whatsapp/i }),
    ).toHaveCount(0);
    await expect(page.locator("div.fixed.inset-x-0.bottom-0")).toHaveCount(0);
  });

  test("el header se oculta al bajar y reaparece al subir", async ({ page }) => {
    await page.goto("/manifiesto");
    const header = page.locator("header");

    // El comportamiento depende de un listener de React: sin esperar a la
    // hidratación, la prueba mide el HTML servido y no el componente vivo.
    await page.waitForFunction(() => window.scrollY === 0);
    await page.waitForTimeout(600);

    await page.mouse.move(180, 400);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(400);
    await expect(header).toHaveClass(/-translate-y-full/);

    await page.mouse.wheel(0, -300);
    await page.waitForTimeout(400);
    await expect(header).not.toHaveClass(/-translate-y-full/);
  });
});

test.describe("Barra de acción · §10.3", () => {
  test("aparece solo después de pasar el bloque «Lo esencial»", async ({
    page,
  }) => {
    await page.goto("/proyectos/tres-nevados-reserva");

    const bar = page.locator("div.fixed.inset-x-0.bottom-0");
    await expect(bar).toHaveClass(/translate-y-full/);

    await page.locator("#lo-esencial").scrollIntoViewIfNeeded();
    await page.mouse.move(180, 400);
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(500);

    await expect(bar).not.toHaveClass(/translate-y-full/);
  });
});

test.describe("Experiencia de exploración de proyectos", () => {
  test("los tres proyectos se apilan y conservan el ancho táctil en móvil", async ({
    page,
  }) => {
    await page.goto("/");

    const cards = page.locator('main a[href^="/proyectos/"]');
    await expect(cards).toHaveCount(3);

    const boxes = await Promise.all(
      [0, 1, 2].map((index) => cards.nth(index).boundingBox()),
    );

    for (const box of boxes) {
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(320);
    }

    expect(boxes[1]!.y).toBeGreaterThan(boxes[0]!.y + boxes[0]!.height);
    expect(boxes[2]!.y).toBeGreaterThan(boxes[1]!.y + boxes[1]!.height);
  });

  test("la galería navega y abre un visor de detalle", async ({ page }) => {
    await page.goto("/proyectos/eden-medical");

    const openButton = page.getByRole("button", {
      name: /abrir imagen 1 de 6 en pantalla completa/i,
    });
    await openButton.scrollIntoViewIfNeeded();
    await openButton.click();

    const dialog = page.getByRole("dialog", { name: /visor de infraestructura/i });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("01 / 06");

    await dialog.getByRole("button", { name: /imagen siguiente en visor/i }).click();
    await expect(dialog).toContainText("02 / 06");

    await dialog.getByRole("button", { name: /cerrar visor/i }).click();
    await expect(dialog).toHaveCount(0);
  });
});
