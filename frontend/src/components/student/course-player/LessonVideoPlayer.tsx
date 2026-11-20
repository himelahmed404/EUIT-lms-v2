import { StudentIcon } from "@/components/student/shared/StudentIcon";

export function LessonVideoPlayer() {
  return (
    <section
      data-motion-intro=""
      data-player=""
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
          MODULE 2 · LESSON 3
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--on-ink-2)",
            opacity: "0.6",
          }}
        >
          EIT-24-0148
        </span>
      </div>
      <button
        type="button"
        data-player-play=""
        aria-label="Play lesson"
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
          background: "linear-gradient(transparent, rgba(10, 27, 44, 0.9))",
        }}
      >
        <div
          role="img"
          aria-label="Played to 11:36 of 18:00. Seeking is limited to the part already watched."
          style={{
            position: "relative",
            height: "6px",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.18)",
          }}
        >
          <span
            data-player-progress=""
            style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              bottom: "0px",
              width: "64%",
              borderRadius: "inherit",
              background: "var(--cyan)",
            }}
          />
          <span
            data-player-thumb=""
            style={{
              position: "absolute",
              left: "calc(64% - 7px)",
              top: "-4px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "var(--on-ink)",
            }}
          />
        </div>
        <div
          className="p-row"
          style={{
            justifyContent: "space-between",
            fontSize: "13px",
            color: "var(--on-ink-2)",
            flexWrap: "wrap",
          }}
        >
          <span
            data-player-time=""
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            11:36 / 18:00
          </span>
          <span className="p-row" style={{ gap: "6px" }} data-player-hint="">
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span data-player-hint-text="">
              Skipping ahead is off until you finish this lesson
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
