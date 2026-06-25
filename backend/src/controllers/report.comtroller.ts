import type { Handler } from "hono";

import { runLighthouseAudit } from "../services/lighthouse.service";
import { analyzeSeo } from "../services/seo.service";
import { analyzeSecurity } from "../services/security.service";
import { analyzeCrawlability } from "../services/crawl.service";
import { analyzeLinks } from "../services/links.service";
import { generateStructuredReport } from "../services/ai-report.service";

import { Report } from "../models/Report.model.ts";

export const generateReport: Handler = async (c) => {
  try {
    const { url } = await c.req.json();

    const userId = c.get("userId");

    if (!url) {
      return c.json(
        {
          success: false,
          message: "URL is required",
        },
        400
      );
    }

    const [
      lighthouse,
      seo,
      security,
      crawlability,
      links,
    ] = await Promise.all([
      runLighthouseAudit(url),
      analyzeSeo(url),
      analyzeSecurity(url),
      analyzeCrawlability(url),
      analyzeLinks(url),
    ]);

    const auditData = {
      lighthouse,
      seo,
      security,
      crawlability,
      links,
    };

    const report = await generateStructuredReport(
      url,
      auditData
    );

    const savedReport = await Report.create({
      user: userId,
      url,
      report,
    });

    return c.json({
      success: true,
      reportId: savedReport._id,
    });
  } catch (error) {
    console.error("Generate Report Error:", error);

    return c.json(
      {
        success: false,
        message: "Failed to generate report",
      },
      500
    );
  }
};