import express from "express";
import { createTimesheetHandler } from "../controllers/timesheetController";

const router = express.Router();

router.post("/", createTimesheetHandler);

export default router;
