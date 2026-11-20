import { Router } from "express";
import { requireVerifiedEmail } from "../../middleware/requireVerifiedEmail.js";
import { requireProfile } from "../../middleware/requireProfile.js";
import { requirePermission, requireRole } from "../../middleware/authorize.js";
import { catchAsync } from "../../utils/catchAsync.js";
import * as accessController from "./access.controller.js";

export const accessRouter = Router();

accessRouter.use(
  ["/permissions", "/admin"],
  requireVerifiedEmail,
  requireProfile,
);

accessRouter.get(
  "/permissions",
  requirePermission("roles.read"),
  accessController.getPermissionCatalog,
);

accessRouter.get(
  "/admin/roles",
  requirePermission("roles.read"),
  catchAsync(accessController.getAdminRoles),
);

// Owner-only administration is deliberately separate from editable role grants.
// Ownership transfer and the custom-role editor belong to later admin work.
accessRouter.patch(
  "/admin/profiles/:id/access",
  requireRole("OWNER"),
  requirePermission("access.write"),
  catchAsync(accessController.updateProfileAccess),
);
