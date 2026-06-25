import type { Handler } from "hono";
import { runLighthouseAudit } from "../services/lighthouse.service.ts";

export const generateReport: Handler = async (c) => {
  const { url } = await c.req.json();

  const data = await runLighthouseAudit(url);

  return c.json(data);
};