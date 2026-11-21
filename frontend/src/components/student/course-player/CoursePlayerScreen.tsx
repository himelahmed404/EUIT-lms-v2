"use client";

import { useState } from "react";
import { CourseBookmark } from "@/components/student/shared/CourseBookmark";
import { CourseNotes } from "@/components/student/shared/CourseNotes";
import Link from "next/link";
import { CourseCurriculum } from "./CourseCurriculum";
import { LessonDiscussion } from "./LessonDiscussion";
import { LessonOverview } from "./LessonOverview";
import { LessonQuizPrompt } from "./LessonQuizPrompt";
import { LessonResources } from "./LessonResources";
import { LessonTabs } from "./LessonTabs";
import { LessonVideoPlayer } from "./LessonVideoPlayer";
import { DEMO_COURSE_LESSONS } from "@/content/student/demo-course-data";

export function CoursePlayerScreen() {
  const [activeLessonId, setActiveLessonId] = useState(
    DEMO_COURSE_LESSONS[0].id
  );

  const currentLessonIndex = DEMO_COURSE_LESSONS.findIndex(
    (l) => l.id === activeLessonId
  );
  const currentLesson =
    DEMO_COURSE_LESSONS[currentLessonIndex >= 0 ? currentLessonIndex : 0];

  const hasPrevious = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < DEMO_COURSE_LESSONS.length - 1;

  const handlePreviousLesson = () => {
    if (hasPrevious) {
      setActiveLessonId(DEMO_COURSE_LESSONS[currentLessonIndex - 1].id);
    }
  };

  const handleNextLesson = () => {
    if (hasNext) {
      setActiveLessonId(DEMO_COURSE_LESSONS[currentLessonIndex + 1].id);
    }
  };

  return (
    <main className="p-main">
      <nav
        aria-label="Breadcrumb"
        className="p-row"
        style={{
          gap: "8px",
          fontSize: "14px",
          color: "var(--ink-3)",
          flexWrap: "wrap",
        }}
      >
        <Link
          className="p-link"
          href="/student/courses"
          style={{ fontWeight: "500" }}
        >
          My courses
        </Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--ink-2)" }}>Demo Course Showcase</span>
      </nav>
      <div className="p-split">
        <div
          style={{
            flex: "2 1 600px",
            minWidth: "0px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <LessonVideoPlayer lesson={currentLesson} />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div className="p-row lesson-title-row">
              <h1 className="p-h1" style={{ fontSize: "26px" }}>
                {currentLesson.title}
              </h1>
              <CourseBookmark lesson="colour" />
            </div>
            <span className="p-muted">
              {currentLesson.subtitle} · Mentor: {currentLesson.mentor}
            </span>
          </div>
          <LessonQuizPrompt
            currentLesson={currentLesson}
            onPreviousLesson={handlePreviousLesson}
            onNextLesson={handleNextLesson}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
          />
          <LessonTabs />
          <LessonOverview lesson={currentLesson} />
          <LessonResources />
          <LessonDiscussion />
          <div
            role="tabpanel"
            id="lp-notes"
            aria-labelledby="lt-notes"
            hidden
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <CourseNotes source="colour" />
          </div>
        </div>
        <CourseCurriculum
          lessons={DEMO_COURSE_LESSONS}
          activeLessonId={activeLessonId}
          onSelectLesson={setActiveLessonId}
        />
      </div>
    </main>
  );
}
