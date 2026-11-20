import Link from "next/link";

export function HelpQuickLinks() {
  return (
    <section
      className="p-card"
      aria-labelledby="links-title"
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <h2 id="links-title" className="p-h3">
        Quick links
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",
          gap: "8px",
        }}
      >
        <Link
          className="p-ghostbtn"
          href="/student/quizzes"
          style={{ justifyContent: "flex-start" }}
        >
          Quizzes
        </Link>
        <Link
          className="p-ghostbtn"
          href="/student/projects"
          style={{ justifyContent: "flex-start" }}
        >
          Projects
        </Link>
        <Link
          className="p-ghostbtn"
          href="/student/routine"
          style={{ justifyContent: "flex-start" }}
        >
          Recordings
        </Link>
        <Link
          className="p-ghostbtn"
          href="/student/payments"
          style={{ justifyContent: "flex-start" }}
        >
          Payments
        </Link>
      </div>
    </section>
  );
}
