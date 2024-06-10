import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Employee } from "../models";

async function register(
  name: string,
  email: string,
  password: string,
  assignedShiftHours: number,
  role: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const employee = await Employee.create({
    name,
    email,
    password: hashedPassword,
    assignedShiftHours,
    role,
  });
  return employee;
}

async function login(email: string, password: string) {
  const employee = await Employee.findOne({ where: { email } });

  if (!employee) {
    throw new Error("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, employee.password);

  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: employee.id, role: employee.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return token;
}

export { register, login };
