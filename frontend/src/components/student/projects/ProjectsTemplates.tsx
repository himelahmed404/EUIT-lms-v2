import { StudentTemplate } from "@/components/student/shared/StudentTemplate";
import { AllProjectsTemplateContent } from "./AllProjectsTemplateContent";
import { GradedProjects } from "./GradedProjects";
import { PendingProjects } from "./PendingProjects";
import { SubmittedProjects } from "./SubmittedProjects";
export function ProjectsTemplates() {
  return (
    <>
      <StudentTemplate
        data-state="filtered:0"
        data-region="[data-region=&#x27;filtered-1&#x27;]"
      >
        <span className="p-small" data-region="filtered-1">
          5 projects
        </span>
      </StudentTemplate>
      <StudentTemplate
        data-state="filtered:0"
        data-region="[data-region=&#x27;filtered-2&#x27;]"
      >
        <AllProjectsTemplateContent />
      </StudentTemplate>
      <StudentTemplate
        data-state="filtered:1"
        data-region="[data-region=&#x27;filtered-1&#x27;]"
      >
        <span className="p-small" data-region="filtered-1">
          2 projects
        </span>
      </StudentTemplate>
      <StudentTemplate
        data-state="filtered:1"
        data-region="[data-region=&#x27;filtered-2&#x27;]"
      >
        <PendingProjects />
      </StudentTemplate>
      <StudentTemplate
        data-state="filtered:2"
        data-region="[data-region=&#x27;filtered-1&#x27;]"
      >
        <span className="p-small" data-region="filtered-1">
          2 projects
        </span>
      </StudentTemplate>
      <StudentTemplate
        data-state="filtered:2"
        data-region="[data-region=&#x27;filtered-2&#x27;]"
      >
        <SubmittedProjects />
      </StudentTemplate>
      <StudentTemplate
        data-state="filtered:3"
        data-region="[data-region=&#x27;filtered-1&#x27;]"
      >
        <span className="p-small" data-region="filtered-1">
          1 project
        </span>
      </StudentTemplate>
      <StudentTemplate
        data-state="filtered:3"
        data-region="[data-region=&#x27;filtered-2&#x27;]"
      >
        <GradedProjects />
      </StudentTemplate>
    </>
  );
}
