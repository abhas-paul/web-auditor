import type { Handler } from "hono";

export const generateReport: Handler = async (c) => {
  return c.text("Success", 200);
};