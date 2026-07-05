"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./jobsheet.module.css";

type StampProps = {
  label: string;
  tone?: "rust" | "teal";
  className?: string;
};

/** A rubber-stamp badge that slams into place once it scrolls into view. */
export default function Stamp({ label, tone = "teal", className = "" }: StampProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setArmed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={[
        styles.stamp,
        styles.stampTexture,
        tone === "rust" ? styles.stampRust : styles.stampTeal,
        armed ? styles.stampSlam : styles.stampStatic,
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
