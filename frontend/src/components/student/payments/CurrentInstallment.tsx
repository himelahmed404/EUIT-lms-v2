export function CurrentInstallment() {
  return (
    <section
      className="p-card"
      aria-labelledby="pay-title"
      style={{
        flex: "1 1 360px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span className="p-eyebrow">Next payment</span>
        <h2 id="pay-title" className="p-h3">
          Installment 2 of 3
        </h2>
        <span className="p-num" style={{ fontSize: "36px", marginTop: "6px" }}>
          ৳5,000
        </span>
        <span className="p-small">Due 15 Nov 2026 · WordPress, Batch 14</span>
      </div>
      <fieldset
        style={{
          border: "0px",
          margin: "0px",
          padding: "0px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <legend className="p-label" style={{ marginBottom: "10px" }}>
          Pay with
        </legend>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            minHeight: "60px",
            padding: "0px 16px",
            borderRadius: "12px",
            cursor: "pointer",
            border: "1px solid var(--ink)",
            background: "var(--surface)",
          }}
        >
          <input
            type="radio"
            name="method"
            defaultValue="bkash"
            defaultChecked
            style={{
              width: "18px",
              height: "18px",
              margin: "0px",
              accentColor: "var(--ink)",
            }}
          />
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "15px" }}>bKash</strong>
            <span className="p-small">Mobile wallet</span>
          </span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            minHeight: "60px",
            padding: "0px 16px",
            borderRadius: "12px",
            cursor: "pointer",
            border: "1px solid var(--line-strong)",
            background: "var(--surface-card)",
          }}
        >
          <input
            type="radio"
            name="method"
            defaultValue="nagad"
            style={{
              width: "18px",
              height: "18px",
              margin: "0px",
              accentColor: "var(--ink)",
            }}
          />
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "15px" }}>Nagad</strong>
            <span className="p-small">Mobile wallet</span>
          </span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            minHeight: "60px",
            padding: "0px 16px",
            borderRadius: "12px",
            cursor: "pointer",
            border: "1px solid var(--line-strong)",
            background: "var(--surface-card)",
          }}
        >
          <input
            type="radio"
            name="method"
            defaultValue="rocket"
            style={{
              width: "18px",
              height: "18px",
              margin: "0px",
              accentColor: "var(--ink)",
            }}
          />
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "15px" }}>Rocket</strong>
            <span className="p-small">Mobile wallet</span>
          </span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            minHeight: "60px",
            padding: "0px 16px",
            borderRadius: "12px",
            cursor: "pointer",
            border: "1px solid var(--line-strong)",
            background: "var(--surface-card)",
          }}
        >
          <input
            type="radio"
            name="method"
            defaultValue="card"
            style={{
              width: "18px",
              height: "18px",
              margin: "0px",
              accentColor: "var(--ink)",
            }}
          />
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "15px" }}>Debit or credit card</strong>
            <span className="p-small">Visa, Mastercard, Amex</span>
          </span>
        </label>
      </fieldset>
      <button
        type="button"
        className="eit-btn eit-btn--primary eit-btn--md eit-btn--block"
      >
        <span className="eit-btn__label">Pay ৳5,000</span>
        <svg
          className="eit-icon eit-btn__trail"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </button>
      <a className="p-link" href="#" style={{ alignSelf: "center" }}>
        Pay the full ৳10,000 instead
      </a>
      <div className="p-notice" style={{ fontSize: "13px" }}>
        <svg
          className="p-icon p-icon--sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ marginTop: "2px" }}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>
          You finish the payment on SSLCommerz&apos;s secure page. Your receipt
          shows here straight after.
        </span>
      </div>
    </section>
  );
}
