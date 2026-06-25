import { Hono } from "hono";

import { connectDB } from "../src/config/db.ts";
import authRoutes from "./routes/auth.route.ts";

const app = new Hono();

connectDB();

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "API Running",
  });
});

app.route("/auth", authRoutes);

export default app;