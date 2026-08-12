import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Milestones({ dict }: { dict: Dictionary }) {
  const j = dict.aboutPage.journey;

  return (
    <section className="relative bg-cream-50 py-24 sm:py-32">
      <Container>
        <AnimatedSection>
          <Eyebrow>{j.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700">
            {j.title}
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-ink-700/10 bg-ink-700/10 sm:grid-cols-3">
          {j.items.map((it, i) => (
            <AnimatedSection key={it.label} delay={i * 0.05} className="bg-cream-50 p-8">
              <div className="font-display text-2xl sm:text-3xl text-pine-700">{it.value}</div>
              <div className="mt-3 font-mono text-[10px] tracking-[0.2em] text-gold-600">
                {it.label}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{it.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
