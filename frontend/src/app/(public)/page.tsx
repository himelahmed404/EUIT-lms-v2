"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PLACEHOLDER_LINKS } from "@/config/nav";
import { useRadioGroup } from "@/hooks/useRadioGroup";
import type { Role } from "@/types";

const DEST: Record<Role, string> = {
  student: "/student/dashboard",
  mentor: "/mentor/dashboard",
  admin: "/admin/overview",
};

const ROLES = ["student", "mentor", "admin"] as const;

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");
  const radio = useRadioGroup(ROLES, role, setRole);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(DEST[role]);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        background: "var(--surface)",
        color: "var(--ink)",
        fontSize: 15,
        lineHeight: 1.5,
      }}
    >
      <section
        data-theme="ink"
        aria-label="European IT Institute"
        style={{
          flex: "1 1 460px",
          minWidth: 0,
          boxSizing: "border-box",
          padding: "40px clamp(20px, 6vw, 56px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 48,
        }}
      >
        <div className="p-row" style={{ gap: 10 }}>
          <span className="p-brand-mark" aria-hidden />
          <span className="p-brand-text">
            <span className="p-brand-name" style={{ color: "rgb(255,255,255)" }}>
              European IT
            </span>
            <span className="p-brand-sub" style={{ color: "var(--ink-3)" }}>
              INSTITUTE
            </span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 520 }}>
          <span className="p-eyebrow" style={{ color: "var(--cyan)" }}>
            Learning portal
          </span>
          <h2 className="eit-hl eit-hl--h1 is-static" style={{ ["--eit-n" as string]: 4 }}>
            <span className="eit-hl__w" style={{ ["--eit-i" as string]: 0 }}>
              <span className="eit-hl__in">From</span>
            </span>{" "}
            <span className="eit-hl__w" style={{ ["--eit-i" as string]: 1 }}>
              <span className="eit-hl__in">learning</span>
            </span>{" "}
            <br className="eit-hl__br" />
            <span className="eit-hl__w" style={{ ["--eit-i" as string]: 2 }}>
              <span className="eit-hl__in">to</span>
            </span>{" "}
            <span className="eit-hl__w" style={{ ["--eit-i" as string]: 3 }}>
              <span className="eit-hl__in">
                <span className="eit-hl__hl">
                  earning<span className="eit-hl__mark" aria-hidden />
                </span>
                .
              </span>
            </span>
          </h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)" }}>
            Your classes, recordings, projects and payments in one place.
          </p>
        </div>
        <span style={{ fontSize: 14, color: "var(--ink-3)" }}>
          Trouble logging in? Call {PLACEHOLDER_LINKS.supportPhone} or{" "}
          <a href={PLACEHOLDER_LINKS.whatsapp} style={{ color: "var(--cyan)", fontWeight: 600 }}>
            ask on WhatsApp
          </a>
          .
        </span>
      </section>
      <section
        id="main-content"
        tabIndex={-1}
        aria-labelledby="login-title"
        style={{
          flex: "1 1 460px",
          minWidth: 0,
          boxSizing: "border-box",
          padding: "24px clamp(20px, 6vw, 48px) 48px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          background: "var(--surface-card)",
        }}
      >
        <div className="p-row" style={{ justifyContent: "flex-end" }}>
          <div className="eit-seg" role="group" aria-label="Language">
            <button type="button" className="eit-seg__btn is-on" aria-pressed="true">
              EN
            </button>
            <button type="button" lang="bn" className="eit-seg__btn" aria-pressed="false">
              বাং
            </button>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <form
            onSubmit={onSubmit}
            aria-labelledby="login-title"
            style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <h1 id="login-title" className="p-h1">
                Log in
              </h1>
              <p className="p-body">Students, mentors and staff all log in here.</p>
            </div>
            <div className="eit-field">
              <label className="eit-field__label" htmlFor="login-phone">
                Mobile number
              </label>
              <div className="eit-field__wrap">
                <span className="eit-field__prefix" aria-hidden>
                  +880
                </span>
                <input
                  id="login-phone"
                  className="eit-field__control"
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="1XXXXXXXXX…"
                  aria-describedby="login-phone-note"
                  required
                />
              </div>
              <p id="login-phone-note" className="eit-field__note">
                10 digits after +880
              </p>
            </div>
            <div className="eit-field">
              <label className="eit-field__label" htmlFor="login-password">
                Password
              </label>
              <div className="eit-field__wrap">
                <input
                  id="login-password"
                  className="eit-field__control"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            <div className="p-row" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
              <label
                className="p-row"
                style={{ gap: 10, fontSize: 14, color: "var(--ink-2)", cursor: "pointer", minHeight: 44 }}
              >
                <input
                  type="checkbox"
                  name="keep"
                  defaultChecked
                  style={{ width: 18, height: 18, margin: 0, accentColor: "var(--ink)" }}
                />
                Keep me logged in
              </label>
              <Link className="p-link" href="/forgot-password">
                Forgot password?
              </Link>
            </div>
            <div className="demo-role">
              <span className="demo-role__label" id="demo-role-label">
                Demo: log in as
              </span>
              <div
                className="eit-seg"
                role="radiogroup"
                aria-labelledby="demo-role-label"
                onKeyDown={radio.onKeyDown}
              >
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    tabIndex={role === r ? 0 : -1}
                    className={`eit-seg__btn${role === r ? " is-on" : ""}`}
                    aria-checked={role === r}
                    onClick={() => setRole(r)}
                  >
                    {r[0].toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="eit-btn eit-btn--primary eit-btn--lg eit-btn--block" id="login-go">
              <span className="eit-btn__label">Log in</span>
              <svg
                className="eit-icon eit-btn__trail"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
            <hr className="p-divider" />
            <p className="p-muted" style={{ margin: 0 }}>
              New to European IT? Your account is created when you enroll in a course.{" "}
              <Link className="p-link" href="/enroll/course">
                Browse courses
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
