export default function LoadingStudentApplication() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-52 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-80 animate-pulse rounded-full bg-slate-200" />
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 overflow-x-hidden">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-9 w-9 flex-none animate-pulse rounded-full bg-slate-200" />
        ))}
      </div>

      {/* Form panel */}
      <div className="space-y-6">
        <div className="h-72 animate-pulse rounded-[1.75rem] bg-slate-200" />
        <div className="flex justify-end gap-3">
          <div className="h-11 w-28 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-11 w-28 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
