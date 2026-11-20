import type { Role, BatchScope } from "../../../generated/prisma/client.js";

export interface AccessData {
  [key: string]: unknown;
  id: string;
  role: Role;
  customRoleId: string | null;
  active: boolean;
  batchScope: BatchScope | null;
  batchIds: string[];
}

export interface UpdateAccessInput {
  role?: Role;
  customRoleId?: string | null;
  active?: boolean;
  batchScope?: BatchScope | null;
  batchIds?: string[];
}
