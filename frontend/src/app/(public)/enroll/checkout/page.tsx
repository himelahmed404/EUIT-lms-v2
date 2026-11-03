"use client";

import Link from "next/link";
import { Suspense, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEMO_COUPONS, installmentAmount, priceFor } from "@/data/demo/enroll";
import { useRadioGroup } from "@/hooks/useRadioGroup";
import { EnrollSteps, EnrollTop, RadioDot } from "@/components/enroll/EnrollChrome";
import type { EnrollChoice } from "@/types";

const PAY_METHODS = ["bkash", "nagad", "rocket", "card"] as const;
const PAY_INFO: Record<(typeof PAY_METHODS)[number], { name: string; sub: string }> = {
  bkash: { name: "bKash", sub: "Mobile wallet" },
  nagad: { name: "Nagad", sub: "Mobile wallet" },
  rocket: { name: "Rocket", sub: "Mobile wallet" },
  card: { name: "Card", sub: "Visa, Mastercard, Amex" },
};
const BATCH_START = { "16": "starts Mon, 2 Nov", "18": "starts Sat, 21 Nov" } as const;
const SCHEDULE = { "16": ["2 Dec 2026", "1 Jan 2027"], "18": ["21 Dec 2026", "20 Jan 2027"] } as const;

const tk = (n: number) => `৳${n.toLocaleString("en-IN")}`;

function Field({
  id,
  label,
  note,
  prefix,
  ...input
}: { id: string; label: string; note?: string; prefix?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="eit-field">
      <label className="eit-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="eit-field__wrap">
        {prefix ? (
          <span className="eit-field__prefix" aria-hidden>
            {prefix}
          </span>
        ) : null}
        <input id={id} className="eit-field__control" aria-describedby={note ? `${id}-note` : undefined} {...input} />
      </div>
      {note ? (
        <p id={`${id}-note`} className="eit-field__note">
          {note}
        </p>
      ) : null}
    </div>
  );
}

function CheckoutInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const format = (sp.get("format") as EnrollChoice["format"]) || "offline";
  const batch = (sp.get("batch") as EnrollChoice["batch"]) || "16";
  const plan = (sp.get("plan") as EnrollChoice["plan"]) || "installments";
  const choice: EnrollChoice = useMemo(() => ({ format, batch, plan }), [format, batch, plan]);
  const [pay, setPay] = useState<(typeof PAY_METHODS)[number]>("bkash");
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ label: string; off: number } | null>(null);
  const [error, setError] = useState("");
  const couponRef = useRef<HTMLInputElement>(null);
  const payRadio = useRadioGroup(PAY_METHODS, pay, setPay);

  const base = installmentAmount(choice);
  const due = Math.max(0, base - (applied?.off || 0));
  const total = priceFor(choice);
  const later = plan === "full" ? [] : [base, total - base * 2];

  function applyCode() {
    const hit = DEMO_COUPONS[code.trim().toUpperCase()];
    if (!hit) {
      setApplied(null);
      setError("That code is not valid in this demo. Try EIT1000 or FRIEND.");
      couponRef.current?.focus();
      return;
    }
    setError("");
    setApplied(hit);
  }

  const qs = useMemo(() => {
    const q = new URLSearchParams({
      format: choice.format,
      batch: choice.batch,
      plan: choice.plan,
      pay,
      due: String(due),
    });
    if (applied) q.set("coupon", code.trim().toUpperCase());
    return q.toString();
  }, [choice, pay, due, applied, code]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) {
      const firstInvalid = e.currentTarget.querySelector<HTMLElement>(":invalid");
      firstInvalid?.focus();
      return;
    }
    router.push(`/enroll/result?${qs}`);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface)", color: "var(--ink)", fontSize: 15, lineHeight: 1.5 }}>
      <EnrollTop />
      <main id="main-content" tabIndex={-1} className="p-main" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <EnrollSteps current={2} />
        <div className="p-split">
          <form
            id="checkout-form"
            aria-label="Your details and payment"
            onSubmit={onSubmit}
            style={{ flex: "1.6 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}
          >
            <section className="p-card" aria-labelledby="acc-title" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="p-card-head">
                <h1 id="acc-title" className="p-h2">
                  Create your student account
                </h1>
                <span className="p-small">
                  Have one?{" "}
                  <Link className="p-link" href="/">
                    Log in
                  </Link>
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
                  gap: "16px 20px",
                }}
              >
                <Field
                  id="co-name"
                  label="Full name"
                  name="name"
                  autoComplete="name"
                  placeholder="As it should appear on your certificate…"
                  required
                />
                <Field
                  id="co-phone"
                  label="Mobile number"
                  prefix="+880"
                  note="You log in with this number"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="1XXXXXXXXX…"
                  required
                />
                <Field
                  id="co-password"
                  label="Create a password"
                  note="At least 8 characters"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <Field
                  id="co-email"
                  label="Email (optional)"
                  note="For receipts"
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                />
              </div>
            </section>

            <section className="p-card" aria-labelledby="coupon-title" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 id="coupon-title" className="p-h3">
                Coupon or referral
              </h2>
              <div className="p-row" style={{ gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <div className={`eit-field${error ? " is-error" : ""}`}>
                    <label className="eit-sr" htmlFor="co-coupon">
                      Code
                    </label>
                    <div className="eit-field__wrap">
                      <input
                        ref={couponRef}
                        id="co-coupon"
                        className="eit-field__control"
                        name="coupon"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="EIT1000…"
                        autoComplete="off"
                        spellCheck={false}
                        aria-describedby="coupon-hint"
                        aria-invalid={error ? true : undefined}
                      />
                    </div>
                    <p id="coupon-hint" className="eit-field__note" role={error ? "alert" : undefined}>
                      {error || (applied ? `Applied ${applied.label}` : "One code per enrollment. Demo codes: EIT1000, FRIEND.")}
                    </p>
                  </div>
                </div>
                <button type="button" className="eit-btn eit-btn--secondary eit-btn--md" onClick={applyCode}>
                  <span className="eit-btn__label">Apply</span>
                </button>
              </div>
            </section>

            <section className="p-card" aria-labelledby="pay-title" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 id="pay-title" className="p-h3">
                Pay with
              </h2>
              <div
                role="radiogroup"
                aria-label="Payment method"
                onKeyDown={payRadio.onKeyDown}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: 10 }}
              >
                {PAY_METHODS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className="p-option"
                    role="radio"
                    tabIndex={pay === p ? 0 : -1}
                    aria-checked={pay === p}
                    onClick={() => setPay(p)}
                    style={{ minHeight: 64 }}
                  >
                    <RadioDot on={pay === p} />
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <strong style={{ fontSize: 15 }}>{PAY_INFO[p].name}</strong>
                      <span className="p-small" style={{ fontSize: 12 }}>
                        {PAY_INFO[p].sub}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <label
                className="p-row"
                style={{ gap: 10, fontSize: 14, color: "var(--ink-2)", cursor: "pointer", minHeight: 44, alignItems: "flex-start" }}
              >
                <input
                  type="checkbox"
                  name="terms"
                  required
                  style={{ width: 18, height: 18, margin: "2px 0 0", accentColor: "var(--ink)", flex: "0 0 auto" }}
                />
                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    className="p-link"
                    style={{ display: "inline", border: 0, background: "none", padding: 0, font: "inherit", cursor: "pointer" }}
                    data-toast="Course terms open with the API"
                  >
                    course terms
                  </button>
                  , including the installment and access-pause rules.
                </span>
              </label>
            </section>
          </form>

          <aside
            className="p-card p-sticky"
            aria-labelledby="sum-title"
            style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 16 }}
          >
            <span className="p-eyebrow">Your order</span>
            <div className="p-row" style={{ alignItems: "flex-start" }}>
              <span className="p-tile">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <h2 id="sum-title" className="p-h3" style={{ fontSize: 16 }}>
                  Web Design &amp; Development with WordPress
                </h2>
                <span className="p-small">
                  Batch {batch} · {format === "offline" ? "Offline" : "Online"} · {BATCH_START[batch]}
                </span>
              </span>
            </div>
            <hr className="p-divider" />
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <li className="p-row" style={{ justifyContent: "space-between" }}>
                <span className="p-row" style={{ gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--cyan)" }} />
                  Today
                </span>
                <strong style={{ fontVariantNumeric: "tabular-nums" }}>{tk(base)}</strong>
              </li>
              {later.map((amt, i) => (
                <li key={i} className="p-row" style={{ justifyContent: "space-between", color: "var(--ink-2)" }}>
                  <span className="p-row" style={{ gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--line-strong)" }} />
                    {SCHEDULE[batch][i]}
                  </span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>{tk(amt)}</span>
                </li>
              ))}
              {applied ? (
                <li className="p-row" style={{ justifyContent: "space-between", color: "var(--cyan-deep)" }}>
                  <span>Discount · {applied.label}</span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>−{tk(applied.off)}</span>
                </li>
              ) : null}
            </ol>
            <hr className="p-divider" />
            <div className="p-row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
              <strong style={{ fontSize: 15 }}>Pay today</strong>
              <span className="p-num" style={{ fontSize: 30 }} aria-live="polite">
                {tk(due)}
              </span>
            </div>
            <button type="submit" form="checkout-form" className="eit-btn eit-btn--primary eit-btn--lg eit-btn--block">
              <span className="eit-btn__label">
                Pay {tk(due)} with {PAY_INFO[pay].name}
              </span>
            </button>
            <div className="p-row" style={{ gap: 8, justifyContent: "center", fontSize: 12, color: "var(--ink-3)", textAlign: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              You finish on SSLCommerz&apos;s secure page
            </div>
            <Link className="p-link" href={`/enroll/course`} style={{ alignSelf: "center" }}>
              Change batch or plan
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<p style={{ padding: 24 }}>Loading checkout…</p>}>
      <CheckoutInner />
    </Suspense>
  );
}
