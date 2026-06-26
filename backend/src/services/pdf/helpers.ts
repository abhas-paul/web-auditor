import PDFDocument from "pdfkit";

export const COLORS = {
  primary: "#2563EB",
  secondary: "#6B7280",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
  text: "#111827",
  light: "#F3F4F6",
};

export const addHeading = (
  doc: PDFKit.PDFDocument,
  title: string
) => {
  doc
    .moveDown()
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor(COLORS.primary)
    .text(title);

  doc.moveDown(0.5);
};

export const addSubHeading = (
  doc: PDFKit.PDFDocument,
  title: string
) => {
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor(COLORS.text)
    .text(title);

  doc.moveDown(0.3);
};

export const addParagraph = (
  doc: PDFKit.PDFDocument,
  text: string
) => {
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(COLORS.text)
    .text(text, {
      lineGap: 3,
    });

  doc.moveDown();
};

export const addBulletList = (
  doc: PDFKit.PDFDocument,
  items: string[]
) => {
  items.forEach((item) => {
    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor(COLORS.text)
      .text(`• ${item}`, {
        indent: 15,
        lineGap: 3,
      });
  });

  doc.moveDown();
};

export const addDivider = (
  doc: PDFKit.PDFDocument
) => {
  const y = doc.y;

  doc
    .moveTo(50, y)
    .lineTo(545, y)
    .strokeColor("#D1D5DB")
    .stroke();

  doc.moveDown();
};

export const scoreColor = (score: number) => {
  if (score >= 90) return COLORS.success;
  if (score >= 70) return COLORS.warning;
  return COLORS.danger;
};