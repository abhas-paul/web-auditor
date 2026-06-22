import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "API Running",
  });
});

export default app;