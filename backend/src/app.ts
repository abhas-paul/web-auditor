import { Hono } from "hono";
import { cors } from "hono/cors";

import { connectDB } from "../src/config/db.ts";
import authRoutes from "./routes/auth.route.ts";
import reportRoutes from "./routes/report.route.ts";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

connectDB();

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "API Running",
  });
});

app.route("/auth", authRoutes);
app.route("/reports", reportRoutes);

export default app;