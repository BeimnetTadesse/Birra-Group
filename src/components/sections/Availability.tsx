"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Availability({ dict }: { dict: Dictionary }) {
  const rows = dict.availability.rows;
  const [region, setRegion] = useState("all");

  const regions = useMemo(() => Array.from(new Set(rows.map((r) => r.region))), [rows]);
  const filtered = region === "all" ? rows : rows.filter((r) => r.region === region);

  return (
    <section id="availability" className="relative bg-cream-50 py-24 sm:py-32">
      <Container>
        <AnimatedSection className="max-w-2xl">
          <Eyebrow>{dict.availability.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700">
            {dict.availability.title}
          </h2>
          <p className="mt-5 text-ink-500">{dict.availability.body}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-8">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-full border border-ink-700/15 bg-white px-4 py-2 text-sm text-ink-700 outline-none focus:border-pine-500"
          >
            <option value="all">{dict.availability.filterLabel}</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </AnimatedSection>

        <AnimatedSection
          delay={0.15}
          className="mt-6 overflow-hidden rounded-xl border border-ink-700/10"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-start">
              <thead>
                <tr className="bg-pine-700 text-cream-100">
                  <th className="px-5 py-3 text-start font-mono text-[10px] tracking-[0.2em] font-normal">
                    {dict.availability.columns.lot}
                  </th>
                  <th className="px-5 py-3 text-start font-mono text-[10px] tracking-[0.2em] font-normal">
                    {dict.availability.columns.region}
                  </th>
                  <th className="px-5 py-3 text-start font-mono text-[10px] tracking-[0.2em] font-normal">
                    {dict.availability.columns.process}
                  </th>
                  <th className="px-5 py-3 text-start font-mono text-[10px] tracking-[0.2em] font-normal">
                    {dict.availability.columns.cup}
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row.code}
                    className={i % 2 === 0 ? "bg-white" : "bg-cream-100/60"}
                  >
                    <td className="px-5 py-4 font-mono text-sm text-ink-700">
                      <span className="me-2 inline-block h-1.5 w-1.5 rounded-full bg-pine-500 align-middle" />
                      {row.code}
                    </td>
                    <td className="px-5 py-4 text-sm text-ink-500">{row.region}</td>
                    <td className="px-5 py-4 text-sm text-ink-500">{row.process}</td>
                    <td className="px-5 py-4 text-sm text-ink-500">
                      {dict.availability.cupValue}
                    </td>
                    <td className="px-5 py-4 text-end">
                      <a
                        href="#traceability"
                        className="rounded-full border border-ink-700/20 px-3 py-1 text-xs text-ink-700 hover:border-pine-500 hover:text-pine-700"
                      >
                        {dict.availability.columns.action}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-1 border-t border-ink-700/10 bg-white px-5 py-3 text-[10px] font-mono tracking-[0.15em] text-ink-400 sm:flex-row sm:items-center sm:justify-between">
            <span>
              {filtered.length} {dict.availability.countLabel}
            </span>
            <span>{dict.availability.disclaimer}</span>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
