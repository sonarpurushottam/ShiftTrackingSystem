import { Request, Response } from "express";
import { generateReport } from "../services/reportService";

export async function generateReportHandler(req: Request, res: Response) {
  try {
    const filePath = await generateReport();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
}
