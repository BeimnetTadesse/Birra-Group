import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { blogPostSchema } from "@/lib/blog-schema";
import { deletePost, getPostById, updatePost } from "@/lib/blog";

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const post = await updatePost(id, parsed.data);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (error) {
    console.error("[admin/blog] update failed", error);
    return NextResponse.json(
      { error: "Could not save post — that slug may already be in use for this language." },
      { status: 409 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  await deletePost(id);
  return NextResponse.json({ ok: true });
}
