import "dotenv/config";
import app from "./src/app";
import { connectDB } from "./src/config/db";

await connectDB();

export default {
  port: Number(process.env.PORT) || 3000,
  fetch: app.fetch,
};