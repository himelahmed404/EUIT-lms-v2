import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { invalid, uuid } from "../me/me.validation.js";
import {
  fields,
  parseCourse,
  parseBatch,
  courseKeys,
  batchKeys,
} from "./catalog.validation.js";
import * as catalogService from "./catalog.service.js";
import type { CatalogPageQuery } from "./catalog.interface.js";

function idParam(id: unknown): string {
  if (!uuid(id)) return invalid("Invalid resource ID.");
  return id;
}

function ok(res: Response, data: unknown, statusCode = 200) {
  sendResponse(res, {
    success: true,
    statusCode,
    message: "Catalog request completed.",
    data,
  });
}

function pageQuery(query: Record<string, unknown>): CatalogPageQuery {
  if (
    Object.keys(query).some(
      (k) => !["page", "limit", "q", "track", "format", "courseId"].includes(k)
    )
  ) {
    invalid("Unsupported query field.");
  }
  function number(v: unknown, fallback: number, max: number) {
    if (v === undefined) return fallback;
    if (typeof v !== "string" || !/^[1-9]\d*$/.test(v) || Number(v) > max) {
      return invalid("Invalid pagination.");
    }
    return Number(v);
  }
  const page = number(query.page, 1, 10000),
    limit = number(query.limit, 20, 100);
  for (const key of ["q", "track"]) {
    if (
      query[key] !== undefined &&
      (typeof query[key] !== "string" || (query[key] as string).length > 180)
    ) {
      invalid("Invalid search.");
    }
  }
  if (
    query.format !== undefined &&
    !["ONLINE", "OFFLINE"].includes(query.format as string)
  ) {
    invalid("Invalid format.");
  }
  if (query.courseId !== undefined) idParam(query.courseId);
  return {
    page,
    limit,
    skip: (page - 1) * limit,
    q: query.q as string | undefined,
    track: query.track as string | undefined,
    format: query.format as "ONLINE" | "OFFLINE" | undefined,
    courseId: query.courseId as string | undefined,
  };
}

export async function getPublicCourses(req: Request, res: Response) {
  const q = pageQuery(req.query as Record<string, unknown>);
  const result = await catalogService.getPublicCourses(q);
  ok(res, result);
}

export async function getPublicCourseById(req: Request, res: Response) {
  const result = await catalogService.getPublicCourseById(idParam(req.params.id));
  if (!result) return catalogService.missing();
  ok(res, result);
}

export async function getAdminCourses(req: Request, res: Response) {
  const q = pageQuery(req.query as Record<string, unknown>);
  const result = await catalogService.getAdminCourses(
    res.locals.profileContext!,
    q
  );
  ok(res, result);
}

export async function getAdminCourseById(req: Request, res: Response) {
  const course = await catalogService.getAdminCourseById(
    res.locals.profileContext!,
    idParam(req.params.id)
  );
  if (!course) return catalogService.missing();
  ok(res, course);
}

export async function createAdminCourse(req: Request, res: Response) {
  const ctx = res.locals.profileContext!;
  const input = parseCourse(fields(req.body, courseKeys));
  const result = await catalogService.createAdminCourse(ctx, input);
  ok(res, result, 201);
}

export async function updateAdminCourse(req: Request, res: Response) {
  const ctx = res.locals.profileContext!;
  const id = idParam(req.params.id);
  const input = fields(req.body, courseKeys, true);
  const result = await catalogService.updateAdminCourse(ctx, id, input);
  ok(res, result);
}

export async function getAdminBatches(req: Request, res: Response) {
  const q = pageQuery(req.query as Record<string, unknown>);
  const result = await catalogService.getAdminBatches(
    res.locals.profileContext!,
    q
  );
  ok(res, result);
}

export async function getAdminBatchById(req: Request, res: Response) {
  const id = idParam(req.params.id);
  const batch = await catalogService.getAdminBatchById(
    res.locals.profileContext!,
    id
  );
  if (!batch) return catalogService.missing();
  ok(res, batch);
}

export async function createAdminBatch(req: Request, res: Response) {
  const ctx = res.locals.profileContext!;
  const input = parseBatch(fields(req.body, batchKeys));
  const result = await catalogService.createAdminBatch(ctx, input);
  ok(res, result, 201);
}

export async function updateAdminBatch(req: Request, res: Response) {
  const ctx = res.locals.profileContext!;
  const id = idParam(req.params.id);
  const input = fields(req.body, batchKeys, true);
  const result = await catalogService.updateAdminBatch(ctx, id, input);
  ok(res, result);
}

export async function getAdminMentors(req: Request, res: Response) {
  const ctx = res.locals.profileContext!;
  const q = pageQuery(req.query as Record<string, unknown>);
  const result = await catalogService.getAdminMentors(ctx, q);
  ok(res, result);
}

export async function getAdminRooms(req: Request, res: Response) {
  const ctx = res.locals.profileContext!;
  const q = pageQuery(req.query as Record<string, unknown>);
  const result = await catalogService.getAdminRooms(ctx, q);
  ok(res, result);
}
