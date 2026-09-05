"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BusinessRing from "@/components/sections/BusinessRing";

const ADVANCE_MS = 4000;

// Only these three ventures have their own standalone site so far — the rest
// of the ring links nowhere. Keyed by item number so this stays correct even
// if titles get reworded later.
const SITE_URLS: Record<string, string> = {
  "01": process.env.NEXT_PUBLIC_BIRRA_EXPORT_URL ?? "https://birra-coffee-export.vercel.app/en",
  "02": process.env.NEXT_PUBLIC_BIRRA_ROASTERY_URL ?? "https://birra-coffee-roastery.vercel.app/en",
  "03": process.env.NEXT_PUBLIC_BIRRA_LIVING_URL ?? "https://birra-living.vercel.app/en",
};

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
  const siteUrl = SITE_URLS[item.number];

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
              {siteUrl && (
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-400 underline underline-offset-4 transition-colors hover:text-gold-300"
                >
                  {b.visitCta.replace("{title}", item.title)} →
                </a>
              )}
            </div>
          </div>

          {/* Right: ring of boxes on large screens; a plain numbered list
              stands in on small screens where an absolutely-positioned ring
              has no room to breathe. */}
          <div className="flex flex-col justify-center">
            <BusinessRing items={b.items} active={active} onSelect={setActive} />

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
