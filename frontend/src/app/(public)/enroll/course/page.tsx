"use client";

import Link from "next/link";
import { useState } from "react";
import type { EnrollChoice } from "@/types";
import { ENROLL_PRICES, installmentAmount, priceFor } from "@/data/demo/enroll";
import { useRadioGroup } from "@/hooks/useRadioGroup";
import { EnrollSteps, EnrollTop, RadioDot, TrailArrow } from "@/components/enroll/EnrollChrome";

const FORMATS = ["offline", "online"] as const;
const BATCHES = ["16", "18"] as const;
const PLANS = ["installments", "full"] as const;

const FORMAT_INFO = {
  offline: { title: "Offline", sub: "Lab 2, Mirpur-10 campus", summary: "Offline · Mirpur-10" },
  online: { title: "Online", sub: "Live on Zoom, with recordings", summary: "Online · live Zoom" },
} as const;

const BATCH_INFO = {
  "16": {
    title: "Batch 16 · starts Mon, 2 Nov",
    sub: "Mon & Thu · 7:00–9:00 PM · Lab 2",
    badge: { cls: "eit-badge--warning", text: "6 seats left" },
    summary: "Batch 16 · Mon, 2 Nov",
  },
  "18": {
    title: "Batch 18 · starts Sat, 21 Nov",
    sub: "Sat & Tue · 3:00–5:00 PM · Lab 1",
    badge: { cls: "eit-badge--success", text: "Admission open" },
    summary: "Batch 18 · Sat, 21 Nov",
  },
} as const;

const tk = (n: number) => `৳${n.toLocaleString("en-IN")}`;

const optionGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
  gap: 12,
};

