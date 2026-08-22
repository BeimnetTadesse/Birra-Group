import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Featured({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const f = dict.insightsPage.featured;

  return (
    <section className="relative bg-pine-900 py-16 sm:py-24">
      <Container>
        <AnimatedSection>
          <Eyebrow>{f.eyebrow}</Eyebrow>

          <a
            href={`/${locale}/insights/ethiopian-coffee-origins`}
            className="group mt-8 block overflow-hidden rounded-2xl border border-cream-100/10"
          >
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              <Image
                src="/images/story/highlands.jpeg"
                alt="Ethiopian highland coffee farm"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
                <h2 className="max-w-2xl font-display text-3xl sm:text-5xl leading-[1.1] text-cream-100 text-balance">
                  {f.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm sm:text-base text-cream-100/75 leading-relaxed">
                  {f.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-400 underline underline-offset-4 group-hover:text-gold-300">
                  {f.cta} →
                </span>
              </div>
            </div>
          </a>
        </AnimatedSection>
      </Container>
    </section>
  );
}
