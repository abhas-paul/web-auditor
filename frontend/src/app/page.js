"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-sm text-slate-600">
          Website Auditing Platform
        </span>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Audit any website in{" "}
          <span className="text-blue-600">seconds.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Analyze performance, SEO, security, accessibility and user
          experience with comprehensive reports powered by modern web
          auditing tools.
        </p>

        <div className="mt-10 flex items-center gap-4">
          {loading ? null : user ? (
            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold">Performance</h3>

            <p className="mt-2 text-sm text-slate-600">
              Lighthouse metrics including LCP, CLS, FCP and Speed Index.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold">SEO & Security</h3>

            <p className="mt-2 text-sm text-slate-600">
              Discover missing SEO tags, security headers and best practices.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold">Actionable Reports</h3>

            <p className="mt-2 text-sm text-slate-600">
              Receive prioritized recommendations to improve your website.
            </p>
          </div>
        </div>

        <p className="mt-16 text-sm text-slate-400">
          Built with Next.js • Hono • Bun • Lighthouse
        </p>
      </div>
    </main>
  );
}