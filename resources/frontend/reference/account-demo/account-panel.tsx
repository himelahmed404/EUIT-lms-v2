import { ArrowUpRight,ChevronRight,Code2,PenTool } from "lucide-react";
import Link from "next/link";

export function AccountPanel() {
  return (
    <div id="pf-account" data-pf-panel="">
      <section className="pf-card">
        <header>
          <h2>Personal details</h2>
        </header>
        <form id="profile-details">
          <div className="pf-grid">
            <label className="pf-field">
              <span>Full name</span>
              <input
                name="name"
                autoComplete="name"
                defaultValue="Nusrat Jahan"
                required
                maxLength={80}
              />
            </label>
            <label className="pf-field">
              <span>Mobile number</span>
              <input name="phone" defaultValue="+880 17XXXXXX48" readOnly />
              <small>Contact the office to change your sign-in number.</small>
            </label>
            <label className="pf-field">
              <span>Email address</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                defaultValue="nusrat.j@example.com"
                maxLength={150}
              />
              <small>Optional · used for receipts</small>
            </label>
            <label className="pf-field">
              <span>Emergency contact</span>
              <input
                name="guardian"
                type="tel"
                placeholder="+880"
                maxLength={24}
              />
              <small>Optional</small>
            </label>
          </div>
          <div className="pf-actions">
            <button className="pf-primary">Save changes</button>
            <p className="pf-status" id="details-status" role="status" />
          </div>
        </form>
      </section>
      <section className="pf-card">
        <header>
          <h2>Active courses</h2>
          <Link className="pf-textlink" href="/student/courses">
            My courses{" "}
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </header>
        <Link className="pf-course" href="/student/course-player">
          <span className="pf-course-icon">
            <PenTool size={20} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <h3>Graphic Design</h3>
            <small>Batch 9 · Online · Nadia Rahman</small>
          </div>
          <ChevronRight size={16} strokeWidth={1.8} aria-hidden="true" />
        </Link>
        <Link className="pf-course" href="/student/course-offline">
          <span className="pf-course-icon">
            <Code2 size={20} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <h3>WordPress Development</h3>
            <small>Batch 14 · On campus · Kamrul Hasan</small>
          </div>
          <ChevronRight size={16} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
