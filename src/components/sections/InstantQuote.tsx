"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const GRADE_PRICE: Record<string, number> = {
  Specialty: 5.27,
  مختصة: 5.27,
  G1: 4.77,
  G2: 4.27,
  G3: 3.77,
  G4: 3.27,
};

const PORT_FACTOR: Record<string, { mult: number; days: string }> = {
  Rotterdam: { mult: 1.0, days: "28–35" },
  روتردام: { mult: 1.0, days: "28–35" },
  Jeddah: { mult: 0.97, days: "18–25" },
  جدة: { mult: 0.97, days: "18–25" },
  "New York": { mult: 1.05, days: "30–38" },
  نيويورك: { mult: 1.05, days: "30–38" },
  Shanghai: { mult: 1.08, days: "32–40" },
  شنغهاي: { mult: 1.08, days: "32–40" },
};

const MIN_VOLUME = 1;
const MAX_VOLUME = 40;
const LB_PER_MT = 2204.62;

function volumeDiscount(volume: number) {
  if (volume >= 30) return 8;
  if (volume >= 20) return 6;
  if (volume >= 10) return 4;
  if (volume >= 5) return 2;
  return 0;
}

export default function InstantQuote({ dict }: { dict: Dictionary }) {
  const q = dict.quote;
  const [grade, setGrade] = useState(q.grades[1] ?? q.grades[0]);
  const [volume, setVolume] = useState(5);
  const [port, setPort] = useState(q.ports[0]);
  const [submitted, setSubmitted] = useState(false);

  const { unit, total, days, discountPct } = useMemo(() => {
    const base = GRADE_PRICE[grade] ?? 4.5;
    const factor = PORT_FACTOR[port] ?? { mult: 1, days: "28–35" };
    const discountPct = volumeDiscount(volume);
    const unit = base * factor.mult * (1 - discountPct / 100);
    const total = unit * volume * LB_PER_MT;
    return { unit, total, days: factor.days, discountPct };
  }, [grade, volume, port]);

  const leadTimeNote = q.leadTimeNote
    .replace("{days}", days)
    .replace("{discount}", discountPct > 0 ? `${discountPct}%` : q.noDiscount);

  return (
    <section id="quote" className="relative bg-pine-800 py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <AnimatedSection>
          <Eyebrow>{q.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-cream-100 text-balance">
            {q.title}
          </h2>
          <p className="mt-6 max-w-md text-cream-100/70 leading-relaxed">{q.body}</p>

          <div className="mt-10 flex gap-10 border-t border-cream-100/15 pt-8">
            {[
              [q.minOrderLabel, q.minOrderValue],
              [q.fullContainerLabel, q.fullContainerValue],
              [q.incotermsLabel, q.incotermsValue],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="font-display text-xl sm:text-2xl text-cream-100">{value}</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-cream-100/50">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl bg-cream-50 p-6 sm:p-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                {q.gradeLabel}
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {q.grades.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                      g === grade
                        ? "bg-pine-700 text-cream-100"
                        : "border border-ink-700/15 text-ink-500 hover:border-ink-700/40"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                  {q.volumeLabel}
                </span>
                <span className="font-display text-xl text-ink-700">
                  {Number.isInteger(volume) ? volume : volume.toFixed(1)} MT
                </span>
              </div>
              <input
                type="range"
                min={MIN_VOLUME}
                max={MAX_VOLUME}
                step={1}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="mt-3 w-full accent-gold-500"
              />
              <div className="flex justify-between font-mono text-[10px] text-ink-400">
                <span>{MIN_VOLUME} MT</span>
                <span>{MAX_VOLUME} MT</span>
              </div>
            </div>

            <div className="mt-6">
              <label className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                {q.portLabel}
              </label>
              <select
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="mt-2 w-full rounded-lg border border-ink-700/15 bg-white px-4 py-3 text-sm text-ink-700 outline-none focus:border-pine-500"
              >
                {q.ports.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 rounded-xl bg-ink-700/5 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                    {q.estUnitLabel}
                  </div>
                  <div className="font-display text-3xl text-pine-700">
                    ${unit.toFixed(2)}
                    <span className="text-sm text-ink-400">/lb</span>
                  </div>
                </div>
                <div className="text-end">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                    {q.estTotalLabel}
                  </div>
                  <div className="font-display text-2xl text-ink-700">
                    ${Math.round(total).toLocaleString()}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-ink-500">{leadTimeNote}</p>
              <p className="mt-1 text-xs text-ink-400">{q.disclaimer}</p>
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="mt-6 block rounded-full bg-pine-700 px-6 py-3 text-center text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-pine-600"
            >
              {submitted ? q.submitted : q.submit}
            </button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
