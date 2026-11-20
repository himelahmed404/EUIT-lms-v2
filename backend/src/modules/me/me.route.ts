import { Router } from "express";
import { requireVerifiedEmail } from "../../middleware/requireVerifiedEmail.js";
import { requireProfile } from "../../middleware/requireProfile.js";
import { requirePermission } from "../../middleware/authorize.js";
import { catchAsync } from "../../utils/catchAsync.js";
import * as meController from "./me.controller.js";

export const meRouter = Router();

meRouter.use(requireVerifiedEmail, requireProfile);

meRouter.get(
  "/",
  requirePermission("profile.read"),
  catchAsync(meController.getProfile)
);

meRouter.get("/permissions", catchAsync(meController.getPermissions));

meRouter.patch(
  "/profile",
  requirePermission("profile.write"),
  catchAsync(meController.updateProfile)
);

meRouter.put(
  "/photo",
  requirePermission("profile.write"),
  catchAsync(meController.updatePhoto)
);

meRouter.get(
  "/preferences",
  requirePermission("preferences.read"),
  catchAsync(meController.getPreferences)
);

meRouter.patch(
  "/preferences",
  requirePermission("preferences.write"),
  catchAsync(meController.updatePreferences)
);
