import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Origin from "@/components/sections/Origin";
import Journey from "@/components/sections/Journey";
import Traceability from "@/components/sections/Traceability";
import Availability from "@/components/sections/Availability";
import InstantQuote from "@/components/sections/InstantQuote";
import GlobalReach from "@/components/sections/GlobalReach";
import WhyBirra from "@/components/sections/WhyBirra";
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
      <Origin dict={dict} />
      <Journey dict={dict} />
      <Traceability dict={dict} />
      <Availability dict={dict} />
      <InstantQuote dict={dict} />
      <GlobalReach dict={dict} />
      <WhyBirra dict={dict} />
      <Partner dict={dict} />
    </>
  );
}
