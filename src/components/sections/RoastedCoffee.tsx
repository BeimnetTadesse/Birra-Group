import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const barColors = ["#f3c66b", "#e0940f", "#c9820c", "#b8760c", "#8a5b09", "#6b4607"];

export default function RoastedCoffee({ dict }: { dict: Dictionary }) {
  const r = dict.roasteryPage.roasted;

  return (
    <section className="relative bg-cream-50 py-24 sm:py-32">
      <Container>
        <AnimatedSection>
          <Eyebrow>{r.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700 text-balance">
            {r.title}
          </h2>
        </AnimatedSection>

        <AnimatedSection
          delay={0.1}
          className="group relative mt-10 aspect-[21/9] w-1/2 overflow-hidden rounded-xl"
        >
          <Image
            src="/images/roastery/packaging.jpeg"
            alt={r.photoCaption}
            fill
            sizes="50vw"
            loading="eager"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-cream-100/90 bg-pine-950/50 px-2 py-1 rounded">
            {r.photoCaption}
          </span>
        </AnimatedSection>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {r.items.map((it, i) => (
            <AnimatedSection
              key={it.number}
              delay={i * 0.05}
              className="overflow-hidden rounded-lg border border-ink-700/10 bg-white"
            >
              <div className="h-1" style={{ backgroundColor: barColors[i % barColors.length] }} />
              <div className="p-6">
                <h3 className="font-display text-xl text-ink-700">{it.title}</h3>
                <span className="mt-1 block font-mono text-[10px] text-ink-400">
                  {it.number}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{it.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
