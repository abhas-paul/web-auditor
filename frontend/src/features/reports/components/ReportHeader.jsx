import ScoreCard from "./ScoreCard";

function normalizeScore(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.min(100, Math.max(0, value));
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    const numeric = Number(trimmed);

    if (Number.isFinite(numeric)) {
      return Math.min(100, Math.max(0, numeric));
    }

    const lowered = trimmed.toLowerCase();

    if (lowered.includes("excellent")) return 95;
    if (lowered.includes("good")) return 80;
    if (lowered.includes("fair")) return 65;
    if (lowered.includes("poor")) return 40;
    if (lowered.includes("critical")) return 25;
    if (lowered.includes("fail")) return 35;
  }

  return fallback;
}

function deriveOverallStatus(score) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs Attention";
  return "Critical";
}

function deriveUxScore(ux, accessibility, performance) {
  if (ux?.score !== undefined && ux?.score !== null) {
    return normalizeScore(ux.score);
  }

  const perfScore = normalizeScore(performance?.score);
  const accessibilityScore = normalizeScore(accessibility?.score);
  const signal = [ux?.overallImpression, ux?.impactOnUserJourney, ...(ux?.positiveAspects || []), ...(ux?.negativeAspects || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let adjustment = 0;

  if (/poor|critical|slow|frustrat|abandon|sluggish|bad/i.test(signal)) {
    adjustment -= 10;
  }

  if (/good|strong|excellent|smooth|positive|inclusive/i.test(signal)) {
    adjustment += 6;
  }

  return Math.min(100, Math.max(0, Math.round(perfScore * 0.45 + accessibilityScore * 0.35 + 20 + adjustment)));
}

function deriveOverallScore(summary, performance, seo, security, accessibility, uxScore) {
  const explicit = summary?.overallScore;
  if (explicit !== undefined && explicit !== null) {
    return normalizeScore(explicit);
  }

  const sections = [
    { score: performance?.score, weight: 0.25 },
    { score: seo?.score, weight: 0.2 },
    { score: security?.score, weight: 0.2 },
    { score: accessibility?.score, weight: 0.2 },
    { score: uxScore, weight: 0.15 },
  ];

  const totalWeight = sections.reduce((sum, section) => sum + (section.score !== undefined && section.score !== null ? section.weight : 0), 0);

  if (!totalWeight) {
    return 0;
  }

  const weighted = sections.reduce((sum, section) => {
    if (section.score === undefined || section.score === null) {
      return sum;
    }

    return sum + normalizeScore(section.score) * section.weight;
  }, 0);

  return Math.round(weighted / totalWeight);
}

export default function ReportHeader({
  metadata,
  summary,
  performance,
  seo,
  security,
  accessibility,
  ux,
}) {
  const uxScore = deriveUxScore(ux, accessibility, performance);
  const overallScore = deriveOverallScore(summary, performance, seo, security, accessibility, uxScore);
  const overallStatus = summary?.overallStatus || deriveOverallStatus(overallScore);

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
          {overallStatus}
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ScoreCard title="Overall Score" score={overallScore} />
        <ScoreCard title="Performance" score={normalizeScore(performance?.score)} />
        <ScoreCard title="SEO" score={normalizeScore(seo?.score)} />
        <ScoreCard title="Security" score={normalizeScore(security?.score)} />
        <ScoreCard title="Accessibility" score={normalizeScore(accessibility?.score)} />
        <ScoreCard title="UX/UI" score={uxScore} />
      </div>
    </header>
  );
}