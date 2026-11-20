"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/auth/firebase-client";
import { accountApi, errorMessage, portalHome } from "@/lib/api/account";
import { SignOutButton, useAccount } from "./auth-provider";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Mail,
  RefreshCw,
} from "lucide-react";

export function SignInForm() {
  const account = useAccount();
  const [signup, setSignup] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("verified") === "true" || params.get("verified") === "1") {
        setMessage(
          "Your email has been verified successfully. Please sign in with your credentials.",
        );
      }
    }
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const email = String(data.get("email")).trim();
      const password = String(data.get("password"));
      if (signup) {
        await accountApi.signup(
          String(data.get("fullName")).trim(),
          email,
          password,
        );
        setMessage(
          "Account request accepted. Check your email for verification, then sign in.",
        );
        setSignup(false);
        return;
      }
      const auth = firebaseAuth();
      await setPersistence(
        auth,
        data.get("remember")
          ? browserLocalPersistence
          : browserSessionPersistence,
      );
      await signInWithEmailAndPassword(auth, email, password);
      const profile = await account.refresh(true);
      if (profile) window.location.assign(portalHome(profile));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  async function verification(resend: boolean) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      if (resend && account.user) {
        try {
          const actionCodeSettings = {
            url: `${window.location.origin}/student/verify-email`,
            handleCodeInApp: true,
          };
          await sendEmailVerification(account.user, actionCodeSettings);
        } catch {
          await sendEmailVerification(account.user);
        }
        setMessage("Verification email requested. Check your inbox.");
      } else {
        const profile = await account.refresh(true);
        if (profile) window.location.assign(portalHome(profile));
        else setMessage("If you have verified your email, retry in a moment.");
      }
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="account-card" style={{ maxWidth: 480 }}>
      <div className="account-badge-header">
        <GraduationCap size={16} aria-hidden="true" />
        <span>European IT Institute · Student Portal</span>
      </div>

      {!account.profile && account.phase !== "verification" && (
        <div
          className="account-tabs"
          role="tablist"
          aria-label="Account access options"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!signup}
            className={`account-tab ${!signup ? "is-active" : ""}`}
            onClick={() => {
              setSignup(false);
              setError("");
              setMessage("");
            }}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={signup}
            className={`account-tab ${signup ? "is-active" : ""}`}
            onClick={() => {
              setSignup(true);
              setError("");
              setMessage("");
            }}
          >
            Create account
          </button>
        </div>
      )}

      <h1>
        {signup ? "Create your student account" : "Welcome to European IT"}
      </h1>
      <p className="account-subtitle">
        {signup
          ? "Join European IT Institute to start your learning journey and access student tools."
          : "Sign in with your email and password to access your student dashboard and courses."}
      </p>

      {account.phase === "verification" ? (
        <section>
          <h2>Verify your email</h2>
          <p className="account-subtitle">
            Follow the verification link sent to{" "}
            <strong>{account.user?.email}</strong>, then continue.
          </p>
          <div className="account-actions">
            <button disabled={busy} onClick={() => void verification(false)}>
              <CheckCircle2 size={16} aria-hidden="true" />
              I have verified my email
            </button>
            <button
              type="button"
              className="account-btn-secondary"
              disabled={busy}
              onClick={() => void verification(true)}
            >
              <RefreshCw size={15} aria-hidden="true" />
              Resend verification
            </button>
            <SignOutButton className="account-btn-secondary" />
          </div>
        </section>
      ) : account.profile ? (
        <section>
          <p className="account-subtitle">
            Signed in as <strong>{account.profile.fullName}</strong>.
          </p>
          <div className="account-actions">
            <a className="account-link" href={portalHome(account.profile)}>
              Open my portal <ArrowRight size={16} aria-hidden="true" />
            </a>
            <SignOutButton className="account-btn-secondary" />
          </div>
        </section>
      ) : (
        <form onSubmit={submit}>
          {signup && (
            <label>
              Full name
              <input
                name="fullName"
                autoComplete="name"
                placeholder="e.g. Himel Ahmed"
                required
                maxLength={120}
              />
            </label>
          )}
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="username"
              placeholder="name@example.com"
              required
              maxLength={254}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete={signup ? "new-password" : "current-password"}
              placeholder="••••••••"
              required
              minLength={signup ? 8 : undefined}
            />
          </label>
          {!signup && (
            <div className="account-options-row">
              <label className="account-toggle">
                <input name="remember" type="checkbox" defaultChecked />
                Keep me logged in
              </label>
              <Link className="account-forgot-link" href="/forgot-password">
                Forgot password?
              </Link>
            </div>
          )}
          <button disabled={busy}>
            {busy ? "Please wait…" : signup ? "Create account" : "Sign in"}
          </button>
          <div className="account-footer-switch">
            {signup ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="account-text-btn"
                  disabled={busy}
                  onClick={() => {
                    setSignup(false);
                    setError("");
                  }}
                >
                  Back to sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account yet?{" "}
                <button
                  type="button"
                  className="account-text-btn"
                  disabled={busy}
                  onClick={() => {
                    setSignup(true);
                    setError("");
                  }}
                >
                  Create a student account
                </button>
              </>
            )}
          </div>
        </form>
      )}

      {(error || account.phase === "error") && (
        <div role="alert" className="account-alert--error">
          <AlertCircle
            size={18}
            aria-hidden="true"
            style={{ flex: "none", marginTop: 2 }}
          />
          <span>{error || account.error}</span>
        </div>
      )}
      {message && (
        <div role="status" className="account-alert--success">
          <CheckCircle2
            size={18}
            aria-hidden="true"
            style={{ flex: "none", marginTop: 2 }}
          />
          <span>{message}</span>
        </div>
      )}
      {account.phase === "error" && account.user && (
        <div className="account-actions" style={{ marginTop: 16 }}>
          <button onClick={() => void account.refresh(true)}>
            Retry loading account
          </button>
          <SignOutButton className="account-btn-secondary" />
        </div>
      )}
    </main>
  );
}

export function PasswordRecovery() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email")).trim();
    setBusy(true);
    setError("");
    try {
      await sendPasswordResetEmail(firebaseAuth(), email);
      setMessage(
        "If an account exists for this email, check its inbox for a reset link.",
      );
    } catch (e) {
      if ((e as { code?: string }).code === "auth/user-not-found")
        setMessage(
          "If an account exists for this email, check its inbox for a reset link.",
        );
      else setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="account-card" style={{ maxWidth: 480 }}>
      <div className="account-badge-header">
        <GraduationCap size={16} aria-hidden="true" />
        <span>European IT Institute · Account Help</span>
      </div>
      <h1>Reset your password</h1>
      <p className="account-subtitle">
        Enter your registered email address and we&apos;ll send you a link to
        reset your password.
      </p>
      <form onSubmit={submit}>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
          />
        </label>
        <button disabled={busy}>
          <Mail size={16} aria-hidden="true" />
          {busy ? "Sending link…" : "Send reset email"}
        </button>
      </form>
      {error && (
        <div role="alert" className="account-alert--error">
          <AlertCircle
            size={18}
            aria-hidden="true"
            style={{ flex: "none", marginTop: 2 }}
          />
          <span>{error}</span>
        </div>
      )}
      {message && (
        <div role="status" className="account-alert--success">
          <CheckCircle2
            size={18}
            aria-hidden="true"
            style={{ flex: "none", marginTop: 2 }}
          />
          <span>{message}</span>
        </div>
      )}
      <div className="account-footer-switch">
        <Link href="/">Back to sign in</Link>
      </div>
    </main>
  );
}
