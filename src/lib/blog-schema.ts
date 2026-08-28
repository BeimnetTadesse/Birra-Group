import { z } from "zod";

/** Shape of a blog post as submitted from the admin form. */
export const blogPostSchema = z.object({
  locale: z.enum(["en", "ar"]),
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  category: z.string().trim().max(80).optional().default(""),
  excerpt: z.string().trim().min(1, "Excerpt is required").max(400),
  body: z.string().trim().min(1, "Body is required").max(20_000),
  imageUrl: z.string().trim().max(500).optional().default(""),
  published: z.boolean().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

/** Turns "New Export Partnership" into "new-export-partnership". */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}
