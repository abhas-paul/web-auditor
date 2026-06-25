import { GoogleGenAI } from "@google/genai";
import { ReportSchema } from "../schemas/report.schema.ts";
import type { AuditData } from "../types/audit.type.ts";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const generateStructuredReport = async (
  url: string,
  auditData: AuditData
) => {
  try {
    const prompt = `
You are an expert website auditor.

Analyze the audit data and generate a JSON report.

RULES:
- Return ONLY valid JSON.
- No markdown.
- No explanations.
- Follow the schema exactly.
- Use realistic values.
- Infer insights from the provided audit data.

Website:
${url}

Audit Data:
${JSON.stringify(auditData, null, 2)}

Required Structure:

{
  "executiveSummary": {},
  "performanceAudit": {},
  "seoAudit": {},
  "securityAudit": {},
  "accessibilityAudit": {},
  "uxUiReview": {},
  "competitorBenchmark": {},
  "revenueImpactAnalysis": {},
  "prioritizedActionPlan": {}
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned empty response");
    }

    const reportJson = JSON.parse(text);

    const validatedReport = ReportSchema.parse(reportJson);

    return validatedReport;
  } catch (error) {
    console.error("AI Report Generation Error:", error);

    throw new Error("Failed to generate AI report");
  }
};