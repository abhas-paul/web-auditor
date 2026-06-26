import PDFDocument from "pdfkit";
import {
  addHeading,
  addSubHeading,
  addBulletList,
  COLORS,
} from "./helpers";

export const addUXReview = (
  doc: PDFKit.PDFDocument,
  ux: any
) => {
  doc.addPage();

  addHeading(doc, "UX / UI Review");

  // ---------------------------------------
  // Intro Box
  // ---------------------------------------

  doc
    .roundedRect(50, doc.y, 495, 80, 8)
    .fillAndStroke("#F9FAFB", "#E5E7EB");

  const y = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor(COLORS.primary)
    .text("User Experience Summary", 65, y);

  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor(COLORS.text)
    .text(
      "User Experience (UX) measures how efficiently users can navigate and interact with your website. Good UX leads to higher engagement, better retention, increased trust, and improved conversions.",
      65,
      y + 20,
      {
        width: 455,
        lineGap: 3,
      }
    );

  doc.moveDown(6);

  // ---------------------------------------
  // UX Health
  // ---------------------------------------

  addSubHeading(doc, "UX Health Assessment");

  const findings = ux.findings?.length ?? 0;

  let status = "Excellent";
  let color = COLORS.success;

  if (findings >= 6) {
    status = "Poor";
    color = COLORS.danger;
  } else if (findings >= 4) {
    status = "Needs Improvement";
    color = COLORS.warning;
  }

  doc
    .roundedRect(50, doc.y, 495, 60, 8)
    .fillAndStroke("#FFFFFF", "#E5E7EB");

  const boxY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.secondary)
    .text("Overall UX Status", 70, boxY);

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor(color)
    .text(status, 330, boxY);

  doc.moveDown(4);

  // ---------------------------------------
  // Findings
  // ---------------------------------------

  addSubHeading(doc, "Key Findings");

  addBulletList(
    doc,
    ux.findings
  );

  // ---------------------------------------
  // Recommendations
  // ---------------------------------------

  addSubHeading(doc, "Recommendations");

  addBulletList(
    doc,
    ux.recommendations
  );

  // ---------------------------------------
  // UX Principles
  // ---------------------------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 120, 8)
    .fillAndStroke("#EFF6FF", "#BFDBFE");

  const infoY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.primary)
    .text("UX Best Practices", 65, infoY);

  const tips = [
    "Fast loading pages improve user satisfaction and reduce bounce rates.",
    "Maintain a clear visual hierarchy using headings and spacing.",
    "Ensure navigation is simple, predictable and mobile-friendly.",
    "Minimize unnecessary user actions and clicks.",
    "Use consistent buttons, typography and colours throughout the website.",
  ];

  doc.moveDown(0.5);

  tips.forEach((tip) => {
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(COLORS.text)
      .text(`• ${tip}`, 70, doc.y + 6, {
        width: 455,
      });

    doc.moveDown(0.5);
  });

  // ---------------------------------------
  // Business Impact
  // ---------------------------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 95, 8)
    .fillAndStroke("#FEFCE8", "#FACC15");

  const impactY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#CA8A04")
    .text("Business Impact", 65, impactY);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "A better user experience increases customer trust, improves engagement, reduces abandonment, strengthens SEO signals, and ultimately results in higher conversions and revenue.",
      65,
      impactY + 20,
      {
        width: 455,
        lineGap: 3,
      }
    );
};