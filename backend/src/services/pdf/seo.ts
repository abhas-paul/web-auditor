import PDFDocument from "pdfkit";
import {
  addHeading,
  addSubHeading,
  addBulletList,
  COLORS,
  scoreColor,
} from "./helpers";

const drawStatusCard = (
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  title: string,
  status: boolean | number | string
) => {
  let value = "";
  let color = COLORS.secondary;

  if (typeof status === "boolean") {
    value = status ? "Yes" : "No";
    color = status ? COLORS.success : COLORS.danger;
  } else {
    value = String(status);
    color = COLORS.text;
  }

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
    .fontSize(17)
    .fillColor(color)
    .text(value, x, y + 35, {
      width: 150,
      align: "center",
    });
};

export const addSEO = (
  doc: PDFKit.PDFDocument,
  seo: any
) => {
  doc.addPage();

  addHeading(doc, "SEO Audit");

  // --------------------
  // SEO Score
  // --------------------

  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .fillColor(scoreColor(seo.score))
    .text(`SEO Score: ${seo.score}/100`);

  doc.moveDown();

  // --------------------
  // Title Tag
  // --------------------

  addSubHeading(doc, "Title Tag");

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(COLORS.text)
    .text(seo.title || "No title found");

  doc.moveDown();

  // --------------------
  // SEO Status Cards
  // --------------------

  const y = doc.y;

  drawStatusCard(
    doc,
    50,
    y,
    "Title Tag",
    seo.hasTitle
  );

  drawStatusCard(
    doc,
    220,
    y,
    "Meta Description",
    seo.hasMetaDescription
  );

  drawStatusCard(
    doc,
    390,
    y,
    "Canonical Tag",
    seo.hasCanonical
  );

  const secondRow = y + 80;

  drawStatusCard(
    doc,
    50,
    secondRow,
    "H1 Tags",
    seo.h1Count
  );

  drawStatusCard(
    doc,
    220,
    secondRow,
    "Robots.txt",
    seo.robotsTxt
  );

  drawStatusCard(
    doc,
    390,
    secondRow,
    "XML Sitemap",
    seo.xmlSitemap
  );

  doc.y = secondRow + 90;

  // --------------------
  // SEO Overview
  // --------------------

  addSubHeading(doc, "SEO Overview");

  let overview =
    "The website has a solid SEO foundation but several improvements are recommended.";

  if (seo.score >= 90) {
    overview =
      "The website demonstrates an excellent SEO foundation. Only minor improvements are needed to achieve best-in-class optimization.";
  } else if (seo.score >= 75) {
    overview =
      "The website performs well in SEO, but addressing missing metadata and content structure will further improve rankings.";
  } else if (seo.score >= 50) {
    overview =
      "Several important SEO issues were identified that may negatively affect search visibility and indexing.";
  } else {
    overview =
      "SEO health is poor and immediate attention is required to improve visibility in search engines.";
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

  // --------------------
  // Findings
  // --------------------

  addSubHeading(doc, "Key Findings");

  addBulletList(doc, seo.findings);

  // --------------------
  // Recommendations
  // --------------------

  addSubHeading(doc, "Recommendations");

  addBulletList(doc, seo.recommendations);

  // --------------------
  // Best Practice Box
  // --------------------

  doc.moveDown();

  doc
    .roundedRect(50, doc.y, 495, 65, 8)
    .fillAndStroke("#EFF6FF", "#BFDBFE");

  const boxY = doc.y + 12;

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(COLORS.primary)
    .text("SEO Best Practice", 65, boxY);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(
      "A strong SEO strategy combines optimized metadata, semantic HTML, fast loading performance, structured content, and consistent monitoring through search engine webmaster tools.",
      65,
      boxY + 18,
      {
        width: 455,
        lineGap: 3,
      }
    );
};