import * as cheerio from "cheerio";

export const analyzeLinks = async (url: string) => {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const links = $("a[href]")
      .map((_, el) => $(el).attr("href"))
      .get();

    const baseHost = new URL(url).hostname;

    let internalLinks = 0;
    let externalLinks = 0;

    for (const link of links) {
      if (!link) continue;

      try {
        const absolute = new URL(link, url);

        if (absolute.hostname === baseHost) {
          internalLinks++;
        } else {
          externalLinks++;
        }
      } catch {
        continue;
      }
    }

    return {
      totalLinks: links.length,
      internalLinks,
      externalLinks,
    };
  } catch (error) {
    console.error("Link Analysis Error:", error);

    return {
      totalLinks: 0,
      internalLinks: 0,
      externalLinks: 0,
    };
  }
};