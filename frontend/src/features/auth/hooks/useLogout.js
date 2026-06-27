"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import authService from "@/services/auth.service";
import { QUERY_KEYS } from "@/lib/constants";

export default function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,

    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, {
        authenticated: false,
        user: null,
      });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.REPORTS });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.AUTH_USER });
      queryClient.clear();

      toast.success(data.message || "Logged out successfully");
      router.replace("/login");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to logout");
    },
  });
}