import type { RequestHandler } from "express";
import { sendResponse } from "../utils/sendResponse.js";

export const notFound: RequestHandler = (_req, res) => {
  sendResponse(res, { success: false, statusCode: 404, message: "Route not found" });
};
