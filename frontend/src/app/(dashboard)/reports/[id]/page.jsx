"use client";

import { useParams } from "next/navigation";

import useReport from "@/features/reports/hooks/useReport";
import ReportHeader from "@/features/reports/components/ReportHeader";
import SectionCard from "@/features/reports/components/SectionCard";
import ReportLoading from "@/features/reports/components/ReportLoading";
import ReportError from "@/features/reports/components/ReportError";

export default function ReportPage() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useReport(id);

  if (isLoading) return <ReportLoading />;

  if (isError) {
    return (
      <ReportError
        message={
          error?.response?.data?.message ??
          "Unable to load report. Please try again."
        }
        onRetry={refetch}
      />
    );
  }

  const report = data?.report;

  const metadata = {
    id: report?._id,
    url: report?.url,
    createdAt: report?.createdAt,
  };

  const audit = report?.report;

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <ReportHeader
        metadata={metadata}
        summary={audit?.executiveSummary}
        performance={audit?.performanceAudit}
        seo={audit?.seoAudit}
        security={audit?.securityAudit}
        accessibility={audit?.accessibilityAudit}
        ux={audit?.uxUiReview}
      />

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Executive Summary">
          <p className="text-slate-600">
            {audit?.executiveSummary?.summaryText ??
              "A high-level summary of your website audit will appear here."}
          </p>
        </SectionCard>

        <SectionCard title="Performance">
          <p className="text-slate-600">
            {audit?.performanceAudit?.summary ?? "Coming soon..."}
          </p>
        </SectionCard>

        <SectionCard title="SEO">
          <p className="text-slate-600">
            {audit?.seoAudit?.summary ?? "Coming soon..."}
          </p>
        </SectionCard>

        <SectionCard title="Security">
          <p className="text-slate-600">
            {audit?.securityAudit?.summary ?? "Coming soon..."}
          </p>
        </SectionCard>

        <SectionCard title="Accessibility">
          <p className="text-slate-600">
            {audit?.accessibilityAudit?.summary ?? "Coming soon..."}
          </p>
        </SectionCard>

        <SectionCard title="UX/UI">
          <p className="text-slate-600">
            {audit?.uxUiReview?.summary ?? "Coming soon..."}
          </p>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <SectionCard title="Benchmark">
          <p className="text-slate-600">Coming soon...</p>
        </SectionCard>

        <SectionCard title="Revenue">
          <p className="text-slate-600">Coming soon...</p>
        </SectionCard>

        <SectionCard title="Action Plan">
          <p className="text-slate-600">Coming soon...</p>
        </SectionCard>
      </section>
    </main>
  );
}
