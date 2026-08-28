"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ id, title }: { id: number; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function onDelete() {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={onDelete}
      disabled={deleting}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      {deleting ? "Deleting…" : "Delete"}
    </button>
  );
}
