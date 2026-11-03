import Link from "next/link";

const STEPS = ["Batch & plan", "Details & payment", "Start learning"];

export function EnrollTop({ narrow = false }: { narrow?: boolean }) {
  return (
    <header className={`p-top enr-top${narrow ? " enr-top--narrow" : ""}`}>
      <Link className="p-brand" href="/" style={{ paddingLeft: 0 }}>
        <span className="p-brand-mark" aria-hidden />
        <span className="p-brand-text">
          <span className="p-brand-name">European IT</span>
          <span className="p-brand-sub">INSTITUTE</span>
        </span>
      </Link>
      <div className="p-top-right">
        <div className="eit-seg" role="group" aria-label="Language">
          <button type="button" className="eit-seg__btn is-on" aria-pressed="true">
            EN
          </button>
          <button type="button" lang="bn" className="eit-seg__btn" aria-pressed="false">
            বাং
          </button>
        </div>
        {narrow ? null : (
          <Link className="p-ghostbtn" href="/">
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}

export function EnrollSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol
      className="p-row"
      aria-label="Enrollment steps"
      style={{ listStyle: "none", margin: 0, padding: 0, gap: 10, flexWrap: "wrap" }}
    >
      {STEPS.map((label, i) => {
        const n = i + 1;
        const on = n <= current;
        return (
          <li key={label} style={{ display: "contents" }}>
            {i > 0 ? (
              <span
                aria-hidden
                style={{ width: 40, height: 2, background: on ? "var(--ink)" : "var(--line-strong)", alignSelf: "center" }}
              />
            ) : null}
            <span className="p-row" aria-current={n === current ? "step" : undefined} style={{ gap: 8 }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: on ? "var(--ink)" : "var(--track)",
                  color: on ? "var(--on-ink)" : "var(--ink-3)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {n < current ? "✓" : n}
              </span>
              {n === current ? (
                <strong style={{ fontSize: 14 }}>{label}</strong>
              ) : (
                <span style={{ fontSize: 14, color: "var(--ink-3)" }}>{label}</span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function TrailArrow() {
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

export function RadioDot({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        flex: "0 0 auto",
        boxSizing: "border-box",
        border: on ? "6px solid var(--ink)" : "2px solid var(--line-control)",
      }}
    />
  );
}
