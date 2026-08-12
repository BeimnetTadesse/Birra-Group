import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function News({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const n = dict.newsPage;
  const m = n.more;

  return (
    <>
      <section className="relative bg-cream-50 pb-24 pt-40 sm:pb-32">
        <Container>
          <AnimatedSection className="max-w-2xl">
            <Eyebrow>{n.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.1] text-ink-700 text-balance">
              {n.title}
            </h1>
            <p className="mt-6 text-ink-500 leading-relaxed">{n.body}</p>
          </AnimatedSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {n.articles.map((article, i) => (
              <AnimatedSection
                key={article.title}
                delay={i * 0.06}
                className="overflow-hidden rounded-xl border border-ink-700/10 bg-white"
              >
                <div className="texture-lines-light relative aspect-[4/3] bg-cream-200">
                  <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-ink-500/70 bg-cream-50/70 px-2 py-1 rounded">
                    {n.photoCaption}
                  </span>
                </div>
                <div className="p-6">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                    {article.category}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-ink-700">{article.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{n.slotDesc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative bg-pine-950 py-24 sm:py-32">
        <Container>
          <AnimatedSection className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-gold-400">
                {m.eyebrow}
              </span>
              <h2 className="mt-5 max-w-xl font-display text-3xl sm:text-4xl text-cream-100 text-balance">
                {m.title}
              </h2>
            </div>
            <a
              href={`/${locale}/coffee-export`}
              className="text-sm font-medium text-gold-400 underline underline-offset-4 hover:text-gold-300"
            >
              {m.link} →
            </a>
          </AnimatedSection>

          <div className="mt-14 grid divide-y divide-cream-100/10 border border-cream-100/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {m.items.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.05} className="p-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                  {item.label}
                </span>
                <h3 className="mt-2 font-display text-xl text-cream-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/50">{n.slotDesc}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
