import PDFDocument from "pdfkit";
import {
  addHeading,
  addSubHeading,
  addBulletList,
  COLORS,
} from "./helpers";

export const addRevenueImpact = (
  doc: PDFKit.PDFDocument,
  revenue: any
) => {
  doc.addPage();

  addHeading(doc, "Revenue Impact Analysis");

  // ----------------------------------------------------
  // Overview Card
  // ----------------------------------------------------

  doc
    .roundedRect(50, doc.y, 495, 85, 8)
    .fillAndStroke("#F9FAFB", "#E5E7EB");

  const overviewY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor(COLORS.primary)
    .text("Business Overview", 65, overviewY);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "Website quality has a direct impact on customer acquisition, user retention, search visibility and ultimately revenue generation. The observations below highlight potential business risks identified during the audit.",
      65,
      overviewY + 20,
      {
        width: 455,
        lineGap: 3,
      }
    );

  doc.moveDown(5);

  // ----------------------------------------------------
  // Risk Summary
  // ----------------------------------------------------

  const riskCount = revenue.findings.length;

  let risk = "Low";
  let color = COLORS.success;

  if (riskCount >= 5) {
    risk = "High";
    color = COLORS.danger;
  } else if (riskCount >= 3) {
    risk = "Medium";
    color = COLORS.warning;
  }

  doc
    .roundedRect(50, doc.y, 495, 60, 8)
    .fillAndStroke("#FFFFFF", "#E5E7EB");

  const riskY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.secondary)
    .text("Estimated Business Risk", 70, riskY);

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor(color)
    .text(risk, 350, riskY);

  doc.moveDown(4);

  // ----------------------------------------------------
  // Findings
  // ----------------------------------------------------

  addSubHeading(doc, "Business Risks");

  addBulletList(
    doc,
    revenue.findings
  );

  // ----------------------------------------------------
  // Recommendations
  // ----------------------------------------------------

  addSubHeading(doc, "Recommended Business Actions");

  addBulletList(
    doc,
    revenue.recommendations
  );

  // ----------------------------------------------------
  // Expected Benefits
  // ----------------------------------------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 130, 8)
    .fillAndStroke("#ECFDF5", "#A7F3D0");

  const benefitY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.success)
    .text("Expected Business Benefits", 65, benefitY);

  const benefits = [
    "Higher conversion rates through faster page loading.",
    "Improved search rankings leading to increased organic traffic.",
    "Lower bounce rates and higher user engagement.",
    "Greater customer trust through stronger security practices.",
    "Improved accessibility for a wider audience.",
    "Reduced business risk from technical and security issues.",
  ];

  doc.moveDown(0.5);

  benefits.forEach((benefit) => {
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(COLORS.text)
      .text(`• ${benefit}`, 70, doc.y + 5, {
        width: 455,
      });

    doc.moveDown(0.5);
  });

  // ----------------------------------------------------
  // ROI Insight
  // ----------------------------------------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 90, 8)
    .fillAndStroke("#EFF6FF", "#BFDBFE");

  const roiY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.primary)
    .text("ROI Insight", 65, roiY);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "Investment in website optimization generally delivers measurable returns through improved customer satisfaction, increased search visibility, stronger brand reputation and higher revenue generation. Performance, SEO and security improvements often provide the highest return on investment.",
      65,
      roiY + 20,
      {
        width: 455,
        lineGap: 3,
      }
    );
};