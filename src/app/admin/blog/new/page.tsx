import { requireAdminPage } from "@/lib/admin-auth";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  requireAdminPage();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-semibold text-2xl text-ink-700">New post</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
