"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Container, Section } from "@/components/ui/Layout";
import { Kicker } from "@/components/ui/Kicker";
import type { ImageRef } from "@/content/types";

export function Gallery({
  title,
  images,
}: {
  title: string;
  images: ImageRef[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const previous = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowLeft") {
        setActiveIndex(
          (current) => (current - 1 + images.length) % images.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, isOpen]);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];
  const number = String(activeIndex + 1).padStart(2, "0");
  const total = String(images.length).padStart(2, "0");

  const finishSwipe = (clientX: number) => {
    if (touchStartX.current === null) return;

    const distance = touchStartX.current - clientX;
    touchStartX.current = null;
    if (Math.abs(distance) < 42) return;
    if (distance > 0) next();
    else previous();
  };

  return (
    <Section tone="cream">
      <Container>
        <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
          <Kicker>{title}</Kicker>
          <p className="font-display text-xl text-secondary" aria-live="polite">
            {number} <span className="mx-1 text-border">/</span> {total}
          </p>
        </div>

        <div className="mt-8">
          <div
            className="relative aspect-[4/3] overflow-hidden bg-bg-alt md:aspect-[16/9]"
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              finishSwipe(event.changedTouches[0]?.clientX ?? 0);
            }}
          >
            <button
              type="button"
              className="group absolute inset-0 z-10 cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-text-inverse"
              onClick={() => setIsOpen(true)}
              aria-label={`Abrir imagen ${activeIndex + 1} de ${images.length} en pantalla completa`}
            >
              <span className="absolute bottom-5 right-5 flex min-h-12 items-center gap-3 bg-bg/90 px-4 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-text backdrop-blur-sm transition-colors group-hover:bg-accent group-hover:text-text-inverse md:bottom-8 md:right-8">
                <ExpandIcon />
                Ver en detalle
              </span>
            </button>

            {images.map((image, index) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1440px) 1376px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 48px)"
                className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
                  index === activeIndex
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-[1.015] opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="grid items-center gap-5 border-b border-border py-5 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-body text-text">
                {activeImage.caption ?? activeImage.alt}
              </p>
              <p className="mt-1 text-[0.625rem] uppercase tracking-[0.14em] text-secondary md:hidden">
                Desliza para recorrer
              </p>
            </div>
            {images.length > 1 && (
              <div className="flex items-center gap-2">
                <ControlButton label="Imagen anterior" onClick={previous}>
                  ←
                </ControlButton>
                <ControlButton label="Imagen siguiente" onClick={next}>
                  →
                </ControlButton>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <ul className="mt-5 flex gap-3 overflow-x-auto pb-2" aria-label="Imágenes de la galería">
              {images.map((image, index) => (
                <li key={`thumbnail-${image.src}`} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-16 w-24 overflow-hidden border transition-colors md:h-20 md:w-32 ${
                      index === activeIndex ? "border-accent" : "border-transparent"
                    }`}
                    aria-label={`Mostrar imagen ${index + 1}: ${image.caption ?? image.alt}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="128px"
                      className={`object-cover transition-opacity ${
                        index === activeIndex ? "opacity-100" : "opacity-55 hover:opacity-90"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-bg-inverse/95 p-4 text-text-inverse backdrop-blur-md md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Visor de ${title}`}
          onClick={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-between gap-6 border-b border-text-inverse/20 pb-4">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-text-inverse/65">
              {title} · {number} / {total}
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center gap-3 px-2 text-[0.625rem] font-medium uppercase tracking-[0.16em]"
              aria-label="Cerrar visor"
            >
              Cerrar <span className="text-2xl font-light">×</span>
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              finishSwipe(event.changedTouches[0]?.clientX ?? 0);
            }}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="100vw"
              className="object-contain py-5 md:py-8"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previous}
                  className="absolute left-0 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center bg-bg-inverse/75 text-xl backdrop-blur-sm md:size-14"
                  aria-label="Imagen anterior en visor"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-0 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center bg-bg-inverse/75 text-xl backdrop-blur-sm md:size-14"
                  aria-label="Imagen siguiente en visor"
                >
                  →
                </button>
              </>
            )}
          </div>

          <p className="border-t border-text-inverse/20 pt-4 text-body-s text-text-inverse/75">
            {activeImage.caption ?? activeImage.alt}
          </p>
        </div>
      )}
    </Section>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-12 items-center justify-center border border-border text-lg text-text transition-colors hover:border-accent hover:bg-accent hover:text-text-inverse"
      aria-label={label}
    >
      {children}
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 2H2v4m8-4h4v4M6 14H2v-4m8 4h4v-4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
