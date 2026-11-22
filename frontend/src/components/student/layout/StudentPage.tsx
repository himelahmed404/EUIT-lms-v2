import { StudentInteractions } from "./StudentInteractions";

type Props = { slug: string; legacy?: boolean; children: React.ReactNode };

export function StudentPage({ slug, legacy = false, children }: Props) {
  const account =
    slug === "login" || slug === "forgot-password" || slug === "verify-email";
  return (
    <>
      <div
        id="content"
        tabIndex={-1}
        className={legacy ? "legacy-content" : "portal-content"}
      >
        {children}
      </div>
      <StudentInteractions slug={slug} legacy={legacy} account={account} />
    </>
  );
}
