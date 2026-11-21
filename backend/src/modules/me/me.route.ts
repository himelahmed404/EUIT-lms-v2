import { Router } from "express";
import { requireVerifiedEmail } from "../../middleware/requireVerifiedEmail.js";
import { requireProfile } from "../../middleware/requireProfile.js";
import { requirePermission } from "../../middleware/authorize.js";
import { catchAsync } from "../../utils/catchAsync.js";
import * as meController from "./me.controller.js";
import * as learningController from "../learning/learning.controller.js";

export const meRouter = Router();

meRouter.use(requireVerifiedEmail, requireProfile);

meRouter.get(
  "/",
  requirePermission("profile.read"),
  catchAsync(meController.getProfile)
);

meRouter.get("/permissions", catchAsync(meController.getPermissions));

// Student enrolled courses, curriculum outline, video lessons & routine
meRouter.get("/courses", catchAsync(learningController.getEnrolledCourses));
meRouter.get("/routine", catchAsync(learningController.getStudentRoutine));
meRouter.get(
  "/enrollments/:enrollmentId/course",
  catchAsync(learningController.getCourseOutline)
);
meRouter.get(
  "/enrollments/:enrollmentId/lessons/:lessonId",
  catchAsync(learningController.getLessonDetail)
);
meRouter.put(
  "/enrollments/:enrollmentId/lessons/:lessonId/progress",
  catchAsync(learningController.updateLessonProgress)
);

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
