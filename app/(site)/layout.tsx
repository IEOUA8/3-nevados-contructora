import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition, ScrollProgress } from "@/components/motion/SiteMotion";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* §18 — primer elemento focusable de la página. */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-bg focus:px-4 focus:py-3 focus:text-text"
      >
        Ir al contenido
      </a>

      <ScrollProgress />
      <Header />
      <main id="contenido">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
