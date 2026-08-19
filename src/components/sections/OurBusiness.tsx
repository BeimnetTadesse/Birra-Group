import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function OurBusiness({ dict }: { dict: Dictionary }) {
  const b = dict.ourBusiness;

  return (
    <section id="business" className="relative bg-cream-50 py-24 sm:py-32">
      <Container>
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{b.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700 text-balance">
            {b.title}
          </h2>
          <p className="mt-5 text-ink-500">{b.subtitle}</p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-700/10 bg-ink-700/10 sm:grid-cols-2 lg:grid-cols-3">
          {b.items.map((item, i) => (
            <AnimatedSection
              key={item.number}
              delay={i * 0.05}
              className="group relative bg-cream-50 p-8 transition-colors duration-300 hover:bg-white"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-gold-600">
                {item.number}
              </span>
              <h3 className="mt-3 font-display text-xl text-ink-700">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{item.desc}</p>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover:scale-x-100" />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
