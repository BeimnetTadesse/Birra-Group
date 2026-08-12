import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import ExportHero from "@/components/sections/ExportHero";
import ProcessingCapacity from "@/components/sections/ProcessingCapacity";
import PackingDocumentation from "@/components/sections/PackingDocumentation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    description: dict.exportPage.hero.body,
  };
}

export default async function CoffeeExportPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <ExportHero dict={dict} locale={locale} />
      <ProcessingCapacity dict={dict} />
      <PackingDocumentation dict={dict} />
    </>
  );
}
