import PDFDocument from "pdfkit";
import {
  addHeading,
  addSubHeading,
  addBulletList,
  COLORS,
} from "./helpers";

const drawComparisonTable = (
  doc: PDFKit.PDFDocument,
  benchmark: any
) => {
  const startX = 50;
  const startY = doc.y;

  const col1 = 220;
  const col2 = 150;
  const col3 = 125;

  // Header
  doc
    .rect(startX, startY, col1, 30)
    .fillAndStroke(COLORS.primary, COLORS.primary);

  doc
    .rect(startX + col1, startY, col2, 30)
    .fillAndStroke(COLORS.primary, COLORS.primary);

  doc
    .rect(startX + col1 + col2, startY, col3, 30)
    .fillAndStroke(COLORS.primary, COLORS.primary);

  doc
    .fillColor("white")
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Metric", startX, startY + 9, {
      width: col1,
      align: "center",
    });

  doc.text("Industry Standard", startX + col1, startY + 9, {
    width: col2,
    align: "center",
  });

  doc.text("Status", startX + col1 + col2, startY + 9, {
    width: col3,
    align: "center",
  });

  const rows = [
    [
      "Industry",
      benchmark.industry,
      "Reference",
    ],
    [
      "Performance",
      benchmark.typicalPerformance,
      "Target",
    ],
    [
      "SEO",
      benchmark.typicalSeo,
      "Target",
    ],
    [
      "Security",
      benchmark.typicalSecurity,
      "Target",
    ],
  ];

  let y = startY + 30;

  rows.forEach((row, index) => {
    const bg =
      index % 2 === 0 ? "#FFFFFF" : "#F9FAFB";

    doc
      .fillColor(bg)
      .rect(startX, y, col1, 32)
      .fillAndStroke(bg, "#E5E7EB");

    doc
      .fillColor(bg)
      .rect(startX + col1, y, col2, 32)
      .fillAndStroke(bg, "#E5E7EB");

    doc
      .fillColor(bg)
      .rect(startX + col1 + col2, y, col3, 32)
      .fillAndStroke(bg, "#E5E7EB");

    doc
      .fillColor(COLORS.text)
      .font("Helvetica")
      .fontSize(10)
      .text(row[0], startX + 8, y + 10);

    doc.text(row[1], startX + col1 + 8, y + 10);

    doc.text(
      row[2],
      startX + col1 + col2,
      y + 10,
      {
        width: col3,
        align: "center",
      }
    );

    y += 32;
  });

  doc.y = y + 20;
};

export const addBenchmark = (
  doc: PDFKit.PDFDocument,
  benchmark: any
) => {
  doc.addPage();

  addHeading(doc, "Competitor Benchmark");

  // -------------------------------------------------
  // Overview
  // -------------------------------------------------

  doc
    .roundedRect(50, doc.y, 495, 75, 8)
    .fillAndStroke("#F9FAFB", "#E5E7EB");

  const y = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor(COLORS.primary)
    .text(
      "Industry Comparison",
      65,
      y
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      `This website has been benchmarked against typical expectations for the ${benchmark.industry} industry. These benchmarks represent commonly accepted standards among high-performing websites.`,
      65,
      y + 20,
      {
        width: 455,
        lineGap: 3,
      }
    );

  doc.moveDown(5);

  // -------------------------------------------------
  // Comparison Table
  // -------------------------------------------------

  addSubHeading(doc, "Industry Standards");

  drawComparisonTable(
    doc,
    benchmark
  );

  // -------------------------------------------------
  // Findings
  // -------------------------------------------------

  addSubHeading(doc, "Benchmark Findings");

  addBulletList(
    doc,
    benchmark.findings
  );

  // -------------------------------------------------
  // Recommendations
  // -------------------------------------------------

  addSubHeading(doc, "Recommendations");

  addBulletList(
    doc,
    benchmark.recommendations
  );

  // -------------------------------------------------
  // Note
  // -------------------------------------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 85, 8)
    .fillAndStroke("#ECFDF5", "#A7F3D0");

  const noteY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.success)
    .text(
      "Industry Insight",
      65,
      noteY
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "Benchmarking against industry leaders helps identify opportunities for improvement and provides measurable goals for future optimization. Continuous monitoring ensures the website remains competitive as standards evolve.",
      65,
      noteY + 20,
      {
        width: 455,
        lineGap: 3,
      }
    );
};