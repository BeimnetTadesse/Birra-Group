"use client";

import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Partner({ dict }: { dict: Dictionary }) {
  return (
    <section id="partner" className="relative bg-partner-glow py-28 sm:py-36">
      <Container className="text-center">
        <AnimatedSection className="mx-auto max-w-3xl">
          <Eyebrow className="justify-center">{dict.partner.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl text-cream-100 text-balance">
            {dict.partner.title}
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${dict.partner.emailCta}`}
              className="rounded-full bg-gold-400 px-7 py-3 text-sm font-medium tracking-wide text-pine-950 transition-transform hover:scale-105 hover:bg-gold-300"
            >
              {dict.partner.emailCta}
            </a>
            <a
              href="#ai-assistant"
              className="rounded-full border border-cream-100/30 px-7 py-3 text-sm tracking-wide text-cream-100 transition-colors hover:border-cream-100"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-ai-chat"));
              }}
            >
              {dict.partner.aiCta}
            </a>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
