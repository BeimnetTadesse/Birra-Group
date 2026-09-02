import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

/**
 * Spotlights the two consumer-facing ventures behind "Our Business" grid's
 * one-line Real Estate item — Birra Mall and Birra Living — since they're
 * concrete, named, currently-operating places, not just a business category.
 */
export default function DiscoverBirra({ dict }: { dict: Dictionary }) {
  const d = dict.discoverBirra;

  return (
    <section className="relative border-t border-cream-100/10 bg-pine-900 py-24 sm:py-32">
      <Container>
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{d.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-cream-100 text-balance">
            {d.title}
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <AnimatedSection
            delay={0.05}
            className="rounded-2xl border border-cream-100/10 bg-pine-950/40 p-8"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold-400">
              {d.mall.label}
            </span>
            <h3 className="mt-3 font-display text-2xl text-cream-100">{d.mall.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream-100/65">{d.mall.desc}</p>
          </AnimatedSection>

          <AnimatedSection
            delay={0.12}
            className="rounded-2xl border border-cream-100/10 bg-pine-950/40 p-8"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold-400">
              {d.living.label}
            </span>
            <h3 className="mt-3 font-display text-2xl text-cream-100">{d.living.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream-100/65">{d.living.desc}</p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.18} className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-cream-100/70 leading-relaxed">{d.summary}</p>
          <p className="mt-6 font-display text-xl sm:text-2xl text-gold-400 text-balance">
            {d.tagline}
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
