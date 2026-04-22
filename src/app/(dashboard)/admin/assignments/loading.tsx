export default function LoadingAssignments() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-3 w-28 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-60 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-96 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-[1.75rem] bg-slate-200" />
    </div>
  );
}
