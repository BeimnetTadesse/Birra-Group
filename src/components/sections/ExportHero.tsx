"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function ExportHero({ dict }: { dict: Dictionary }) {
  const h = dict.exportPage.hero;

  return (
    <section className="texture-lines relative bg-pine-900 pb-16 pt-40 sm:pb-24">
      <Container>
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="max-w-3xl">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-gold-400"
            >
              <span className="h-px w-8 bg-gold-500/70" />
              {h.eyebrow}
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 font-display text-4xl sm:text-6xl leading-[1.1] text-cream-100"
            >
              {h.title}
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-2xl text-base sm:text-lg text-cream-100/80">
              {h.body}
            </motion.p>
          </div>

          <motion.div
            variants={item}
            className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-cream-100/10 bg-cream-100/10 sm:grid-cols-3"
          >
            {h.stats.map((stat) => (
              <div key={stat.label} className="bg-pine-900 p-6">
                <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                  {stat.label}
                </div>
                <div className="mt-2 font-display text-2xl sm:text-3xl text-cream-100">
                  {stat.value}
                  {stat.suffix && (
                    <span className="ms-1 text-base text-gold-400">{stat.suffix}</span>
                  )}
                </div>
                <div className="mt-1 text-sm text-cream-100/50">{stat.desc}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
