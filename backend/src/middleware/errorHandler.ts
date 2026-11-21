import type { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError.js";
import { sendResponse } from "../utils/sendResponse.js";

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof ApiError) {
    return sendResponse(res, {
      success: false,
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
    });
  }
  if (
    error?.type === "entity.parse.failed" ||
    error?.type === "entity.too.large"
  ) {
    const isImage = Boolean(
      req.is?.("image/*") ||
        (typeof req.headers?.["content-type"] === "string" &&
          req.headers["content-type"].startsWith("image/"))
    );
    return sendResponse(res, {
      success: false,
      statusCode: error.type === "entity.too.large" ? 413 : 400,
      code: "INVALID_BODY",
      message:
        error.type === "entity.too.large" && isImage
          ? "Photo must be at most 2 MB."
          : "Send a valid JSON body within the size limit.",
    });
  }
  if (error?.code === "P2002") {
    return sendResponse(res, {
      success: false,
      statusCode: 409,
      code: "DUPLICATE_RESOURCE",
      message: "A resource with this name already exists.",
    });
  }
  if (
    error?.code === "P2034" ||
    error?.message?.includes("TransactionWriteConflict") ||
    error?.cause?.message?.includes("TransactionWriteConflict")
  ) {
    return sendResponse(res, {
      success: false,
      statusCode: 409,
      code: "CONCURRENT_CHANGE",
      message: "Data changed concurrently. Reload and retry.",
    });
  }
  console.error("API request failed", {
    code: typeof error?.code === "string" ? error.code : "unknown",
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
  sendResponse(res, {
    success: false,
    statusCode: 503,
    code: "SERVICE_UNAVAILABLE",
    message: "Service temporarily unavailable.",
  });
};
