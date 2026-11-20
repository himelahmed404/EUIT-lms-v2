import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import type { StudentSignup } from "./auth.interface.js";
import { signupStudent } from "./auth.service.js";

function parseSignup(body: unknown): StudentSignup | undefined {
  if (!body || typeof body !== "object" || Array.isArray(body)) return;
  const fields = Object.keys(body);
  if (
    fields.some((field) => !["fullName", "email", "password"].includes(field))
  )
    return;

  const { fullName, email, password } = body as Partial<
    Record<keyof StudentSignup, unknown>
  >;
  if (
    typeof fullName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  )
    return;
  const name = fullName.trim();
  const address = email.trim().toLowerCase();
  if (!name || name.length > 120 || name.includes("\0")) return;
  if (address.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))
    return;
  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) return;
  return { fullName: name, email: address, password };
}

export async function studentSignup(req: Request, res: Response) {
  const input = parseSignup(req.body);
  if (!input) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Invalid signup fields.",
    });
  }

  const result = await signupStudent(input).catch(() => "unavailable" as const);
  if (result === "accepted") {
    return sendResponse(res, {
      success: true,
      statusCode: 202,
      message: "Signup request accepted. If your credentials are valid and your email is unverified, check your inbox for a verification link.",
    });
  }
  if (result === "invalid") {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Check your email address and password.",
    });
  }
  if (result === "rateLimited") {
    return sendResponse(res, {
      success: false,
      statusCode: 429,
      message: "Please try again later.",
    });
  }
  return sendResponse(res, {
    success: false,
    statusCode: 503,
    message: "Signup is temporarily unavailable.",
  });
}
