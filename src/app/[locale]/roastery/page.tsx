import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import RoasteryHero from "@/components/sections/RoasteryHero";
import RoastedCoffee from "@/components/sections/RoastedCoffee";
import PrivateLabel from "@/components/sections/PrivateLabel";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    description: dict.roasteryPage.hero.body,
  };
}

export default async function RoasteryPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <RoasteryHero dict={dict} />
      <RoastedCoffee dict={dict} />
      <PrivateLabel dict={dict} locale={locale} />
    </>
  );
}
