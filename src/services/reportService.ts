import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import { Shift, Employee } from "../models";

async function generateReport(): Promise<string> {
  try {
    const shifts = await Shift.findAll({
      include: [
        {
          model: Employee,
          attributes: ["id", "name", "assignedShiftHours"],
        },
      ],
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Report");
    sheet.columns = [
      { header: "Employee Name", key: "employeeName", width: 20 },
      { header: "Assigned Hours", key: "assignedHours", width: 15 },
      { header: "Actual Hours", key: "actualHours", width: 15 },
      { header: "Start Time", key: "startTime", width: 20 },
      { header: "End Time", key: "endTime", width: 20 },
    ];

    shifts.forEach((shift: any) => {
      const startTime = new Date(shift.startTime).toLocaleString();
      const endTime = shift.endTime
        ? new Date(shift.endTime).toLocaleString()
        : "N/A";
      sheet.addRow({
        employeeName: shift.Employee.name,
        assignedHours: shift.Employee.assignedShiftHours,
        actualHours: calculateActualHours(shift.startTime, shift.endTime),
        startTime: startTime,
        endTime: endTime,
      });
    });

    const dirPath = path.join(__dirname, "../", "report");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, "report.xlsx");

    await workbook.xlsx.writeFile(filePath);

    return filePath;
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Failed to generate report");
  }
}

function calculateActualHours(startTime: Date, endTime: Date | null): string {
  if (!endTime) return "N/A";
  const hoursWorked =
    (endTime.getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60);
  return hoursWorked.toFixed(2);
}

export { generateReport };
