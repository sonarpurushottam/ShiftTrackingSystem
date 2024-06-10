import { Request, Response } from "express";
import { register, login } from "../services/authService";

async function registerEmployee(req: Request, res: Response) {
  const { name, email, password, assignedShiftHours, role } = req.body;
  try {
    const employee = await register(
      name,
      email,
      password,
      assignedShiftHours,
      role
    );
    res.status(201).json(employee);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

async function loginEmployee(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const token = await login(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}

export { registerEmployee, loginEmployee };
