import express from "express";
import { registerEmployee, loginEmployee } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);

export default router;
