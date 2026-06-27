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
      // Remove the authenticated user from cache
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, null);

      // Optionally clear all cached queries
      queryClient.clear();

      toast.success(
        data.message || "Logged out successfully"
      );

      router.replace("/login");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to logout"
      );
    },
  });
}