"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/features/auth/hooks/useAuth";
import PageLoader from "../common/PageLoader";

export default function GuestGuard({
  children,
}) {
  const router = useRouter();

  const {
    isLoading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
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

  if (isAuthenticated) {
    return null;
  }

  return children;
}