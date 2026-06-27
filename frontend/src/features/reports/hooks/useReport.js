"use client";

import { useQuery } from "@tanstack/react-query";
import { reportService } from "../services/report.service";

export default function useReport(reportId) {
  return useQuery({
    queryKey: ["report", reportId],

    queryFn: () => reportService.getById(reportId),

    enabled: !!reportId,

    staleTime: 1000 * 60 * 5, // 5 minutes

    retry: 1,

    refetchOnWindowFocus: false,
  });
}