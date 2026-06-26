import PDFDocument from "pdfkit";
import {
  addHeading,
  addSubHeading,
  addBulletList,
  COLORS,
} from "./helpers";

const drawSecurityCard = (
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  title: string,
  enabled: boolean
) => {
  const value = enabled ? "Enabled" : "Missing";

  const color = enabled
    ? COLORS.success
    : COLORS.danger;

  doc
    .roundedRect(x, y, 150, 70, 8)
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
    .fontSize(15)
    .fillColor(color)
    .text(value, x, y + 38, {
      width: 150,
      align: "center",
    });
};

export const addSecurity = (
  doc: PDFKit.PDFDocument,
  security: any
) => {
  doc.addPage();

  addHeading(doc, "Security Audit");

  // -----------------------------
  // Calculate Security Score
  // -----------------------------

  const score =
    [
      security.csp,
      security.hsts,
      security.xFrameOptions,
      security.xContentTypeOptions,
    ].filter(Boolean).length * 25;

  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .fillColor(
      score >= 75
        ? COLORS.success
        : score >= 50
        ? COLORS.warning
        : COLORS.danger
    )
    .text(`Security Score: ${score}/100`);

  doc.moveDown();

  // -----------------------------
  // Security Headers
  // -----------------------------

  const firstRow = doc.y;

  drawSecurityCard(
    doc,
    50,
    firstRow,
    "Content Security Policy",
    security.csp
  );

  drawSecurityCard(
    doc,
    220,
    firstRow,
    "HSTS",
    security.hsts
  );

  drawSecurityCard(
    doc,
    390,
    firstRow,
    "X-Frame-Options",
    security.xFrameOptions
  );

  const secondRow = firstRow + 85;

  drawSecurityCard(
    doc,
    50,
    secondRow,
    "X-Content-Type-Options",
    security.xContentTypeOptions
  );

  doc
    .roundedRect(220, secondRow, 320, 70, 8)
    .fillAndStroke("#F9FAFB", "#E5E7EB");

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(COLORS.secondary)
    .text(
      "Detected Server",
      220,
      secondRow + 12,
      {
        width: 320,
        align: "center",
      }
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor(COLORS.text)
    .text(
      security.server || "Unknown",
      220,
      secondRow + 36,
      {
        width: 320,
        align: "center",
      }
    );

  doc.y = secondRow + 95;

  // -----------------------------
  // Security Overview
  // -----------------------------

  addSubHeading(doc, "Security Overview");

  let overview =
    "The website has a moderate security posture but requires additional hardening.";

  if (score >= 90) {
    overview =
      "Excellent security posture. Industry-standard security headers are correctly implemented.";
  } else if (score >= 70) {
    overview =
      "Good overall security with only a few missing best practices.";
  } else if (score >= 40) {
    overview =
      "Several important security protections are missing. Addressing them should be a high priority.";
  } else {
    overview =
      "Critical security issues were detected. Immediate remediation is strongly recommended to protect users and data.";
  }

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(COLORS.text)
    .text(overview, {
      align: "justify",
      lineGap: 4,
    });

  doc.moveDown();

  // -----------------------------
  // Findings
  // -----------------------------

  addSubHeading(doc, "Security Findings");

  addBulletList(
    doc,
    security.findings
  );

  // -----------------------------
  // Recommendations
  // -----------------------------

  addSubHeading(doc, "Recommendations");

  addBulletList(
    doc,
    security.recommendations
  );

  // -----------------------------
  // Best Practice
  // -----------------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 70, 8)
    .fillAndStroke("#FEFCE8", "#FACC15");

  const boxY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#CA8A04")
    .text(
      "Security Best Practice",
      65,
      boxY
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "Implementing standard HTTP security headers significantly reduces the risk of XSS, clickjacking, MIME-sniffing attacks, and protocol downgrade attacks. Security reviews should be performed regularly.",
      65,
      boxY + 18,
      {
        width: 455,
        lineGap: 3,
      }
    );
};