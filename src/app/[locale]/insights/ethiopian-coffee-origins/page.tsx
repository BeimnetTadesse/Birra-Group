import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import EthiopianOriginsArticle from "@/components/sections/EthiopianOriginsArticle";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.insightsPage.article.title,
    description: dict.insightsPage.article.dek,
  };
}

export default async function EthiopianCoffeeOriginsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);

  return <EthiopianOriginsArticle dict={dict} locale={locale} />;
}
