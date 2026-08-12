"use client";

import { useEffect, useState } from "react";

export default function CountUp({
  value,
  from,
  duration = 0.9,
  delay = 0,
}: {
  value: number;
  /** Starting number shown immediately on first render — never 0 unless explicitly passed. */
  from?: number;
  duration?: number;
  delay?: number;
}) {
  const start = from ?? value;
  // Initialize to the start value directly so the very first paint (including
  // SSR) already shows it — there is never a 0 frame before the animation begins.
  const [display, setDisplay] = useState(start);

  useEffect(() => {
    let raf: number;
    let cancelled = false;
    const startAt = performance.now() + delay * 1000;

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = (now - startAt) / 1000;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + eased * (value - start)));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [value, start, duration, delay]);

  return <>{display.toLocaleString("en-US")}</>;
}
