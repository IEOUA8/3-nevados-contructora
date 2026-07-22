import Image from "next/image";
import Link from "next/link";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import type { RelatedOffering } from "@/content/types";

export function RelatedOfferingBlock({ offering }: { offering: RelatedOffering }) {
  return (
    <Section tone="cream" className="border-t border-border-soft">
      <Container>
        <Link
          href={`/proyectos/${offering.slug}`}
          className="group grid overflow-hidden border border-border bg-bg-alt md:grid-cols-2"
        >
          <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[25rem]">
            <Image
              src={offering.image.src}
              alt={offering.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          </div>
          <div className="flex flex-col justify-between p-7 md:p-12">
            <div>
              <Kicker>Oferta relacionada · {offering.category}</Kicker>
              <h2 className="mt-5 max-w-lg font-display text-display-l text-text">
                {offering.name}
              </h2>
              <p className="mt-5 max-w-md text-body text-text-muted">{offering.text}</p>
            </div>
            <p className="mt-10 flex items-center justify-between border-t border-border pt-5 text-body-s font-medium text-accent">
              Conocer la oferta comercial
              <span aria-hidden="true">↗</span>
            </p>
          </div>
        </Link>
      </Container>
    </Section>
  );
}
