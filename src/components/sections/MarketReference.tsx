import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import type { CoffeePrice } from "@/lib/market-price";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

/**
 * International Arabica reference price, shown as a two-panel card: the
 * headline figure on the left, the supporting range/history stats on the
 * right. Every stat on the right is real data from the same contract CNBC
 * quoted (see src/lib/market-price.ts) — nothing here is estimated or
 * carried over from a different instrument.
 *
 * The right panel is data-driven, not fixed: on the CNBC happy path it shows
 * a chart plus four stats; when only the Yahoo fallback answered (price only,
 * no history), it quietly shows less rather than inventing numbers.
 */
export default function MarketReference({
  dict,
  locale,
  price,
}: {
  dict: Dictionary;
  locale: Locale;
  price: CoffeePrice | null;
}) {
  if (!price) return null;

  const m = dict.market;
  const usdPerLb = price.centsPerLb / 100;
  const pct = price.changePercent;
  const down = pct !== null && pct < 0;
  const up = pct !== null && pct > 0;

  const updated = new Date(price.fetchedAt).toLocaleString(
    locale === "ar" ? "ar" : "en-GB",
    { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" },
  );

  const closes = price.history.map((p) => p.close / 100);
  const hasChart = closes.length >= 2;
  const rangeLow = hasChart ? Math.min(...closes) : null;
  const rangeHigh = hasChart ? Math.max(...closes) : null;

  const stats = [
    price.previousCloseCents !== null && {
      label: m.prevCloseLabel,
      value: `$${(price.previousCloseCents / 100).toFixed(3)}`,
    },
    rangeHigh !== null && { label: m.highLabel, value: `$${rangeHigh.toFixed(3)}` },
    rangeLow !== null && { label: m.lowLabel, value: `$${rangeLow.toFixed(3)}` },
    { label: m.contractLabel, value: m.contractValue, serif: true },
  ].filter((s): s is { label: string; value: string; serif?: boolean } => Boolean(s));

  const hasRightPanel = hasChart || stats.length > 0;

  return (
    <section className="relative bg-pine-950 py-16 sm:py-20">
      <Container>
        <AnimatedSection>
          <div
            className={`mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-cream-100/10 bg-gradient-to-br from-pine-900 to-pine-950 ${
              hasRightPanel ? "lg:grid-cols-2" : ""
            }`}
          >
            {/* Left — the figure a visitor actually came for. */}
            <div className="p-8 sm:p-10">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] text-gold-400">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                {m.eyebrow}
              </span>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-display text-5xl sm:text-6xl leading-none text-cream-100 tabular-nums">
                  ${usdPerLb.toFixed(4)}
                </span>
                <span className="font-display text-xl text-cream-100/40">{m.perLb}</span>
              </div>

              {pct !== null && (
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm tabular-nums ${
                    down
                      ? "border-[#D98A6A]/30 text-[#D98A6A]"
                      : up
                        ? "border-[#8FBF9F]/30 text-[#8FBF9F]"
                        : "border-cream-100/20 text-cream-100/50"
                  }`}
                >
                  {down ? "▼" : up ? "▲" : "—"} {Math.abs(pct).toFixed(2)}% {m.today}
                </span>
              )}

              <p className="mt-6 text-sm text-cream-100/55">{m.subtitle}</p>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-100/70">
                {m.disclaimer}
              </p>

              <a
                href={`/${locale}/contact`}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-pine-950 transition-colors hover:bg-gold-300"
              >
                {m.cta}
              </a>

              <p className="mt-5 font-mono text-[10px] tracking-wide text-cream-100/30">
                {m.updated} {updated} UTC · {m.sourceLabel}: {price.source}
              </p>
            </div>

            {/* Right — range and history, only when the data backs it. */}
            {hasRightPanel && (
              <div className="border-t border-cream-100/10 lg:border-l lg:border-t-0">
                {hasChart && rangeLow !== null && rangeHigh !== null && (
                  <div className="flex items-center justify-between p-6 pb-0 font-mono text-[10px] tracking-[0.18em] text-cream-100/40">
                    <span>{m.rangeLabel}</span>
                    <span className="tabular-nums text-cream-100/70">
                      ${rangeLow.toFixed(3)} – ${rangeHigh.toFixed(3)}
                    </span>
                  </div>
                )}

                {hasChart && <Sparkline closes={closes} />}

                {stats.length > 0 && (
                  <div
                    className={`grid grid-cols-2 ${hasChart ? "border-t border-cream-100/10" : ""}`}
                  >
                    {stats.map((s, i) => (
                      <div
                        key={s.label}
                        className={`p-6 ${i % 2 === 0 ? "border-r border-cream-100/10" : ""} ${
                          i >= 2 ? "border-t border-cream-100/10" : ""
                        }`}
                      >
                        <div className="font-mono text-[10px] tracking-[0.18em] text-cream-100/40">
                          {s.label}
                        </div>
                        <div
                          className={`mt-1.5 tabular-nums text-cream-100 ${
                            s.serif ? "font-display text-2xl leading-snug" : "text-2xl font-medium"
                          }`}
                        >
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}

function Sparkline({ closes }: { closes: number[] }) {
  const w = 400;
  const h = 140;
  const pad = 6;
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const span = max - min || 1;

  const points = closes.map((c, i) => {
    const x = (i / (closes.length - 1)) * (w - pad * 2) + pad;
    const y = h - pad - ((c - min) / span) * (h - pad * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${points[points.length - 1][0].toFixed(1)},${h - pad} L${points[0][0].toFixed(1)},${h - pad} Z`;
  const last = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="market-sparkline-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efa924" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#efa924" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#market-sparkline-fill)" />
      <path d={line} fill="none" stroke="#efa924" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill="#efa924" />
    </svg>
  );
}
