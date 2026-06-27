"use client";

import { useState } from "react";
import useGenerateReport from "@/features/reports/hooks/useGenerateReport";

export default function DashboardPage() {
  const [url, setUrl] = useState("");

  const generateReport = useGenerateReport();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUrl = url.trim();

    if (!trimmedUrl) return;

    generateReport.mutate(trimmedUrl);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Start a new website audit by entering a URL below.
        </p>
      </div>

      {/* New Audit Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          New Audit
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Analyze performance, SEO, security, accessibility and more.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Website URL
            </label>

            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={generateReport.isPending}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              required
            />
          </div>

          {generateReport.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {generateReport.error?.response?.data?.message ??
                "Failed to generate report."}
            </div>
          )}

          <button
            type="submit"
            disabled={generateReport.isPending}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {generateReport.isPending ? (
              <>
                <svg
                  className="mr-2 h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>

                Running Website Audit...
              </>
            ) : (
              "Analyze Website"
            )}
          </button>
        </form>
      </div>

      {/* Recent Reports */}
      <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          Recent Reports
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Your latest audit reports will appear here.
        </p>
      </div>
    </div>
  );
}