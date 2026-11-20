import { StudentIcon } from "@/components/student/shared/StudentIcon";

export function TemplateHierarchyRecording() {
  return (
    <section
      aria-label="Video player"
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        borderRadius: "var(--radius-lg)",
        background: "#0a1b2c",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#ffffff",
      }}
    >
      <div
        className="p-row"
        style={{
          padding: "16px 20px",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: "var(--on-ink-2)",
          }}
        >
          CLASS 10 · TEMPLATE HIERARCHY
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--on-ink-2)",
          }}
        >
          EIT-24-0148
        </span>
      </div>
      <button
        type="button"
        aria-label="Play recording"
        style={{
          alignSelf: "center",
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          border: "0px",
          background: "var(--cyan)",
          color: "var(--on-cyan)",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
        }}
      >
        <StudentIcon width="28" height="28">
          <path d="M6 4l14 8-14 8z" />
        </StudentIcon>
      </button>
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="range"
          min="0"
          max="6513"
          defaultValue="0"
          aria-label="Seek, any point of the recording"
          style={{ width: "100%", accentColor: "var(--cyan)" }}
        />
        <div
          className="p-row"
          style={{
            justifyContent: "space-between",
            fontSize: "13px",
            color: "var(--on-ink-2)",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontVariantNumeric: "tabular-nums" }}>
            0:00 / 1:48:33
          </span>
          <span>Jump to any point, in any order</span>
        </div>
      </div>
    </section>
  );
}
