"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

type CursorFieldProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Writes cursor position onto the container as CSS custom properties:
 * --mx / --my (px, for .cursor-spotlight) and --par-x / --par-y
 * (-1..1, for .par-1 / .par-2 / .par-3 parallax layers).
 */
export default function CursorField({ children, className = "" }: CursorFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--par-x", `${(x / rect.width - 0.5) * 2}`);
    el.style.setProperty("--par-y", `${(y / rect.height - 0.5) * 2}`);
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={className}>
      {children}
    </div>
  );
}
