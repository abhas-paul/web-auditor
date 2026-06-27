"use client";

import { useQuery } from "@tanstack/react-query";
import { reportService } from "../services/report.service";
import { QUERY_KEYS } from "@/lib/constants";

export default function useReport(reportId) {
  return useQuery({
    queryKey: QUERY_KEYS.REPORT(reportId),

    queryFn: () => reportService.getById(reportId),

    enabled: !!reportId,

    staleTime: 1000 * 60 * 5,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}