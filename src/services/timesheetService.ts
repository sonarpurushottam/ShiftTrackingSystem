import { Timesheet } from "../models";

async function createTimesheet(
  employeeId: string,
  shiftId: string,
  projectName: string,
  taskName: string,
  fromDate: Date,
  toDate: Date
): Promise<any> {
  try {
    const timesheet = await Timesheet.create({
      employeeId,
      shiftId,
      projectName,
      taskName,
      fromDate,
      toDate,
    });
    return timesheet;
  } catch (error: any) {
    throw new Error("Failed to create timesheet: " + error.message);
  }
}

export { createTimesheet };
