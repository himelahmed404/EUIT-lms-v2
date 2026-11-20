import { SocialMediaProjectCard } from "./SocialMediaProjectCard";
import { ThemeProjectCard } from "./ThemeProjectCard";
export function PendingProjects() {
  return (
    <section
      className="p-stagger"
      aria-label="Your projects"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      data-region="filtered-2"
    >
      <SocialMediaProjectCard />
      <ThemeProjectCard />
    </section>
  );
}
