import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

/**
 * The long-form article behind the /insights "Featured" card. Its own route
 * rather than a scroll-to on another page, so it reads as a real piece of
 * writing rather than a teaser with nowhere to go.
 *
 * The regions grid pulls straight from dict.origin.regions (the same data
 * the homepage Origin map uses) instead of restating each region's profile
 * in new words — one source of truth for what Birra's seven origins actually
 * taste like. The closing "Birra's role" section is the only part that makes
 * claims about the company itself, and every fact in it already appears
 * elsewhere on the site (export page, origin map, certifications) — nothing
 * here is new or invented.
 *
 * Layout: a dark masthead (title, dek, byline) with a contained, moderately
 * sized hero image — not a full-bleed banner, which read as overpowering —
 * then the body switches to the site's light editorial palette with a
 * sticky "in this article" table of contents, matching how the rest of the
 * site treats long-form reading versus its dark marketing sections.
 */
export default function EthiopianOriginsArticle({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const a = dict.insightsPage.article;
  const regions = dict.origin.regions;

  const wordCount = [
    ...a.sections.map((s) => s.body),
    a.regions.body,
    a.processing.body,
    ...a.sections2.map((s) => s.body),
    a.birra.body,
  ].join(" ").split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const toc = [
    { id: "birthplace", label: a.sections[0].title },
    { id: "terroir", label: a.sections[1].title },
    { id: "regions", label: a.regions.title },
    { id: "processing", label: a.processing.title },
    { id: "flavor", label: a.sections2[0].title },
    { id: "market", label: a.sections2[1].title },
    { id: "birra-role", label: a.birra.title },
  ];

  return (
    <article>
      <header className="texture-lines relative bg-pine-900 pb-10 pt-40">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-3">
              <a
                href={`/${locale}/insights`}
                className="inline-flex items-center gap-2 text-sm text-cream-100/60 hover:text-gold-400 transition-colors"
              >
                ← {a.backLabel}
              </a>
              <span className="h-px w-8 bg-cream-100/20" />
              <span className="font-mono text-xs tracking-[0.25em] text-gold-400">
                {a.eyebrow}
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.1] text-cream-100 text-balance">
              {a.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-cream-100/70 leading-relaxed">
              {a.dek}
            </p>

            <div className="mt-8 flex items-center gap-3 border-t border-cream-100/10 pt-6 font-mono text-[11px] tracking-wide text-cream-100/40">
              <span>{a.byline}</span>
              <span>·</span>
              <span>
                {readTime} {a.readTimeSuffix}
              </span>
              <span>·</span>
              <span>{a.category}</span>
            </div>
          </AnimatedSection>
        </Container>
      </header>

      <AnimatedSection>
        <div className="relative h-[240px] sm:h-[360px] bg-pine-900">
          <Image
            src="/images/story/highlands.jpeg"
            alt={a.heroPhotoCaption}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <span className="absolute bottom-4 start-4 rounded bg-pine-950/60 px-2 py-1 font-mono text-[10px] tracking-wide text-cream-100/90">
            {a.heroPhotoCaption}
          </span>
        </div>
      </AnimatedSection>

      <div className="bg-cream-50">
        <Container>
          <div className="grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_240px] lg:gap-20">
            <div className="max-w-2xl">
              <AnimatedSection id="birthplace" className="scroll-mt-28">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold-600">
                  {a.sections[0].eyebrow}
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink-700">
                  {a.sections[0].title}
                </h2>
                <p className="mt-4 text-ink-500 leading-relaxed">{a.sections[0].body}</p>
              </AnimatedSection>

              <AnimatedSection id="terroir" className="mt-12 scroll-mt-28">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold-600">
                  {a.sections[1].eyebrow}
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink-700">
                  {a.sections[1].title}
                </h2>
                <p className="mt-4 text-ink-500 leading-relaxed">{a.sections[1].body}</p>

                {a.sections[1].quote && (
                  <blockquote className="mt-6 border-s-4 border-gold-400 bg-white py-4 ps-6 pe-4">
                    <p className="font-display text-xl leading-snug text-ink-700 text-balance">
                      {a.sections[1].quote}
                    </p>
                  </blockquote>
                )}
              </AnimatedSection>

              {/* Regions — real data shared with the homepage origin map,
                  not restated copy. */}
              <AnimatedSection id="regions" className="mt-12 scroll-mt-28">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold-600">
                  {a.regions.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink-700">
                  {a.regions.title}
                </h2>
                <p className="mt-4 text-ink-500 leading-relaxed">{a.regions.body}</p>
              </AnimatedSection>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {regions.map((r, i) => (
                  <AnimatedSection
                    key={r.id}
                    delay={i * 0.04}
                    className="rounded-xl border border-ink-700/10 bg-white p-5"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg text-ink-700">{r.name}</h3>
                      <span className="shrink-0 font-mono text-[10px] tracking-wide text-ink-400">
                        {r.altitude}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-ink-400">
                      {r.subtitle}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {r.profile.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-ink-700/15 px-2.5 py-1 text-[11px] text-ink-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Processing */}
              <AnimatedSection id="processing" className="mt-12 scroll-mt-28">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold-600">
                  {a.processing.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink-700">
                  {a.processing.title}
                </h2>
                <p className="mt-4 text-ink-500 leading-relaxed">{a.processing.body}</p>
              </AnimatedSection>

              <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-ink-700/10 bg-ink-700/10 sm:grid-cols-3">
                {a.processing.methods.map((m, i) => (
                  <AnimatedSection key={m.name} delay={i * 0.05} className="bg-white p-6">
                    <h3 className="font-display text-lg text-ink-700">{m.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">{m.desc}</p>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection id="flavor" className="mt-12 scroll-mt-28">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold-600">
                  {a.sections2[0].eyebrow}
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink-700">
                  {a.sections2[0].title}
                </h2>
                <p className="mt-4 text-ink-500 leading-relaxed">{a.sections2[0].body}</p>
              </AnimatedSection>

              <AnimatedSection id="market" className="mt-12 scroll-mt-28">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold-600">
                  {a.sections2[1].eyebrow}
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink-700">
                  {a.sections2[1].title}
                </h2>
                <p className="mt-4 text-ink-500 leading-relaxed">{a.sections2[1].body}</p>
              </AnimatedSection>

              {/* Birra's role — the only section that makes claims about the
                  company; every fact here is already published elsewhere. */}
              <AnimatedSection id="birra-role" className="mt-12 scroll-mt-28 border-t border-ink-700/10 pt-10">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold-600">
                  {a.birra.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink-700">
                  {a.birra.title}
                </h2>
                <p className="mt-4 text-ink-500 leading-relaxed">{a.birra.body}</p>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <a
                    href={`/${locale}/coffee-export`}
                    className="inline-flex items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-pine-950 transition-colors hover:bg-gold-300"
                  >
                    {a.birra.exportCta} →
                  </a>
                  <a
                    href={`/${locale}/contact`}
                    className="inline-flex items-center justify-center rounded-full border border-ink-700/20 px-6 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-ink-700/40"
                  >
                    {a.birra.contactCta} →
                  </a>
                  <a
                    href={`/${locale}/insights`}
                    className="text-sm font-medium text-ink-500 underline underline-offset-4 hover:text-ink-700"
                  >
                    {a.backLabel}
                  </a>
                </div>
              </AnimatedSection>
            </div>

            {/* Table of contents — sticky alongside the reading column. */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                  {a.tocLabel}
                </span>
                <nav className="mt-4 flex flex-col gap-3 border-s border-ink-700/10 ps-4">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-sm leading-snug text-ink-500 hover:text-ink-700 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </article>
  );
}
