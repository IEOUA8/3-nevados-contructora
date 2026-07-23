"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return children;

  return (
    <>
      <motion.div
        key={pathname}
        data-motion="route-transition"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[35] origin-top bg-bg"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.48, ease: EASE_OUT }}
      >
        <span className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
      </motion.div>
      {children}
    </>
  );
}

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.22,
  });

  if (reduced) return null;

  return (
    <motion.div
      data-motion="scroll-progress"
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
