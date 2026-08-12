"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Marquee from "@/components/ui/Marquee";

// Percent coordinates keyed to /public/images/world-map.jpg (measured against
// the actual dot/route positions already printed on that map image, so the
// hover targets and the travelling dots line up with it).
const ETHIOPIA = { x: 56.5, y: 44.8 };
const DESTINATIONS = [
  { x: 30.0, y: 21.9, label: "New York" },
  { x: 50.3, y: 19.2, label: "Rotterdam" },
  { x: 54.9, y: 32.0, label: "Jeddah" },
  { x: 70.8, y: 27.9, label: "Shanghai" },
  { x: 73.7, y: 72.2, label: "Melbourne" },
];

type Pt = { x: number; y: number };

// Waypoints traced directly off the dashed lines actually printed on
// world-map.jpg (sampled from the image's own pixels), so the travelling dot
// hugs the real route instead of cutting a straight/generic curve across it.
const ROUTES: Record<string, Pt[]> = {
  Jeddah: [ETHIOPIA, { x: 55.4, y: 35.1 }, { x: 54.4, y: 32.7 }, { x: 54.9, y: 32.0 }],
  Rotterdam: [
    ETHIOPIA,
    { x: 55.4, y: 35.1 },
    { x: 54.4, y: 32.7 },
    { x: 53.7, y: 29.6 },
    { x: 53.0, y: 26.5 },
    { x: 52.6, y: 25.2 },
    { x: 52.2, y: 23.8 },
    { x: 51.6, y: 22.2 },
    { x: 51.5, y: 19.3 },
    { x: 50.3, y: 19.2 },
  ],
  "New York": [
    ETHIOPIA,
    { x: 55.4, y: 35.1 },
    { x: 54.4, y: 32.7 },
    { x: 53.7, y: 29.6 },
    { x: 53.0, y: 26.5 },
    { x: 52.6, y: 25.2 },
    { x: 52.2, y: 23.8 },
    { x: 51.6, y: 22.2 },
    { x: 51.5, y: 19.3 },
    { x: 51.2, y: 13.0 },
    { x: 45.5, y: 7.0 },
    { x: 40.7, y: 7.15 },
    { x: 34.0, y: 13.0 },
    { x: 30.9, y: 19.3 },
    { x: 30.0, y: 21.9 },
  ],
  Shanghai: [
    ETHIOPIA,
    { x: 58.3, y: 38.1 },
    { x: 58.6, y: 39.6 },
    { x: 59.6, y: 37.3 },
    { x: 60.7, y: 35.1 },
    { x: 61.2, y: 34.1 },
    { x: 61.8, y: 33.0 },
    { x: 62.3, y: 32.2 },
    { x: 63.5, y: 30.6 },
    { x: 64.1, y: 29.9 },
    { x: 64.7, y: 29.3 },
    { x: 65.3, y: 28.8 },
    { x: 65.9, y: 28.2 },
    { x: 66.6, y: 27.8 },
    { x: 67.2, y: 27.5 },
    { x: 68.5, y: 27.3 },
    { x: 69.1, y: 27.2 },
    { x: 69.8, y: 27.3 },
    { x: 70.4, y: 27.3 },
    { x: 70.8, y: 27.9 },
  ],
  Melbourne: [
    ETHIOPIA,
    { x: 58.0, y: 45.3 },
    { x: 58.6, y: 49.5 },
    { x: 59.1, y: 50.9 },
    { x: 60.0, y: 53.3 },
    { x: 61.0, y: 55.7 },
    { x: 61.5, y: 57.1 },
    { x: 62.4, y: 59.5 },
    { x: 62.9, y: 60.6 },
    { x: 63.4, y: 61.9 },
    { x: 65.0, y: 65.1 },
    { x: 65.6, y: 66.1 },
    { x: 67.8, y: 69.6 },
    { x: 68.4, y: 70.2 },
    { x: 69.6, y: 71.3 },
    { x: 70.2, y: 71.6 },
    { x: 73.7, y: 72.2 },
  ],
};

