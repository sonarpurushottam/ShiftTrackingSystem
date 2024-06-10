import { Employee } from "../../models/employee";
import { Request } from "express";
declare global {
  namespace Express {
    interface Request {
      employee?: Employee;
    }
  }
}
declare module "express" {
  export interface Request {
    user?: any;
  }
}