function Meta({ d, children }: { d: string; children: React.ReactNode }) {
  return (
    <span className="p-row" style={{ gap: 6 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <path d={d} />
      </svg>
      {children}
    </span>
  );
}

export default function EnrollCoursePage() {
  const [choice, setChoice] = useState<EnrollChoice>({
    format: "offline",
    batch: "16",
    plan: "installments",
  });
  const total = priceFor(choice);
  const first = installmentAmount(choice);

  function setPart<K extends keyof EnrollChoice>(key: K, value: EnrollChoice[K]) {
    setChoice((c) => ({ ...c, [key]: value }));
  }

  const formatRadio = useRadioGroup(FORMATS, choice.format, (v) => setPart("format", v));
  const batchRadio = useRadioGroup(BATCHES, choice.batch, (v) => setPart("batch", v));
  const planRadio = useRadioGroup(PLANS, choice.plan, (v) => setPart("plan", v));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--surface)",
        color: "var(--ink)",
        fontSize: 15,
        lineHeight: 1.5,
      }}
    >
      <EnrollTop />
      <main id="main-content" tabIndex={-1} className="p-main" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <EnrollSteps current={1} />
        <div className="p-split">
          <div style={{ flex: "1.6 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
            <section
              className="p-card"
              aria-labelledby="course-title"
              style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}
            >
              <span className="p-tile" style={{ width: 64, height: 64, borderRadius: 18 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </span>
              <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 6 }}>
                <span className="eit-badge eit-badge--cyan" style={{ alignSelf: "flex-start" }}>
                  Development
                </span>
                <h1 id="course-title" className="p-h1" style={{ fontSize: 28 }}>
                  Web Design &amp; Development with WordPress
                </h1>
                <div className="p-row" style={{ gap: 16, flexWrap: "wrap", fontSize: 14, color: "var(--ink-2)" }}>
                  <Meta d="M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z">4 months</Meta>
                  <Meta d="M5 3l14 9-14 9V3Z">54 lessons</Meta>
                  <Meta d="M3 7h18v13H3zM8 7V4h8v3">3 projects</Meta>
                  <Meta d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM8.2 13.9 7 22l5-3 5 3-1.2-8.1">Certificate</Meta>
                </div>
              </div>
            </section>

            <section className="p-card" aria-labelledby="fmt-title" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 id="fmt-title" className="p-h3">
                <span className="p-mono" style={{ color: "var(--cyan-ink)", marginRight: 8 }}>
                  01
                </span>
                How do you want to learn?
              </h2>
              <div role="radiogroup" aria-label="Class format" onKeyDown={formatRadio.onKeyDown} style={optionGrid}>
                {FORMATS.map((f) => {
                  const on = choice.format === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      className="p-option"
                      role="radio"
                      aria-checked={on}
                      tabIndex={on ? 0 : -1}
                      onClick={() => setPart("format", f)}
                      style={{ minHeight: 88, alignItems: "flex-start", padding: 16 }}
                    >
                      <span className={`p-tile${on ? "" : " p-tile--muted"}`}>
                        {f === "offline" ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                            <path d="M15 10l5-3v10l-5-3M3 6h12v12H3z" />
                          </svg>
                        )}
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <strong style={{ fontSize: 16 }}>{FORMAT_INFO[f].title}</strong>
                        <span className="p-small">{FORMAT_INFO[f].sub}</span>
                        <span style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>{tk(ENROLL_PRICES[f])}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="p-card" aria-labelledby="batch-title" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 id="batch-title" className="p-h3">
                <span className="p-mono" style={{ color: "var(--cyan-ink)", marginRight: 8 }}>
                  02
                </span>
                Pick a batch
              </h2>
              <div
                role="radiogroup"
                aria-label="Batch"
                onKeyDown={batchRadio.onKeyDown}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {BATCHES.map((b) => {
                  const on = choice.batch === b;
                  const info = BATCH_INFO[b];
                  return (
                    <button
                      key={b}
                      type="button"
                      className="p-option"
                      role="radio"
                      aria-checked={on}
                      tabIndex={on ? 0 : -1}
                      onClick={() => setPart("batch", b)}
                      style={{ minHeight: 76, flexWrap: "wrap", padding: "12px 16px" }}
                    >
                      <RadioDot on={on} />
                      <span className="p-grow" style={{ display: "flex", flexDirection: "column", gap: 2, flex: "1 1 220px" }}>
                        <strong style={{ fontSize: 15 }}>{info.title}</strong>
                        <span className="p-small">{info.sub}</span>
                      </span>
                      <span className={`eit-badge ${info.badge.cls}`}>{info.badge.text}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="p-card" aria-labelledby="plan-title" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 id="plan-title" className="p-h3">
                <span className="p-mono" style={{ color: "var(--cyan-ink)", marginRight: 8 }}>
                  03
                </span>
                How do you want to pay?
              </h2>
              <div role="radiogroup" aria-label="Payment plan" onKeyDown={planRadio.onKeyDown} style={optionGrid}>
                {PLANS.map((p) => {
                  const on = choice.plan === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      className="p-option"
                      role="radio"
                      aria-checked={on}
                      tabIndex={on ? 0 : -1}
                      onClick={() => setPart("plan", p)}
                      style={{ minHeight: 96, alignItems: "flex-start", padding: 16, flexDirection: "column", gap: 4 }}
                    >
                      <span className="p-row" style={{ justifyContent: "space-between", width: "100%" }}>
                        <strong style={{ fontSize: 16 }}>{p === "full" ? "Pay in full" : "3 installments"}</strong>
                        {p === "installments" ? (
                          <span
                            className="p-pill"
                            style={{
                              height: 22,
                              fontSize: 11,
                              background: "var(--cyan-soft)",
                              color: "var(--cyan-deep)",
                              fontWeight: 700,
                            }}
                          >
                            Most chosen
                          </span>
                        ) : null}
                      </span>
                      <span style={{ fontSize: 20, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                        {p === "full" ? tk(total) : `3 × ${tk(Math.round(total / 3))}`}
                      </span>
                      <span className="p-small">{p === "full" ? "One payment, nothing later" : "One every 30 days"}</span>
                    </button>
                  );
                })}
              </div>
              <div className="p-notice" style={{ fontSize: 13 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8h.01M11 12h1v4h1" />
                </svg>
                <span>
                  With installments, course access pauses if a payment is more than 7 days late, and opens again as soon
                  as you pay. Your progress is never lost.
                </span>
              </div>
            </section>
          </div>

          <aside
            className="p-card p-sticky"
            aria-labelledby="sum-title"
            style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 16 }}
          >
            <span className="p-eyebrow">Your order</span>
            <h2 id="sum-title" className="p-h3">
              Web Design &amp; Development with WordPress
            </h2>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 16px", fontSize: 14 }}>
              <dt className="p-small">Format</dt>
              <dd style={{ margin: 0, textAlign: "right" }}>{FORMAT_INFO[choice.format].summary}</dd>
              <dt className="p-small">Batch</dt>
              <dd style={{ margin: 0, textAlign: "right" }}>{BATCH_INFO[choice.batch].summary}</dd>
              <dt className="p-small">Course fee</dt>
              <dd style={{ margin: 0, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{tk(total)}</dd>
              <dt className="p-small">Plan</dt>
              <dd style={{ margin: 0, textAlign: "right" }}>{choice.plan === "full" ? "Pay in full" : "3 installments"}</dd>
            </dl>
            <hr className="p-divider" />
            <div className="p-row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
              <strong style={{ fontSize: 15 }}>Pay today</strong>
              <span className="p-num" style={{ fontSize: 30 }} aria-live="polite">
                {tk(first)}
              </span>
            </div>
            <span className="p-small">
              {choice.plan === "full"
                ? "One payment covers the whole course."
                : `Then ${tk(first)} after 30 days and ${tk(total - first * 2)} after 60 days. We remind you by SMS 3 days before.`}
            </span>
            <Link
              className="eit-btn eit-btn--primary eit-btn--lg eit-btn--block"
              href={`/enroll/checkout?format=${choice.format}&batch=${choice.batch}&plan=${choice.plan}`}
            >
              <span className="eit-btn__label">Continue</span>
              <TrailArrow />
            </Link>
            <button
              type="button"
              className="p-link"
              style={{ alignSelf: "center", border: 0, background: "none", padding: 0, font: "inherit", cursor: "pointer" }}
              data-toast="Seminar booking comes with the API"
            >
              Not sure yet? Book a free seminar
            </button>
            <div className="p-row" style={{ gap: 8, justifyContent: "center", fontSize: 12, color: "var(--ink-3)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              Secure payment with SSLCommerz
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
