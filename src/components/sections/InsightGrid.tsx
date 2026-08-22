import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

type Card = { title: string; body: string };

/**
 * A 3-card editorial grid used for the topic sections on /insights (Coffee
 * Market, Ethiopian Coffee, Global Coffee Industry, Export & Trade, Roastery).
 *
 * Typographic by design, not photographic: these are evergreen intelligence
 * topics rather than dated articles, and a dozen placeholder photos across
 * five sections would read as empty inventory rather than editorial content.
 * Real article pages can attach imagery later without changing this shell.
 *
 * Most sections share bg-pine-900 — matching the rest of the site, where
 * pine-950 is reserved as an accent rather than a default background — so
 * `textured` and the hairline top border are what keep consecutive sections
 * from blurring into one flat block.
 */
export default function InsightGrid({
  eyebrow,
  title,
  cards,
  ctaLabel,
  ctaHref,
  textured = false,
  black = false,
}: {
  eyebrow: string;
  title: string;
  cards: Card[];
  ctaLabel?: string;
  ctaHref?: string;
  textured?: boolean;
  black?: boolean;
}) {
  return (
    <section
      className={`relative border-t border-cream-100/10 py-16 sm:py-24 ${
        black ? "bg-pine-950" : "bg-pine-900"
      } ${textured ? "texture-lines" : ""}`}
    >
      <Container>
        <AnimatedSection className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-xl font-display text-2xl sm:text-3xl text-cream-100 text-balance">
              {title}
            </h2>
          </div>
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              className="text-sm font-medium text-gold-400 underline underline-offset-4 hover:text-gold-300"
            >
              {ctaLabel} →
            </a>
          )}
        </AnimatedSection>

        <div className="mt-12 grid divide-y divide-cream-100/10 border border-cream-100/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {cards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.06} className="p-8">
              <h3 className="font-display text-xl leading-snug text-cream-100 text-balance">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-100/55">{card.body}</p>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
