export default function LoadingStudentResources() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-56 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-200" />
      </div>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="aspect-[4/4.4] animate-pulse rounded-[1.45rem] border border-slate-200 bg-slate-200"
          />
        ))}
      </section>
    </div>
  );
}
