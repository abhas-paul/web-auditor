import { z } from "zod";

export const ReportSchema = z.object({
  executiveSummary: z.object({}).passthrough(),
  performanceAudit: z.object({}).passthrough(),
  seoAudit: z.object({}).passthrough(),
  securityAudit: z.object({}).passthrough(),
  accessibilityAudit: z.object({}).passthrough(),
  uxUiReview: z.object({}).passthrough(),
  competitorBenchmark: z.object({}).passthrough(),
  revenueImpactAnalysis: z.object({}).passthrough(),
  prioritizedActionPlan: z.object({}).passthrough(),
});