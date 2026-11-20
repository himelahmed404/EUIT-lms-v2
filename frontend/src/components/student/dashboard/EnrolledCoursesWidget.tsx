import { ChevronLeft,ChevronRight } from "lucide-react";
import Link from "next/link";
import { DashboardCourseCard } from "./DashboardCourseCard";
import { enrolledCourses } from "./enrolled-courses";

export function EnrolledCoursesWidget() {
  return (
    <section data-motion-intro="" className="widget feature">
      <div className="widget-heading">
        <h1>Your courses</h1>
        <div className="feature-actions flex items-center">
          <button
            type="button"
            className="outline-circle"
            title="Previous course"
            aria-label="Previous course"
            data-slide="-1"
          >
            <ChevronLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="outline-circle"
            title="Next course"
            aria-label="Next course"
            data-slide="1"
          >
            <ChevronRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <Link className="soft-button" href="/student/courses">
            View all
          </Link>
        </div>
      </div>
      <div className="course-track" aria-label="Enrolled courses">
        {enrolledCourses.map((course) => (
          <DashboardCourseCard key={course.href} course={course} />
        ))}
      </div>
    </section>
  );
}
