"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import PageLoader from "../common/PageLoader";

export default function AuthGuard({
  children,
}) {
  const router = useRouter();

  const {
    isLoading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [
    isLoading,
    isAuthenticated,
    router,
  ]);

  if (isLoading) {
    return (
      <PageLoader/>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}