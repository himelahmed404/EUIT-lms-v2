import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, type Auth } from "firebase/auth";

let auth: Auth | undefined;
export function firebaseAuth() {
  if (auth) return auth;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!apiKey || !projectId)
    throw new Error("Sign-in is not configured. Please contact the office.");
  const app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey,
        projectId,
        authDomain:
          process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
          `${projectId}.firebaseapp.com`,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      });
  auth = getAuth(app);
  const emulator = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL;
  if (emulator && projectId.startsWith("demo-"))
    connectAuthEmulator(auth, emulator, { disableWarnings: true });
  return auth;
}
