"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ADVANCE_MS = 4000;

// Eight ring slots, indexed clockwise starting at the top. Whichever item is
// active always sits in slot 0 — the rest fall in behind it in order, so
// picking a box visibly rotates the whole ring instead of just re-styling it.
const SLOTS = [
  { top: "12%", left: "50%" }, // 0 top — active
  { top: "23%", left: "74%" }, // 1
  { top: "50%", left: "84%" }, // 2
  { top: "77%", left: "74%" }, // 3
  { top: "88%", left: "50%" }, // 4
  { top: "77%", left: "26%" }, // 5
  { top: "50%", left: "16%" }, // 6
  { top: "23%", left: "26%" }, // 7
];

export default function OurBusiness({ dict }: { dict: Dictionary }) {
  const b = dict.ourBusiness;
  const count = b.items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const item = b.items[active]!;

  return (
    <section
      id="business"
      className="texture-lines relative overflow-hidden bg-pine-900 py-12 sm:py-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10">
          {/* Left: heading up top, active box's number + name pinned toward
              the bottom so it reads as one steady anchor while the ring
              turns beside it. */}
          <div className="flex flex-col lg:justify-between">
            <AnimatedSection>
              <Eyebrow>{b.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-cream-100 text-balance">
                {b.title}
              </h2>
            </AnimatedSection>

            <div key={active} className="animate-fade-in mt-8 lg:mt-6">
              <span className="font-display text-6xl sm:text-7xl text-gold-400">
                {item.number}
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl text-cream-100">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream-100/60">
                {item.desc}
              </p>
            </div>
          </div>

          {/* Right: ring of boxes on large screens; a plain numbered list
              stands in on small screens where an absolutely-positioned ring
              has no room to breathe. */}
          <div className="flex flex-col justify-center">
            <div className="relative hidden h-[460px] w-full lg:block">
              <div className="absolute inset-x-[14%] inset-y-[12%] rounded-full border border-cream-100/10" />
              {b.items.map((it, i) => {
                const slot = (i - active + count) % count;
                const pos = SLOTS[slot]!;
                const isActive = slot === 0;
                return (
                  <motion.button
                    key={it.number}
                    onClick={() => setActive(i)}
                    animate={{
                      top: pos.top,
                      left: pos.left,
                      scale: isActive ? 1 : 0.88,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ zIndex: isActive ? 20 : 10 - slot, x: "-50%", y: "-50%" }}
                    className={`absolute w-[32%] rounded-xl p-4 text-start shadow-xl transition-colors duration-500 ${
                      isActive
                        ? "bg-gold-400 text-pine-950"
                        : "border border-cream-100/10 bg-cream-100/[0.06] text-cream-100/70 backdrop-blur-sm hover:bg-cream-100/10"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.2em] ${
                        isActive ? "text-pine-900/60" : "text-gold-400/70"
                      }`}
                    >
                      {it.number}
                    </span>
                    <div className="mt-1 font-display text-sm sm:text-base">{it.title}</div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col divide-y divide-cream-100/10 border-y border-cream-100/10 lg:hidden">
              {b.items.map((it, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={it.number}
                    onClick={() => setActive(i)}
                    className="flex items-center gap-4 py-4 text-start"
                  >
                    <span
                      className={`font-mono text-xs tracking-[0.2em] ${
                        isActive ? "text-gold-400" : "text-cream-100/30"
                      }`}
                    >
                      {it.number}
                    </span>
                    <span
                      className={`font-display text-lg ${
                        isActive ? "text-cream-100" : "text-cream-100/45"
                      }`}
                    >
                      {it.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
