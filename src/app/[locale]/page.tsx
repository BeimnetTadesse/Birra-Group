import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import OurBusiness from "@/components/sections/OurBusiness";
import Origin from "@/components/sections/Origin";
import DiscoverBirra from "@/components/sections/DiscoverBirra";
import GlobalReach from "@/components/sections/GlobalReach";
import Partner from "@/components/sections/Partner";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <Story dict={dict} locale={locale} />
      <OurBusiness dict={dict} />
      <Origin dict={dict} />
      <GlobalReach dict={dict} />
      <DiscoverBirra dict={dict} />
      <Partner dict={dict} locale={locale} />
    </>
  );
}
