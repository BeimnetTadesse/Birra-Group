import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CoreValues({ dict }: { dict: Dictionary }) {
  const v = dict.aboutPage.values;

  return (
    <section className="relative bg-pine-900 py-24 sm:py-32">
      <Container>
        <AnimatedSection>
          <Eyebrow>{v.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-cream-100">
            {v.title}
          </h2>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-cream-100/10 bg-cream-100/10 sm:grid-cols-2 lg:grid-cols-4">
          {v.items.map((it, i) => (
            <AnimatedSection key={it.title} delay={i * 0.05} className="bg-pine-900 p-7">
              <h3 className="font-display text-xl text-cream-100">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-100/60">{it.desc}</p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
            {v.recognitionLabel}
          </span>
          {v.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-gold-400/40 px-4 py-1.5 text-sm text-cream-100/80"
            >
              {badge}
            </span>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
