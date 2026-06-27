"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import authService from "@/services/auth.service";
import queryClient from "@/lib/queryClient";

export default function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,

    onSuccess: (data) => {
      // Refresh the authenticated user
      queryClient.invalidateQueries({
        queryKey: ["auth-user"],
      });

      toast.success(
        data.message || "Account created successfully"
      );

      router.replace("/dashboard");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    },
  });
}