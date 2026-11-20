export function LeaderboardHelp() {
  return (
    <section
      className="p-card"
      aria-label="Leaderboard privacy"
      style={{ display: "flex", alignItems: "center", gap: "16px" }}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          flex: "1 1 0%",
        }}
      >
        <span id="name-label" style={{ fontSize: "14px", fontWeight: "600" }}>
          Show my name to classmates
        </span>
        <span className="p-small">
          Classmates see &quot;Nusrat J.&quot; on this board.
        </span>
      </span>
      <button
        type="button"
        className="p-switch"
        role="switch"
        aria-checked="true"
        aria-labelledby="name-label"
      />
    </section>
  );
}
