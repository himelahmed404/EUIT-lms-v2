import type { RequestHandler } from 'express';
import type { Role } from '../../generated/prisma/client.js';
import type { ProfileContext } from './requireProfile.js';
import { ApiError } from '../utils/ApiError.js';

export function requirePermission(permission: string): RequestHandler {
  return (_req, res, next) => {
    if (!res.locals.profileContext?.permissions.includes(permission)) {
      return next(new ApiError(403, 'FORBIDDEN', 'You do not have permission for this action.'));
    }
    next();
  };
}
export function requireRole(...roles: Role[]): RequestHandler {
  return (_req, res, next) => {
    if (!res.locals.profileContext || !roles.includes(res.locals.profileContext.profile.role)) {
      return next(new ApiError(403, 'FORBIDDEN', 'This action requires a different role.'));
    }
    next();
  };
}
// Call with the batch/owner read from the resource in the database, never from
// a submitted ownerId/batchId. Permission checks remain separate from scope.
export function assertBatchAccess(context: ProfileContext, resourceBatchId: string) {
  if (context.batchScope.mode !== 'ALL' && !context.batchScope.batchIds.includes(resourceBatchId)) {
    throw new ApiError(403, 'BATCH_FORBIDDEN', 'This batch is outside your assigned scope.');
  }
}
export function assertOwner(context: ProfileContext, resourceOwnerId: string) {
  if (context.profile.id !== resourceOwnerId) throw new ApiError(403, 'RESOURCE_FORBIDDEN', 'This resource belongs to another profile.');
}
