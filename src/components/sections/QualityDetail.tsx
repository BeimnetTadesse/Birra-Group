import type { Dictionary } from "@/i18n/getDictionary";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function QualityDetail({ dict }: { dict: Dictionary }) {
  const q = dict.quality;

  return (
    <section className="relative bg-cream-50 pt-28 lg:pt-32">
      <div className="grid lg:grid-cols-2">
        <div className="container-px py-14 lg:py-20 lg:pe-14">
          <AnimatedSection>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700">
              {q.detailTitle}
            </h1>

            <div className="mt-10 divide-y divide-ink-700/10 border-t border-ink-700/10">
              {q.items.map((item, i) => (
                <AnimatedSection key={item.number} delay={i * 0.05} className="py-6">
                  <span className="font-mono text-xs text-gold-600">{item.number}</span>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl text-ink-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-500">
                    {item.desc}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="texture-lines-light relative min-h-[420px] bg-cream-200 lg:min-h-full">
          <span className="absolute bottom-4 start-4 font-mono text-[10px] tracking-wide text-ink-500/70">
            {q.photoCaption}
          </span>
        </div>
      </div>
    </section>
  );
}
