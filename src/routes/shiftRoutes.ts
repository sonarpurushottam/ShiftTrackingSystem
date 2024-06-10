import express from "express";
import {
  startShiftHandler,
  endShiftHandler,
} from "../controllers/shiftController";

const router = express.Router();

router.post("/start", startShiftHandler);
router.post("/end", endShiftHandler);

export default router;
