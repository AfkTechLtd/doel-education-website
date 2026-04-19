export default function LoadingStudentDetail() {
  return (
    <div className="space-y-8">
      <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
      <div className="space-y-2">
        <div className="h-9 w-56 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="h-48 animate-pulse rounded-[1.75rem] bg-slate-200" />
          <div className="h-64 animate-pulse rounded-[1.75rem] bg-slate-200" />
          <div className="h-80 animate-pulse rounded-[1.75rem] bg-slate-200" />
        </div>
        <div className="h-96 animate-pulse rounded-[1.75rem] bg-slate-200" />
      </div>
    </div>
  );
}
