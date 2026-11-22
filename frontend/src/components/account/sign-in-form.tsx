"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
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
  Mail,
  RefreshCw,
} from "lucide-react";

export interface StatusMessage {
  kind: "error" | "success" | "info";
  text: string;
}

const THEME_IMAGES = {
  light: {
    src: "https://images.unsplash.com/photo-1765046255505-083da4b856c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Minimal light theme architectural visual backdrop",
  },
  dark: {
    src: "https://images.unsplash.com/photo-1685388180103-9b01db9d8521?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Monochrome dark theme architectural visual backdrop",
  },
};

const MODE_QUOTES = {
  signIn: {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
  },
  signUp: {
    text: "Tell me and I forget, teach me and I may remember, involve me and I learn.",
    author: "Benjamin Franklin",
  },
};

export function SignInForm() {
  const account = useAccount();
  const [isSignUp, setIsSignUp] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);

  // Form input states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Theme state
  const [isDark, setIsDark] = useState(false);

  // Typewriter state
  const [displayedQuote, setDisplayedQuote] = useState("");
  const activeQuote = isSignUp ? MODE_QUOTES.signUp : MODE_QUOTES.signIn;

  // Initialize theme
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const stored = window.localStorage.getItem("eit-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const activeDark =
      stored === "dark" ||
      root.getAttribute("data-theme") === "dark" ||
      root.classList.contains("dark") ||
      (!stored && prefersDark);

    setIsDark(activeDark);
    if (activeDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      const root = document.documentElement;
      if (next) {
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
        try {
          window.localStorage.setItem("eit-theme", "dark");
        } catch {
          /* storage blocked */
        }
      } else {
        root.classList.remove("dark");
        root.setAttribute("data-theme", "light");
        try {
          window.localStorage.setItem("eit-theme", "light");
        } catch {
          /* storage blocked */
        }
      }
      return next;
    });
  }, []);

  // Check verified param on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("verified") === "true" || params.get("verified") === "1") {
        setStatus({
          kind: "success",
          text: "Your email has been verified successfully. Please sign in with your credentials.",
        });
      }
    }
  }, []);

  // Typewriter animation
  useEffect(() => {
    const targetText = activeQuote.text;
    setDisplayedQuote("");
    let index = 0;
    let timer: NodeJS.Timeout | null = null;

    function step() {
      if (index < targetText.length) {
        setDisplayedQuote(targetText.slice(0, index + 1));
        index += 1;
        timer = setTimeout(step, 55);
      }
    }

    step();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [activeQuote.text]);

  // Sign In handler
  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const auth = firebaseAuth();
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      const profile = await account.refresh(true);
      if (profile) {
        window.location.assign(portalHome(profile));
      }
    } catch (err) {
      setStatus({
        kind: "error",
        text: errorMessage(err),
      });
    } finally {
      setBusy(false);
    }
  }

  // Sign Up handler
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      await accountApi.signup(fullName.trim(), email.trim(), password);
      setStatus({
        kind: "success",
        text: "Account request accepted. Check your email for verification, then sign in.",
      });
      setIsSignUp(false);
      setPassword("");
    } catch (err) {
      setStatus({
        kind: "error",
        text: errorMessage(err),
      });
    } finally {
      setBusy(false);
    }
  }

  // Google sign in handler
  async function handleGoogleSignIn() {
    setBusy(true);
    setStatus(null);
    try {
      const auth = firebaseAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const profile = await account.refresh(true);
      if (profile) {
        window.location.assign(portalHome(profile));
      }
    } catch (err) {
      setStatus({
        kind: "error",
        text: errorMessage(err),
      });
    } finally {
      setBusy(false);
    }
  }

  // Email verification resend/refresh handler
  async function handleVerification(resend: boolean) {
    setBusy(true);
    setStatus(null);
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
        setStatus({
          kind: "info",
          text: "Verification email requested. Check your inbox.",
        });
      } else {
        const profile = await account.refresh(true);
        if (profile) {
          window.location.assign(portalHome(profile));
        } else {
          setStatus({
            kind: "info",
            text: "If you have verified your email, retry in a moment.",
          });
        }
      }
    } catch (e) {
      setStatus({
        kind: "error",
        text: errorMessage(e),
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main-content" className="auth-page-root w-full min-h-screen md:grid md:grid-cols-2 bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
      {/* Left Column: Auth Form */}
      <div className="relative flex min-h-screen items-center justify-center p-6 md:min-h-full md:py-12">
        {/* Dark/Light Theme Toggle */}
        <button
          id="theme-toggle"
          type="button"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          className="auth-theme-btn absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg
            id="icon-sun"
            className={isDark ? "h-4 w-4" : "hidden h-4 w-4"}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          <svg
            id="icon-moon"
            className={!isDark ? "h-4 w-4" : "hidden h-4 w-4"}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>

        <div className="auth-card-enter mx-auto grid w-full max-w-[350px] gap-4">
          {account.phase === "verification" ? (
            /* Email Verification Phase */
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Follow the verification link sent to{" "}
                  <strong className="text-foreground">{account.user?.email}</strong>, then continue.
                </p>
              </div>

              {status && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-center text-xs font-medium ${
                    status.kind === "error"
                      ? "auth-status-error text-red-600 dark:text-red-400"
                      : status.kind === "success"
                        ? "auth-status-in text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground"
                  }`}
                >
                  {status.text}
                </p>
              )}

              <div className="grid gap-3 pt-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleVerification(false)}
                  className="auth-btn-primary inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                >
                  <CheckCircle2 size={16} aria-hidden="true" />
                  I have verified my email
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleVerification(true)}
                  className="auth-btn-primary inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                >
                  <RefreshCw size={15} aria-hidden="true" />
                  Resend verification
                </button>
                <SignOutButton className="auth-btn-primary inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            </div>
          ) : account.phase === "error" ? (
            /* Account Issue Phase */
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">Account Issue</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Access Diagnostics &amp; Status
                </p>
              </div>

              <div
                role="alert"
                className="auth-status-error flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{account.error || "No LMS profile"}</span>
              </div>

              <div className="grid gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => void account.refresh(true)}
                  className="auth-btn-primary inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <RefreshCw size={15} aria-hidden="true" />
                  Retry loading account
                </button>
                <SignOutButton className="auth-btn-primary inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            </div>
          ) : account.profile ? (
            /* Authenticated Phase */
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Signed in as <strong className="text-foreground">{account.profile.fullName}</strong>.
                </p>
              </div>

              <div className="grid gap-3 pt-2">
                <a
                  href={portalHome(account.profile)}
                  className="auth-btn-primary inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring no-underline"
                >
                  Open my portal <ArrowRight size={16} aria-hidden="true" />
                </a>
                <SignOutButton className="auth-btn-primary inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            </div>
          ) : (
            /* Standard Auth Form */
            <>
              {/* Sign In Form */}
              <form
                id="sign-in-form"
                autoComplete="on"
                onSubmit={handleSignIn}
                className={isSignUp ? "hidden" : "auth-form-animate flex flex-col gap-6"}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold tracking-tight">Sign in to your account</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to sign in
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="signin-email" className="text-sm font-medium leading-none">
                      Email<span className="sr-only"> address</span>
                    </label>
                    <input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={busy}
                      className="auth-input flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-all placeholder:text-muted-foreground/70 focus-visible:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                    />
                  </div>

                  <div className="grid w-full items-center gap-2">
                    <label htmlFor="signin-password" className="text-sm font-medium leading-none">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="signin-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={busy}
                        className="auth-input flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 pe-10 text-sm text-foreground shadow-sm shadow-black/5 transition-all placeholder:text-muted-foreground/70 focus-visible:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                      />
                      <button
                        type="button"
                        data-password-toggle="signin-password"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(!showPassword)}
                        className="auth-eye-btn absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                      >
                        {showPassword ? (
                          <svg className="eye-closed size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                            <path d="m2 2 20 20" />
                          </svg>
                        ) : (
                          <svg className="eye-open size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    aria-label="Sign in"
                    className="auth-btn-primary mt-2 inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                  >
                    {busy ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </form>

              {/* Sign Up Form */}
              <form
                id="sign-up-form"
                autoComplete="on"
                onSubmit={handleSignUp}
                className={isSignUp ? "auth-form-animate flex flex-col gap-6" : "hidden"}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Enter your details below to sign up
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="signup-name" className="text-sm font-medium leading-none">
                      Full Name
                    </label>
                    <input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={busy}
                      aria-label="Full name"
                      className="auth-input flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-all placeholder:text-muted-foreground/70 focus-visible:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="signup-email" className="text-sm font-medium leading-none">
                      Email<span className="sr-only"> address</span>
                    </label>
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={busy}
                      className="auth-input flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-all placeholder:text-muted-foreground/70 focus-visible:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                    />
                  </div>

                  <div className="grid w-full items-center gap-2">
                    <label htmlFor="signup-password" className="text-sm font-medium leading-none">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={busy}
                        className="auth-input flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 pe-10 text-sm text-foreground shadow-sm shadow-black/5 transition-all placeholder:text-muted-foreground/70 focus-visible:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                      />
                      <button
                        type="button"
                        data-password-toggle="signup-password"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(!showPassword)}
                        className="auth-eye-btn absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                      >
                        {showPassword ? (
                          <svg className="eye-closed size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                            <path d="m2 2 20 20" />
                          </svg>
                        ) : (
                          <svg className="eye-open size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    aria-label="Create account"
                    className="auth-btn-primary mt-2 inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                  >
                    {busy ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </form>

              {/* Toggle Mode Link */}
              <div className="text-center text-sm">
                <span id="toggle-prompt">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </span>{" "}
                <button
                  id="toggle-auth-mode"
                  type="button"
                  aria-label={isSignUp ? "Back to sign in" : "Create a student account"}
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setStatus(null);
                  }}
                  className="ml-1 font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-1 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Google Button */}
              <button
                id="google-auth-btn"
                type="button"
                disabled={busy}
                onClick={handleGoogleSignIn}
                className="auth-btn-google inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                  />
                  <path
                    fill="#34A853"
                    d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Status Feedback */}
              <p
                id="auth-status"
                role="status"
                aria-live="polite"
                className={`min-h-[1.25rem] text-center text-xs ${
                  status?.kind === "error"
                    ? "auth-status-error text-red-600 dark:text-red-400 font-medium"
                    : status?.kind === "success"
                      ? "auth-status-in text-emerald-600 dark:text-emerald-400 font-medium"
                      : "text-muted-foreground"
                }`}
              >
                {status?.text || ""}
              </p>

              {/* Forgot Password link (accessible) */}
              {!isSignUp && (
                <div className="sr-only">
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Column: Unsplash Visual Panel & Typewriter Quote */}
      <div
        id="auth-visual-panel"
        role="img"
        aria-label={
          isDark
            ? THEME_IMAGES.dark.alt
            : THEME_IMAGES.light.alt
        }
        className="relative hidden overflow-hidden md:block select-none bg-muted md:sticky md:top-0 md:h-screen"
      >
        {/* Light theme image layer */}
        <div
          className={`auth-bg-kenburns absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            isDark ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url('${THEME_IMAGES.light.src}')`,
          }}
        />

        {/* Dark theme image layer */}
        <div
          className={`auth-bg-kenburns absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            isDark ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            backgroundImage: `url('${THEME_IMAGES.dark.src}')`,
          }}
        />

        {/* Dynamic bottom gradient overlay */}
        <div className="auth-bottom-gradient absolute inset-x-0 bottom-0 h-[280px] pointer-events-none transition-colors duration-500" />

        {/* Floating frosted-glass quote card - adjust 'pb-24' (or 'auth-quote-container') to move up/down */}
        <div className="auth-quote-container relative z-10 flex h-full flex-col items-center justify-end p-8 pb-24">
          <div className="auth-quote-card rounded-2xl px-6 py-5 max-w-[420px] text-center"> 
            <blockquote className="space-y-2 text-foreground">
              <p className="text-lg font-medium tracking-tight">
                “<span id="typewriter-text">{displayedQuote}</span>
                <span className="auth-caret"></span>”
              </p>
              <cite id="quote-author" className="block text-sm font-light text-muted-foreground not-italic">
                — {activeQuote.author}
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </main>
  );
}

export function PasswordRecovery() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const stored = window.localStorage.getItem("eit-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(
      stored === "dark" ||
      root.getAttribute("data-theme") === "dark" ||
      root.classList.contains("dark") ||
      (!stored && prefersDark)
    );
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      const root = document.documentElement;
      if (next) {
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
        try {
          window.localStorage.setItem("eit-theme", "dark");
        } catch {
          /* storage blocked */
        }
      } else {
        root.classList.remove("dark");
        root.setAttribute("data-theme", "light");
        try {
          window.localStorage.setItem("eit-theme", "light");
        } catch {
          /* storage blocked */
        }
      }
      return next;
    });
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email")).trim();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(firebaseAuth(), email);
      setMessage(
        "If an account exists for this email, check its inbox for a reset link.",
      );
    } catch (e) {
      if ((e as { code?: string }).code === "auth/user-not-found") {
        setMessage(
          "If an account exists for this email, check its inbox for a reset link.",
        );
      } else {
        setError(errorMessage(e));
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main-content" className="auth-page-root relative flex min-h-screen items-center justify-center p-6 bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
      {/* Dark/Light Theme Toggle */}
      <button
        type="button"
        aria-label="Toggle dark mode"
        onClick={toggleTheme}
        className="auth-theme-btn absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <svg
          className={isDark ? "h-4 w-4" : "hidden h-4 w-4"}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <svg
          className={!isDark ? "h-4 w-4" : "hidden h-4 w-4"}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      <div className="auth-card-enter mx-auto grid w-full max-w-[350px] gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Reset your password</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your registered email address below
          </p>
        </div>

        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="recovery-email" className="text-sm font-medium leading-none">
              Email address
            </label>
            <input
              id="recovery-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="m@example.com"
              required
              disabled={busy}
              className="auth-input flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-all placeholder:text-muted-foreground/70 focus-visible:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="auth-status-error flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div
              role="status"
              className="auth-status-in flex items-start gap-2.5 rounded-lg border border-input bg-muted p-3 text-sm text-foreground"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="auth-btn-primary mt-2 inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          >
            <Mail size={16} aria-hidden="true" />
            <span>{busy ? "Sending link…" : "Send reset email"}</span>
          </button>
        </form>

        <div className="text-center text-sm">
          <Link
            href="/"
            className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
