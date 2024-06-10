import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import shiftRoutes from "./routes/shiftRoutes";
import timesheetRoutes from "./routes/timesheetRoutes";
import reportRoutes from "./routes/reportRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/timesheets", timesheetRoutes);
app.use("/api/report", reportRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
