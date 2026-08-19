import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Story({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="story" className="relative bg-cream-50 py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <AnimatedSection>
          <Eyebrow>{dict.story.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl text-ink-700 text-balance">
            {dict.story.title}
          </h2>
          <p className="mt-6 max-w-xl text-ink-500 leading-relaxed">{dict.story.body1}</p>
          <p className="mt-4 max-w-xl text-ink-500 leading-relaxed">{dict.story.body2}</p>

          <div className="mt-10 flex gap-10 border-t border-ink-700/10 pt-8">
            <div>
              <div className="font-display text-2xl sm:text-3xl text-pine-700">
                {dict.story.stat1Value}
              </div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-ink-400">
                {dict.story.stat1Label}
              </div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl text-pine-700">
                {dict.story.stat2Value}
                <span className="ms-1 text-base text-gold-500">{dict.story.stat2Suffix}</span>
              </div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-ink-400">
                {dict.story.stat2Label}
              </div>
            </div>
          </div>

          <a
            href={`/${locale}/about`}
            className="mt-8 inline-block text-sm font-medium text-pine-700 underline underline-offset-4 hover:text-gold-600"
          >
            {dict.story.readMore} →
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-xl bg-cream-200">
            <Image
              src="/images/story/packaging.jpeg"
              alt="Birra Coffee products"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              loading="eager"
              className="object-cover object-center"
            />
            <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-cream-100/80 bg-pine-950/40 px-2 py-1 rounded">
              {dict.story.captionMain}
            </span>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-cream-200">
            <Image
              src="/images/story/cherry-hands.png"
              alt="Coffee cherry harvest"
              fill
              sizes="(min-width: 1024px) 20vw, 45vw"
              loading="eager"
              className="object-cover"
            />
            <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-cream-100/80 bg-pine-950/40 px-2 py-1 rounded">
              {dict.story.caption1}
            </span>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-cream-200">
            <Image
              src="/images/story/roasted-coffee.jpg"
              alt="Roasted coffee beans in the roasting drum"
              fill
              sizes="(min-width: 1024px) 20vw, 45vw"
              loading="eager"
              className="object-cover"
            />
            <span className="absolute bottom-3 start-3 font-mono text-[10px] tracking-wide text-cream-100/80 bg-pine-950/40 px-2 py-1 rounded">
              {dict.story.caption2}
            </span>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
