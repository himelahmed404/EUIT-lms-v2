import { ArrowUpRight,Award,Bookmark,MessageCircle } from "lucide-react";
import Link from "next/link";

export function StudyToolsWidget() {
  return (
    <section className="widget new-widget">
      <div className="widget-heading">
        <h2>Study tools</h2>
      </div>
      <div className="row-list">
        <Link
          data-motion-card=""
          className="discovery-row"
          href="/student/saved"
        >
          <span className="row-icon">
            <Bookmark size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="row-text">
            <b>Saved &amp; notes</b>
            <small>Revisit your study material</small>
          </span>
          <span className="outline-circle">
            <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </Link>
        <Link
          data-motion-card=""
          className="discovery-row"
          href="/student/questions"
        >
          <span className="row-icon">
            <MessageCircle size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="row-text">
            <b>My questions</b>
            <small>Follow up on class discussions</small>
          </span>
          <span className="outline-circle">
            <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </Link>
        <Link
          data-motion-card=""
          className="discovery-row"
          href="/student/certificates"
        >
          <span className="row-icon">
            <Award size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="row-text">
            <b>Certificates</b>
            <small>View your course awards</small>
          </span>
          <span className="outline-circle">
            <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
