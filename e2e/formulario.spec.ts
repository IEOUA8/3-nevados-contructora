import { expect, test } from "@playwright/test";

/** Flujo de lead completo. §13 · §14.1 · §21.1 criterio 05 */
test.describe("Formulario de lead", () => {
  test("un envío válido lleva a /gracias", async ({ page }) => {
    await page.goto("/contacto");

    await page.getByLabel("Nombre").fill("Ana Pérez");
    await page.getByLabel("Celular").fill("3123120407");
    await page.getByLabel("Correo").fill("ana@ejemplo.com");
    await page.getByLabel(/autorizo el tratamiento/i).check();

    // El honeypot antibots exige más de 2 s desde el montaje. §14.1
    await page.waitForTimeout(2500);
    await page.getByRole("button", { name: "Solicitar información" }).click();

    await expect(page).toHaveURL(/\/gracias/);
    await expect(
      page.getByRole("heading", { name: "Recibimos tus datos." }),
    ).toBeVisible();
  });

  test("el consentimiento no viene premarcado · Ley 1581", async ({ page }) => {
    await page.goto("/contacto");
    await expect(page.getByLabel(/autorizo el tratamiento/i)).not.toBeChecked();
  });

  test("un celular inválido muestra el error debajo del campo", async ({
    page,
  }) => {
    await page.goto("/contacto");

    await page.getByLabel("Celular").fill("123");
    await page.getByLabel("Correo").click(); // dispara la validación onBlur

    await expect(
      page.getByText("Escribe un celular colombiano de 10 dígitos."),
    ).toBeVisible();
  });

  test("en la ficha, el proyecto viene resuelto y no se puede cambiar", async ({
    page,
  }) => {
    await page.goto("/proyectos/eden-medical");
    const select = page.getByLabel("Proyecto de interés");
    await expect(select).toHaveValue("eden-medical");
    await expect(select).toHaveAttribute("aria-readonly", "true");
  });
});
