"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import BusinessRing from "@/components/sections/BusinessRing";

const RING_ADVANCE_MS = 4000;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({ dict }: { dict: Dictionary }) {
  const ringItems = dict.ourBusiness.items;
  const [ringActive, setRingActive] = useState(0);
  const [ringPaused, setRingPaused] = useState(false);

  useEffect(() => {
    if (ringPaused) return;
    const id = setInterval(
      () => setRingActive((i) => (i + 1) % ringItems.length),
      RING_ADVANCE_MS,
    );
    return () => clearInterval(id);
  }, [ringPaused, ringItems.length]);

  return (
    <section
      id="hero"
      className="texture-lines relative flex min-h-[650px] sm:min-h-[100dvh] w-full items-center overflow-hidden bg-pine-900 py-20 lg:py-28"
    >
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div variants={container} initial={false} animate="show" className="max-w-2xl">
            <motion.h1
              variants={item}
              className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl leading-[1.12] text-cream-100 tracking-tight"
            >
              {dict.hero.titleLine1}
              <br />
              {dict.hero.titlePrefix}{" "}
              <span className="font-display italic text-gold-400">{dict.hero.titleWorld}</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-sm sm:text-base font-normal text-cream-100/75 leading-relaxed">
              {dict.hero.subtitle}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#business"
                className="rounded-full bg-gold-400 px-8 py-3.5 text-sm font-medium tracking-wide text-pine-950 transition-all hover:scale-105 hover:bg-gold-300"
              >
                {dict.hero.ctaPrimary}
              </a>
              <a
                href="#partner"
                className="rounded-full border border-cream-100/20 bg-pine-950/20 px-8 py-3.5 text-sm font-medium tracking-wide text-cream-100 transition-all hover:border-cream-100/60 hover:bg-pine-950/40"
              >
                {dict.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>

          <div
            className="flex flex-col justify-center"
            onMouseEnter={() => setRingPaused(true)}
            onMouseLeave={() => setRingPaused(false)}
          >
            <BusinessRing
              items={ringItems}
              active={ringActive}
              onSelect={setRingActive}
              glideSeconds={(RING_ADVANCE_MS / 1000) * 0.92}
              glideEase="linear"
              responsive
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
