import { User2 } from "lucide-react";
import Link from "next/link";
import type { EnrolledCourse } from "./enrolled-courses";
export function DashboardCourseCard({ course }: { course: EnrolledCourse }) {
  return (
    <Link data-motion-card="" className="course-card" href={course.href}>
      <h3>{course.title}</h3>
      <div className="course-tags flex flex-wrap">
        <span className="chip level">{course.level}</span>
        <span className="chip">{course.lessons}</span>
      </div>
      <div className="course-meter">
        <strong>{course.progress}%</strong> <span>completed</span>
        <progress
          aria-label={course.title + " completion"}
          value={course.progress}
          max="100"
        />
      </div>
      <div className="course-mentor flex items-center">
        <span className={course.mentorClassName}>
          <User2 size={23} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div>
          <small>Mentor</small>
          <b>{course.mentor}</b>
        </div>
      </div>
    </Link>
  );
}
