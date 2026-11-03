"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EnrollTop, TrailArrow } from "@/components/enroll/EnrollChrome";

const PAY_NAMES: Record<string, string> = { bkash: "bKash", nagad: "Nagad", rocket: "Rocket", card: "Card" };
const BATCH_INFO: Record<string, { first: string; next: string }> = {
  "16": { first: "Mon, 2 Nov · 7:00 PM", next: "2 Dec" },
  "18": { first: "Sat, 21 Nov · 3:00 PM", next: "21 Dec" },
};

const tk = (n: number) => `৳${n.toLocaleString("en-IN")}`;

function Step({ d, title, sub }: { d: string; title: string; sub: string }) {
  return (
    <li className="p-row" style={{ gap: 14, padding: "12px 14px", border: "1px solid var(--line)", borderRadius: 14 }}>
      <span className="p-tile" style={{ width: 36, height: 36 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
          <path d={d} />
        </svg>
      </span>
      <span style={{ display: "flex", flexDirection: "column" }}>
        <strong style={{ fontSize: 14 }}>{title}</strong>
        <span className="p-small">{sub}</span>
      </span>
    </li>
  );
}

function ResultInner() {
  const sp = useSearchParams();
  const due = Number(sp.get("due") || "5000");
  const coupon = sp.get("coupon");
  const batch = sp.get("batch") === "18" ? "18" : "16";
  const format = sp.get("format") === "online" ? "online" : "offline";
  const plan = sp.get("plan") === "full" ? "full" : "installments";
  const pay = PAY_NAMES[sp.get("pay") || "bkash"] || "bKash";
  const total = format === "online" ? 10000 : 15000;
  const info = BATCH_INFO[batch];

  const tile: React.CSSProperties = { background: "var(--surface)", borderRadius: 14, padding: "12px 14px" };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--surface)",
        color: "var(--ink)",
        fontSize: 15,
        lineHeight: 1.5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <EnrollTop narrow />
      <main
        id="main-content"
        tabIndex={-1}
        className="p-main"
        style={{ maxWidth: 760, width: "100%", boxSizing: "border-box", margin: "0 auto", flex: 1, justifyContent: "center" }}
      >
        <section
          className="p-card"
          aria-labelledby="ok-title"
          style={{
            position: "relative",
            overflow: "hidden",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span
            className="p-tile"
            aria-hidden
            style={{ width: 64, height: 64, borderRadius: 20, background: "var(--success-soft)", color: "var(--success)" }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h1 id="ok-title" className="p-h1">
              You&apos;re in. Welcome to European IT!
            </h1>
            <p className="p-body" style={{ fontSize: 16 }}>
              We received <strong style={{ color: "var(--ink)" }}>{tk(due)}</strong>
              {coupon ? ` (code ${coupon})` : ""} for Web Design &amp; Development with WordPress, Batch {batch}. Your
              login details are on their way by SMS.
            </p>
          </div>
          <dl
            style={{
              margin: 0,
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
              gap: 12,
              textAlign: "left",
            }}
          >
            <div style={tile}>
              <dt className="p-mono" style={{ fontSize: 11 }}>
                Paid with
              </dt>
              <dd style={{ margin: "4px 0 0", fontWeight: 600 }}>{pay}</dd>
            </div>
            <div style={tile}>
              <dt className="p-mono" style={{ fontSize: 11 }}>
                Transaction
              </dt>
              <dd style={{ margin: "4px 0 0", fontWeight: 600, fontFamily: "var(--font-mono)", fontSize: 14 }}>
                TRX-DEMO-15OCT
              </dd>
            </div>
            <div style={tile}>
              <dt className="p-mono" style={{ fontSize: 11 }}>
                Next payment
              </dt>
              <dd style={{ margin: "4px 0 0", fontWeight: 600 }}>
                {plan === "full" ? "Nothing due" : `${tk(Math.round(total / 3))} · ${info.next}`}
              </dd>
            </div>
          </dl>
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              textAlign: "left",
            }}
          >
            <Step
              d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
              title="Log in with your mobile number"
              sub="Use the password you just made"
            />
            <Step d="M5 3l14 9-14 9V3Z" title="Watch the welcome lesson" sub="Module 1 opens today, before your first class" />
            <Step
              d="M3 5h18v16H3zM16 3v4M8 3v4M3 10h18"
              title={`First class ${info.first}`}
              sub={format === "offline" ? "Lab 2, Mirpur-10 campus" : "Zoom link arrives by SMS"}
            />
          </ol>
          <div className="p-row" style={{ flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link className="eit-btn eit-btn--primary eit-btn--lg" href="/student/dashboard">
              <span className="eit-btn__label">Go to my dashboard</span>
              <TrailArrow />
            </Link>
            <button
              type="button"
              className="p-ghostbtn"
              style={{ minHeight: 52 }}
              data-toast="Receipt download comes with the API"
            >
              Download receipt
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<p style={{ padding: 24 }}>Loading…</p>}>
      <ResultInner />
    </Suspense>
  );
}
