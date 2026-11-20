export function PaymentReferral() {
  return (
    <section
      className="p-card"
      aria-labelledby="refer-title"
      data-region="referral"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "16px 24px",
        marginTop: "24px",
      }}
    >
      <span
        className="p-tile p-tile--green"
        style={{ width: "48px", height: "48px", borderRadius: "14px" }}
      >
        <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      </span>
      <div
        className="p-grow"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flex: "1 1 280px",
        }}
      >
        <h2 id="refer-title" className="p-h3">
          Refer a friend
        </h2>
        <p className="p-body" style={{ margin: "0" }}>
          Share your code. A friend gets ৳1,000 off; you get ৳1,000 credit 7
          days after their first payment.
        </p>
        <span className="p-small">
          Credit balance:{" "}
          <strong style={{ color: "var(--ink)" }}>৳1,500</strong> · applies to
          installment 2
        </span>
      </div>
      <div className="p-row" style={{ gap: "10px", flexWrap: "wrap" }}>
        <code
          className="p-mono"
          style={{
            fontSize: "16px",
            padding: "8px 14px",
            borderRadius: "12px",
            background: "var(--surface)",
            border: "1px dashed var(--line-strong)",
            color: "var(--ink)",
          }}
        >
          NUSRAT-148
        </code>
        <button
          type="button"
          className="p-ghostbtn"
          data-copy="NUSRAT-148"
          data-toast="Referral code copied"
        >
          Share code
        </button>
      </div>
    </section>
  );
}
