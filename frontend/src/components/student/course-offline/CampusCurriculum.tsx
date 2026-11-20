export function CampusCurriculum() {
  return (
    <aside
      className="p-card p-card--flush"
      aria-labelledby="curr-title"
      style={{
        flex: "1 1 340px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "20px 20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <h2 id="curr-title" className="p-h3">
          Course content
        </h2>
        <div className="p-row" style={{ justifyContent: "space-between" }}>
          <span className="p-small">Attended 11 of 12 classes</span>
          <strong style={{ fontSize: "14px" }}>92%</strong>
        </div>
        <div
          className="p-bar p-bar--thin"
          role="img"
          aria-label="Attended 11 of 12 classes, 92%"
        >
          <span style={{ width: "92%" }} />
        </div>
        <span className="p-small">
          Mon &amp; Thu, 7–9 PM · Lab 2, Mirpur-10 · Recordings open to watch in
          any order.
        </span>
      </div>
      <div
        className="co-ledger"
        role="tablist"
        aria-label="Classes"
        aria-orientation="vertical"
      >
        <button
          type="button"
          className="co-row"
          role="tab"
          id="cr-13"
          aria-selected="false"
          aria-controls="cl-13"
          tabIndex={-1}
        >
          <span className="co-date">
            <span className="p-mono" style={{ fontSize: "11px" }}>
              Mon
            </span>
            <span style={{ fontSize: "18px", fontWeight: "700" }}>19</span>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>
              Class 13 · Navigation menus
            </strong>
            <span className="p-small">
              Mon 19 Oct · 7:00 PM · no recording yet
            </span>
          </span>
          <span className="eit-badge eit-badge--neutral">Upcoming</span>
        </button>
        <button
          type="button"
          className="co-row"
          role="tab"
          id="cr-12"
          aria-selected="false"
          aria-controls="cl-12"
          tabIndex={-1}
        >
          <span className="co-date">
            <span className="p-mono" style={{ fontSize: "11px" }}>
              Thu
            </span>
            <span style={{ fontSize: "18px", fontWeight: "700" }}>15</span>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>
              Class 12 · Custom header walkthrough
            </strong>
            <span className="p-small">Thu 15 Oct · Mentor is uploading</span>
          </span>
          <span className="eit-badge eit-badge--success">Present</span>
        </button>
        <button
          type="button"
          className="co-row"
          role="tab"
          id="cr-11"
          aria-selected="true"
          aria-controls="cl-11"
        >
          <span className="co-date">
            <span className="p-mono" style={{ fontSize: "11px" }}>
              Mon
            </span>
            <span style={{ fontSize: "18px", fontWeight: "700" }}>12</span>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>
              Class 11 · Enqueueing scripts
            </strong>
            <span className="p-small">Mon 12 Oct · 1:52:10</span>
          </span>
          <span className="eit-badge eit-badge--success">Present</span>
        </button>
        <button
          type="button"
          className="co-row"
          role="tab"
          id="cr-10"
          aria-selected="false"
          aria-controls="cl-10"
          tabIndex={-1}
        >
          <span className="co-date">
            <span className="p-mono" style={{ fontSize: "11px" }}>
              Thu
            </span>
            <span style={{ fontSize: "18px", fontWeight: "700" }}>8</span>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>
              Class 10 · Template hierarchy
            </strong>
            <span className="p-small">Thu 8 Oct · 1:48:33</span>
          </span>
          <span className="eit-badge eit-badge--success">Present</span>
        </button>
        <button
          type="button"
          className="co-row"
          role="tab"
          id="cr-9"
          aria-selected="false"
          aria-controls="cl-9"
          tabIndex={-1}
        >
          <span className="co-date">
            <span className="p-mono" style={{ fontSize: "11px" }}>
              Mon
            </span>
            <span style={{ fontSize: "18px", fontWeight: "700" }}>5</span>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>
              Class 9 · Theme folder structure
            </strong>
            <span className="p-small">Mon 5 Oct · 1:55:02</span>
          </span>
          <span className="eit-badge eit-badge--success">Present</span>
        </button>
      </div>
      <div style={{ padding: "4px 20px 16px" }}>
        <a className="p-link" href="#">
          Show classes 1–8
        </a>
      </div>
    </aside>
  );
}
