import type { ReactNode } from "react";
export function ProfileCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="pf-card">
      <header>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}
