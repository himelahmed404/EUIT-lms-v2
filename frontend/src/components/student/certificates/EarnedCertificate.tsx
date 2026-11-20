import Link from "next/link";

export function EarnedCertificate() {
  return (
    <section
      data-motion-intro=""
      className="p-card"
      aria-labelledby="earned-title"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "28px",
        alignItems: "center",
      }}
    >
      <Link
        href="/student/certificate"
        className="p-lift"
        aria-label="Open the Digital Marketing Essentials certificate"
        style={{
          flex: "1 1 380px",
          maxWidth: "520px",
          aspectRatio: "1123 / 794",
          position: "relative",
          borderRadius: "14px",
          border: "1px solid var(--line)",
          background: "var(--on-ink)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          textDecoration: "none",
          color: "inherit",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
            height: "6px",
            background: "var(--cyan)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "18px",
            left: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "4px",
              background: "var(--cyan)",
            }}
          />
          <span style={{ fontSize: "10px", fontWeight: "700" }}>
            European IT Institute
          </span>
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.12em",
            color: "var(--cyan-ink)",
          }}
        >
          CERTIFICATE OF COMPLETION
        </span>
        <span
          style={{
            fontSize: "26px",
            fontWeight: "700",
            letterSpacing: "0",
            boxShadow: "#d6f48b 0px -8px 0px inset",
          }}
        >
          Nusrat Jahan
        </span>
        <span style={{ fontSize: "12px", color: "var(--ink-2)" }}>
          Digital Marketing Essentials
        </span>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "16px",
            right: "20px",
            width: "34px",
            height: "34px",
            borderRadius: "4px",
            background:
              "repeating-linear-gradient(45deg, var(--ink) 0 3px, var(--on-ink) 3px 6px)",
            opacity: "0.8",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "18px",
            left: "20px",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "var(--ink-3)",
          }}
        >
          EIT-C-2026-0412
        </span>
      </Link>
      <div
        style={{
          flex: "1 1 300px",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <span className="eit-badge eit-badge--success">
          <svg
            className="eit-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Earned
        </span>
        <h2 id="earned-title" className="p-h2">
          Digital Marketing Essentials
        </h2>
        <span className="p-muted">
          Completed 30 June 2026 · 12 weeks · 2 projects approved
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "12px",
            padding: "0px 6px 0px 14px",
            minHeight: "48px",
          }}
        >
          <span
            style={{
              flex: "1 1 0%",
              minWidth: "0px",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            europeanit-inst.com/verify/EIT-C-2026-0412
          </span>
          <button
            type="button"
            className="p-ghostbtn"
            style={{ minHeight: "36px", padding: "0px 12px" }}
            data-copy="https://europeanit-inst.com/verify/EIT-C-2026-0412"
          >
            <span>Copy link</span>
          </button>
        </div>
        <div className="p-row" style={{ flexWrap: "wrap" }}>
          <Link
            href="/student/certificate"
            className="eit-btn eit-btn--primary eit-btn--md"
          >
            <svg
              className="eit-icon eit-btn__lead"
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
              <circle cx="12" cy="8" r="6" />
              <path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" />
            </svg>
            <span className="eit-btn__label">View and download PDF</span>
          </Link>
          <a className="p-ghostbtn" href="#">
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
            </svg>
            Add to LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
