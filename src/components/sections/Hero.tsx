"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import CountUp from "@/components/ui/CountUp";

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

// Starting number shown immediately on load, very close to the final value so
// the counters never visibly sit at 0 and don't count up by much.
function startValueFor(value: number) {
  if (value <= 1) return value;
  if (value < 50) return Math.max(0, Math.round(value * 0.9));
  if (value < 1000) return Math.round(value * 0.96);
  return Math.round(value * 0.985);
}

export default function Hero({ dict }: { dict: Dictionary }) {
  const renderStatValue = (value: string, suffix: string) => {
    // If value contains a space (like "Top 20"), only the trailing number counts up
    if (value.toLowerCase().startsWith("top ") || value.toLowerCase().startsWith("من أفضل ")) {
      const parts = value.split(" ");
      const numberPart = Number(parts.pop()?.replace(/,/g, "") ?? 0);
      const textPart = parts.join(" ");
      return (
        <span className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal text-cream-100 leading-none">
          {textPart}{" "}
          <span className="text-gold-400">
            <CountUp value={numberPart} from={startValueFor(numberPart)} delay={0} />
          </span>
        </span>
      );
    }
    const numeric = Number(value.replace(/,/g, ""));
    return (
      <span className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal text-cream-100 leading-none">
        <CountUp value={numeric} from={startValueFor(numeric)} delay={0} />
        {suffix && (
          <span className="ms-1.5 text-base font-sans font-normal text-gold-400">
            {suffix}
          </span>
        )}
      </span>
    );
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[850px] lg:min-h-screen w-full items-stretch overflow-hidden bg-pine-950 pb-12 pt-32 sm:pb-16"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Slight neutral dim across the whole video — no color cast, just a touch darker */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Left-to-right gradient — only for text legibility on the left, video stays untouched from center to the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-pine-950/90 via-pine-950/20 to-transparent" />
      
      {/* Texture lines overlay on top of video */}
      <div className="texture-lines absolute inset-0 opacity-80 pointer-events-none" />

      <Container className="relative z-10 flex flex-col justify-between pt-6">
        {/* Main Content & Stats */}
        <motion.div variants={container} initial={false} animate="show" className="mt-16 sm:mt-20 w-full text-start">
          <div className="max-w-5xl">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-gold-400"
            >
              <span className="h-px w-10 bg-gold-400" />
              {dict.hero.eyebrow}
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-8 font-display font-normal text-5xl sm:text-7xl lg:text-[82px] leading-[1.08] text-cream-100 tracking-tight"
            >
              {dict.hero.titleLine1}
              <br />
              {dict.hero.titlePrefix}{" "}
              <span className="font-display italic text-gold-400">{dict.hero.titleWorld}</span>
            </motion.h1>

            <motion.p variants={item} className="mt-8 max-w-2xl text-sm sm:text-base font-normal text-cream-100/75 leading-relaxed">
              {dict.hero.subtitle}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#origin"
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
          </div>

          <motion.div
            variants={item}
            className="mt-14 border-t border-cream-100/10 pt-8 grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-4 w-full"
          >
            {dict.hero.stats.map((stat) => (
              <div key={stat.label} className="text-center flex flex-col items-center justify-between">
                <div>{renderStatValue(stat.value, stat.suffix)}</div>
                <div className="mt-3 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-cream-100/40 uppercase leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
