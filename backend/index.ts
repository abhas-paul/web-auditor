import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "AI Website Auditor API Running",
  });
});

export default {
  port: 3000,
  fetch: app.fetch,
};