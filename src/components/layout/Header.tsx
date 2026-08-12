"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import LanguageSwitcher from "./LanguageSwitcher";
import Container from "@/components/ui/Container";
import LogoMark from "@/components/ui/Logo";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/coffee-export`, label: dict.nav.coffeeExport },
    { href: `/${locale}/roastery`, label: dict.nav.roastery },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/gallery`, label: dict.nav.gallery },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-pine-900/90 backdrop-blur-md border-b border-cream-100/10 py-3"
            : "bg-gradient-to-b from-pine-950/70 to-transparent py-5"
        }`}
      >
        <Container className="flex items-center justify-between">
          <Link href={`/${locale}#hero`} className="flex items-center gap-3 lg:ms-6">
            <LogoMark />
            <span className="h-4 w-px bg-cream-100/20 hidden sm:inline" />
            <span
              className={`hidden sm:inline text-xs tracking-[0.25em] text-cream-100/70 uppercase ${
                locale === "ar" ? "font-arabic" : "font-sans"
              }`}
            >
              {dict.nav.brandName}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-cream-100/80 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 lg:me-6">
            <LanguageSwitcher locale={locale} />
            <a
              href={`/${locale}#quote`}
              className="rounded-full bg-gold-400 px-5 py-2 text-sm font-medium tracking-wide text-pine-950 transition-colors hover:bg-gold-300"
            >
              {dict.nav.instantQuote}
            </a>
          </div>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`h-px w-6 bg-cream-100 transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-cream-100 transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-pine-900/95 backdrop-blur-md border-t border-cream-100/10"
          >
            <Container className="flex flex-col gap-6 py-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-cream-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`/${locale}#quote`}
                onClick={() => setOpen(false)}
                className="inline-block w-fit rounded-full bg-gold-400 px-5 py-2 text-sm font-medium text-pine-950"
              >
                {dict.nav.instantQuote}
              </a>
              <LanguageSwitcher locale={locale} />
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
