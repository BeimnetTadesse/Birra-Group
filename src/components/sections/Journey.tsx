"use client";

import { useRef, type PointerEvent } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Journey({ dict }: { dict: Dictionary }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0 });

  function onPointerDown(e: PointerEvent) {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    const el = trackRef.current;
    if (!el || !dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScroll - dx;
  }

  function onPointerUp() {
    dragState.current.dragging = false;
  }

  return (
    <section id="journey" className="relative bg-cream-50 py-24 sm:py-32">
      <Container>
        <AnimatedSection>
          <Eyebrow>{dict.journey.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700 text-balance">
            {dict.journey.title}
          </h2>
        </AnimatedSection>
      </Container>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="scroll-drag mt-12 flex cursor-grab gap-5 overflow-x-auto px-6 pb-4 active:cursor-grabbing sm:px-10 lg:px-16"
      >
        {dict.journey.stages.map((stage, i) => (
          <div
            key={stage.number}
            className="w-[78vw] max-w-[300px] shrink-0 select-none overflow-hidden rounded-xl border border-ink-700/10 bg-white/60"
          >
            <div className="texture-lines-light relative aspect-[4/3] bg-cream-200">
              <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-ink-500/70">
                PHOTO — {stage.title.toUpperCase()}
              </span>
            </div>
            <div className="p-5">
              <span className="font-mono text-xs text-gold-600">{stage.number}</span>
              <h3 className="mt-1 font-display text-lg text-ink-700">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{stage.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Container>
        <div className="mt-2 flex items-center justify-between border-t border-ink-700/10 pt-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
            {dict.journey.dragHint}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-gold-600">
            {dict.journey.endLabel}
          </span>
        </div>
      </Container>
    </section>
  );
}
