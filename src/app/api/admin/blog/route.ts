import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { blogPostSchema } from "@/lib/blog-schema";
import { createPost, listAllPosts } from "@/lib/blog";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const posts = await listAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const post = await createPost(parsed.data);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    // Most likely cause: the (locale, slug) unique constraint.
    console.error("[admin/blog] create failed", error);
    return NextResponse.json(
      { error: "Could not create post — that slug may already be in use for this language." },
      { status: 409 },
    );
  }
}
