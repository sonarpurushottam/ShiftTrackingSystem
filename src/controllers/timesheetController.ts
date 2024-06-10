// controllers/timesheetController.ts

import { Request, Response } from "express";
import { createTimesheet } from "../services/timesheetService";

async function createTimesheetHandler(req: Request, res: Response) {
  const { employeeId, shiftId, projectName, taskName, fromDate, toDate } =
    req.body;

  try {
    const timesheet = await createTimesheet(
      employeeId,
      shiftId,
      projectName,
      taskName,
      new Date(fromDate),
      new Date(toDate)
    );
    res.status(201).json(timesheet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export { createTimesheetHandler };
