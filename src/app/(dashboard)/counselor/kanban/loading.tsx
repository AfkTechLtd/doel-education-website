export default function LoadingKanban() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-3 w-28 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-48 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-96 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="flex gap-4 overflow-x-hidden pb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex w-72 flex-none flex-col gap-3">
            <div className="h-11 animate-pulse rounded-2xl bg-slate-200" />
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
