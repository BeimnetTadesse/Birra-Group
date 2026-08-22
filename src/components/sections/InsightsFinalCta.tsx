import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function InsightsFinalCta({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const c = dict.insightsPage.finalCta;

  return (
    <section className="relative bg-pine-950 py-20 sm:py-28">
      <Container>
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-cream-100 text-balance">
            {c.title}
          </h2>
          <p className="mt-4 text-cream-100/60 leading-relaxed">{c.body}</p>
          <a
            href={`/${locale}/contact`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold-400 px-7 py-3 text-sm font-medium tracking-wide text-pine-950 transition-transform hover:scale-105 hover:bg-gold-300"
          >
            {c.cta} →
          </a>
        </AnimatedSection>
      </Container>
    </section>
  );
}
