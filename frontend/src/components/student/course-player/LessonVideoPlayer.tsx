import { DemoLesson } from "@/content/student/demo-course-data";

type Props = {
  lesson: DemoLesson;
};

export function LessonVideoPlayer({ lesson }: Props) {
  return (
    <section
      data-motion-intro=""
      data-player=""
      aria-label="Video player"
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        borderRadius: "var(--radius-lg)",
        background: "#0a1b2c",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        color: "#ffffff",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        className="p-row"
        style={{
          padding: "10px 16px",
          justifyContent: "space-between",
          background: "rgba(10, 27, 44, 0.95)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: "var(--on-ink-2)",
          }}
        >
          {lesson.moduleTitle} · LESSON {lesson.number}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--cyan)",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          DEMO COURSE · YOUTUBE STREAM
        </span>
      </div>
      <div
        style={{
          position: "relative",
          flex: 1,
          width: "100%",
          height: "100%",
          background: "#000000",
        }}
      >
        <iframe
          key={lesson.youtubeId}
          src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </div>
    </section>
  );
}
