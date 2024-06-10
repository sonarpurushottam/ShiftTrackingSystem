import { Request, Response } from "express";
import { startShift, endShift } from "../services/shiftService";

async function startShiftHandler(req: Request, res: Response) {
  const { employeeId } = req.body;
  try {
    const shift = await startShift(employeeId);
    res.status(201).json(shift);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

async function endShiftHandler(req: Request, res: Response) {
  const { shiftId } = req.body;
  try {
    const shift = await endShift(shiftId);
    res.json(shift);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export { startShiftHandler, endShiftHandler };
