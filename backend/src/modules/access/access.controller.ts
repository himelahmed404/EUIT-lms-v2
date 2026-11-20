import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { permissionCatalog } from "./permissions.js";
import { invalid, objectBody, uuid } from "../me/me.validation.js";
import type { Role, BatchScope } from "../../../generated/prisma/client.js";
import * as accessService from "./access.service.js";
import type { UpdateAccessInput } from "./access.interface.js";

export function getPermissionCatalog(_req: Request, res: Response) {
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Permission catalog loaded.",
    data: permissionCatalog,
  });
}

export async function getAdminRoles(_req: Request, res: Response) {
  const roles = await accessService.getAdminRoles();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Roles loaded.",
    data: roles,
  });
}

export async function updateProfileAccess(req: Request, res: Response) {
  const id = req.params.id;
  const actorId = res.locals.profileContext!.profile.id;

  if (!uuid(id)) return invalid("Invalid profile ID.");
  if (id === actorId) {
    throw new ApiError(
      403,
      "OWNER_PROTECTED",
      "Owner access cannot be changed here."
    );
  }

  const input = objectBody(req.body);
  if (
    !Object.keys(input).length ||
    Object.keys(input).some(
      (k) =>
        !["role", "customRoleId", "active", "batchScope", "batchIds"].includes(k)
    )
  ) {
    return invalid();
  }

  if (
    input.role !== undefined &&
    (typeof input.role !== "string" ||
      ![
        "ADMIN",
        "ACCOUNTS",
        "ADMISSIONS",
        "MENTOR",
        "STUDENT",
        "CUSTOM",
      ].includes(input.role))
  ) {
    return invalid("Invalid assignable role.");
  }

  if (input.active !== undefined && typeof input.active !== "boolean") {
    return invalid();
  }

  if (
    input.customRoleId !== undefined &&
    input.customRoleId !== null &&
    !uuid(input.customRoleId)
  ) {
    return invalid();
  }

  if (
    input.batchScope !== undefined &&
    input.batchScope !== null &&
    (typeof input.batchScope !== "string" ||
      !["ALL", "ASSIGNED"].includes(input.batchScope))
  ) {
    return invalid();
  }

  if (
    input.batchIds !== undefined &&
    (!Array.isArray(input.batchIds) ||
      input.batchIds.length > 200 ||
      input.batchIds.some((v) => !uuid(v)))
  ) {
    return invalid();
  }

  const updateInput: UpdateAccessInput = {
    role: input.role as Role | undefined,
    customRoleId: input.customRoleId as string | null | undefined,
    active: input.active as boolean | undefined,
    batchScope: input.batchScope as BatchScope | null | undefined,
    batchIds: input.batchIds as string[] | undefined,
  };

  const updated = await accessService.updateProfileAccess(actorId, id, updateInput);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile access updated.",
    data: updated,
  });
}
