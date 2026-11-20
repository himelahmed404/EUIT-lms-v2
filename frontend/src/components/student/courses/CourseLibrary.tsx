import {
ArrowUpRight,
ChartNoAxesCombined,
CheckCircle2,
Code2,
SwatchBook,
} from "lucide-react";
import Link from "next/link";

export function CourseLibrary() {
  return (
    <section
      data-motion-intro=""
      className="course-library"
      aria-labelledby="library-heading"
    >
      <div className="library-toolbar">
        <h2 id="library-heading">Course library</h2>
        <div
          className="library-filters"
          data-library-filters=""
          role="group"
          aria-label="Filter courses"
          hidden
        >
          <button
            type="button"
            data-course-filter="all"
            aria-pressed="true"
            aria-controls="course-list"
          >
            All <span>3</span>
          </button>
          <button
            type="button"
            data-course-filter="active"
            aria-pressed="false"
            aria-controls="course-list"
          >
            In progress <span>2</span>
          </button>
          <button
            type="button"
            data-course-filter="completed"
            aria-pressed="false"
            aria-controls="course-list"
          >
            Completed <span>1</span>
          </button>
        </div>
      </div>
      <p className="sr-only" role="status" data-filter-status="" />
      <div className="library-grid" id="course-list">
        <article
          data-motion-card=""
          className="library-card library-graphic"
          data-course-state="active"
          aria-labelledby="title-graphic"
        >
          <div className="library-card-top">
            <span
              data-motion-detail=""
              className="library-mark"
              aria-hidden="true"
            >
              <SwatchBook size={28} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="library-format">Online · Batch 9</span>
          </div>
          <h3 id="title-graphic">Graphic Design</h3>
          <p className="library-instructor">With Nadia Rahman</p>
          <div className="library-progress">
            <div>
              <span>7 of 40 lessons</span>
              <strong>18%</strong>
            </div>
            <progress
              value="7"
              max="40"
              aria-label="Graphic Design lesson completion"
            />
          </div>
          <div className="library-notes">
            <Link href="/student/quizzes">Open quiz</Link>
            <span aria-hidden="true">·</span>
            <Link href="/student/projects">1 project due</Link>
          </div>
          <Link className="library-action" href="/student/course-player">
            Open lessons{" "}
            <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </article>
        <article
          data-motion-card=""
          className="library-card library-wordpress"
          data-course-state="active"
          aria-labelledby="title-wordpress"
        >
          <div className="library-card-top">
            <span
              data-motion-detail=""
              className="library-mark"
              aria-hidden="true"
            >
              <Code2 size={28} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="library-format">On campus · Batch 14</span>
          </div>
          <h3 id="title-wordpress">WordPress Development</h3>
          <p className="library-instructor">With Kamrul Hasan</p>
          <div className="library-progress">
            <div>
              <span>23 of 54 lessons</span>
              <strong>43%</strong>
            </div>
            <progress
              value="23"
              max="54"
              aria-label="WordPress Development lesson completion"
            />
          </div>
          <div className="library-notes">
            <Link href="/student/course-offline">
              11 of 12 classes attended
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/student/payments">Payment due 15 Nov</Link>
          </div>
          <Link className="library-action" href="/student/course-offline">
            Open classes{" "}
            <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </article>
        <article
          data-motion-card=""
          className="library-card library-marketing"
          data-course-state="completed"
          aria-labelledby="title-marketing"
        >
          <div className="library-card-top">
            <span
              data-motion-detail=""
              className="library-mark"
              aria-hidden="true"
            >
              <ChartNoAxesCombined
                size={28}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
            <span className="library-format">
              <CheckCircle2 size={14} strokeWidth={1.8} aria-hidden="true" />{" "}
              Completed
            </span>
          </div>
          <h3 id="title-marketing">Digital Marketing Essentials</h3>
          <p className="library-instructor">With Imran Kabir</p>
          <div className="library-progress">
            <div>
              <span>24 of 24 lessons</span>
              <strong>100%</strong>
            </div>
            <progress
              value="24"
              max="24"
              aria-label="Digital Marketing Essentials lesson completion"
            />
          </div>
          <div className="library-notes">Certificate issued 30 June 2026</div>
          <Link className="library-action" href="/student/certificate">
            View certificate{" "}
            <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </article>
      </div>
    </section>
  );
}
