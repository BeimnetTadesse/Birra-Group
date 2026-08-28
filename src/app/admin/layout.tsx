import type { Metadata } from "next";
import type { ReactNode } from "react";
import { body } from "@/lib/fonts";
import "../globals.css";

// /admin sits outside the [locale] segment (it's an internal tool, not
// public multi-language content), so it needs its own root layout — the
// public site's html/body live in [locale]/layout.tsx, which this route
// tree doesn't inherit from.
export const metadata: Metadata = {
  title: "Birra Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${body.variable} font-sans antialiased bg-cream-100 text-ink-700`}>
        {children}
      </body>
    </html>
  );
}
