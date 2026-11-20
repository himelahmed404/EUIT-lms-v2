import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { studentSignup } from "./auth.controller.js";

export const authRouter = Router();
authRouter.post("/student/signup", catchAsync(studentSignup));
