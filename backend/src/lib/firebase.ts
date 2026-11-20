import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export function getFirebaseAuth() {
  if (process.env.NODE_ENV === 'production' && process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    throw new Error('Firebase Auth emulator must not be enabled in production.');
  }
  const app = getApps()[0] ?? initializeApp({ credential: applicationDefault() });
  return getAuth(app);
}
