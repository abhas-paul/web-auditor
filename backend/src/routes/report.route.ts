import { Hono } from "hono";

import { protectRoute } from "../middleware/protectRoute.middleware";
import { generateReport, getReportById, getReports } from "../controllers/report.comtroller.ts";

const reportRoutes = new Hono();

reportRoutes.post("/generate-report", protectRoute, generateReport);
reportRoutes.get("/", protectRoute, getReports);
reportRoutes.get("/:reportId", protectRoute, getReportById);
// reportRoutes.get("/:reportId/pdf", protectRoute, downloadReportPDF);

export default reportRoutes;