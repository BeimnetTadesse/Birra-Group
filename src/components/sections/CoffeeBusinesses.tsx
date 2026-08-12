import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CoffeeBusinesses({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const b = dict.aboutPage.businesses;
  const hrefs = [`/${locale}/coffee-export`, `/${locale}/roastery`];

  return (
    <section className="relative bg-cream-50 py-24 sm:py-32">
      <Container>
        <AnimatedSection>
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700">
            {b.title}
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {b.cards.map((card, i) => (
            <AnimatedSection
              key={card.title}
              delay={i * 0.08}
              className="overflow-hidden rounded-xl border border-ink-700/10 bg-white"
            >
              <div className="texture-lines-light relative aspect-[16/10] bg-cream-200">
                <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-ink-500/70">
                  {card.photoCaption}
                </span>
              </div>
              <div className="p-7">
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                  {card.eyebrowLabel}
                </span>
                <h3 className="mt-2 font-display text-2xl text-ink-700">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{card.desc}</p>
                <a
                  href={hrefs[i] ?? "#"}
                  className="mt-4 inline-block text-sm font-medium text-pine-700 underline underline-offset-4 hover:text-gold-600"
                >
                  {card.linkLabel} →
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
