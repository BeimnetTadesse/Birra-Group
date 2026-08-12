import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Quality({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="quality" className="relative bg-pine-700 py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <AnimatedSection>
            <Eyebrow>{dict.quality.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-cream-100 text-balance">
              {dict.quality.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-cream-100/70 leading-relaxed">{dict.quality.intro}</p>
          </AnimatedSection>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-cream-100/10 bg-cream-100/10 sm:grid-cols-2 lg:grid-cols-3">
          {dict.quality.items.map((item, i) => (
            <AnimatedSection key={item.number} delay={i * 0.05} className="bg-pine-700 p-7">
              <span className="font-mono text-xs text-gold-400">{item.number}</span>
              <h3 className="mt-3 font-display text-lg sm:text-xl text-cream-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-100/60">{item.desc}</p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 flex flex-col gap-4 border-t border-cream-100/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-cream-100/60">{dict.quality.footerNote}</p>
          <a
            href={`/${locale}/quality`}
            className="shrink-0 text-sm text-gold-400 underline underline-offset-4 hover:text-gold-300"
          >
            {dict.quality.link} →
          </a>
        </AnimatedSection>
      </Container>
    </section>
  );
}
