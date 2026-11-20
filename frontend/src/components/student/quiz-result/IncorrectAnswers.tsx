export function IncorrectAnswers() {
  return (
    <div role="tabpanel" id="ans-wrong" aria-labelledby="ans-tab-wrong" hidden>
      <div
        className="hp-empty"
        style={{ borderTop: "0", padding: "32px 16px 24px" }}
      >
        <span
          className="p-tile p-tile--green"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "16px",
          }}
        >
          <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <strong style={{ fontSize: "16px" }}>
          No wrong answers to go over
        </strong>
        <span className="p-small" style={{ maxWidth: "360px" }}>
          You got all 10 right on the first try. Your next quiz opens after
          Class 13 on Mon, 19 Oct.
        </span>
      </div>
    </div>
  );
}
