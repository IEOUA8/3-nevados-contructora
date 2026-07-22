import { defineConfig, devices } from "@playwright/test";

/**
 * QA — §21.
 * El proyecto se juega en móvil: el tráfico llega de Instagram, en celular.
 * Por eso el proyecto por defecto es el peor caso de pantalla, no un desktop.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3007",
  },
  projects: [
    {
      // iPhone SE — el peor caso para el bloque «Lo esencial». §21.2
      name: "iphone-se",
      use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 667 } },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3007",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
