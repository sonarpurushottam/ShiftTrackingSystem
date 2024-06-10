import express from "express";
import { generateReportHandler } from "../controllers/reportController";

const router = express.Router();
router.get("/", generateReportHandler);

export default router;
