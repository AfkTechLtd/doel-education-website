export default function LoadingStudentDocuments() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-52 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-96 animate-pulse rounded-full bg-slate-200" />
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>

      {/* Upload area */}
      <div className="h-36 animate-pulse rounded-[1.75rem] bg-slate-200" />

      {/* Document list */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
}
