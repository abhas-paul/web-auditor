"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { reportService } from "../services/report.service";
import { QUERY_KEYS } from "@/lib/constants";

export default function useGenerateReport() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (url) => reportService.generate(url),

    onSuccess: (data, url) => {
      if (!data?.success || !data?.reportId) {
        const message = data?.message || "Failed to generate report.";
        toast.error(message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORTS });
      queryClient.setQueryData(QUERY_KEYS.REPORTS, (current) => {
        if (!current?.reports) return current;
        return {
          ...current,
          reports: [
            {
              _id: data.reportId,
              url,
              createdAt: new Date().toISOString(),
              status: "completed",
            },
            ...current.reports,
          ],
        };
      });

      router.replace(`/reports/${data.reportId}`);
    },

    onError: async (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to generate report.";

      const isCleanupWarning =
        typeof message === "string" &&
        (message.includes("Chrome cleanup warning") ||
          message.includes("EBUSY"));

      const isTimeout =
        error?.code === "ECONNABORTED" ||
        error?.message?.includes("timeout") ||
        error?.code === "ERR_NETWORK";

      if (isCleanupWarning) {
        return;
      }

      if (isTimeout) {
        try {
          const fallbackReports = await reportService.getAll();
          const latestReport = fallbackReports?.reports?.[0];

          if (latestReport?._id) {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORTS });
            router.replace(`/reports/${latestReport._id}`);
            toast.success("Report is ready. Redirecting...");
            return;
          }
        } catch (fallbackError) {
          console.error("Report fallback error:", fallbackError);
        }
      }

      toast.error(message);
      console.error("Generate Report Error:", error);
    },
  });
}