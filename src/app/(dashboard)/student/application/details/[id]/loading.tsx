export default function LoadingApplicationDetails() {
  return (
    <div className="space-y-8">
      {/* Back link */}
      <div className="h-11 w-40 animate-pulse rounded-2xl bg-slate-200" />

      {/* Header */}
      <div className="space-y-2">
        <div className="h-9 w-56 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div className="h-48 animate-pulse rounded-[1.75rem] bg-slate-200" />
        <div className="h-64 animate-pulse rounded-[1.75rem] bg-slate-200" />
        <div className="h-48 animate-pulse rounded-[1.75rem] bg-slate-200" />
      </div>
    </div>
  );
}
