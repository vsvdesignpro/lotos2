"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const panelPairs = [
  [".about", ".stays"],
  [".stays", ".houses"],
  [".conditions", ".process"],
] as const;

export function StackedPanels() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const triggers = panelPairs.map(([sourceSelector, incomingSelector]) => {
      const source = document.querySelector<HTMLElement>(sourceSelector);
      const incoming = document.querySelector<HTMLElement>(incomingSelector);
      if (!source || !incoming) return null;

      return ScrollTrigger.create({
        trigger: source,
        start: "bottom bottom",
        endTrigger: incoming,
        end: "top top",
        pin: source,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    });

    ScrollTrigger.refresh();
    return () => triggers.forEach((trigger) => trigger?.kill());
  });

  return null;
}
