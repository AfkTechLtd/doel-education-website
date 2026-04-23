export default function LoadingStudentResourceDetail() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="h-11 w-full animate-pulse rounded-2xl bg-slate-200 sm:w-64" />
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="h-5 w-28 animate-pulse rounded-full bg-slate-200 sm:self-center" />
          <div className="h-11 w-full animate-pulse rounded-2xl bg-slate-200 sm:w-32" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-full max-w-xl animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-200" />
      </div>

      <div className="h-[22rem] animate-pulse rounded-[1.45rem] border border-slate-200 bg-slate-200 sm:h-[30rem] md:h-[38rem]" />

      <div className="space-y-4 rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="space-y-2">
          <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
          <div className="h-8 w-56 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-200" />
        </div>
        <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-11 w-full animate-pulse rounded-2xl bg-slate-200 sm:w-44" />
      </div>
    </div>
  );
}
