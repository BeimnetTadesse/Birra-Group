"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/blog-schema";

type PostFormValues = {
  id?: number;
  locale: "en" | "ar";
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  published: boolean;
};

const EMPTY: PostFormValues = {
  locale: "en",
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  body: "",
  published: false,
};

export default function PostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<PostFormValues>(initial ?? EMPTY);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onTitleChange(title: string) {
    set("title", title);
    if (!slugTouched) set("slug", slugify(title));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(isEdit ? `/api/admin/blog/${initial!.id}` : "/api/admin/blog", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          typeof data.error === "string" ? data.error : "Could not save the post.",
        );
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the post.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-ink-700/20 px-3 py-2 text-sm outline-none focus:border-pine-600";

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <div className="flex gap-4">
        <label className="text-sm font-medium text-ink-700">
          Language
          <select
            value={values.locale}
            onChange={(e) => set("locale", e.target.value as "en" | "ar")}
            className={inputClass}
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </label>

        <label className="flex-1 text-sm font-medium text-ink-700">
          Category <span className="font-normal text-ink-400">(optional)</span>
          <input
            type="text"
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            placeholder="e.g. Export Milestone, Partnership"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-ink-700">
        Title
        <input
          type="text"
          value={values.title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-medium text-ink-700">
        URL slug
        <input
          type="text"
          value={values.slug}
          onChange={(e) => {
            setSlugTouched(true);
            set("slug", e.target.value);
          }}
          required
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          className={`${inputClass} font-mono`}
        />
        <span className="mt-1 block text-xs text-ink-400">
          /blog/{values.slug || "your-post-slug"}
        </span>
      </label>

      <label className="block text-sm font-medium text-ink-700">
        Excerpt <span className="font-normal text-ink-400">(shown on the blog listing)</span>
        <textarea
          value={values.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          required
          rows={2}
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-medium text-ink-700">
        Body
        <textarea
          value={values.body}
          onChange={(e) => set("body", e.target.value)}
          required
          rows={10}
          className={inputClass}
        />
      </label>

      <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => set("published", e.target.checked)}
        />
        Published (visible on the public blog)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-pine-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pine-600 disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create post"}
        </button>
        <a
          href="/admin/blog"
          className="rounded-lg border border-ink-700/20 px-5 py-2.5 text-sm font-medium text-ink-700 hover:border-ink-700/40"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
