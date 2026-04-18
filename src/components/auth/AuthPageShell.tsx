import type { ReactNode } from "react";

export default function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[calc(100vh-4rem)] overflow-x-hidden bg-[#fcfdfd]">
      <section className="mx-auto max-w-xl px-6 py-14 lg:px-12 lg:py-20">
        {children}
      </section>
    </main>
  );
}
