import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/blog";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function BlogPostDetail({
  dict,
  locale,
  post,
}: {
  dict: Dictionary;
  locale: Locale;
  post: BlogPost;
}) {
  const b = dict.insightsPage.blog;
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === "ar" ? "ar" : "en-GB", {
        dateStyle: "long",
      })
    : null;

  return (
    <article>
      <header className="texture-lines relative bg-pine-900 pb-10 pt-40">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <a
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm text-cream-100/60 hover:text-gold-400 transition-colors"
            >
              ← {b.backToBlog}
            </a>

            {post.category && (
              <span className="mt-6 block font-mono text-xs tracking-[0.25em] text-gold-400">
                {post.category.toUpperCase()}
              </span>
            )}

            <h1 className="mt-4 font-display text-3xl sm:text-5xl leading-[1.1] text-cream-100 text-balance">
              {post.title}
            </h1>

            {date && (
              <p className="mt-5 font-mono text-[11px] tracking-wide text-cream-100/40">
                {date}
              </p>
            )}
          </AnimatedSection>
        </Container>
      </header>

      <div className="bg-cream-50">
        <Container>
          <div className="mx-auto max-w-2xl py-16 sm:py-24">
            <p className="whitespace-pre-line text-ink-500 leading-relaxed">{post.body}</p>
          </div>
        </Container>
      </div>
    </article>
  );
}
