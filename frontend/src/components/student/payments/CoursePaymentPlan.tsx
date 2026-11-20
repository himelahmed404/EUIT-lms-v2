import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function CoursePaymentPlan() {
  return (
    <section
      data-motion-intro=""
      className="p-card"
      aria-labelledby="plan-title"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div className="p-card-head">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <h2 id="plan-title" className="p-h3">
            Web Design &amp; Development with WordPress
          </h2>
          <span className="p-small">
            Batch 14 · Offline · 3-installment plan
          </span>
        </div>
        <span className="eit-badge eit-badge--cyan">Installments</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span className="p-mono">Course fee</span>
          <span className="p-num" style={{ fontSize: "24px" }}>
            ৳15,000
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span className="p-mono">Paid</span>
          <span className="p-num" style={{ fontSize: "24px" }}>
            ৳5,000
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span className="p-mono">Remaining</span>
          <span className="p-num" style={{ fontSize: "24px" }}>
            ৳10,000
          </span>
        </div>
      </div>
      <div className="p-bar" role="img" aria-label="One third paid">
        <span style={{ width: "33.3%" }} />
      </div>
      <ol
        style={{
          listStyle: "none",
          margin: "0px",
          padding: "0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <li
          style={{
            display: "flex",
            gap: "16px",
            paddingBottom: "20px",
            position: "relative",
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--success-soft)",
                color: "var(--success)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <StudentIcon width="16" height="16">
                <path d="M20 6L9 17l-5-5" />
              </StudentIcon>
            </span>
            <span
              style={{
                flex: "1 1 0%",
                width: "2px",
                background: "var(--line)",
                marginTop: "4px",
              }}
            />
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 16px",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "4px",
            }}
          >
            <span style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "15px" }}>
                Installment 1 · ৳5,000
              </strong>
              <span className="p-small">Paid 10 Sep 2026 · bKash</span>
            </span>
            <a className="p-link" href="#">
              Receipt
            </a>
          </span>
        </li>
        <li
          style={{
            display: "flex",
            gap: "16px",
            paddingBottom: "20px",
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--cyan)",
                color: "var(--on-cyan)",
                display: "grid",
                placeItems: "center",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              2
            </span>
            <span
              style={{
                flex: "1 1 0%",
                width: "2px",
                background: "var(--line)",
                marginTop: "4px",
              }}
            />
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 16px",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "4px",
            }}
          >
            <span style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "15px" }}>
                Installment 2 · ৳5,000
              </strong>
              <span className="p-small">Due 15 Nov 2026</span>
              <Link className="p-link p-small" href="/student/profile#pf-refer">
                ৳1,500 referral credit available
              </Link>
            </span>
            <span className="eit-badge eit-badge--warning">Due in 31 days</span>
          </span>
        </li>
        <li style={{ display: "flex", gap: "16px" }}>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--track)",
                color: "var(--ink-3)",
                display: "grid",
                placeItems: "center",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              3
            </span>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 16px",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "4px",
            }}
          >
            <span style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "15px", color: "var(--ink-2)" }}>
                Installment 3 · ৳5,000
              </strong>
              <span className="p-small">Due 15 Dec 2026</span>
            </span>
            <span className="p-small">Upcoming</span>
          </span>
        </li>
      </ol>
    </section>
  );
}
