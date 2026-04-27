export default function LoadingStudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-28 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-64 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-96 animate-pulse rounded-full bg-slate-200" />
      </div>

      {/* Panel grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-36 animate-pulse rounded-[1.75rem] bg-slate-200" />
        ))}
      </div>
    </div>
  );
}
