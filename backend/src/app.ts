import { Hono } from "hono";
import { connectDB } from "../src/config/db.ts";

const app = new Hono();

const response_db = await connectDB();

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "API Running",
    response_db
  });
});

export default app;