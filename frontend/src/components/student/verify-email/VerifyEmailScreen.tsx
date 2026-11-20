"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { applyActionCode, reload } from "firebase/auth";
import { firebaseAuth } from "@/lib/auth/firebase-client";
import { useAccount } from "@/components/account/auth-provider";
import { errorMessage, portalHome } from "@/lib/api/account";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";

export function VerifyEmailScreen() {
  const account = useAccount();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode") || "verifyEmail";

  const [state, setState] = useState<"verifying" | "success" | "error" | "idle">(
    oobCode ? "verifying" : "idle",
  );
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const code = oobCode;
    if (!code) {
      setState("idle");
      return;
    }

    if (mode === "resetPassword") {
      window.location.assign(`/student/forgot-password?oobCode=${encodeURIComponent(code)}`);
      return;
    }

    let isMounted = true;

    async function verify() {
      try {
        const auth = firebaseAuth();
        await applyActionCode(auth, code!);

        // If the user has an active session in this browser, reload it so emailVerified is true
        if (auth.currentUser) {
          try {
            await reload(auth.currentUser);
            await account.refresh(true);
          } catch {
            // Non-critical session reload catch
          }
        }

        if (isMounted) {
          setState("success");
        }
      } catch (err) {
        if (isMounted) {
          setState("error");
          const msg = errorMessage(err);
          if (msg.includes("invalid") || msg.includes("expired") || msg.includes("code")) {
            setErrorText(
              "This verification link has expired or has already been used. Please sign in or request a new verification email.",
            );
          } else {
            setErrorText(msg);
          }
        }
      }
    }

    void verify();

    return () => {
      isMounted = false;
    };
  }, [oobCode, mode, account]);

  return (
    <main className="account-card" style={{ maxWidth: 520, textAlign: "center" }}>
      <div className="account-badge-header" style={{ margin: "0 auto 20px" }}>
        <GraduationCap size={16} aria-hidden="true" />
        <span>European IT Institute · Student Portal</span>
      </div>

      {state === "verifying" && (
        <div style={{ padding: "16px 0 8px" }}>
          <div
            className="verify-status-icon verify-status-icon--loading"
            aria-hidden="true"
          >
            <Loader2 size={36} className="animate-spin" />
          </div>
          <h1 style={{ marginTop: 16 }}>Verifying your email…</h1>
          <p className="account-subtitle" style={{ maxWidth: 420, margin: "0 auto 24px" }}>
            Please wait a moment while we confirm your email address and activate your student account.
          </p>
        </div>
      )}

      {state === "success" && (
        <div style={{ padding: "16px 0 8px" }}>
          <div
            className="verify-status-icon verify-status-icon--success"
            aria-hidden="true"
          >
            <CheckCircle2 size={42} strokeWidth={2.2} />
          </div>
          <h1 style={{ marginTop: 16 }}>Email verified!</h1>
          <p className="account-subtitle" style={{ maxWidth: 440, margin: "0 auto 28px" }}>
            Thank you for verifying your email address. Your European IT Institute student account is now fully active.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {account.profile ? (
              <Link
                href={portalHome(account.profile)}
                className="account-btn"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span>Continue to Student Dashboard</span>
                <ArrowRight size={17} />
              </Link>
            ) : (
              <Link
                href="/student/login?verified=true"
                className="account-btn"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span>Sign in to your account</span>
                <ArrowRight size={17} />
              </Link>
            )}
          </div>
        </div>
      )}

      {state === "error" && (
        <div style={{ padding: "16px 0 8px" }}>
          <div
            className="verify-status-icon verify-status-icon--error"
            aria-hidden="true"
          >
            <AlertCircle size={42} strokeWidth={2.2} />
          </div>
          <h1 style={{ marginTop: 16 }}>Link expired or invalid</h1>
          <p className="account-subtitle" style={{ maxWidth: 440, margin: "0 auto 20px" }}>
            {errorText || "This verification link is no longer valid or has already been used."}
          </p>

          <div role="alert" className="account-alert--error" style={{ textAlign: "left", marginBottom: 24 }}>
            <AlertCircle size={18} style={{ flex: "none", marginTop: 2 }} aria-hidden="true" />
            <span>
              If you have already verified your account, you can proceed to sign in directly.
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              href="/student/login"
              className="account-btn"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Back to sign in</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      )}

      {state === "idle" && (
        <div style={{ padding: "16px 0 8px" }}>
          <div
            className="verify-status-icon verify-status-icon--idle"
            aria-hidden="true"
          >
            <Mail size={40} strokeWidth={1.8} />
          </div>
          <h1 style={{ marginTop: 16 }}>Check your inbox</h1>
          <p className="account-subtitle" style={{ maxWidth: 440, margin: "0 auto 24px" }}>
            We sent a verification link to your email address. Please click the link inside that email to activate your account.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              href="/student/login"
              className="account-btn-secondary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Back to sign in</span>
            </Link>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: 28,
          paddingTop: 18,
          borderTop: "1px solid #eef2f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          color: "#94a3b8",
          fontSize: 13,
        }}
      >
        <ShieldCheck size={16} />
        <span>Secured by European IT Institute Authentication</span>
      </div>
    </main>
  );
}
