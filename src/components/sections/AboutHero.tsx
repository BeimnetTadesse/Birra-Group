"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutHero({ dict }: { dict: Dictionary }) {
  const h = dict.aboutPage.hero;
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="texture-lines relative bg-pine-900 pb-20 pt-40 sm:pb-28">
      <Container>
        <AnimatedSection className="max-w-3xl">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.1] text-cream-100">
            {h.title}
          </h1>
          <p className="mt-6 max-w-2xl text-cream-100/80 leading-relaxed">{h.body1}</p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-4 max-w-2xl text-cream-100/80 leading-relaxed">{h.body2}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-400 underline underline-offset-4 hover:text-gold-300"
          >
            {expanded ? h.readLess : h.readMore}
            <span className={`transition-transform ${expanded ? "-rotate-90" : "rotate-90"}`}>
              ↓
            </span>
          </button>
        </AnimatedSection>
      </Container>
    </section>
  );
}
