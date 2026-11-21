"use client";

import { Fragment, useEffect, useRef, type CSSProperties, type ElementType } from "react";

type TextRevealProps = {
  as?: ElementType;
  text: string;
  lines?: string[];
  className?: string;
  id?: string;
  eager?: boolean;
  active?: boolean;
  variant?: "heading" | "body";
};

export function TextReveal({ as: Tag = "span", text, lines, className = "", id, eager = false, active, variant }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const authoredLines = lines ?? [text];
  const resolvedVariant = variant ?? (typeof Tag === "string" && /^h[1-6]$/.test(Tag) ? "heading" : "body");
  let unitIndex = 0;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (eager) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.dataset.motion = "ready";

    if (active === false) {
      delete element.dataset.visible;
      return;
    }

    if (reduce || !("IntersectionObserver" in window)) {
      element.dataset.visible = "true";
      return;
    }

    if (active === true) {
      delete element.dataset.visible;
      const firstFrame = requestAnimationFrame(() => {
        const secondFrame = requestAnimationFrame(() => {
          element.dataset.visible = "true";
        });
        element.dataset.revealFrame = String(secondFrame);
      });
      return () => {
        cancelAnimationFrame(firstFrame);
        const secondFrame = Number(element.dataset.revealFrame);
        if (secondFrame) cancelAnimationFrame(secondFrame);
      };
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.visible = "true";
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: "0px 0px -10%" });

    observer.observe(element);
    return () => observer.disconnect();
  }, [active, eager]);

  return (
    <Tag ref={ref} id={id} className={`text-reveal text-reveal--${resolvedVariant}${eager ? " text-reveal--eager" : ""} ${className}`.trim()} aria-label={text}>
      {authoredLines.map((line, lineIndex) => (
        <span className="text-reveal-line" aria-hidden="true" key={`${line}-${lineIndex}`}>
          {line.split(/ +/).map((word, wordPosition, words) => {
            if (resolvedVariant === "heading") {
              return (
                <Fragment key={`${word}-${lineIndex}-${wordPosition}`}>
                  <span className="text-reveal-word">
                    {[...word].map((character, characterIndex) => {
                      const motionIndex = unitIndex++;
                      return <span className="text-reveal-unit" key={`${character}-${motionIndex}-${characterIndex}`} style={{ "--unit-index": motionIndex } as CSSProperties}>{character}</span>;
                    })}
                  </span>
                  {wordPosition < words.length - 1 ? " " : ""}
                </Fragment>
              );
            }

            const motionIndex = unitIndex++;
            return (
              <Fragment key={`${word}-${motionIndex}`}>
                <span className="text-reveal-unit" style={{ "--unit-index": motionIndex } as CSSProperties}>{word}</span>
                {wordPosition < words.length - 1 ? " " : ""}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
