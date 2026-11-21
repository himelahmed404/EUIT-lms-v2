import { ApiError } from "../../utils/ApiError.js";
import type { EnrollmentQuoteInput, DemoCheckoutInput } from "./enrollment.interface.js";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateQuoteInput(body: unknown): EnrollmentQuoteInput {
  if (!body || typeof body !== "object") {
    throw new ApiError(400, "INVALID_REQUEST", "Request body must be an object.");
  }
  const { courseId, batchId, format } = body as Record<string, unknown>;

  if (typeof courseId !== "string" || !UUID_REGEX.test(courseId)) {
    throw new ApiError(400, "INVALID_COURSE_ID", "A valid courseId UUID is required.");
  }
  if (typeof batchId !== "string" || !UUID_REGEX.test(batchId)) {
    throw new ApiError(400, "INVALID_BATCH_ID", "A valid batchId UUID is required.");
  }
  if (format !== undefined && format !== "ONLINE" && format !== "OFFLINE") {
    throw new ApiError(400, "INVALID_FORMAT", "Format must be ONLINE or OFFLINE.");
  }

  return { courseId, batchId, format: format as "ONLINE" | "OFFLINE" | undefined };
}

export function validateCheckoutInput(body: unknown): DemoCheckoutInput {
  return validateQuoteInput(body);
}
