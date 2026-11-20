import { LogoRedesignProjectCard } from "./LogoRedesignProjectCard";
import { PortfolioProjectCard } from "./PortfolioProjectCard";
import { ResponsiveLandingProjectCard } from "./ResponsiveLandingProjectCard";
import { SocialMediaProjectCard } from "./SocialMediaProjectCard";
import { ThemeProjectCard } from "./ThemeProjectCard";
export function AllProjects() {
  return (
    <section
      data-motion-intro=""
      className="p-stagger"
      aria-label="Your projects"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      data-region="filtered-2"
    >
      <SocialMediaProjectCard />
      <ResponsiveLandingProjectCard />
      <LogoRedesignProjectCard />
      <PortfolioProjectCard />
      <ThemeProjectCard />
    </section>
  );
}
