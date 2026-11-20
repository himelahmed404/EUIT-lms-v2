import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";

export function StudyProgressWidget() {
  return (
    <section className="widget study-widget">
      <div className="widget-heading">
        <h2>Study progress</h2>
        <label className="select-pill">
          <select aria-label="Study progress period" id="study-period">
            <option>Week</option>
            <option>Month</option>
          </select>
          <ChevronDown size={13} strokeWidth={1.8} aria-hidden="true" />
        </label>
      </div>
      <div className="study-chart">
        <div className="study-col">
          <div className="study-track">
            <div
              className="study-fill"
              style={{ "--value": "70%" } as CSSProperties}
            >
              <b>70%</b>
            </div>
          </div>
          <small>Engage</small>
        </div>
        <div className="study-col">
          <div className="study-track">
            <div
              className="study-fill"
              style={{ "--value": "35%" } as CSSProperties}
            >
              <b>35%</b>
            </div>
          </div>
          <small>Grow</small>
        </div>
        <div className="study-col">
          <div className="study-track">
            <div
              className="study-fill peak"
              style={{ "--value": "87%" } as CSSProperties}
            >
              <b>87%</b>
            </div>
          </div>
          <small>Skills</small>
        </div>
        <div className="study-col">
          <div className="study-track">
            <div
              className="study-fill"
              style={{ "--value": "45%" } as CSSProperties}
            >
              <b>45%</b>
            </div>
          </div>
          <small>Review</small>
        </div>
      </div>
    </section>
  );
}
