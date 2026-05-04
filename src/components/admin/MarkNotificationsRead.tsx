"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";
import { markNotificationsRead } from "@/actions/admin";

interface MarkNotificationsReadProps {
  notificationIds: string[];
}

export default function MarkNotificationsRead({ notificationIds }: MarkNotificationsReadProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDismiss() {
    setLoading(true);
    await markNotificationsRead(notificationIds);
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleDismiss}
      disabled={loading}
      title="Dismiss notifications"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-100 text-amber-700 transition-colors hover:bg-amber-200 disabled:opacity-50"
      aria-label="Dismiss notifications"
    >
      <X className="h-4 w-4" />
    </button>
  );
}
