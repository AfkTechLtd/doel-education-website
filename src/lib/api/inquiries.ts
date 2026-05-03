import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  studentName: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  programInterest: z.string().min(1, "Program interest is required"),
  message: z.string().optional(),
});

export type InquiryPayload = z.infer<typeof schema>;

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
  };

  if (!res.ok || !body.ok) {
    throw new Error(body.error ?? "Failed to submit inquiry. Please try again.");
  }
}
