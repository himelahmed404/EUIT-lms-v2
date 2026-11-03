"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { PLACEHOLDER_LINKS } from "@/config/nav";

type Step = "phone" | "code" | "reset" | "done";
const STEPS: { id: Step; label: string }[] = [
  { id: "phone", label: "Phone number" },
  { id: "code", label: "Code" },
  { id: "reset", label: "New password" },
];

function Arrow() {
  return (
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
  );
}

const otpStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 0,
  height: 60,
  boxSizing: "border-box",
  textAlign: "center",
  font: "inherit",
  fontSize: 24,
  fontWeight: 700,
  borderRadius: 14,
  color: "var(--ink)",
  background: "var(--surface-card)",
  border: "1.5px solid var(--line)",
};

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const idx = step === "done" ? STEPS.length : STEPS.findIndex((s) => s.id === step);

  function setDigit(i: number, raw: string) {
    const v = raw.replace(/\D/g, "").slice(-1);
    setDigits((d) => d.map((x, j) => (j === i ? v : x)));
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
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
          boxSizing: "border-box",
          padding: "40px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <Link href="/" className="p-row" style={{ gap: 10, textDecoration: "none" }}>
          <span className="p-brand-mark" aria-hidden />
          <span className="p-brand-text">
            <span className="p-brand-name" style={{ color: "#fff" }}>
              European IT
            </span>
            <span className="p-brand-sub" style={{ color: "var(--ink-3)" }}>
              INSTITUTE
            </span>
          </span>
        </Link>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 460 }}>
          <span
            className="p-tile"
            style={{ width: 64, height: 64, borderRadius: 18, background: "var(--cyan)", color: "var(--on-cyan)" }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 36,
              lineHeight: 1.15,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fff",
            }}
          >
            Locked out? It happens.
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)" }}>
            We&apos;ll send a 6-digit code to your mobile number. Your courses, progress and payments stay exactly as
            they are.
          </p>
        </div>
        <span style={{ fontSize: 14, color: "var(--ink-3)" }}>
          Changed your number? Call {PLACEHOLDER_LINKS.supportPhone} or{" "}
          <a href={PLACEHOLDER_LINKS.whatsapp} style={{ color: "var(--cyan)", fontWeight: 600 }}>
            ask the office on WhatsApp
          </a>
        </span>
      </section>
      <section
        id="main-content"
        tabIndex={-1}
        style={{
          flex: "1 1 460px",
          boxSizing: "border-box",
          padding: "24px 48px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          background: "var(--surface-card)",
        }}
      >
        <div className="p-row" style={{ justifyContent: "space-between" }}>
          <Link className="p-link" href="/">
            ← Back to log in
          </Link>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 22 }}>
            <ol className="p-row" aria-label="Steps" style={{ listStyle: "none", margin: 0, padding: 0, gap: 6 }}>
              {STEPS.map((s, i) => (
                <li
                  key={s.id}
                  aria-current={i === idx ? "step" : undefined}
                  style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 999,
                    transition: "background 300ms",
                    background: i <= idx ? "var(--cyan)" : "var(--line-soft)",
                  }}
                >
                  <span className="eit-sr">
                    Step {i + 1}: {s.label}
                  </span>
                </li>
              ))}
            </ol>

            {step === "phone" && (
              <form
                aria-labelledby="fp-t1"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!e.currentTarget.reportValidity()) return;
                  setStep("code");
                }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <h1 id="fp-t1" className="p-h1">
                    Reset your password
                  </h1>
                  <p className="p-body">Enter the mobile number you log in with.</p>
                </div>
                <div className="eit-field">
                  <label className="eit-field__label" htmlFor="fp-phone">
                    Mobile number
                  </label>
                  <div className="eit-field__wrap">
                    <span className="eit-field__prefix" aria-hidden>
                      +880
                    </span>
                    <input
                      id="fp-phone"
                      className="eit-field__control"
                      type="tel"
                      name="phone"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="1XXXXXXXXX…"
                      pattern="1[0-9]{9}"
                      aria-describedby="fp-phone-note"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      required
                    />
                  </div>
                  <p id="fp-phone-note" className="eit-field__note">
                    10 digits after +880
                  </p>
                </div>
                <button type="submit" className="eit-btn eit-btn--primary eit-btn--lg eit-btn--block">
                  <span className="eit-btn__label">Send code</span>
                  <Arrow />
                </button>
              </form>
            )}

            {step === "code" && (
              <form
                aria-labelledby="fp-t2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (digits.some((d) => !d)) {
                    otpRefs.current[digits.findIndex((d) => !d)]?.focus();
                    return;
                  }
                  setStep("reset");
                }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <h1 id="fp-t2" className="p-h1">
                    Enter the code
                  </h1>
                  <p className="p-body">
                    We sent a 6-digit code by SMS to <strong style={{ color: "var(--ink)" }}>+880 {phone}</strong>.
                  </p>
                </div>
                <fieldset style={{ border: 0, margin: 0, padding: 0, display: "flex", gap: 10, minWidth: 0 }}>
                  <legend className="eit-sr">6-digit code</legend>
                  {digits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el;
                      }}
                      aria-label={`Digit ${i + 1}`}
                      inputMode="numeric"
                      autoComplete={i === 0 ? "one-time-code" : "off"}
                      maxLength={1}
                      value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !d && i > 0) otpRefs.current[i - 1]?.focus();
                      }}
                      style={{ ...otpStyle, borderColor: d ? "var(--ink)" : "var(--line)" }}
                    />
                  ))}
                </fieldset>
                <button type="submit" className="eit-btn eit-btn--primary eit-btn--lg eit-btn--block">
                  <span className="eit-btn__label">Continue</span>
                  <Arrow />
                </button>
                <button
                  type="button"
                  className="p-link"
                  style={{ border: 0, background: "none", padding: 0, font: "inherit", cursor: "pointer", alignSelf: "flex-start" }}
                  onClick={() => setStep("phone")}
                >
                  Use a different number
                </button>
              </form>
            )}

            {step === "reset" && (
              <form
                aria-labelledby="fp-t3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!e.currentTarget.reportValidity()) return;
                  const data = new FormData(e.currentTarget);
                  const pw = String(data.get("password") || "");
                  const confirm = String(data.get("confirm") || "");
                  if (pw !== confirm) {
                    const confirmEl = e.currentTarget.elements.namedItem("confirm") as HTMLInputElement | null;
                    confirmEl?.setCustomValidity("Passwords must match.");
                    confirmEl?.reportValidity();
                    confirmEl?.setCustomValidity("");
                    return;
                  }
                  setStep("done");
                }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <h1 id="fp-t3" className="p-h1">
                    New password
                  </h1>
                  <p className="p-body">At least 8 characters. You will use it on every device.</p>
                </div>
                <div className="eit-field">
                  <label className="eit-field__label" htmlFor="fp-pw">
                    Password
                  </label>
                  <div className="eit-field__wrap">
                    <input
                      id="fp-pw"
                      className="eit-field__control"
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                </div>
                <div className="eit-field">
                  <label className="eit-field__label" htmlFor="fp-confirm">
                    Confirm password
                  </label>
                  <div className="eit-field__wrap">
                    <input
                      id="fp-confirm"
                      className="eit-field__control"
                      type="password"
                      name="confirm"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="eit-btn eit-btn--primary eit-btn--lg eit-btn--block" data-toast="Password updated">
                  <span className="eit-btn__label">Save password</span>
                  <Arrow />
                </button>
              </form>
            )}

            {step === "done" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <h1 className="p-h1">You are set</h1>
                  <p className="p-body">Use your new password on the log-in page.</p>
                </div>
                <Link className="eit-btn eit-btn--primary eit-btn--lg eit-btn--block" href="/">
                  <span className="eit-btn__label">Back to log in</span>
                  <Arrow />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
