import Link from "next/link";

/**
 * 404 — §20.5
 * Con la voz de la marca. Sin humor, sin ilustración, sin «ups».
 */
export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center bg-bg">
      <div className="mx-auto w-full max-w-read px-6 md:px-8">
        <h1 className="font-display text-display-l text-text">
          Esta página no existe.
        </h1>

        <ul className="mt-12 flex flex-col gap-4">
          <li>
            <Link
              href="/proyectos/tres-nevados-reserva"
              className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
            >
              Tres Nevados Reserva
            </Link>
          </li>
          <li>
            <Link
              href="/proyectos/eden-medical"
              className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
            >
              Edén Medical
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-body-s text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
            >
              Inicio
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
