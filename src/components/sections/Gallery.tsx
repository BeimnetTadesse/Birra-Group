import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

// Span pattern controls the bento rhythm of the placeholder grid.
// Index 0 and 4 get a large "feature" footprint; everything else is a
// standard 1x1 cell.
const spanClass: Record<number, string> = {
  0: "sm:col-span-2 sm:row-span-2",
  4: "sm:row-span-2",
};

export default function Gallery({ dict }: { dict: Dictionary }) {
  const g = dict.galleryPage;

  return (
    <section className="texture-lines relative bg-pine-900 pb-24 pt-40 sm:pb-32">
      <Container>
        <AnimatedSection className="max-w-2xl">
          <Eyebrow>{g.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl leading-[1.1] text-cream-100 text-balance">
            {g.title}
          </h1>
          <p className="mt-6 text-cream-100/70 leading-relaxed">{g.body}</p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:auto-rows-[9rem] sm:grid-flow-dense sm:gap-4 lg:auto-rows-[10rem]">
          {g.items.map((caption, i) => (
            <AnimatedSection
              key={caption}
              delay={Math.min(i, 6) * 0.04}
              className={`group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-pine-700 to-pine-950 sm:aspect-auto ${
                spanClass[i] ?? ""
              }`}
            >
              <div className="texture-lines absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-cream-100/80 bg-pine-950/40 px-2 py-1 rounded">
                {caption}
              </span>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
