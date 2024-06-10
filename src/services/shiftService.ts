import Shift from "../models/shiftModel";

async function startShift(employeeId: string): Promise<any> {
  try {
    const shift = await Shift.create({
      employeeId,
      startTime: new Date(),
      endTime: null,
      actualHours: 0,
    });
    return shift;
  } catch (error: any) {
    throw new Error("Failed to start shift: " + error.message);
  }
}

async function endShift(shiftId: string): Promise<any> {
  try {
    const shift = await Shift.findByPk(shiftId);

    if (!shift) {
      throw new Error("Shift not found");
    }

    shift.endTime = new Date();
    shift.actualHours =
      (shift.endTime.getTime() - shift.startTime.getTime()) / (1000 * 60 * 60);

    await shift.save();
    return shift;
  } catch (error: any) {
    throw new Error("Failed to end shift: " + error.message);
  }
}

export { startShift, endShift };
