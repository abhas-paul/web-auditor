export default function ReportLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="animate-pulse space-y-8">
        <div className="h-52 rounded-3xl bg-slate-200" />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-40 rounded-3xl bg-slate-100" />
          <div className="h-40 rounded-3xl bg-slate-100" />
          <div className="h-40 rounded-3xl bg-slate-100" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-64 rounded-3xl bg-slate-100" />
          <div className="h-64 rounded-3xl bg-slate-100" />
        </div>
      </div>
    </main>
  );
}
