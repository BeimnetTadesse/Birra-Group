import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getPublishedPost } from "@/lib/blog";
import BlogPostDetail from "@/components/sections/BlogPostDetail";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const post = await getPublishedPost(locale, params.slug);
  return {
    title: post?.title,
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const post = await getPublishedPost(locale, params.slug);

  if (!post) notFound();

  return <BlogPostDetail dict={dict} locale={locale} post={post} />;
}
