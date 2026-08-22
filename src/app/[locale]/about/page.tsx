import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import AboutHero from "@/components/sections/AboutHero";
import Milestones from "@/components/sections/Milestones";
import CoreValues from "@/components/sections/CoreValues";
import ResponsibleSourcing from "@/components/sections/ResponsibleSourcing";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    description: dict.aboutPage.hero.body1,
  };
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <AboutHero dict={dict} />
      <Milestones dict={dict} />
      <CoreValues dict={dict} />
      <ResponsibleSourcing dict={dict} />
    </>
  );
}
