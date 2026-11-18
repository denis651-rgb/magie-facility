"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

export default function AboutMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    const revealFocused = (event: FocusEvent) => {
      const element = event.target;
      if (!(element instanceof Element)) return;
      const target = element.closest("[data-reveal]");
      if (target && root.contains(target)) {
        target.classList.add("is-revealed");
        observer.unobserve(target);
      }
    };

    const disableMotion = () => {
      if (!preference.matches) return;
      observer.disconnect();
      root.classList.remove("motion-enabled");
      targets.forEach((target) => target.classList.add("is-revealed"));
    };

    root.classList.add("motion-enabled");
    targets.forEach((target) => observer.observe(target));
    root.addEventListener("focusin", revealFocused);
    preference.addEventListener("change", disableMotion);

    return () => {
      observer.disconnect();
      root.classList.remove("motion-enabled");
      root.removeEventListener("focusin", revealFocused);
      preference.removeEventListener("change", disableMotion);
    };
  }, []);

  return (
    <div className="about-motion" ref={rootRef}>
      {children}
    </div>
  );
}
