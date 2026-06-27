"use client";

import { useQuery } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import { QUERY_KEYS } from "@/lib/constants";

export default function useAuth() {
  const query = useQuery({
    queryKey: QUERY_KEYS.AUTH_USER,
    queryFn: authService.me,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const authenticated = query.data?.authenticated ?? query.data?.user != null;

  return {
    user: query.data?.user ?? null,
    isAuthenticated: authenticated,
    isLoading: query.isPending,
    isError: query.isError || (!query.isPending && !authenticated && query.data?.message),
    error: query.error,
    refetch: query.refetch,
  };
}