// Smooth the waypoints into a Catmull-Rom spline (as cubic bezier segments)
// so the dot glides along a natural curve instead of a faceted polyline.
function smoothPath(points: Pt[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function ShipmentDot({
  pathRefs,
  routeLabel,
  delay,
  duration,
}: {
  pathRefs: React.RefObject<Record<string, SVGPathElement | null>>;
  routeLabel: string;
  delay: number;
  duration: number;
}) {
  const progress = useMotionValue(0);
  const cx = useMotionValue(ETHIOPIA.x);
  const cy = useMotionValue(ETHIOPIA.y);
  const opacity = useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const glowOpacity = useTransform(opacity, (v) => v * 0.4);

  useEffect(() => {
    const path = pathRefs.current?.[routeLabel];
    if (!path) return;
    const length = path.getTotalLength();

    const applyProgress = (v: number) => {
      const point = path.getPointAtLength(v * length);
      cx.set(point.x);
      cy.set(point.y);
    };
    applyProgress(0);

    const controls = animate(progress, [0, 1], {
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: 0.5,
      ease: "linear",
      onUpdate: applyProgress,
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathRefs, routeLabel, delay, duration]);

  return (
    <>
      <motion.circle cx={cx} cy={cy} r="2.6" fill="#efa924" opacity={glowOpacity} />
      <motion.circle cx={cx} cy={cy} r="1.2" fill="#ffd27a" opacity={opacity} />
    </>
  );
}

export default function GlobalReach({ dict }: { dict: Dictionary }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});

  return (
    <section id="reach" className="texture-lines relative bg-pine-900 py-24 sm:py-32">
      <Container>
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{dict.reach.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-cream-100">
            {dict.reach.title}
          </h2>
          <p className="mt-5 text-cream-100/70">{dict.reach.subtitle}</p>
        </AnimatedSection>

        <AnimatedSection
          delay={0.1}
          className="relative mt-14 aspect-[2481/867] w-full overflow-hidden rounded-2xl border border-cream-100/10 bg-pine-950"
        >
          <Image
            src="/images/world-map.jpg"
            alt="World map showing Birra Group's export routes from Ethiopia"
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
            priority={false}
          />

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {/* invisible geometry paths — the dots below sample points along these
                to follow the exact dashed routes printed on the map image */}
            {Object.entries(ROUTES).map(([label, points]) => (
              <path
                key={label}
                ref={(el) => {
                  pathRefs.current[label] = el;
                }}
                d={smoothPath(points)}
                fill="none"
                stroke="none"
              />
            ))}

            {/* small travelling dot per route, following the printed dashed line */}
            {Object.keys(ROUTES).map((label, i) => (
              <ShipmentDot
                key={label}
                pathRefs={pathRefs}
                routeLabel={label}
                delay={i * 0.9}
                duration={3 + ROUTES[label].length * 0.3}
              />
            ))}

            <motion.circle
              cx={ETHIOPIA.x}
              cy={ETHIOPIA.y}
              r="3.2"
              fill="#efa924"
              opacity="0.25"
              animate={{ r: [3.2, 4.4, 3.2], opacity: [0.25, 0.05, 0.25] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* invisible hover targets — a label only appears on hover, in small type */}
            {DESTINATIONS.map((d) => (
              <g
                key={d.label}
                onMouseEnter={() => setHovered(d.label)}
                onMouseLeave={() => setHovered((h) => (h === d.label ? null : h))}
                className="cursor-pointer"
              >
                <circle cx={d.x} cy={d.y} r="3.2" fill="transparent" />
                {hovered === d.label && (
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    x={d.x}
                    y={d.y - 2.4}
                    fill="#f7f2e6"
                    fontSize="2.1"
                    textAnchor="middle"
                    opacity="0.9"
                  >
                    {d.label}
                  </motion.text>
                )}
              </g>
            ))}
          </svg>
        </AnimatedSection>

        <AnimatedSection
          delay={0.15}
          className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cream-100/10 bg-cream-100/10 sm:grid-cols-4"
        >
          {dict.reach.stats.map((stat) => (
            <div key={stat.label} className="bg-pine-900 p-5">
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

      <div className="mt-10 border-t border-cream-100/10 py-4">
        <Marquee items={dict.reach.tickerRegions} />
      </div>
    </section>
  );
}
