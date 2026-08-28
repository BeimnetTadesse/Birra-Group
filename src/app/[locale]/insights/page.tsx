import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import InsightsHero from "@/components/sections/InsightsHero";
import MarketReference from "@/components/sections/MarketReference";
import Featured from "@/components/sections/Featured";
import InsightGrid from "@/components/sections/InsightGrid";
import { getCoffeePrice } from "@/lib/market-price";

// Rebuild this page hourly so the benchmark stays current without calling the
// price providers on every visit.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    description: dict.insightsPage.hero.body,
  };
}

export default async function InsightsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);

  // Returns null if every provider fails; MarketReference then renders
  // nothing, so a broken feed can never surface a stale number on the page.
  const price = await getCoffeePrice();

  const i = dict.insightsPage;

  return (
    <>
      <InsightsHero dict={dict} />
      <MarketReference dict={dict} locale={locale} price={price} />
      <Featured dict={dict} locale={locale} />

      <InsightGrid
        eyebrow={i.coffeeMarket.eyebrow}
        title={i.coffeeMarket.title}
        cards={i.coffeeMarket.cards}
        ctaLabel={i.coffeeMarket.ctaLabel}
        ctaHref={`/${locale}/blog`}
      />
      <InsightGrid
        eyebrow={i.globalIndustry.eyebrow}
        title={i.globalIndustry.title}
        cards={i.globalIndustry.cards}
        black
      />
    </>
  );
}
