"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, RefreshCw } from "lucide-react";

import useReport from "@/features/reports/hooks/useReport";
import ReportHeader from "@/features/reports/components/ReportHeader";
import SectionCard from "@/features/reports/components/SectionCard";
import ReportLoading from "@/features/reports/components/ReportLoading";
import ReportError from "@/features/reports/components/ReportError";
import MetricCard from "@/features/reports/components/MetricCard";

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return [value];
  if (typeof value === "object" && value !== null) {
    return Object.entries(value).map(([key, item]) =>
      typeof item === "string" ? item : `${key}: ${JSON.stringify(item)}`
    );
  }
  return [];
}

function buildSummaryItems(section) {
  const items = [];
  if (section?.overallHealth) items.push(section.overallHealth);
  if (section?.overallRecommendation) items.push(section.overallRecommendation);
  if (section?.keyStrengths?.length) items.push(...section.keyStrengths);
  if (section?.majorWeaknesses?.length) items.push(...section.majorWeaknesses);
  return items;
}

function renderStyledText(text) {
  if (typeof text !== "string") return text;

  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export default function ReportPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch } = useReport(id);

  const report = data?.report;
  const audit = report?.report;

  const metadata = useMemo(
    () => ({
      id: report?._id,
      url: report?.url,
      createdAt: report?.createdAt,
    }),
    [report]
  );

  if (isLoading) return <ReportLoading />;

  if (isError) {
    return (
      <ReportError
        message={
          error?.response?.data?.message ||
          "Unable to load report. Please try again."
        }
        onRetry={refetch}
      />
    );
  }

  const executiveSummary = audit?.executiveSummary || {};
  const performance = audit?.performanceAudit || {};
  const seo = audit?.seoAudit || {};
  const security = audit?.securityAudit || {};
  const accessibility = audit?.accessibilityAudit || {};
  const ux = audit?.uxUiReview || {};
  const benchmark = audit?.competitorBenchmark || {};
  const revenue = audit?.revenueImpactAnalysis || {};
  const actionPlan = audit?.prioritizedActionPlan || {};

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <ReportHeader
        metadata={metadata}
        summary={executiveSummary}
        performance={performance}
        seo={seo}
        security={security}
        accessibility={accessibility}
        ux={ux}
      />

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Executive Summary">
          <div className="space-y-4">
            <p className="text-slate-600">{executiveSummary.overallHealth || "The summary will appear here."}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard label="Overall Recommendation" value={executiveSummary.overallRecommendation || "Review needed"} />
              <MetricCard label="Key Strengths" value={executiveSummary.keyStrengths?.length || 0} />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Highlights</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {buildSummaryItems(executiveSummary).map((item, index) => (
                  <li key={`${item}-${index}`} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600" />
                    <span>{renderStyledText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Performance">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard label="Score" value={`${performance.score ?? 0}/100`} />
              <MetricCard label="Status" value={performance.coreWebVitalsStatus || "Pending"} />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-700">Core metrics</p>
              <ul className="mt-3 space-y-2">
                <li>• LCP: {performance.largestContentfulPaint || "N/A"}</li>
                <li>• TBT: {performance.totalBlockingTime || "N/A"}</li>
                <li>• Speed Index: {performance.speedIndex || "N/A"}</li>
                <li>• CLS: {performance.cumulativeLayoutShift || "N/A"}</li>
              </ul>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {asArray(performance.performanceInsights).map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-amber-500" />
                  <span>{renderStyledText(item)}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Recommendations</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {asArray(performance.recommendations).map((item, index) => (
                  <li key={`${item}-${index}`} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600" />
                    <span>{renderStyledText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="SEO">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard label="Score" value={`${seo.score ?? 0}/100`} />
              <MetricCard label="H1 Count" value={seo.h1Count ?? "N/A"} />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p><span className="font-medium text-slate-700">Title:</span> {seo.titleTag?.content || "N/A"}</p>
              <p className="mt-2"><span className="font-medium text-slate-700">Meta Description:</span> {seo.metaDescription?.content || "N/A"}</p>
              <p className="mt-2"><span className="font-medium text-slate-700">Crawlability:</span> {seo.crawlability?.status || "N/A"}</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {asArray(seo.recommendations).map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-500" />
                  <span>{renderStyledText(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        <SectionCard title="Security">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard label="Score" value={security.score || "N/A"} />
              <MetricCard label="CSP" value={security.contentSecurityPolicy?.enabled ? "Enabled" : "Missing"} />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p><span className="font-medium text-slate-700">CSP:</span> {security.contentSecurityPolicy?.status || "N/A"}</p>
              <p className="mt-2"><span className="font-medium text-slate-700">HSTS:</span> {security.httpStrictTransportSecurity?.status || "N/A"}</p>
              <p className="mt-2"><span className="font-medium text-slate-700">Server:</span> {security.serverInformation?.server || "N/A"}</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {asArray(security.recommendations).map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-rose-500" />
                  <span>{renderStyledText(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        <SectionCard title="Accessibility">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard label="Score" value={`${accessibility.score ?? 0}/100`} />
              <MetricCard label="Status" value={accessibility.status || "Pending"} />
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {asArray(accessibility.insights).map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-violet-500" />
                  <span>{renderStyledText(item)}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm text-slate-600">
              {asArray(accessibility.recommendations).map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-slate-400" />
                  <span>{renderStyledText(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        <SectionCard title="UX/UI">
          <div className="space-y-4">
            <p className="text-slate-600">{ux.overallImpression || "UX feedback will appear here."}</p>
            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Positive</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {asArray(ux.positiveAspects).map((item, index) => (
                  <li key={`${item}-${index}`} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-500" />
                    <span>{renderStyledText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Watch-outs</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {asArray(ux.negativeAspects).map((item, index) => (
                  <li key={`${item}-${index}`} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-amber-500" />
                    <span>{renderStyledText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              {ux.impactOnUserJourney || "Journey impact will appear here."}
            </p>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <SectionCard title="Competitor Benchmark">
          <div className="space-y-4">
            <p className="text-slate-600">{benchmark.context || "Benchmark context will be shown here."}</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600" /> <span>{benchmark.performanceComparison || "N/A"}</span></li>
              <li className="flex gap-2"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-rose-500" /> <span>{benchmark.securityComparison || "N/A"}</span></li>
              <li className="flex gap-2"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-500" /> <span>{benchmark.seoComparison || "N/A"}</span></li>
            </ul>
          </div>
        </SectionCard>

        <SectionCard title="Revenue Impact">
          <div className="space-y-4">
            <ul className="space-y-2 text-sm text-slate-600">
              {asArray(revenue.potentialNegativeImpact).map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-rose-500" />
                  <span>{renderStyledText(item)}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm text-slate-600">
              {asArray(revenue.potentialPositiveImpact).map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-500" />
                  <span>{renderStyledText(item)}</span>
                </li>
              ))}
            </ul>
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">{revenue.overallSummary || "Revenue impact summary will appear here."}</p>
          </div>
        </SectionCard>

        <SectionCard title="Prioritized Action Plan">
          <div className="space-y-4">
            {(["criticalPriority", "highPriority", "mediumPriority", "lowPriority"]).map((group) => (
              <div key={group} className="rounded-xl border border-slate-200 p-4">
                <h3 className="mb-2 text-sm font-semibold capitalize text-slate-700">{group.replace(/Priority/g, " Priority")}</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {asArray(actionPlan[group]).map((item, index) => {
                    const text = typeof item === "string" ? item : item?.item ? `${item.item}: ${item.description}` : String(item);
                    return (
                      <li key={`${group}-${index}`} className="flex gap-2">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600" />
                        <span>{renderStyledText(text)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </main>
  );
}
