export function RankingPodium() {
  return (
    <div className="lb-podium" role="list" aria-label="Top 3 in the batch">
      <div
        role="listitem"
        className="lb-col"
        style={{ animationDelay: "120ms" }}
      >
        <span className="lb-av" style={{}}>
          FR
        </span>
        <strong
          style={{
            fontSize: "15px",
            color: "var(--ink)",
            lineHeight: "1.2",
          }}
        >
          Farhana R.
        </strong>
        <span className="p-small" style={{ color: "var(--ink-2)" }}>
          172 points
        </span>
        <div
          className="lb-block"
          aria-label="Rank 2, 172 points"
          style={{
            height: "112px",
            background: "rgba(255, 255, 255, 0.16)",
            color: "var(--ink)",
            animationDelay: "320ms",
          }}
        >
          <span aria-hidden="true">2</span>
        </div>
      </div>
      <div role="listitem" className="lb-col" style={{ animationDelay: "0ms" }}>
        <span className="lb-crown" aria-hidden="true">
          <svg className="p-icon p-icon--sm" viewBox="0 0 24 24">
            <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zM5 20h14" />
          </svg>
        </span>
        <span className="lb-av" style={{}}>
          TA
        </span>
        <strong
          style={{
            fontSize: "15px",
            color: "var(--ink)",
            lineHeight: "1.2",
          }}
        >
          Tanvir A.
        </strong>
        <span className="p-small" style={{ color: "var(--ink-2)" }}>
          181 points
        </span>
        <div
          className="lb-block"
          aria-label="Rank 1, 181 points"
          style={{
            height: "150px",
            background: "var(--cyan)",
            color: "var(--on-cyan)",
            animationDelay: "200ms",
          }}
        >
          <span aria-hidden="true">1</span>
        </div>
      </div>
      <div
        role="listitem"
        className="lb-col"
        style={{ animationDelay: "240ms" }}
      >
        <span
          className="lb-av"
          style={{
            boxShadow:
              "var(--ink) 0px 0px 0px 3px,\n                      var(--cyan) 0px 0px 0px 5px",
          }}
        >
          NJ
        </span>
        <strong
          style={{
            fontSize: "15px",
            color: "var(--ink)",
            lineHeight: "1.2",
          }}
        >
          You
        </strong>
        <span className="p-small" style={{ color: "var(--ink-2)" }}>
          164 points
        </span>
        <div
          className="lb-block"
          aria-label="Rank 3, 164 points"
          style={{
            height: "84px",
            background: "rgba(255, 255, 255, 0.09)",
            color: "var(--ink)",
            animationDelay: "440ms",
          }}
        >
          <span aria-hidden="true">3</span>
        </div>
      </div>
    </div>
  );
}
