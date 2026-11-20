import { StudentIcon } from "@/components/student/shared/StudentIcon";
import { StudentTemplate } from "@/components/student/shared/StudentTemplate";
export function ProjectDetailTemplates() {
  return (
    <>
      <StudentTemplate
        data-state="none"
        data-region="[data-region=&#x27;late-pass&#x27;]"
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          data-region="late-pass"
        >
          <div
            className="p-seg"
            role="group"
            aria-label="Extra days"
            style={{ alignSelf: "flex-start" }}
          >
            <button type="button" aria-pressed="false">
              +1 day
            </button>
            <button type="button" aria-pressed="true">
              +2 days
            </button>
            <button type="button" aria-pressed="false">
              +3 days
            </button>
          </div>
          <div
            className="p-row"
            style={{ justifyContent: "space-between", fontSize: "14px" }}
          >
            <span className="p-muted">New due date</span>
            <strong>Thu, 29 Oct</strong>
          </div>
          <div
            className="p-row"
            style={{ justifyContent: "space-between", fontSize: "14px" }}
          >
            <span className="p-muted">Cost · you have 90</span>
            <strong>30 points</strong>
          </div>
          <button
            type="button"
            className="p-ghostbtn"
            style={{
              borderColor: "var(--cyan-ink)",
              color: "var(--cyan-deep)",
            }}
            data-show-state="bought"
          >
            Use 30 points
          </button>
        </div>
      </StudentTemplate>
      <StudentTemplate
        data-state="bought"
        data-region="[data-region=&#x27;late-pass&#x27;]"
      >
        <div
          className="p-notice"
          style={{
            background: "var(--success-soft)",
            color: "var(--success)",
            animation: "p-pop 300ms var(--ease-spring) both",
          }}
          data-region="late-pass"
        >
          <StudentIcon width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12.5l2.7 2.7L16.5 9.5" />
          </StudentIcon>
          <span>
            <strong>Late pass added.</strong> Now due Thu, 29 Oct. 60 points
            left.
            <button
              type="button"
              style={{
                border: "0px",
                background: "none",
                padding: "0px",
                fontStyle: "inherit",
                fontVariant: "inherit",
                fontStretch: "inherit",
                fontSize: "inherit",
                lineHeight: "inherit",
                fontFamily: "inherit",
                fontOpticalSizing: "inherit",
                fontSizeAdjust: "inherit",
                fontKerning: "inherit",
                fontFeatureSettings: "inherit",
                fontVariationSettings: "inherit",
                fontWeight: "700",
                color: "inherit",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              data-show-state="none"
            >
              Undo
            </button>
          </span>
        </div>
      </StudentTemplate>
    </>
  );
}
