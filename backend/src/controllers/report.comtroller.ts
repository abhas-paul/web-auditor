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

export const getReports: Handler = async (c) => {
  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    const reports = await Report.find({ user: userId })
      .sort({ createdAt: -1 }) // latest first
      .select("-__v");

    return c.json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Get Reports Error:", error);

    return c.json(
      {
        success: false,
        message: "Failed to fetch reports",
      },
      500
    );
  }
};

export const getReportById: Handler = async (c) => {
  try {
    const userId = c.get("userId");
    const reportId = c.req.param("id");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    if (!reportId) {
      return c.json(
        {
          success: false,
          message: "Report ID is required",
        },
        400
      );
    }

    const report = await Report.findOne({
      _id: reportId,
      user: userId, // 🔐 ownership check
    }).select("-__v");

    if (!report) {
      return c.json(
        {
          success: false,
          message: "Report not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("Get Report By ID Error:", error);

    return c.json(
      {
        success: false,
        message: "Failed to fetch report",
      },
      500
    );
  }
};