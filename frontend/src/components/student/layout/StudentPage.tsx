import { StudentBrand } from "./StudentBrand";
import { StudentHeader } from "./StudentHeader";
import { StudentInteractions } from "./StudentInteractions";

type Props = { slug: string; legacy?: boolean; children: React.ReactNode };

export function StudentPage({ slug, legacy = false, children }: Props) {
  const account =
    slug === "login" || slug === "forgot-password" || slug === "verify-email";
  return (
    <>
      {legacy && (
        <link rel="stylesheet" href="/student-assets/learning-pages.css" />
      )}
      <link rel="stylesheet" href="/student-assets/portal.css" />
      <div
        data-student-page={slug}
        className={`app-shell ${slug === "dashboard" ? "home-shell" : "inner-shell"}`}
      >
        {account ? (
          <header className="masthead">
            <StudentBrand href="/student/login" />
          </header>
        ) : (
          <StudentHeader slug={slug} />
        )}
        <div
          id="content"
          tabIndex={-1}
          className={legacy ? "legacy-content" : "portal-content"}
        >
          {children}
        </div>
      </div>
      <StudentInteractions slug={slug} legacy={legacy} account={account} />
    </>
  );
}
