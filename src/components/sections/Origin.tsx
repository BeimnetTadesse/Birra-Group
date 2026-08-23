"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

// Percent coordinates keyed to /public/images/ethiopia-map.jpg (measured
// against the actual pin positions printed on that map image, in region
// order: yirgacheffe, sidamo, guji, harrar, limmu, jimma, nekemte).
const MAP_COORDS: Record<string, { x: number; y: number }> = {
  yirgacheffe: { x: 38.2, y: 66.5 },
  sidamo: { x: 39.4, y: 64.2 },
  guji: { x: 42.0, y: 69.3 },
  harrar: { x: 59.3, y: 49.7 },
  limmu: { x: 30.8, y: 56.2 },
  jimma: { x: 31.1, y: 58.5 },
  nekemte: { x: 29.3, y: 50.8 },
};

// Origin photography, keyed to region id (files in /public/images/origins).
const ORIGIN_PHOTOS: Record<string, string> = {
  yirgacheffe: "/images/origins/yirgacheffe.webp",
  sidamo: "/images/origins/sidamo.webp",
  guji: "/images/origins/guji.jpg",
  harrar: "/images/origins/harrar2.webp",
  limmu: "/images/origins/limmu.jpg",
  jimma: "/images/origins/jimma.jpg",
  nekemte: "/images/origins/lekempti.jpg",
};

export default function Origin({ dict }: { dict: Dictionary }) {
  const regions = dict.origin.regions;
  const [activeId, setActiveId] = useState(regions[0].id);
  const active = regions.find((r) => r.id === activeId) ?? regions[0];

  return (
    <section id="origin" className="texture-lines relative bg-pine-900 py-14 sm:py-16">
      <Container>
        <AnimatedSection>
          <Eyebrow>{dict.origin.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-2xl sm:text-3xl lg:text-4xl text-cream-100">
            {dict.origin.title}
          </h2>
        </AnimatedSection>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <AnimatedSection className="rounded-2xl border border-cream-100/10 bg-pine-900/60 p-4">
            <div className="relative aspect-[1388/1407] overflow-hidden rounded-xl">
              <Image
                src="/images/ethiopia-map.jpg"
                alt="Map of Ethiopia's coffee growing regions"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                loading="eager"
                className="object-cover"
              />
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {regions.map((region) => {
                  const isActive = region.id === activeId;
                  const coord = MAP_COORDS[region.id];
                  if (!coord) return null;
                  return (
                    <g key={region.id}>
                      {isActive && (
                        <circle cx={coord.x} cy={coord.y} r="3.2" fill="#efa924" opacity="0.25" />
                      )}
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r={isActive ? 1.6 : 1}
                        fill={isActive ? "#efa924" : "#f7f2e6"}
                        stroke="#0b1e14"
                        strokeWidth="0.3"
                        className="cursor-pointer transition-all"
                        onClick={() => setActiveId(region.id)}
                      >
                        <title>{region.name}</title>
                      </circle>
                      {isActive && (
                        <text
                          x={coord.x}
                          y={coord.y - 3.2}
                          fill="#f7f2e6"
                          fontSize="2.6"
                          fontWeight="600"
                          textAnchor="middle"
                          letterSpacing="0.05"
                        >
                          {region.name.toUpperCase()}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-cream-100/10 pt-4">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveId(region.id)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                    region.id === activeId
                      ? "bg-gold-400 text-pine-950"
                      : "border border-cream-100/20 text-cream-100/70 hover:border-cream-100/50"
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div
              key={active.id}
              className="relative aspect-[16/9] overflow-hidden rounded-xl border border-cream-100/20 bg-pine-800"
            >
              <Image
                src={ORIGIN_PHOTOS[active.id] ?? "/images/ethiopia-map.jpg"}
                alt={`${active.name} coffee growing region, Ethiopia`}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                loading="eager"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-cream-100/90 bg-pine-950/50 px-2 py-1 rounded">
                {active.name.toUpperCase()}
              </span>
            </div>

            <h3 className="mt-4 font-display text-xl sm:text-2xl text-cream-100">
              {active.name}
            </h3>
            <p className="mt-1 font-mono text-xs tracking-[0.2em] text-gold-400">
              {active.subtitle}
            </p>
            <p className="mt-3 text-sm text-cream-100/70 leading-relaxed">{active.description}</p>

            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-cream-100/10 bg-cream-100/10">
              {[
                [dict.origin.altitudeLabel, active.altitude],
                [dict.origin.processLabel, active.process],
                [dict.origin.varietiesLabel, active.varieties],
                [dict.origin.harvestLabel, active.harvest],
              ].map(([label, value]) => (
                <div key={label} className="bg-pine-800 p-3">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                    {label}
                  </div>
                  <div className="mt-1 text-sm text-cream-100">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {active.profile.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gold-400/40 px-3 py-1 text-xs text-cream-100/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
