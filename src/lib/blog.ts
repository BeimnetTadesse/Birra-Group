import "server-only";

import { query } from "@/lib/db";
import type { BlogPostInput } from "@/lib/blog-schema";

export type BlogPost = {
  id: number;
  locale: "en" | "ar";
  slug: string;
  title: string;
  category: string | null;
  excerpt: string;
  body: string;
  imageUrl: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type PostRow = {
  id: number;
  locale: "en" | "ar";
  slug: string;
  title: string;
  category: string | null;
  excerpt: string;
  body: string;
  image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function toPost(row: PostRow): BlogPost {
  return {
    id: row.id,
    locale: row.locale,
    slug: row.slug,
    title: row.title,
    category: row.category,
    excerpt: row.excerpt,
    body: row.body,
    imageUrl: row.image_url,
    published: row.published,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Published posts for one locale, newest first. For the public blog pages. */
export async function listPublishedPosts(locale: "en" | "ar"): Promise<BlogPost[]> {
  const rows = await query<PostRow>(
    `SELECT * FROM blog_posts
     WHERE locale = $1 AND published = true
     ORDER BY published_at DESC`,
    [locale],
  );
  return rows.map(toPost);
}

/** One published post by slug, or null. For the public post page. */
export async function getPublishedPost(
  locale: "en" | "ar",
  slug: string,
): Promise<BlogPost | null> {
  const rows = await query<PostRow>(
    `SELECT * FROM blog_posts WHERE locale = $1 AND slug = $2 AND published = true`,
    [locale, slug],
  );
  return rows[0] ? toPost(rows[0]) : null;
}

/** Every post regardless of locale or published state. For the admin list. */
export async function listAllPosts(): Promise<BlogPost[]> {
  const rows = await query<PostRow>(`SELECT * FROM blog_posts ORDER BY created_at DESC`);
  return rows.map(toPost);
}

/** One post by id regardless of published state. For the admin edit form. */
export async function getPostById(id: number): Promise<BlogPost | null> {
  const rows = await query<PostRow>(`SELECT * FROM blog_posts WHERE id = $1`, [id]);
  return rows[0] ? toPost(rows[0]) : null;
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  const rows = await query<PostRow>(
    `INSERT INTO blog_posts
       (locale, slug, title, category, excerpt, body, image_url, published, published_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CASE WHEN $8 THEN now() ELSE NULL END)
     RETURNING *`,
    [
      input.locale,
      input.slug,
      input.title,
      input.category || null,
      input.excerpt,
      input.body,
      input.imageUrl || null,
      input.published,
    ],
  );
  return toPost(rows[0]);
}

export async function updatePost(id: number, input: BlogPostInput): Promise<BlogPost | null> {
  const rows = await query<PostRow>(
    `UPDATE blog_posts SET
       locale = $2,
       slug = $3,
       title = $4,
       category = $5,
       excerpt = $6,
       body = $7,
       image_url = $8,
       published = $9,
       -- Keep the original publish timestamp if it was already published;
       -- stamp it fresh the moment a draft first goes live.
       published_at = CASE
         WHEN $9 AND published_at IS NULL THEN now()
         WHEN NOT $9 THEN NULL
         ELSE published_at
       END,
       updated_at = now()
     WHERE id = $1
     RETURNING *`,
    [
      id,
      input.locale,
      input.slug,
      input.title,
      input.category || null,
      input.excerpt,
      input.body,
      input.imageUrl || null,
      input.published,
    ],
  );
  return rows[0] ? toPost(rows[0]) : null;
}

export async function deletePost(id: number): Promise<void> {
  await query(`DELETE FROM blog_posts WHERE id = $1`, [id]);
}
