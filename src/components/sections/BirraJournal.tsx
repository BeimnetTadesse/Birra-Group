import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

/** Real company news and announcements. Empty photo/copy slots until Birra
 * sends real articles — see the module comment on InsightGrid for why this
 * section (unlike the topic grids) keeps the placeholder-photo treatment:
 * these cards represent specific dated events, not evergreen topics. */
export default function BirraJournal({ dict }: { dict: Dictionary }) {
  const j = dict.insightsPage.journal;

  return (
    <section
      id="journal"
      className="texture-lines relative border-t border-cream-100/10 bg-pine-900 py-16 sm:py-24"
    >
      <Container>
        <AnimatedSection className="max-w-2xl">
          <Eyebrow>{j.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-2xl sm:text-3xl text-cream-100 text-balance">
            {j.title}
          </h2>
          <p className="mt-4 text-cream-100/60 leading-relaxed">{j.body}</p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {j.articles.map((article, i) => (
            <AnimatedSection
              key={article.title}
              delay={i * 0.06}
              className="overflow-hidden rounded-xl border border-cream-100/10 bg-pine-950/40"
            >
              <div className="relative aspect-[4/3] bg-pine-800">
                <span className="absolute bottom-3 start-3 rounded bg-pine-950/60 px-2 py-1 font-mono text-[10px] tracking-wide text-cream-100/80">
                  {j.photoCaption}
                </span>
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold-400">
                  {article.category}
                </span>
                <h3 className="mt-2 font-display text-xl text-cream-100">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-100/55">{j.slotDesc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
