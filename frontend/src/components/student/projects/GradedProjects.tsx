import { PortfolioProjectCard } from "./PortfolioProjectCard";
export function GradedProjects() {
  return (
    <section
      className="p-stagger"
      aria-label="Your projects"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      data-region="filtered-2"
    >
      <PortfolioProjectCard />
    </section>
  );
}
