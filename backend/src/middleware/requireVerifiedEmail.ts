import type { RequestHandler } from 'express';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { getFirebaseAuth } from '../lib/firebase.js';
import { sendResponse } from '../utils/sendResponse.js';

declare global {
  namespace Express {
    interface Locals { firebaseUser?: DecodedIdToken }
  }
}

type VerifyToken = (token: string) => Promise<DecodedIdToken>;

export function createVerifiedEmailMiddleware(
  verify: VerifyToken = token => getFirebaseAuth().verifyIdToken(token, true),
): RequestHandler {
  return async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    const match = /^Bearer ([^\s]+)$/i.exec(req.headers.authorization ?? '');
    if (!match) {
      return sendResponse(res, { success: false, statusCode: 401, code: 'UNAUTHENTICATED', message: 'A valid bearer token is required.' });
    }
    let user: DecodedIdToken;
    try { user = await verify(match[1]); }
    catch (error) {
      const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : undefined;
      const invalid = ['auth/argument-error', 'auth/invalid-id-token', 'auth/id-token-expired',
        'auth/id-token-revoked', 'auth/user-disabled', 'auth/user-not-found'].includes(String(code));
      return sendResponse(res, { success: false, statusCode: invalid ? 401 : 503,
        code: invalid ? 'UNAUTHENTICATED' : 'AUTH_UNAVAILABLE',
        message: invalid ? 'A valid bearer token is required.' : 'Authentication is temporarily unavailable.' });
    }
    if (user.email_verified !== true) {
      return sendResponse(res, { success: false, statusCode: 403, code: 'EMAIL_NOT_VERIFIED', message: 'Verify your email address before continuing.' });
    }
    res.locals.firebaseUser = user;
    next();
  };
}

export const requireVerifiedEmail = createVerifiedEmailMiddleware();
