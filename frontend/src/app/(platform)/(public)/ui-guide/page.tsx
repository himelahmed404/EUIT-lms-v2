import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "UI guide · European IT LMS" };

export default function UiGuidePage() {
  return (
    <main id="main-content" tabIndex={-1} style={{ maxWidth: 960, margin: "0 auto", padding: 32 }}>
      <p>
        <Link href="/">← Log in</Link>
      </p>
      <h1 className="p-h1">UI guide</h1>
      <p className="p-body">
        The design-system reference (principles, icons, colour roles, component states) still lives in the static
        prototype. Components in this Next app reuse the same CSS classes from <code>eit.css</code>, <code>panel.css</code>,{" "}
        <code>app.css</code> and <code>console.css</code>.
      </p>
      <ul>
        <li>
          <Link href="/student/dashboard">Student dashboard</Link>
        </li>
        <li>
          <Link href="/mentor/dashboard">Mentor dashboard</Link>
        </li>
        <li>
          <Link href="/admin/overview">Admin overview</Link>
        </li>
      </ul>
    </main>
  );
}
