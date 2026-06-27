"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";

import useGenerateReport from "@/features/reports/hooks/useGenerateReport";
import { reportService } from "@/features/reports/services/report.service";
import { QUERY_KEYS } from "@/lib/constants";

export default function DashboardPage() {
  const [url, setUrl] = useState("");
  const generateReport = useGenerateReport();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: QUERY_KEYS.REPORTS,
    queryFn: reportService.getAll,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const reports = useMemo(() => data?.reports ?? [], [data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedUrl = url.trim();

    if (!trimmedUrl || generateReport.isPending) return;

    generateReport.mutate(trimmedUrl);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
              New Audit
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Start a fresh website review
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Paste a URL to generate a polished report covering performance,
              SEO, security, accessibility, and UX.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Website URL
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              disabled={generateReport.isPending}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              required
            />
          </div>

          {generateReport.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {generateReport.error?.response?.data?.message ||
                generateReport.error?.message ||
                "Failed to generate report."}
            </div>
          )}

          <button
            type="submit"
            disabled={generateReport.isPending}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {generateReport.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Website Audit...
              </>
            ) : (
              "Analyze Website"
            )}
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recent Reports</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your latest audits appear here for quick access.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-6 space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="h-16 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error?.response?.data?.message || "Unable to load reports right now."}
          </div>
        ) : reports.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No reports yet. Start your first audit to see it listed here.
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {reports.map((report) => (
              <div
                key={report._id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium text-slate-800">{report.url}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
                    {report.status || "completed"}
                  </span>
                  <Link
                    href={`/reports/${report._id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    View Report
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}