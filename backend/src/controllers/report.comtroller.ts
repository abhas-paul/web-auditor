import type { Handler } from "hono";
import { runLighthouseAudit } from "../services/lighthouse.service";
import { analyzeSeo } from "../services/seo.service";

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

    const [lighthouse, seo] = await Promise.all([
      runLighthouseAudit(url),
      analyzeSeo(url),
    ]);

    return c.json({
      success: true,
      data: {
        lighthouse,
        seo,
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