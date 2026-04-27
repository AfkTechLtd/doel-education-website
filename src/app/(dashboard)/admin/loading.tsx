export default function LoadingAdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-28 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-40 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-96 animate-pulse rounded-full bg-slate-200" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>

      {/* Pipeline */}
      <div className="h-48 animate-pulse rounded-[1.75rem] bg-slate-200" />

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="h-72 animate-pulse rounded-[1.75rem] bg-slate-200" />
        <div className="h-72 animate-pulse rounded-[1.75rem] bg-slate-200" />
      </div>
    </div>
  );
}
