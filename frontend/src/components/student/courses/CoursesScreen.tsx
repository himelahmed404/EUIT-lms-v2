import { ContinueLearningCard } from "./ContinueLearningCard";
import { CourseLibrary } from "./CourseLibrary";
import { NextClassCard } from "./NextClassCard";
export function CoursesScreen() {
  return (
    <>
      <main className="course-room">
        <h1 className="student-page-title">My courses</h1>
        <div className="course-features">
          <ContinueLearningCard />
          <NextClassCard />
        </div>
        <CourseLibrary />
      </main>
    </>
  );
}
