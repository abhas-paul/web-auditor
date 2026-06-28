import type { Handler } from "hono";
import { isValidObjectId } from "mongoose";
import { getCookie } from "hono/cookie";

import { generateReportPDF } from "../services/pdf.service.ts";
import { runLighthouseAudit } from "../services/lighthouse.service.ts";
import { analyzeSeo } from "../services/seo.service.ts";
import { analyzeSecurity } from "../services/security.service.ts";
import { analyzeCrawlability } from "../services/crawl.service.ts";
import { analyzeLinks } from "../services/links.service.ts";
import { generateStructuredReport } from "../services/ai-report.service.ts";

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
      .select("-__v -report");

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
    const reportId = c.req.param("reportId");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    if (!reportId || !isValidObjectId(reportId)) {
      return c.json(
        {
          success: false,
          message: "Invalid report id",
        },
        400
      );
    }

    const report = await Report.findOne({
      _id: reportId,
      user: userId,
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

export const downloadReportPDF: Handler = async (c) => {
  try {
    const reportId = c.req.param("reportId");
    const userId = c.get("userId");

    if (!reportId || !isValidObjectId(reportId)) {
      return c.json(
        {
          success: false,
          message: "Invalid report id",
        },
        400
      );
    }

    // Verify report ownership
    const report = await Report.findOne({
      _id: reportId,
      user: userId,
    }).select("_id url");

    if (!report) {
      return c.json(
        {
          success: false,
          message: "Report not found",
        },
        404
      );
    }

    const token = getCookie(c, "token");

    if (!token) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    const pdfBuffer = await generateReportPDF(
      reportId,
      token
    );

    c.header("Content-Type", "application/pdf");

    c.header(
      "Content-Disposition",
      `attachment; filename="audit-report-${reportId}.pdf"`
    );

    c.header(
      "Content-Length",
      pdfBuffer.length.toString()
    );

    c.header(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );

    return c.body(pdfBuffer);
  } catch (error) {
    console.error("Download PDF Error:", error);

    return c.json(
      {
        success: false,
        message: "Failed to generate PDF",
      },
      500
    );
  }
};