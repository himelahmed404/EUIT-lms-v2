import { StudentIcon } from "@/components/student/shared/StudentIcon";

export function HelpSearch() {
  return (
    <section
      data-motion-intro=""
      className="p-hero"
      data-theme="ink"
      aria-labelledby="help-title"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        padding: "clamp(20px, 3vw, 40px) clamp(18px, 2.7vw, 36px)",
      }}
    >
      <span className="p-eyebrow" style={{ color: "var(--cyan)" }}>
        Help centre
      </span>
      <h1
        id="help-title"
        className="p-h1"
        style={{ fontSize: "36px", color: "var(--ink)" }}
      >
        Hi Nusrat, how can we help?
      </h1>
      <label className="hp-search">
        <StudentIcon width="22" height="22">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </StudentIcon>
        <span className="eit-sr">Search help</span>
        <input
          type="search"
          placeholder='Try "late pass" or "recording"'
          defaultValue=""
        />
      </label>
      <div className="p-row" style={{ flexWrap: "wrap", gap: "8px" }}>
        <span
          className="p-small"
          style={{ color: "var(--ink-2)", marginRight: "4px" }}
        >
          Popular:
        </span>
        <button type="button" className="hp-chip" data-q="late pass">
          Late pass
        </button>
        <button type="button" className="hp-chip" data-q="installment">
          Missed installment
        </button>
        <button type="button" className="hp-chip" data-q="recording">
          Class recordings
        </button>
        <button type="button" className="hp-chip" data-q="locked">
          Module locked
        </button>
        <button type="button" className="hp-chip" data-q="certificate">
          Certificate
        </button>
      </div>
    </section>
  );
}
