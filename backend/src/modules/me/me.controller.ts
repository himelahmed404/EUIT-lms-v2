import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { invalid, objectBody, parsePreferences, parseProfile, uuid } from "./me.validation.js";
import * as meService from "./me.service.js";

const attempts = new Map<string, { count: number; until: number }>();

export function photoUploadRateLimit(req: Request, res: Response, next: NextFunction) {
  const now = Date.now();
  for (const [id, row] of attempts) {
    if (row.until <= now) attempts.delete(id);
  }
  const id = res.locals.profileContext!.profile.id;
  const row = attempts.get(id) ?? { count: 0, until: now + 600000 };
  if (row.count >= 10) {
    return next(new ApiError(429, "PHOTO_UPLOAD_LIMIT", "Too many photo uploads. Please try again in 10 minutes."));
  }
  row.count++;
  attempts.set(id, row);
  let contentType = req.headers["content-type"]?.split(";")[0]?.trim().toLowerCase() ?? "";
  if (contentType === "image/jpg") contentType = "image/jpeg";
  if (!["image/jpeg", "image/png", "image/webp"].includes(contentType)) {
    return next(new ApiError(415, "INVALID_PHOTO", "Send JPEG, PNG or WebP file bytes."));
  }
  next();
}

export async function getProfile(_req: Request, res: Response) {
  const context = res.locals.profileContext!;
  const email = res.locals.firebaseUser?.email;
  const data = await meService.getProfile(context, email);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile loaded.",
    data,
  });
}

export async function getPermissions(_req: Request, res: Response) {
  const context = res.locals.profileContext!;
  const data = meService.getPermissions(context);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Permissions loaded.",
    data,
  });
}

export async function updateProfile(req: Request, res: Response) {
  const { profile } = res.locals.profileContext!;
  const data = parseProfile(req.body, profile.role);
  const updated = await meService.updateProfile(profile.id, data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile updated.",
    data: updated,
  });
}

export async function updatePhoto(req: Request, res: Response) {
  const input = objectBody(req.body);
  if (
    Object.keys(input).length !== 1 ||
    !Object.hasOwn(input, "assetId") ||
    (input.assetId !== null && !uuid(input.assetId))
  ) {
    return invalid();
  }
  const context = res.locals.profileContext!;
  const photo = await meService.updatePhoto(context, input.assetId as string | null);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile photo updated.",
    data: { photo },
  });
}

export async function getPreferences(_req: Request, res: Response) {
  const profileId = res.locals.profileContext!.profile.id;
  const data = await meService.getPreferences(profileId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Preferences loaded.",
    data,
  });
}

export async function updatePreferences(req: Request, res: Response) {
  const data = parsePreferences(req.body);
  const profileId = res.locals.profileContext!.profile.id;
  const updated = await meService.updatePreferences(profileId, data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Preferences updated.",
    data: updated,
  });
}

export async function uploadPhoto(req: Request, res: Response) {
  const ownerId = res.locals.profileContext!.profile.id;
  const photo = await meService.uploadProfilePhoto(ownerId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Profile photo uploaded.",
    data: { photo },
  });
}
