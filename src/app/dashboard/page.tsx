import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-sm text-gray-600 mb-6">
          Manage settings and data used in the website.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Currency</h2>
            <p className="text-sm text-gray-600 mt-1">
              Add, edit, and remove currencies for dashboard management.
            </p>
          </div>
          <Link
            href="/dashboard/currency"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Manage Currency
          </Link>
        </div>
      </section>
    </main>
  );
}
