export default function LoadingApplicationHistory() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-36 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-56 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-72 animate-pulse rounded-full bg-slate-200" />
      </div>

      {/* Search + filter bar */}
      <div className="flex gap-3">
        <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200" />
      </div>

      {/* Application cards */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
}
