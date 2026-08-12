"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Contact({ dict }: { dict: Dictionary }) {
  const c = dict.contactPage;
  const f = c.form;
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 4500);
    return () => clearTimeout(timer);
  }, [submitted]);

  const details = [
    { label: c.emailLabel, value: dict.footer.email, href: `mailto:${dict.footer.email}` },
    { label: c.phoneLabel, value: dict.footer.phone, href: `tel:${dict.footer.phone}` },
    { label: c.officeLabel, value: c.officeValue },
    { label: c.marketsLabel, value: c.marketsValue },
  ];

  const fields = [
    { key: "name", label: f.nameLabel, placeholder: f.namePlaceholder, type: "text" },
    { key: "company", label: f.companyLabel, placeholder: f.companyPlaceholder, type: "text" },
    { key: "email", label: f.emailLabel, placeholder: f.emailPlaceholder, type: "email" },
    { key: "country", label: f.countryLabel, placeholder: f.countryPlaceholder, type: "text" },
  ];

  return (
    <section className="texture-lines relative bg-pine-900 pb-24 pt-40 sm:pb-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <AnimatedSection>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl leading-[1.1] text-cream-100 text-balance">
            {c.title}
          </h1>
          <p className="mt-6 max-w-md text-cream-100/70 leading-relaxed">{c.body}</p>

          <div className="mt-10 divide-y divide-cream-100/10 border-t border-cream-100/10">
            {details.map((d) => (
              <div key={d.label} className="py-5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold-400">
                  {d.label}
                </span>
                {d.href ? (
                  <a
                    href={d.href}
                    className="mt-1 block text-cream-100 hover:text-gold-300 transition-colors"
                  >
                    {d.value}
                  </a>
                ) : (
                  <p className="mt-1 text-cream-100">{d.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${dict.footer.email}`}
              className="rounded-full bg-gold-400 px-7 py-3 text-sm font-medium tracking-wide text-pine-950 transition-transform hover:scale-105 hover:bg-gold-300"
            >
              {c.emailCta}
            </a>
            <a
              href="#ai-assistant"
              className="rounded-full border border-cream-100/30 px-7 py-3 text-sm tracking-wide text-cream-100 transition-colors hover:border-cream-100"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-ai-chat"));
              }}
            >
              {c.aiCta}
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="rounded-2xl bg-cream-50 p-8 sm:p-10">
          <h2 className="font-display text-2xl text-ink-700">{f.title}</h2>

          {submitted ? (
            <div className="mt-8 rounded-lg border border-pine-700/20 bg-pine-700/5 px-5 py-8 text-center">
              <p className="text-ink-700">Thank you — your enquiry has been received.</p>
            </div>
          ) : (
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              {fields.map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={field.key}
                    className="font-mono text-[10px] tracking-[0.2em] text-ink-400"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    className="mt-2 w-full rounded-lg border border-ink-700/15 bg-white px-4 py-3 text-sm text-ink-700 outline-none focus:border-pine-500"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-[10px] tracking-[0.2em] text-ink-400"
                >
                  {f.messageLabel}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={f.messagePlaceholder}
                  required
                  className="mt-2 w-full resize-none rounded-lg border border-ink-700/15 bg-white px-4 py-3 text-sm text-ink-700 outline-none focus:border-pine-500"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-pine-800 px-7 py-3 text-sm font-medium tracking-wide text-cream-100 transition-colors hover:bg-pine-700"
              >
                {f.submit}
              </button>
            </form>
          )}
        </AnimatedSection>
      </Container>
    </section>
  );
}
