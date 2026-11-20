import { signInForVerification, sendVerificationEmail, FirebaseEmailError } from "../../lib/firebaseEmail.js";
import { randomUUID } from "node:crypto";
import { getFirebaseAuth } from "../../lib/firebase.js";
import { getPrisma } from "../../lib/prisma.js";
import { readConfig } from "../../config/index.js";
import type { StudentSignup } from "./auth.interface.js";

function errorCode(error: unknown): string | undefined {
  return typeof error === "object" && error !== null && "code" in error
    && typeof error.code === "string" ? error.code : undefined;
}

export async function signupStudent({ fullName, email, password }: StudentSignup) {
  if (!process.env.FIREBASE_WEB_API_KEY?.trim()) return "unavailable";
  const auth = getFirebaseAuth();
  const prisma = getPrisma(readConfig().databaseUrl);
  const uid = randomUUID();
  try {
    await auth.createUser({ uid, displayName: fullName, email, password, emailVerified: false });
  } catch (error) {
    const code = errorCode(error);
    if (code === "auth/email-already-exists") {
      // Password verification prevents sending mail or changing another person's account.
      return requestVerification(email, password);
    }
    if (code === "auth/invalid-password" || code === "auth/invalid-email") return "invalid";
    if (code === "auth/too-many-requests" || code === "auth/quota-exceeded") return "rateLimited";
    console.error("Firebase signup failed", { code: code ?? "unknown" });
    return "unavailable";
  }

  try {
    await prisma.profile.create({ data: { firebaseUid: uid, fullName, role: "STUDENT" } });
  } catch (error) {
    // A lost database response may mean the insert committed. Confirm before cleanup.
    try {
      const profile = await prisma.profile.findUnique({ where: { firebaseUid: uid } });
      if (profile) return requestVerification(email, password);
      await auth.deleteUser(uid);
    } catch {
      // Retain the UID for manual reconciliation without logging credentials or passwords.
      console.error("Signup reconciliation required", { firebaseUid: uid });
    }
    console.error("Student profile creation failed", { code: errorCode(error) ?? "unknown" });
    return "unavailable";
  }
  return requestVerification(email, password);
}

async function requestVerification(email: string, password: string) {
  try {
    const session = await signInForVerification(email, password);
    const user = await getFirebaseAuth().getUser(session.localId);
    const profile = await getPrisma(readConfig().databaseUrl).profile.findUnique({
      where: { firebaseUid: session.localId },
    });
    if (!profile) return "unavailable";
    if (!user.emailVerified) await sendVerificationEmail(session.idToken);
    return "accepted";
  } catch (error) {
    if (error instanceof FirebaseEmailError) {
      if (["INVALID_LOGIN_CREDENTIALS", "INVALID_PASSWORD", "EMAIL_NOT_FOUND", "USER_DISABLED"].includes(error.code)) return "accepted";
      if (["TOO_MANY_ATTEMPTS_TRY_LATER", "QUOTA_EXCEEDED"].includes(error.code)) return "rateLimited";
    }
    // Keep the account/profile so retrying with the same credentials can resend.
    console.error("Verification email request failed");
    return "unavailable";
  }
}
