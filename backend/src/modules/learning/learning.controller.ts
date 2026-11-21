import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { validateUuid, validateProgressInput } from "./learning.validation.js";
import * as learningService from "./learning.service.js";

export async function getEnrolledCourses(req: Request, res: Response): Promise<void> {
  const profileId = res.locals.profileContext?.profile.id;
  if (!profileId) {
    res.status(401).json({ success: false, statusCode: 401, message: "Profile required." });
    return;
  }

  const data = await learningService.getStudentCourses(profileId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Enrolled courses retrieved successfully.",
    data,
  });
}

export async function getCourseOutline(req: Request, res: Response): Promise<void> {
  const profileId = res.locals.profileContext?.profile.id;
  if (!profileId) {
    res.status(401).json({ success: false, statusCode: 401, message: "Profile required." });
    return;
  }

  const enrollmentId = validateUuid(req.params.enrollmentId, "enrollmentId");
  const data = await learningService.getCourseOutline(profileId, enrollmentId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Course outline retrieved successfully.",
    data,
  });
}

export async function getLessonDetail(req: Request, res: Response): Promise<void> {
  const profileId = res.locals.profileContext?.profile.id;
  if (!profileId) {
    res.status(401).json({ success: false, statusCode: 401, message: "Profile required." });
    return;
  }

  const enrollmentId = validateUuid(req.params.enrollmentId, "enrollmentId");
  const lessonId = validateUuid(req.params.lessonId, "lessonId");
  const data = await learningService.getLessonDetail(profileId, enrollmentId, lessonId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Lesson details retrieved successfully.",
    data,
  });
}

export async function updateLessonProgress(req: Request, res: Response): Promise<void> {
  const profileId = res.locals.profileContext?.profile.id;
  if (!profileId) {
    res.status(401).json({ success: false, statusCode: 401, message: "Profile required." });
    return;
  }

  const enrollmentId = validateUuid(req.params.enrollmentId, "enrollmentId");
  const lessonId = validateUuid(req.params.lessonId, "lessonId");
  const input = validateProgressInput(req.body);

  const data = await learningService.updateLessonProgress(profileId, enrollmentId, lessonId, input);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Lesson progress saved successfully.",
    data,
  });
}

export async function getStudentRoutine(req: Request, res: Response): Promise<void> {
  const profileId = res.locals.profileContext?.profile.id;
  if (!profileId) {
    res.status(401).json({ success: false, statusCode: 401, message: "Profile required." });
    return;
  }

  const data = await learningService.getStudentRoutine(profileId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Routine retrieved successfully.",
    data,
  });
}
