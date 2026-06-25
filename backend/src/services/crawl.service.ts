export const analyzeCrawlability = async (url: string) => {
  try {
    const baseUrl = new URL(url).origin;

    const robotsResponse = await fetch(
      `${baseUrl}/robots.txt`
    );

    const sitemapResponse = await fetch(
      `${baseUrl}/sitemap.xml`
    );

    return {
      robotsTxt: robotsResponse.ok,
      xmlSitemap: sitemapResponse.ok,
    };
  } catch (error) {
    console.error("Crawlability Error:", error);

    return {
      robotsTxt: false,
      xmlSitemap: false,
    };
  }
};