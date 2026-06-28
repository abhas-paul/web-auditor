"use client";

import { useMutation } from "@tanstack/react-query";

import { downloadReportPdf } from "../services/pdf.service";
import { downloadBlob } from "../utils/downloadPdf";

export default function useGeneratePdf() {
  return useMutation({
    mutationFn: downloadReportPdf,

    onSuccess: (blob, reportId) => {
      downloadBlob(blob, `audit-report-${reportId}.pdf`);
    },

    onError: (error) => {
      console.error("Failed to generate PDF:", error);
    },
  });
}