import { requireAdminPage } from "@/lib/admin-auth";
import { listAllPosts } from "@/lib/blog";
import DeletePostButton from "@/components/admin/DeletePostButton";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminBlogPage() {
  requireAdminPage();
  const posts = await listAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl text-ink-700">Blog posts</h1>
          <p className="mt-1 text-sm text-ink-400">{posts.length} total</p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/admin/blog/new"
            className="rounded-lg bg-pine-700 px-4 py-2 text-sm font-medium text-white hover:bg-pine-600"
          >
            New post
          </a>
          <LogoutButton />
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-ink-400">
          No posts yet. Click &ldquo;New post&rdquo; to write the first one.
        </p>
      ) : (
        <div className="mt-8 divide-y divide-ink-700/10 rounded-xl border border-ink-700/10 bg-white">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      post.published
                        ? "bg-pine-700/10 text-pine-700"
                        : "bg-ink-400/10 text-ink-400"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-ink-400">
                    {post.locale}
                  </span>
                </div>
                <div className="mt-1 truncate font-medium text-ink-700">{post.title}</div>
                <div className="truncate text-xs text-ink-400">/{post.slug}</div>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <a
                  href={`/admin/blog/${post.id}/edit`}
                  className="text-sm text-pine-700 hover:underline"
                >
                  Edit
                </a>
                <DeletePostButton id={post.id} title={post.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
