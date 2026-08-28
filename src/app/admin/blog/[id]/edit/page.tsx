import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/admin-auth";
import { getPostById } from "@/lib/blog";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  requireAdminPage();

  const id = Number(params.id);
  const post = Number.isInteger(id) ? await getPostById(id) : null;
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-semibold text-2xl text-ink-700">Edit post</h1>
      <div className="mt-8">
        <PostForm
          initial={{
            id: post.id,
            locale: post.locale,
            title: post.title,
            slug: post.slug,
            category: post.category ?? "",
            excerpt: post.excerpt,
            body: post.body,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
