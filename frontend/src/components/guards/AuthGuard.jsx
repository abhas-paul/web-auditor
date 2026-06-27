"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/features/auth/hooks/useAuth";
import PageLoader from "../common/PageLoader";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { isLoading, isAuthenticated, isError } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || isError)) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, isError, router]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated || isError) {
    return null;
  }

  return children;
}