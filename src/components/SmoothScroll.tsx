"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Smooth scroll (ref 3 "smoothness") — skip under reduced-motion.
    let lenis: Lenis | undefined;
    let rafId = 0;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // Reveal-on-scroll for any .reveal element.
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let io: IntersectionObserver | undefined;
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = el.dataset.revealDelay;
              if (delay) el.style.transitionDelay = `${delay}ms`;
              el.classList.add("is-in");
              io!.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      els.forEach((el) => io!.observe(el));
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      io?.disconnect();
    };
  }, []);

  return <>{children}</>;
}
