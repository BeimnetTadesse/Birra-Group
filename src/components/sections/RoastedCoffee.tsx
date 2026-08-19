import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

const barColors = ["#f3c66b", "#e0940f", "#c9820c", "#b8760c", "#8a5b09", "#6b4607"];
const channelImages = [
  "/images/roastery/channel-export.png",
  "/images/roastery/channel-wholesale.png",
  "/images/roastery/channel-retail.png",
];

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

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        <div className="mt-10 grid gap-6 border-t border-ink-700/10 pt-10 sm:grid-cols-3">
          {r.channels.map((ch, i) => (
            <AnimatedSection
              key={ch.title}
              delay={i * 0.06}
              className="overflow-hidden rounded-xl border border-ink-700/10 bg-white"
            >
              <div className="relative aspect-square">
                <Image
                  src={channelImages[i % channelImages.length]}
                  alt={ch.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 90vw"
                  loading="eager"
                  className="object-cover"
                />
                <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-cream-100/80 bg-pine-950/40 px-2 py-1 rounded">
                  {ch.photoCaption}
                </span>
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                  {ch.eyebrowLabel}
                </span>
                <h3 className="mt-1 font-display text-xl text-ink-700">{ch.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{ch.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ch.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ink-700/15 px-3 py-1 text-xs text-ink-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
