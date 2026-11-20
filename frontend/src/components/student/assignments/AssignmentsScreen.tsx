import { FolderOpen,ListChecks } from "lucide-react";
import Link from "next/link";
import { ActiveQuizCard } from "./ActiveQuizCard";
import { LatestFeedbackCard } from "./LatestFeedbackCard";
import { UpcomingProjectCard } from "./UpcomingProjectCard";
export function AssignmentsScreen() {
  return (
    <>
      <main className="work-room">
        <header className="work-heading">
          <div>
            <p className="work-today">
              <time dateTime="2026-10-15">Thursday 15 October</time>
            </p>
            <h1 className="student-page-title">Assignments</h1>
          </div>
          <nav aria-label="Browse coursework">
            <Link href="/student/quizzes">
              <ListChecks size={17} strokeWidth={1.8} aria-hidden="true" /> All
              quizzes
            </Link>
            <Link href="/student/projects">
              <FolderOpen size={17} strokeWidth={1.8} aria-hidden="true" /> All
              projects
            </Link>
          </nav>
        </header>
        <div className="work-board">
          <div className="work-active">
            <ActiveQuizCard />
            <UpcomingProjectCard />
          </div>
          <LatestFeedbackCard />
        </div>
      </main>
    </>
  );
}
