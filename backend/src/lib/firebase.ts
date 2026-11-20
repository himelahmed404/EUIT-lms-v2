import { applicationDefault, cert, getApps, initializeApp, type AppOptions } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function resolveCredential() {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (inline) {
    try {
      const parsed = JSON.parse(inline);
      return cert(parsed);
    } catch (error) {
      throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT JSON: ${(error as Error).message}`);
    }
  }

  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64?.trim();
  if (base64) {
    try {
      const decoded = Buffer.from(base64, "base64").toString("utf-8");
      const parsed = JSON.parse(decoded);
      return cert(parsed);
    } catch (error) {
      throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64: ${(error as Error).message}`);
    }
  }

  return applicationDefault();
}

export function getFirebaseAuth() {
  if (process.env.NODE_ENV === "production" && process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    throw new Error("Firebase Auth emulator must not be enabled in production.");
  }
  const options: AppOptions = { credential: resolveCredential() };
  const app = getApps()[0] ?? initializeApp(options);
  return getAuth(app);
}
