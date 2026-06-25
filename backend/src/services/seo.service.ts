import * as cheerio from "cheerio";

export const analyzeSeo = async (url: string) => {
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const title = $("title").text().trim();

  const metaDescription = $(
    'meta[name="description"]'
  ).attr("content");

  const h1Count = $("h1").length;

  const canonical = $('link[rel="canonical"]').attr(
    "href"
  );

  return {
    title,
    hasTitle: !!title,
    hasMetaDescription: !!metaDescription,
    metaDescription,
    h1Count,
    hasCanonical: !!canonical,
    canonical,
  };
};