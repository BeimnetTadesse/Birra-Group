import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { listPublishedPosts } from "@/lib/blog";
import BlogListing from "@/components/sections/BlogListing";

// Posts are edited through /admin/blog, not by redeploying — revalidate
// often enough that a new post shows up without needing a fresh build.
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    description: dict.insightsPage.blog.subtitle,
  };
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const posts = await listPublishedPosts(locale);

  return <BlogListing dict={dict} locale={locale} posts={posts} />;
}
