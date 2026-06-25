import { Hono } from "hono";

import { protectRoute } from "../middleware/protectRoute.middleware";
import { generateReport, getReportById, getReports } from "../controllers/report.comtroller.ts";

const reportRoutes = new Hono();

reportRoutes.post("/generate-report", protectRoute, generateReport);
reportRoutes.post("/get-reports", protectRoute, getReports);
reportRoutes.post("/:id", protectRoute, getReportById);

export default reportRoutes;