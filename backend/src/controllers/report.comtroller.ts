import type { Handler } from "hono";

import { runLighthouseAudit } from "../services/lighthouse.service";
import { analyzeSeo } from "../services/seo.service";
import { analyzeSecurity } from "../services/security.service";
import { analyzeCrawlability } from "../services/crawl.service";

export const generateReport: Handler = async (c) => {
  try {
    const { url } = await c.req.json();

    if (!url) {
      return c.json(
        {
          success: false,
          message: "URL is required",
        },
        400
      );
    }

    const [lighthouse, seo, security, crawlability] =
      await Promise.all([
        runLighthouseAudit(url),
        analyzeSeo(url),
        analyzeSecurity(url),
        analyzeCrawlability(url),
      ]);

    return c.json({
      success: true,
      data: {
        lighthouse,
        seo,
        security,
        crawlability,
      },
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