import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/blog";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function BlogListing({
  dict,
  locale,
  posts,
}: {
  dict: Dictionary;
  locale: Locale;
  posts: BlogPost[];
}) {
  const b = dict.insightsPage.blog;

  return (
    <>
      <section className="texture-lines relative bg-pine-900 pb-16 pt-40">
        <Container>
          <AnimatedSection className="max-w-2xl">
            <Eyebrow>{b.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl text-cream-100 text-balance">
              {b.title}
            </h1>
            <p className="mt-4 text-cream-100/70 leading-relaxed">{b.subtitle}</p>
          </AnimatedSection>
        </Container>
      </section>

      <section className="relative bg-pine-950 py-16 sm:py-24">
        <Container>
          {posts.length === 0 ? (
            <p className="text-cream-100/50">{b.emptyState}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <AnimatedSection
                  key={post.id}
                  delay={i * 0.05}
                  className="overflow-hidden rounded-xl border border-cream-100/10 bg-pine-900"
                >
                  <a href={`/${locale}/blog/${post.slug}`} className="group block">
                    <div className="p-6">
                      {post.category && (
                        <span className="font-mono text-[10px] tracking-[0.2em] text-gold-400">
                          {post.category.toUpperCase()}
                        </span>
                      )}
                      <h3 className="mt-2 font-display text-xl text-cream-100">{post.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-cream-100/55">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-gold-400 group-hover:text-gold-300">
                        {b.readMore} →
                      </span>
                    </div>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
