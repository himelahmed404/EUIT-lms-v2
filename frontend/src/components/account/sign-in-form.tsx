"use client";
import { useState } from "react";
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

export function SignInForm() {
  const account = useAccount();
  const [signup, setSignup] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
        await sendEmailVerification(account.user);
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
    <main className="account-card" style={{ maxWidth: 520 }}>
      <h1>
        {signup ? "Create your student account" : "Welcome to European IT"}
      </h1>
      <p>Use your email and password to access your account.</p>
      {account.phase === "verification" ? (
        <section>
          <h2>Verify your email</h2>
          <p>Follow the link sent to {account.user?.email}, then continue.</p>
          <div className="account-actions">
            <button disabled={busy} onClick={() => void verification(false)}>
              I have verified my email
            </button>
            <button disabled={busy} onClick={() => void verification(true)}>
              Resend verification
            </button>
            <SignOutButton />
          </div>
        </section>
      ) : account.profile ? (
        <section>
          <p>Signed in as {account.profile.fullName}.</p>
          <a className="account-link" href={portalHome(account.profile)}>
            Open my portal
          </a>{" "}
          <SignOutButton />
        </section>
      ) : (
        <form onSubmit={submit}>
          {signup && (
            <label>
              Full name
              <input
                name="fullName"
                autoComplete="name"
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
              required
              minLength={signup ? 8 : undefined}
            />
          </label>
          {!signup && (
            <label className="account-toggle">
              <input name="remember" type="checkbox" />
              Keep me logged in
            </label>
          )}
          <button disabled={busy}>
            {busy ? "Please wait…" : signup ? "Create account" : "Sign in"}
          </button>
          <div className="account-actions">
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setSignup(!signup);
                setError("");
              }}
            >
              {signup ? "Back to sign in" : "Create a student account"}
            </button>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      )}
      {(error || account.phase === "error") && (
        <p role="alert">{error || account.error}</p>
      )}
      {message && <p role="status">{message}</p>}
      {account.phase === "error" && account.user && (
        <div className="account-actions">
          <button onClick={() => void account.refresh(true)}>
            Retry loading account
          </button>
          <SignOutButton />
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
    <main className="account-card" style={{ maxWidth: 520 }}>
      <h1>Reset your password</h1>
      <form onSubmit={submit}>
        <label>
          Email address
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <button disabled={busy}>Send reset email</button>
      </form>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      <Link href="/">Back to sign in</Link>
    </main>
  );
}
