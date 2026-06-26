import PDFDocument from "pdfkit";
import {
  addHeading,
  addSubHeading,
  addBulletList,
  COLORS,
  scoreColor,
} from "./helpers";

const drawMetricCard = (
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  title: string,
  value: string
) => {
  doc
    .roundedRect(x, y, 150, 65, 8)
    .fillAndStroke("#F9FAFB", "#E5E7EB");

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(COLORS.secondary)
    .text(title, x, y + 12, {
      width: 150,
      align: "center",
    });

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor(COLORS.text)
    .text(value, x, y + 34, {
      width: 150,
      align: "center",
    });
};

export const addPerformance = (
  doc: PDFKit.PDFDocument,
  performance: any
) => {
  doc.addPage();

  addHeading(doc, "Performance Audit");

  // -------------------------
  // Score
  // -------------------------

  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .fillColor(scoreColor(performance.score))
    .text(
      `Performance Score: ${performance.score}/100`
    );

  doc.moveDown();

  // -------------------------
  // Metric Cards
  // -------------------------

  const startY = doc.y;

  drawMetricCard(
    doc,
    50,
    startY,
    "Largest Contentful Paint",
    performance.lcp
  );

  drawMetricCard(
    doc,
    220,
    startY,
    "First Contentful Paint",
    performance.fcp
  );

  drawMetricCard(
    doc,
    390,
    startY,
    "CLS",
    performance.cls
  );

  const secondRow = startY + 85;

  drawMetricCard(
    doc,
    50,
    secondRow,
    "Speed Index",
    performance.speedIndex
  );

  drawMetricCard(
    doc,
    220,
    secondRow,
    "Total Blocking Time",
    performance.totalBlockingTime
  );

  doc.y = secondRow + 95;

  // -------------------------
  // Score Meaning
  // -------------------------

  addSubHeading(doc, "Performance Overview");

  let overview =
    "The website has acceptable performance with room for optimization.";

  if (performance.score >= 90) {
    overview =
      "Excellent website performance. The website loads quickly and provides an exceptional user experience.";
  } else if (performance.score >= 75) {
    overview =
      "Good performance overall, though several optimizations could further improve loading speed and responsiveness.";
  } else if (performance.score >= 50) {
    overview =
      "Performance requires improvement. Slow loading times may negatively impact user experience and SEO rankings.";
  } else {
    overview =
      "Performance is poor. Immediate optimization is recommended to improve Core Web Vitals and overall user satisfaction.";
  }

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(COLORS.text)
    .text(overview, {
      lineGap: 4,
      align: "justify",
    });

  doc.moveDown();

  // -------------------------
  // Findings
  // -------------------------

  addSubHeading(doc, "Key Findings");

  addBulletList(
    doc,
    performance.findings
  );

  // -------------------------
  // Recommendations
  // -------------------------

  addSubHeading(doc, "Recommendations");

  addBulletList(
    doc,
    performance.recommendations
  );

  // -------------------------
  // Best Practice Tip
  // -------------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 60, 8)
    .fillAndStroke("#EFF6FF", "#BFDBFE");

  const boxY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.primary)
    .text("Performance Tip", 65, boxY);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "Optimizing Core Web Vitals not only improves user experience but also positively impacts SEO rankings, engagement, and conversion rates.",
      65,
      boxY + 18,
      {
        width: 455,
        lineGap: 3,
      }
    );
}