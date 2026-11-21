import { ApiError } from "../../utils/ApiError.js";
import type { UpdateProgressInput } from "./learning.interface.js";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateUuid(value: unknown, name: string): string {
  if (typeof value !== "string" || !UUID_REGEX.test(value)) {
    throw new ApiError(400, "INVALID_ID", `A valid ${name} UUID is required.`);
  }
  return value;
}

export function validateProgressInput(body: unknown): UpdateProgressInput {
  if (!body || typeof body !== "object") {
    throw new ApiError(400, "INVALID_REQUEST", "Request body must be an object.");
  }
  const { watchedSeconds, completed } = body as Record<string, unknown>;

  if (watchedSeconds !== undefined) {
    if (typeof watchedSeconds !== "number" || watchedSeconds < 0 || !Number.isFinite(watchedSeconds)) {
      throw new ApiError(400, "INVALID_WATCHED_SECONDS", "watchedSeconds must be a non-negative number.");
    }
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      throw new ApiError(400, "INVALID_COMPLETED", "completed must be a boolean.");
    }
  }

  return {
    watchedSeconds: watchedSeconds !== undefined ? Math.floor(watchedSeconds) : undefined,
    completed,
  };
}
