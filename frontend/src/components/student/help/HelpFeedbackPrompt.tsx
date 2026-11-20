export function HelpFeedbackPrompt() {
  return (
    <div className="p-row" style={{ gap: "8px", flexWrap: "wrap" }}>
      <span className="p-small">Did this help?</span>
      <button type="button" className="hp-yn">
        Yes
      </button>
      <button type="button" className="hp-yn">
        No
      </button>
    </div>
  );
}
