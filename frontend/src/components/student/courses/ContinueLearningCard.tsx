import { History,Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ContinueLearningCard() {
  return (
    <section
      data-motion-intro=""
      className="lesson-spotlight"
      aria-labelledby="current-lesson"
    >
      <Image
        unoptimized
        width={1000}
        height={667}
        className="lesson-art"
        src="/student-assets/colour-study.webp"
        alt=""
        priority
      />
      <div className="lesson-copy">
        <p className="lesson-label">
          <History size={16} strokeWidth={1.8} aria-hidden="true" /> Continue
          learning
        </p>
        <div className="lesson-heading">
          <p>
            Graphic Design <span> / </span> Lesson 7
          </p>
          <h2 id="current-lesson">Colour and contrast for social posts</h2>
        </div>
        <div className="lesson-controls">
          <Link className="lesson-resume" href="/student/course-player">
            <Play size={16} strokeWidth={1.8} aria-hidden="true" /> Resume
            lesson
          </Link>
          <span>6 min left</span>
        </div>
      </div>
    </section>
  );
}
