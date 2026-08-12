import Image from "next/image";
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
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <AnimatedSection>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl text-cream-100 text-balance">
            {p.title}
          </h2>
          <p className="mt-6 max-w-md text-cream-100/70 leading-relaxed">{p.body}</p>

          <div className="mt-8 divide-y divide-cream-100/10 border-t border-cream-100/10">
            {p.steps.map((step) => (
              <div key={step.number} className="flex gap-4 py-5">
                <span className="font-mono text-xs text-gold-400">{step.number}</span>
                <div>
                  <div className="text-cream-100">{step.title}</div>
                  <p className="mt-1 text-sm text-cream-100/50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={`/${locale}#partner`}
            className="mt-8 inline-block rounded-full bg-gold-400 px-7 py-3 text-sm font-medium tracking-wide text-pine-950 transition-transform hover:scale-105 hover:bg-gold-300"
          >
            {p.cta}
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src="/images/roastery-drum.jpg"
              alt={p.photoCaptionMain}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-cream-100/80 bg-pine-950/40 px-2 py-1 rounded">
              {p.photoCaptionMain}
            </span>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src="/images/roastery-valve.jpg"
              alt={p.photoCaption1}
              fill
              sizes="20vw"
              className="object-cover"
            />
            <span className="absolute bottom-2 start-2 font-mono text-[9px] tracking-wide text-cream-100/80 bg-pine-950/40 px-1.5 py-0.5 rounded">
              {p.photoCaption1}
            </span>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src="/images/roastery-profiling.jpg"
              alt={p.photoCaption2}
              fill
              sizes="20vw"
              className="object-cover"
            />
            <span className="absolute bottom-2 start-2 font-mono text-[9px] tracking-wide text-cream-100/80 bg-pine-950/40 px-1.5 py-0.5 rounded">
              {p.photoCaption2}
            </span>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
