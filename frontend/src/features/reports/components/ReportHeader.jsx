import ScoreCard from "./ScoreCard";

export default function ReportHeader({
  metadata,
  summary,
  performance,
  seo,
  security,
  accessibility,
  ux,
}) {

  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <div>
          <p className="text-sm uppercase tracking-wider text-slate-500">
            Website Audit Report
          </p>

          <h1 className="mt-2 text-3xl font-bold break-all">
            {metadata?.url ?? "Audit Report"}
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Generated on {metadata?.createdAt ? new Date(metadata.createdAt).toLocaleString() : "Unknown"}
          </p>
        </div>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {summary?.overallStatus ?? "Unknown"}
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ScoreCard title="Overall Score" score={summary?.overallScore ?? 0} />
        <ScoreCard title="Performance" score={performance?.score ?? 0} />
        <ScoreCard title="SEO" score={seo?.score ?? 0} />
        <ScoreCard title="Security" score={security?.score ?? 0} />
        <ScoreCard title="Accessibility" score={accessibility?.score ?? 0} />
        <ScoreCard title="UX/UI" score={ux?.score ?? 0} />
      </div>
    </header>
  );
}