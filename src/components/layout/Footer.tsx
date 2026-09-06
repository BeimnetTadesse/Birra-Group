import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import LogoMark from "@/components/ui/Logo";
import LanguageSwitcher from "./LanguageSwitcher";

// Coffee Export now lives on its own deployment — this site only links out
// to it, it no longer has a page here.
const EXPORT_URL =
  process.env.NEXT_PUBLIC_BIRRA_EXPORT_URL ?? "https://birra-coffee-export.vercel.app/en";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pine-900">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href={`/${locale}#hero`} className="inline-flex items-center gap-2.5">
            <LogoMark className="h-9" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold text-[#14532d]">
                {dict.nav.brandNamePart1}
              </span>
              <span className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-gold-400">
                {dict.nav.brandNamePart2}
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-100/60">
            {dict.footer.description}
          </p>
          <p className="mt-5 text-xs tracking-[0.2em] text-gold-400">
            {dict.footer.subLabel}
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-[0.2em] text-gold-400">
            {dict.footer.contactTitle}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-cream-100/70">
            <li>
              <a href={`mailto:${dict.footer.email}`} className="hover:text-cream-100">
                {dict.footer.email}
              </a>
            </li>
            <li>
              <a href={`tel:${dict.footer.phone}`} className="hover:text-cream-100">
                {dict.footer.phone}
              </a>
            </li>
            <li>{dict.footer.addressLine1}</li>
            <li>{dict.footer.addressLine2}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-[0.2em] text-gold-400">
            {dict.footer.exploreTitle}
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            {dict.footer.exploreLinks.map((label, i) => {
              const hrefs = [
                `/${locale}#business`,
                `/${locale}#availability`,
                `/${locale}/about`,
                `${EXPORT_URL}#capacity`,
                `/${locale}/insights`,
                `/${locale}/blog`,
              ];
              return (
                <li key={label}>
                  <a
                    href={hrefs[i] ?? "#"}
                    className="text-cream-100/70 hover:text-cream-100 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-[0.2em] text-gold-400">
            {dict.footer.languageTitle}
          </h4>
          <div className="mt-4">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </Container>

      <div className="border-t border-cream-100/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-cream-100/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {dict.footer.rightsText}
          </span>
          <span>{dict.footer.businessLines.join(" · ")}</span>
        </Container>
      </div>
    </footer>
  );
}
