"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";
import QrPattern from "@/components/ui/QrPattern";

export default function Traceability({ dict }: { dict: Dictionary }) {
  const lots = dict.traceability.lots;
  const [activeCode, setActiveCode] = useState(lots[0].code);
  const active = lots.find((l) => l.code === activeCode) ?? lots[0];

  return (
    <section id="traceability" className="relative bg-pine-950 py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <AnimatedSection>
          <Eyebrow>{dict.traceability.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-cream-100 text-balance">
            {dict.traceability.title}
          </h2>
          <p className="mt-6 max-w-md text-cream-100/70 leading-relaxed">
            {dict.traceability.body}
          </p>

          <div className="mt-10">
            <span className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
              {dict.traceability.sampleLabel}
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {lots.map((lot) => (
                <button
                  key={lot.code}
                  onClick={() => setActiveCode(lot.code)}
                  className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
                    lot.code === activeCode
                      ? "bg-gold-400 text-pine-950"
                      : "border border-cream-100/20 text-cream-100/70 hover:border-cream-100/50"
                  }`}
                >
                  {lot.code}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-cream-100/10 bg-pine-900/50 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="w-32 shrink-0 overflow-hidden rounded-lg bg-white p-2 sm:w-36">
                <QrPattern seed={active.code} className="w-full" />
              </div>
              <div className="text-end">
                <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                  {dict.traceability.lotCodeLabel}
                </div>
                <div className="mt-1 font-mono text-sm text-gold-400">{active.code}</div>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 px-3 py-1 font-mono text-[10px] tracking-wide text-cream-100/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  {dict.traceability.demoLotBadge}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-cream-100/10 bg-cream-100/10">
              <div className="bg-pine-950 p-4">
                <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                  {dict.traceability.originLabel}
                </div>
                <div className="mt-1 text-sm text-cream-100">
                  {dict.traceability.originValue}
                </div>
              </div>
              <div className="bg-pine-950 p-4">
                <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                  {dict.traceability.processLabel}
                </div>
                <div className="mt-1 text-sm text-cream-100">
                  {active.process} · {active.region}
                </div>
              </div>
              <div className="bg-pine-950 p-4">
                <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                  {dict.traceability.cuppingLabel}
                </div>
                <div className="mt-1 text-sm text-cream-100">
                  {dict.traceability.cuppingValue}
                </div>
              </div>
              <div className="bg-pine-950 p-4">
                <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                  {dict.traceability.harvestLabel}
                </div>
                <div className="mt-1 text-sm text-cream-100">
                  {dict.traceability.harvestValue}
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-cream-100/40">
              {dict.traceability.footnote}
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
