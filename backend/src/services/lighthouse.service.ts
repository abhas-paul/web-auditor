import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

export const runLighthouseAudit = async (url: string) => {
  const chrome = await launch({
    chromePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    chromeFlags: [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-default-apps",
    ],
  });

  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
    });

    if (!result?.lhr) {
      throw new Error("Failed to generate Lighthouse report");
    }

    const { lhr } = result;

    return {
      performance: Math.round((lhr.categories?.performance?.score ?? 0) * 100),
      seo: Math.round((lhr.categories?.seo?.score ?? 0) * 100),
      accessibility: Math.round((lhr.categories?.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((lhr.categories?.["best-practices"]?.score ?? 0) * 100),

      lcp: lhr.audits["largest-contentful-paint"]?.numericValue ?? null,
      cls: lhr.audits["cumulative-layout-shift"]?.numericValue ?? null,
      inp: lhr.audits["interaction-to-next-paint"]?.numericValue ?? null,
      firstContentfulPaint: lhr.audits["first-contentful-paint"]?.numericValue ?? null,
      speedIndex: lhr.audits["speed-index"]?.numericValue ?? null,
      totalBlockingTime: lhr.audits["total-blocking-time"]?.numericValue ?? null,
    };
  } catch (error) {
    console.error("Lighthouse Audit Error:", error);
    throw new Error("Failed to run Lighthouse audit");
  } finally {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      await chrome.kill();
    } catch (error) {
      const isExpectedCleanupIssue =
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "EBUSY";

      if (!isExpectedCleanupIssue) {
        console.warn("Chrome cleanup warning (safe to ignore):", error);
      }
    }
  }
};