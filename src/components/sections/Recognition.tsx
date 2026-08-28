import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Recognition({ dict }: { dict: Dictionary }) {
  const r = dict.aboutPage.recognition;

  return (
    <section className="relative bg-cream-50 py-24 sm:py-32">
      <Container>
        <AnimatedSection className="max-w-2xl">
          <Eyebrow>{r.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700 text-balance">
            {r.title}
          </h2>
          <p className="mt-6 text-ink-500 leading-relaxed">{r.body1}</p>
          <p className="mt-4 text-ink-500 leading-relaxed">{r.body2}</p>

          <span className="mt-7 inline-flex items-center rounded-full border border-gold-500/40 px-4 py-1.5 text-sm text-ink-700">
            {r.badge}
          </span>
        </AnimatedSection>
      </Container>
    </section>
  );
}
