"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();

  function hrefFor(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || "/";
  }

  const targetLocale: Locale = locale === "en" ? "ar" : "en";
  const targetLabel = targetLocale === "ar" ? "عربي" : "EN";

  return (
    <div className={`flex items-center ${className}`}>
      <Link
        href={hrefFor(targetLocale)}
        scroll={false}
        className={`rounded-full border border-cream-100/20 bg-pine-950/40 px-5 py-2 text-xs font-medium tracking-wide text-cream-100 transition-all hover:border-cream-100/50 hover:bg-pine-900 hover:text-gold-400 ${
          targetLocale === "ar" ? "font-arabic" : "font-sans"
        }`}
        aria-label={`Switch to ${localeNames[targetLocale]}`}
      >
        {targetLabel}
      </Link>
    </div>
  );
}
