"use client";

import { useQuery } from "@tanstack/react-query";
import authService from "@/services/auth.service";

export default function useAuth() {
  const query = useQuery({
    queryKey: ["auth-user"],
    queryFn: authService.me,

    retry: false,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });

  return {
    user: query.data?.user ?? null,

    isAuthenticated: !!query.data?.user,

    isLoading: query.isPending,

    isError: query.isError,

    error: query.error,

    refetch: query.refetch,
  };
}