import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { validateQuoteInput, validateCheckoutInput } from "./enrollment.validation.js";
import * as enrollmentService from "./enrollment.service.js";

export async function getQuote(req: Request, res: Response): Promise<void> {
  const input = validateQuoteInput(req.body);
  const data = await enrollmentService.getEnrollmentQuote(input);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Enrollment quote calculated successfully.",
    data,
  });
}

export async function demoCheckout(req: Request, res: Response): Promise<void> {
  const context = res.locals.profileContext;
  if (!context?.profile?.id) {
    res.status(401).json({ success: false, statusCode: 401, message: "Authentication profile required." });
    return;
  }

  const input = validateCheckoutInput(req.body);
  const data = await enrollmentService.executeDemoCheckout(context.profile.id, input);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: data.message,
    data,
  });
}
