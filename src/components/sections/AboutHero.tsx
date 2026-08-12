import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutHero({ dict }: { dict: Dictionary }) {
  const h = dict.aboutPage.hero;

  return (
    <section className="texture-lines relative bg-pine-900 pb-20 pt-40 sm:pb-28">
      <Container>
        <AnimatedSection className="max-w-3xl">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.1] text-cream-100">
            {h.title}
          </h1>
          <p className="mt-6 max-w-2xl text-cream-100/80 leading-relaxed">{h.body1}</p>
          <p className="mt-4 max-w-2xl text-cream-100/80 leading-relaxed">{h.body2}</p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
