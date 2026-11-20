import Link from "next/link";

export function OverdueInstallment() {
  return (
    <section
      className="p-card"
      aria-labelledby="owe-title"
      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <span className="p-eyebrow">To open your course</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <h2 id="owe-title" className="p-h3">
          Installment 2 of 3
        </h2>
        <span className="p-num">৳5,000</span>
        <span
          className="p-small"
          style={{ color: "var(--danger)", fontWeight: "600" }}
        >
          Was due 1 Oct 2026 · 15 days late
        </span>
      </div>
      <div className="p-bar" role="img" aria-label="৳5,000 of ৳15,000 paid">
        <span style={{ width: "33.3%" }} />
      </div>
      <dl
        style={{
          margin: "0",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "8px 16px",
          fontSize: "14px",
        }}
      >
        <dt className="p-small">Paid so far</dt>
        <dd style={{ margin: "0", fontWeight: "600", textAlign: "right" }}>
          ৳5,000 of ৳15,000
        </dd>
        <dt className="p-small">After this</dt>
        <dd style={{ margin: "0", fontWeight: "600", textAlign: "right" }}>
          ৳5,000 due 1 Dec
        </dd>
        <dt className="p-small">Pay with</dt>
        <dd style={{ margin: "0", fontWeight: "600", textAlign: "right" }}>
          bKash, Nagad, Rocket or card
        </dd>
      </dl>
      <Link className="p-link" href="/student/payments">
        See all payments
        <span className="p-arrow">
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </section>
  );
}
