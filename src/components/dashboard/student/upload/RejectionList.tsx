"use client";

import { FileWarning } from "lucide-react";

type RejectionListProps = {
  messages: string[];
};

export default function RejectionList({ messages }: RejectionListProps) {
  if (!messages.length) return null;

  return (
    <div className="space-y-3 rounded-[1.5rem] border border-red-200 bg-red-50 p-4">
      <div className="flex items-center gap-2 text-red-700">
        <FileWarning className="h-4 w-4" aria-hidden="true" />
        <p className="font-inter text-sm font-semibold">Some files were not added</p>
      </div>

      <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
        {messages.map((message) => (
          <p key={message} className="font-inter text-sm leading-relaxed text-red-700">
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}
