import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function RoasteryHero({ dict }: { dict: Dictionary }) {
  const h = dict.roasteryPage.hero;

  return (
    <section className="texture-lines relative bg-pine-900 pb-20 pt-40 sm:pb-28">
      <Container>
        <AnimatedSection>
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.1] text-cream-100">
            {h.title}
          </h1>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-4 py-1.5 font-mono text-xs tracking-wide text-gold-400">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            {h.pendingBadge}
          </span>

          <p className="mt-6 max-w-2xl text-cream-100/80 leading-relaxed">{h.body}</p>
        </AnimatedSection>

        <AnimatedSection
          delay={0.1}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cream-100/10 bg-cream-100/10 sm:grid-cols-4"
        >
          {h.stats.map((stat) => (
            <div key={stat.label} className="bg-pine-900 p-6">
              <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                {stat.label}
              </div>
              <div className="mt-2 font-display text-2xl text-cream-100">{stat.value}</div>
            </div>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
