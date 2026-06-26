import PDFDocument from "pdfkit";
import {
  addHeading,
  addSubHeading,
  addBulletList,
  COLORS,
  scoreColor,
} from "./helpers";

export const addAccessibility = (
  doc: PDFKit.PDFDocument,
  accessibility: any
) => {
  doc.addPage();

  addHeading(doc, "Accessibility Audit");

  // --------------------------------
  // Accessibility Score
  // --------------------------------

  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .fillColor(scoreColor(accessibility.score))
    .text(
      `Accessibility Score: ${accessibility.score}/100`
    );

  doc.moveDown();

  // --------------------------------
  // Score Card
  // --------------------------------

  doc
    .roundedRect(50, doc.y, 495, 75, 8)
    .fillAndStroke("#F9FAFB", "#E5E7EB");

  const y = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.secondary)
    .text("Accessibility Status", 70, y);

  let status = "Needs Improvement";

  if (accessibility.score >= 90)
    status = "Excellent";

  else if (accessibility.score >= 75)
    status = "Good";

  else if (accessibility.score >= 50)
    status = "Fair";

  else status = "Poor";

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor(scoreColor(accessibility.score))
    .text(status, 70, y + 24);

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(COLORS.text)
    .text(
      `${100 - accessibility.score}% of the accessibility checklist still requires attention.`,
      250,
      y + 12,
      {
        width: 260,
      }
    );

  doc.moveDown(5);

  // --------------------------------
  // Overview
  // --------------------------------

  addSubHeading(doc, "Accessibility Overview");

  let overview =
    "The website demonstrates acceptable accessibility but still has several improvements to make for a more inclusive user experience.";

  if (accessibility.score >= 90) {
    overview =
      "The website provides an excellent accessibility experience and follows most modern accessibility standards.";
  } else if (accessibility.score >= 75) {
    overview =
      "Accessibility is generally good, although several improvements will further enhance usability for all users.";
  } else if (accessibility.score >= 50) {
    overview =
      "Several accessibility issues may negatively impact users relying on assistive technologies.";
  } else {
    overview =
      "Accessibility is poor. Immediate improvements are recommended to ensure the website is usable by everyone.";
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

  // --------------------------------
  // Findings
  // --------------------------------

  addSubHeading(doc, "Key Findings");

  addBulletList(
    doc,
    accessibility.findings
  );

  // --------------------------------
  // Recommendations
  // --------------------------------

  addSubHeading(doc, "Recommendations");

  addBulletList(
    doc,
    accessibility.recommendations
  );

  // --------------------------------
  // Why Accessibility Matters
  // --------------------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 80, 8)
    .fillAndStroke("#ECFDF5", "#A7F3D0");

  const boxY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.success)
    .text(
      "Why Accessibility Matters",
      65,
      boxY
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "Improving accessibility makes your website easier to use for everyone, including users with visual, hearing, cognitive, or motor impairments. It also improves SEO, usability, legal compliance, and overall user satisfaction.",
      65,
      boxY + 18,
      {
        width: 455,
        lineGap: 3,
      }
    );
};