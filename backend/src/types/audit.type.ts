export interface AuditData {
  lighthouse: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;

    lcp: number | null;
    cls: number | null;
    inp: number | null;

    firstContentfulPaint: number | null;
    speedIndex: number | null;
    totalBlockingTime: number | null;
  };

  seo: {
    title: string;
    hasTitle: boolean;
    hasMetaDescription: boolean;
    metaDescription?: string;
    h1Count: number;
    hasCanonical: boolean;
    canonical?: string;
  };

  security: {
    csp: boolean;
    hsts: boolean;
    xFrameOptions: boolean;
    xContentTypeOptions: boolean;
    server: string | null;
    poweredBy: string | null;
  };

  crawlability: {
    robotsTxt: boolean;
    xmlSitemap: boolean;
  };

  links: {
    totalLinks: number;
    internalLinks: number;
    externalLinks: number;
  };
}