import { Hono } from "hono";

import { protectRoute } from "../middleware/protectRoute.middleware";
import { generateReport } from "../controllers/report.comtroller";

const reportRoutes = new Hono();

reportRoutes.post("/generate-report", protectRoute, generateReport);

export default reportRoutes;