import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function InsightsHero({ dict }: { dict: Dictionary }) {
  const h = dict.insightsPage.hero;

  return (
    <section className="texture-lines relative bg-pine-900 pb-20 pt-40 sm:pb-28">
      <Container>
        <AnimatedSection>
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-4xl sm:text-6xl leading-[1.15] text-cream-100 text-balance">
            {h.title}
          </h1>
          <p className="mt-6 max-w-2xl text-cream-100/70 leading-relaxed">{h.body}</p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
