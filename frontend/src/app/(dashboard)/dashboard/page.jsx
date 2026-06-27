"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    // Call audit API here
    console.log(url);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Start a new website audit by entering a URL below.
        </p>
      </div>

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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Analyze Website
          </button>
        </form>
      </div>

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