import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function PrivateLabel({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const p = dict.roasteryPage.privateLabel;

  return (
    <section className="relative bg-pine-900 py-24 sm:py-32">
      <Container>
        <AnimatedSection className="max-w-2xl">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl text-cream-100 text-balance">
            {p.title}
          </h2>
          <p className="mt-6 max-w-md text-cream-100/70 leading-relaxed">{p.body}</p>
        </AnimatedSection>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-cream-100/10 bg-cream-100/10 sm:grid-cols-2">
          {p.steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.05} className="bg-pine-900 p-7">
              <span className="font-mono text-xs text-gold-400">{step.number}</span>
              <h3 className="mt-3 font-display text-lg text-cream-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-100/50">{step.desc}</p>
            </AnimatedSection>
          ))}
        </div>

        <a
          href={`/${locale}#partner`}
          className="mt-10 inline-block rounded-full bg-gold-400 px-7 py-3 text-sm font-medium tracking-wide text-pine-950 transition-transform hover:scale-105 hover:bg-gold-300"
        >
          {p.cta}
        </a>
      </Container>
    </section>
  );
}
