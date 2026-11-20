import { LogoRedesignProjectCard } from "./LogoRedesignProjectCard";
import { ResponsiveLandingProjectCard } from "./ResponsiveLandingProjectCard";
export function SubmittedProjects() {
  return (
    <section
      className="p-stagger"
      aria-label="Your projects"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      data-region="filtered-2"
    >
      <ResponsiveLandingProjectCard />
      <LogoRedesignProjectCard />
    </section>
  );
}
