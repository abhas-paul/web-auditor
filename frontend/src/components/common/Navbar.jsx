"use client";

import Link from "next/link";
import { LogOut, ShieldCheck } from "lucide-react";

import useAuth from "@/features/auth/hooks/useAuth";
import useLogout from "@/features/auth/hooks/useLogout";

export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const logout = useLogout();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Web Auditor</p>
            <p className="text-xs text-slate-500">Production-grade audits</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {!isLoading && isAuthenticated ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">{user?.name || user?.email}</span>
              <button
                type="button"
                onClick={() => logout.mutate()}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
