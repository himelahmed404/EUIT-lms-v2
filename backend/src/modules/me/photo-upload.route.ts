import { Router, raw } from "express";
import { requireVerifiedEmail } from "../../middleware/requireVerifiedEmail.js";
import { requireProfile } from "../../middleware/requireProfile.js";
import { requirePermission } from "../../middleware/authorize.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { PHOTO_LIMIT } from "../../lib/cloudinary-photo.js";
import * as meController from "./me.controller.js";

export const photoUploadRouter = Router();

photoUploadRouter.post(
  "/api/me/photo/upload",
  requireVerifiedEmail,
  requireProfile,
  requirePermission("profile.write"),
  meController.photoUploadRateLimit,
  raw({ type: () => true, limit: PHOTO_LIMIT }),
  catchAsync(meController.uploadPhoto)
);
