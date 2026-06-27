"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import authService from "@/services/auth.service";
import { QUERY_KEYS } from "@/lib/constants";

export default function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,

    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, {
        authenticated: true,
        user: data.user,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH_USER });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORTS });

      toast.success(data.message || "Account created successfully");
      router.replace("/dashboard");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
}