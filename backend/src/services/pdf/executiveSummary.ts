import PDFDocument from "pdfkit";
import {
  addHeading,
  addSubHeading,
  addBulletList,
  addParagraph,
  COLORS,
} from "./helpers";

export const addExecutiveSummary = (
  doc: PDFKit.PDFDocument,
  summary: any
) => {
  doc.addPage();

  addHeading(doc, "Executive Summary");

  // ----------------------------
  // Overall Status Banner
  // ----------------------------

  let statusColor = COLORS.warning;

  const status =
    summary.overallStatus?.toLowerCase() ?? "";

  if (status.includes("excellent"))
    statusColor = COLORS.success;

  if (status.includes("critical"))
    statusColor = COLORS.danger;

  doc
    .roundedRect(50, doc.y, 495, 45, 8)
    .fillAndStroke("#F9FAFB", "#E5E7EB");

  const y = doc.y + 13;

  doc
    .fillColor(COLORS.text)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("Overall Website Status", 65, y);

  doc
    .fillColor(statusColor)
    .fontSize(14)
    .text(summary.overallStatus, 330, y);

  doc.moveDown(4);

  // ----------------------------
  // Recommendation
  // ----------------------------

  addSubHeading(doc, "Overall Recommendation");

  addParagraph(
    doc,
    summary.recommendation
  );

  // ----------------------------
  // Strengths
  // ----------------------------

  addSubHeading(doc, "Key Strengths");

  addBulletList(
    doc,
    summary.keyStrengths
  );

  // ----------------------------
  // Weaknesses
  // ----------------------------

  addSubHeading(doc, "Critical Issues");

  addBulletList(
    doc,
    summary.keyWeaknesses
  );

  // ----------------------------
  // Closing Box
  // ----------------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 60, 8)
    .fillAndStroke("#EFF6FF", "#BFDBFE");

  doc
    .fillColor(COLORS.primary)
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(
      "Summary",
      65,
      doc.y + 12
    );

  doc
    .fillColor(COLORS.text)
    .font("Helvetica")
    .fontSize(10)
    .text(
      "Overall, the audit indicates several high-priority improvements in performance, security and SEO. Resolving the highlighted issues will significantly improve user experience, search visibility and website reliability.",
      65,
      doc.y + 18,
      {
        width: 460,
        lineGap: 3,
      }
    );
}