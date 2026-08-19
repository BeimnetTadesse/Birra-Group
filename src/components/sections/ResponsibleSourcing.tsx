import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ResponsibleSourcing({ dict }: { dict: Dictionary }) {
  const s = dict.aboutPage.sourcing;

  return (
    <section className="relative bg-pine-900 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl text-cream-100 text-balance">
              {s.title}
            </h2>

            <div className="mt-8 divide-y divide-cream-100/10 border-t border-cream-100/10">
              {s.items.map((it) => (
                <div key={it.title} className="py-5">
                  <div className="text-cream-100">{it.title}</div>
                  <p className="mt-1 text-sm text-cream-100/50">{it.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-cream-100/10 bg-cream-100/10">
              {s.stats.map((stat) => (
                <div key={stat.label} className="bg-pine-900 p-5">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-cream-100/40">
                    {stat.label}
                  </div>
                  <div className="mt-1 font-display text-2xl text-cream-100">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src="/images/about-1.jpg"
                alt={s.photoCaption}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                loading="eager"
                className="object-cover"
              />
              <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-cream-100/80 bg-pine-950/40 px-2 py-1 rounded">
                {s.photoCaption}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
