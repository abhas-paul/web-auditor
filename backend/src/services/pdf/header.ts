import PDFDocument from "pdfkit";
import { COLORS, scoreColor } from "./helpers";

const drawScoreCard = (
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  title: string,
  score: number
) => {
  doc
    .roundedRect(x, y, 105, 75, 8)
    .fillAndStroke("#FFFFFF", "#E5E7EB");

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(COLORS.text)
    .text(title, x, y + 12, {
      width: 105,
      align: "center",
    });

  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor(scoreColor(score))
    .text(`${score}`, x, y + 34, {
      width: 105,
      align: "center",
    });
};

export const addHeader = (
  doc: PDFKit.PDFDocument,
  report: any
) => {
  const audit = report.report;

  // --------------------------
  // Blue Banner
  // --------------------------

  doc
    .rect(0, 0, doc.page.width, 135)
    .fill(COLORS.primary);

  doc
    .fillColor("white")
    .font("Helvetica-Bold")
    .fontSize(30)
    .text("Website Audit Report", 0, 35, {
      width: doc.page.width,
      align: "center",
    });

  doc
    .font("Helvetica")
    .fontSize(14)
    .text(report.url, 0, 78, {
      width: doc.page.width,
      align: "center",
    });

  // --------------------------
  // Summary Card
  // --------------------------

  const boxY = 160;

  doc
    .roundedRect(45, boxY, 505, 95, 8)
    .fillAndStroke("#F9FAFB", "#E5E7EB");

  doc
    .fillColor(COLORS.text)
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("Generated", 65, boxY + 18);

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(COLORS.secondary)
    .text(
      new Date(report.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      65,
      boxY + 38
    );

  doc
    .fillColor(COLORS.text)
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("Overall Status", 330, boxY + 18);

  let color = COLORS.warning;

  if (
    audit.executiveSummary.overallStatus
      ?.toLowerCase()
      .includes("excellent")
  ) {
    color = COLORS.success;
  }

  if (
    audit.executiveSummary.overallStatus
      ?.toLowerCase()
      .includes("critical")
  ) {
    color = COLORS.danger;
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor(color)
    .text(
      audit.executiveSummary.overallStatus,
      330,
      boxY + 38
    );

  // --------------------------
  // Score Cards
  // --------------------------

  const cardY = 300;

  drawScoreCard(
    doc,
    45,
    cardY,
    "Performance",
    audit.performanceAudit.score
  );

  drawScoreCard(
    doc,
    165,
    cardY,
    "SEO",
    audit.seoAudit.score
  );

  drawScoreCard(
    doc,
    285,
    cardY,
    "Accessibility",
    audit.accessibilityAudit.score
  );

  const securityScore =
    [
      audit.securityAudit.csp,
      audit.securityAudit.hsts,
      audit.securityAudit.xFrameOptions,
      audit.securityAudit.xContentTypeOptions,
    ].filter(Boolean).length * 25;

  drawScoreCard(
    doc,
    405,
    cardY,
    "Security",
    securityScore
  );

  // --------------------------
  // Executive Summary Preview
  // --------------------------

  doc.moveDown(16);

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor(COLORS.text)
    .text("Executive Overview");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(COLORS.secondary)
    .text(
      audit.executiveSummary.recommendation,
      {
        lineGap: 4,
        align: "justify",
      }
    );
};