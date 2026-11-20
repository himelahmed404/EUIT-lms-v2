import type { Profile, RoleDefinition, BatchScope } from '../../generated/prisma/client.js';
import { getPrisma } from '../lib/prisma.js';
import { readConfig } from '../config/index.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';
import { permissionCatalog, selfPermissions } from '../modules/access/permissions.js';

export interface ProfileContext {
  profile: Profile;
  roleDefinition: RoleDefinition;
  permissions: string[];
  batchScope: { mode: BatchScope; batchIds: string[] };
}
declare global {
  namespace Express { interface Locals { profileContext?: ProfileContext } }
}
export const requireProfile = catchAsync(async (_req, res, next) => {
  const identity = res.locals.firebaseUser;
  if (!identity) throw new ApiError(401, 'UNAUTHENTICATED', 'A valid bearer token is required.');
  const db = getPrisma(readConfig().databaseUrl);
  const profile = await db.profile.findUnique({ where: { firebaseUid: identity.uid } });
  if (!profile) throw new ApiError(404, 'PROFILE_NOT_FOUND', 'No LMS profile is linked to this account. Contact the office.');
  if (!profile.active) throw new ApiError(403, 'ACCOUNT_DISABLED', 'This LMS account is disabled.');
  const roleDefinition = profile.role === 'CUSTOM'
    ? profile.customRoleId && await db.roleDefinition.findUnique({ where: { id: profile.customRoleId } })
    : await db.roleDefinition.findUnique({ where: { key: profile.role } });
  if (!roleDefinition || (profile.role === 'CUSTOM' && roleDefinition.system)) {
    throw new ApiError(503, 'ROLE_NOT_CONFIGURED', 'Account permissions are unavailable.');
  }
  // Owner/Student are fixed roles. Unrecognized grants never confer access.
  const permissions = profile.role === 'OWNER' ? permissionCatalog : profile.role === 'STUDENT'
    ? selfPermissions : roleDefinition.permissions.filter(p => permissionCatalog.includes(p) && p !== 'access.write');
  const mode = profile.role === 'OWNER' ? 'ALL' : profile.role === 'STUDENT' ? 'ASSIGNED'
    : profile.batchScope ?? roleDefinition.defaultBatchScope;
  res.locals.profileContext = { profile, roleDefinition, permissions,
    batchScope: { mode, batchIds: mode === 'ALL' ? [] : profile.batchIds } };
  next();
});
