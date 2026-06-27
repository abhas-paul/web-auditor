"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { reportService } from "../services/report.service";

export default function useGenerateReport() {
  const router = useRouter();

  return useMutation({
    mutationFn: (url) => reportService.generate(url),

    onSuccess: (data) => {
      if (!data?.success) return;

      router.push(`/reports/${data.reportId}`);
    },

    onError: (error) => {
      console.error("Generate Report Error:", error);
    },
  });
}