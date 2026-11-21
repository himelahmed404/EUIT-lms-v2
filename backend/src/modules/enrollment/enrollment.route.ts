import { Router } from "express";
import { requireVerifiedEmail } from "../../middleware/requireVerifiedEmail.js";
import { requireProfile } from "../../middleware/requireProfile.js";
import { catchAsync } from "../../utils/catchAsync.js";
import * as enrollmentController from "./enrollment.controller.js";

export const enrollmentRouter = Router();

enrollmentRouter.post("/enrollments/quote", catchAsync(enrollmentController.getQuote));

enrollmentRouter.post(
  "/enrollments/demo-checkout",
  requireVerifiedEmail,
  requireProfile,
  catchAsync(enrollmentController.demoCheckout)
);
