import { join } from "node:path";
import puppeteer, {
  Browser,
  Page,
  type PDFOptions,
} from "puppeteer";

const FRONTEND_URL =
  process.env.FRONTEND_URL ?? "http://localhost:3001";

const PDF_OPTIONS: PDFOptions = {
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: {
    top: "20mm",
    right: "15mm",
    bottom: "20mm",
    left: "15mm",
  },
};

function getChromeExecutablePath(): string | undefined {
  // Highest priority: explicit env variable
  if (process.env.CHROME_PATH) {
    return process.env.CHROME_PATH;
  }

  // Windows (Bun + Puppeteer cache)
  if (process.platform === "win32") {
    const home =
      process.env.USERPROFILE ?? process.env.HOME;

    if (!home) return undefined;

    return join(
      home,
      ".cache",
      "puppeteer",
      "chrome",
      "win64-150.0.7871.24",
      "chrome-win64",
      "chrome.exe"
    );
  }

  // Linux (Render, Railway, VPS, Docker, etc.)
  if (process.platform === "linux") {
    return undefined;
  }

  // macOS
  if (process.platform === "darwin") {
    return undefined;
  }

  return undefined;
}

async function launchBrowser(): Promise<Browser> {
  return puppeteer.launch({
    executablePath: process.env.BROWSER_PATH,
    headless: true,

    defaultViewport: {
      width: 1440,
      height: 900,
    },

    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
}

async function createAuthenticatedPage(
  browser: Browser,
  token: string
): Promise<Page> {
  const page = await browser.newPage();

  await page.setCookie({
    name: "token",
    value: token,
    domain: "localhost",
    path: "/",
    httpOnly: true,
    sameSite: "Lax",
  });

  return page;
}

async function renderReport(
  page: Page,
  reportId: string
): Promise<void> {
  const url = `${FRONTEND_URL}/reports/${reportId}?pdf=true`;

  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  await page.waitForSelector("#report-ready", {
    timeout: 30000,
  });
}

async function createPDF(
  page: Page
): Promise<Buffer> {
  const pdf = await page.pdf(PDF_OPTIONS);

  return Buffer.from(pdf);
}

async function safelyCloseBrowser(
  browser: Browser | null
): Promise<void> {
  if (!browser) return;

  try {
    await browser.close();
  } catch (err) {
    console.warn(
      "Chrome cleanup warning (safe to ignore):",
      err
    );
  }
}

export const generateReportPDF = async (
  reportId: string,
  token: string
): Promise<Buffer> => {
  let browser: Browser | null = null;

  try {
    browser = await launchBrowser();

    const page =
      await createAuthenticatedPage(
        browser,
        token
      );

    await renderReport(page, reportId);

    return await createPDF(page);
  } finally {
    await safelyCloseBrowser(browser);
  }
};