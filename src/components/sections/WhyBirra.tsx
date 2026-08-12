import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function WhyBirra({ dict }: { dict: Dictionary }) {
  return (
    <section id="why" className="relative bg-cream-50 py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <AnimatedSection>
          <Eyebrow>{dict.why.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700 text-balance">
            {dict.why.title}
          </h2>
          <p className="mt-6 max-w-md text-ink-500 leading-relaxed">{dict.why.body}</p>
          <a
            href="#"
            className="mt-6 inline-block text-sm font-medium text-pine-700 underline underline-offset-4 hover:text-gold-600"
          >
            {dict.why.link} →
          </a>
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-700/10 bg-ink-700/10">
          {dict.why.items.map((item, i) => (
            <AnimatedSection key={item.number} delay={i * 0.05} className="bg-cream-50 p-6">
              <span className="font-mono text-xs text-gold-600">{item.number}</span>
              <h3 className="mt-2 font-display text-lg text-ink-700">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{item.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
