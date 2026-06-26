import PDFDocument from "pdfkit";
import {
  addHeading,
  COLORS,
} from "./helpers";

const getPriorityColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "critical":
      return "#DC2626";

    case "high":
      return "#EA580C";

    case "medium":
      return "#CA8A04";

    case "low":
      return "#16A34A";

    default:
      return COLORS.primary;
  }
};

const drawPrioritySection = (
  doc: PDFKit.PDFDocument,
  level: {
    level: string;
    actions: string[];
  }
) => {
  const color = getPriorityColor(level.level);

  const titleHeight = 28;
  const actionHeight = 22;

  const boxHeight =
    titleHeight +
    level.actions.length * actionHeight +
    20;

  // Card

  doc
    .roundedRect(50, doc.y, 495, boxHeight, 8)
    .fillAndStroke("#FFFFFF", "#E5E7EB");

  // Header

  doc
    .roundedRect(50, doc.y, 495, 32, 8)
    .fill(color);

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("white")
    .text(level.level.toUpperCase(), 65, doc.y + 9);

  doc.moveDown(2.2);

  level.actions.forEach((action) => {
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(COLORS.text)
      .text(`• ${action}`, 70, doc.y + 4, {
        width: 455,
        lineGap: 2,
      });

    doc.moveDown(0.5);
  });

  doc.moveDown(1.5);
};

export const addActionPlan = (
  doc: PDFKit.PDFDocument,
  plan: any
) => {
  doc.addPage();

  addHeading(doc, "Prioritized Action Plan");

  // -------------------------------------
  // Intro
  // -------------------------------------

  doc
    .roundedRect(50, doc.y, 495, 85, 8)
    .fillAndStroke("#EFF6FF", "#BFDBFE");

  const introY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor(COLORS.primary)
    .text("Implementation Roadmap", 65, introY);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "The following action plan prioritizes improvements based on their potential impact on website performance, security, SEO, accessibility, and overall business value. Critical issues should be addressed immediately, while lower-priority items should be incorporated into ongoing maintenance.",
      65,
      introY + 20,
      {
        width: 455,
        lineGap: 3,
      }
    );

  doc.moveDown(5);

  // -------------------------------------
  // Priority Sections
  // -------------------------------------

  plan.priorityLevels.forEach(
    (
      priority: {
        level: string;
        actions: string[];
      },
      index: number
    ) => {
      // Prevent splitting cards

      const estimatedHeight =
        90 +
        priority.actions.length * 22;

      if (
        doc.y + estimatedHeight >
        doc.page.height - 80
      ) {
        doc.addPage();
      }

      drawPrioritySection(doc, priority);

      if (
        index !==
        plan.priorityLevels.length - 1
      ) {
        doc.moveDown();
      }
    }
  );

  // -------------------------------------
  // Closing Note
  // -------------------------------------

  if (doc.y > doc.page.height - 140) {
    doc.addPage();
  }

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 95, 8)
    .fillAndStroke("#ECFDF5", "#A7F3D0");

  const closeY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.success)
    .text("Final Recommendation", 65, closeY);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "Addressing Critical and High priority issues first will provide the greatest improvement in website quality and user experience. Once these items are completed, Medium and Low priority recommendations should become part of your continuous optimization strategy.",
      65,
      closeY + 20,
      {
        width: 455,
        lineGap: 3,
      }
    );
};