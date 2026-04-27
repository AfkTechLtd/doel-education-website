export default function LoadingCounselorDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-36 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-56 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-96 animate-pulse rounded-full bg-slate-200" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
}
