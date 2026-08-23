"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Marquee from "@/components/ui/Marquee";

const ETHIOPIA = { x: 59.2, y: 45.9 };

const DESTINATIONS = [
  { x: 30, y: 26, label: "United States" },
  { x: 28, y: 19, label: "Canada" },
  { x: 74, y: 30, label: "China" },
  { x: 85, y: 21, label: "Japan", labelPos: { x: 75, y: 41 } },
  { x: 84, y: 26, label: "South Korea" },
];

const REGION_LABELS = [
  { x: 75, y: 35, label: "Asia" },
  { x: 63, y: 32, label: "Middle East" },
];

type Pt = { x: number; y: number };

function arcPath(from: Pt, to: Pt): string {
  const mx = (from.x + to.x) / 2;
  const my = Math.min(from.y, to.y) - Math.abs(to.x - from.x) * 0.12;
  return `M ${from.x} ${from.y} Q ${mx} ${my}, ${to.x} ${to.y}`;
}

function TravellingDot({
  from,
  to,
  delay,
}: {
  from: Pt;
  to: Pt;
  delay: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  const cx = useMotionValue(from.x);
  const cy = useMotionValue(from.y);
  const opacity = useMotionValue(0);

  useEffect(() => {
    const path = ref.current;
    if (!path) return;
    const length = path.getTotalLength();

    const controls = animate(0, 1, {
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: 1.5,
      ease: "easeInOut",
      onUpdate: (v) => {
        const pt = path.getPointAtLength(v * length);
        cx.set(pt.x);
        cy.set(pt.y);
        opacity.set(v < 0.05 ? v / 0.05 : v > 0.9 ? (1 - v) / 0.1 : 1);
      },
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, delay]);

  return (
    <>
      <path ref={ref} d={arcPath(from, to)} fill="none" stroke="none" />
      <motion.circle cx={cx} cy={cy} r="0.7" fill="#efa924" opacity={opacity} />
    </>
  );
}

export default function GlobalReach({ dict }: { dict: Dictionary }) {

  return (
    <section id="reach" className="texture-lines relative bg-pine-900 py-12 sm:py-14">
      <Container>
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{dict.reach.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl text-cream-100">
            {dict.reach.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-cream-100/70">{dict.reach.subtitle}</p>
        </AnimatedSection>

        <AnimatedSection
          delay={0.1}
          className="relative mx-auto mt-5 aspect-[1855/848] w-full max-w-2xl overflow-hidden rounded-2xl border border-cream-100/10 bg-pine-950"
        >
          <Image
            src="/images/world-map.jpg"
            alt="World map showing Birra Group's export destinations"
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            loading="eager"
            className="object-cover"
          />

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {/* Subtle arc lines from Ethiopia */}
            {DESTINATIONS.map((d) => (
              <path
                key={d.label}
                d={arcPath(ETHIOPIA, d)}
                fill="none"
                stroke="rgba(239,169,36,0.12)"
                strokeWidth="0.15"
              />
            ))}

            {/* Travelling dots along arcs */}
            {DESTINATIONS.map((d, i) => (
              <TravellingDot
                key={d.label}
                from={ETHIOPIA}
                to={d}
                delay={i * 0.8}
              />
            ))}

            {/* Country name labels — always visible */}
            {DESTINATIONS.map((d) => {
              const labelPos = d.labelPos ?? { x: d.x, y: d.y - 1.5 };
              return (
                <text
                  key={d.label}
                  x={labelPos.x}
                  y={labelPos.y}
                  fill="#f7f2e6"
                  opacity="0.85"
                  fontSize="1.6"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {d.label}
                </text>
              );
            })}

            {/* Region labels — smaller */}
            {REGION_LABELS.map((r) => (
              <text
                key={r.label}
                x={r.x}
                y={r.y}
                fill="#efa924"
                opacity="0.45"
                fontSize="1.3"
                textAnchor="middle"
                fontFamily="monospace"
                textDecoration="none"
              >
                {r.label}
              </text>
            ))}
          </svg>
        </AnimatedSection>

        <AnimatedSection
          delay={0.15}
          className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cream-100/10 bg-cream-100/10 sm:grid-cols-4"
        >
          {dict.reach.stats.map((stat) => (
            <div key={stat.label} className="bg-pine-900 p-4">
              <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                {stat.label}
              </div>
              <div className="mt-1 font-display text-xl sm:text-2xl text-cream-100">
                {stat.value}
              </div>
            </div>
          ))}
        </AnimatedSection>
      </Container>

      <div className="mt-6 border-t border-cream-100/10 py-3">
        <Marquee items={dict.reach.tickerRegions} />
      </div>
    </section>
  );
}
