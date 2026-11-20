import { Router } from "express";
import { requireVerifiedEmail } from "../../middleware/requireVerifiedEmail.js";
import { requireProfile } from "../../middleware/requireProfile.js";
import { requirePermission } from "../../middleware/authorize.js";
import { catchAsync } from "../../utils/catchAsync.js";
import * as catalogController from "./catalog.controller.js";

export const catalogRouter = Router();

catalogRouter.use((_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Public catalog routes (must not require auth)
catalogRouter.get(
  "/catalog/courses",
  catchAsync(catalogController.getPublicCourses)
);
catalogRouter.get(
  "/catalog/courses/:id",
  catchAsync(catalogController.getPublicCourseById)
);

// Admin catalog routes (require verified email & profile)
catalogRouter.use("/admin", requireVerifiedEmail, requireProfile);

catalogRouter.get(
  "/admin/courses",
  requirePermission("courses.read"),
  catchAsync(catalogController.getAdminCourses)
);
catalogRouter.get(
  "/admin/courses/:id",
  requirePermission("courses.read"),
  catchAsync(catalogController.getAdminCourseById)
);
catalogRouter.post(
  "/admin/courses",
  requirePermission("courses.write"),
  catchAsync(catalogController.createAdminCourse)
);
catalogRouter.patch(
  "/admin/courses/:id",
  requirePermission("courses.write"),
  catchAsync(catalogController.updateAdminCourse)
);

catalogRouter.get(
  "/admin/batches",
  requirePermission("batches.read"),
  catchAsync(catalogController.getAdminBatches)
);
catalogRouter.get(
  "/admin/batches/:id",
  requirePermission("batches.read"),
  catchAsync(catalogController.getAdminBatchById)
);
catalogRouter.post(
  "/admin/batches",
  requirePermission("batches.write"),
  catchAsync(catalogController.createAdminBatch)
);
catalogRouter.patch(
  "/admin/batches/:id",
  requirePermission("batches.write"),
  catchAsync(catalogController.updateAdminBatch)
);

catalogRouter.get("/admin/mentors", catchAsync(catalogController.getAdminMentors));
catalogRouter.get("/admin/rooms", catchAsync(catalogController.getAdminRooms));
