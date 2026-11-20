import { getPrisma } from "../../lib/prisma.js";
import { readConfig } from "../../config/index.js";
import { ApiError } from "../../utils/ApiError.js";
import { invalid } from "../me/me.validation.js";
import type { Profile, Role, BatchScope } from "../../../generated/prisma/client.js";
import type { AccessData, UpdateAccessInput } from "./access.interface.js";

const db = () => getPrisma(readConfig().databaseUrl);

export function accessData(p: Profile): AccessData {
  return {
    id: p.id,
    role: p.role,
    customRoleId: p.customRoleId,
    active: p.active,
    batchScope: p.batchScope,
    batchIds: p.batchIds,
  };
}

export async function getAdminRoles() {
  return db().roleDefinition.findMany({
    orderBy: { key: "asc" },
  });
}

export async function updateProfileAccess(
  actorId: string,
  targetId: string,
  input: UpdateAccessInput
): Promise<AccessData> {
  const updated = await db().$transaction(
    async (tx) => {
      // Serialize against concurrent access changes and recheck the actor in the
      // same transaction, so a recently disabled/demoted owner cannot mutate access.
      const actor = await tx.profile.findUnique({ where: { id: actorId } });
      if (!actor?.active || actor.role !== "OWNER") {
        throw new ApiError(403, "FORBIDDEN", "Owner access is required.");
      }
      const target = await tx.profile.findUnique({ where: { id: targetId } });
      if (!target) {
        throw new ApiError(404, "PROFILE_NOT_FOUND", "Profile not found.");
      }
      if (target.role === "OWNER") {
        throw new ApiError(
          403,
          "OWNER_PROTECTED",
          "Owner access cannot be changed here."
        );
      }
      const role = (input.role ?? target.role) as Role;
      const customRoleId =
        role === "CUSTOM"
          ? ((input.customRoleId ?? target.customRoleId) as string | null)
          : null;
      if (role !== "CUSTOM" && input.customRoleId != null) {
        return invalid("customRoleId requires the CUSTOM role.");
      }
      if (role === "CUSTOM") {
        const definition =
          customRoleId &&
          (await tx.roleDefinition.findUnique({
            where: { id: customRoleId },
          }));
        if (!definition || definition.system) {
          return invalid("Select an existing custom role.");
        }
      }
      const batchScope =
        role === "STUDENT"
          ? "ASSIGNED"
          : ((input.batchScope !== undefined
              ? input.batchScope
              : input.role !== undefined && role !== target.role
                ? null
                : target.batchScope) as BatchScope | null);
      if (role === "STUDENT" && input.batchScope === "ALL") {
        return invalid("Students cannot access all batches.");
      }
      const batchIds =
        input.batchIds !== undefined
          ? [...new Set(input.batchIds)]
          : target.batchIds;
      if (
        batchIds.length &&
        (await tx.batch.count({ where: { id: { in: batchIds } } })) !==
          batchIds.length
      ) {
        return invalid("Select existing batch IDs.");
      }
      const result = await tx.profile.update({
        where: { id: targetId },
        data: {
          role,
          customRoleId,
          batchScope,
          batchIds,
          active: input.active,
        },
      });
      await tx.auditEvent.create({
        data: {
          actorId,
          targetId,
          action: "PROFILE_ACCESS_UPDATED",
          before: JSON.parse(JSON.stringify(accessData(target))),
          after: JSON.parse(JSON.stringify(accessData(result))),
        },
      });
      return result;
    },
    { isolationLevel: "Serializable" }
  );

  return accessData(updated);
}
