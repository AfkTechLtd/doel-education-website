export default function LoadingStudentResourceCategory() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-64 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-200" />
      </div>

      <div className="h-14 w-full max-w-xl animate-pulse rounded-2xl bg-slate-200" />

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="aspect-[5/4.5] animate-pulse rounded-[1.45rem] border border-slate-200 bg-slate-200"
          />
        ))}
      </section>
    </div>
  );
}
