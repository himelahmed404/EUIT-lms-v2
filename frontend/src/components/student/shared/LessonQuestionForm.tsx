type Props = { label: string; medium: "video" | "recording"; mentor: string };
export function LessonQuestionForm({ label, medium, mentor }: Props) {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      data-next=""
    >
      <label className="p-label" htmlFor="ask-text">
        {label}
      </label>
      <textarea
        id="ask-text"
        className="p-textarea"
        style={{ minHeight: "96px" }}
        placeholder={`What did you try, and what happened? Add the time in the ${medium} if it helps (for example 11:36).`}
      />
      <div
        className="p-row"
        style={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <span className="p-small">
          Mentors usually reply within a day. You get a notification when they
          do.
        </span>
        <button
          type="submit"
          className="eit-btn eit-btn--primary eit-btn--md"
          data-toast={`Question sent to ${mentor}`}
        >
          <svg
            className="eit-icon eit-btn__lead"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
            aria-hidden="true"
          >
            <path d="m22 2-7 20-4-9-9-4 20-7z" />
            <path d="M22 2 11 13" />
          </svg>
          <span className="eit-btn__label">Send question</span>
        </button>
      </div>
    </form>
  );
}
