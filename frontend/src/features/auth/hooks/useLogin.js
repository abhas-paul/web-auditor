"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import authService from "@/services/auth.service";
import queryClient from "@/lib/queryClient";

export default function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,

    onSuccess: (data) => {
      // Refresh the cached user
      queryClient.invalidateQueries({
        queryKey: ["auth-user"],
      });

      toast.success(
        data.message || "Logged in successfully"
      );

      router.replace("/dashboard");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to login"
      );
    },
  });
}