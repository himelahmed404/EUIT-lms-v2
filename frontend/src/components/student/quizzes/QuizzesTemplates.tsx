import { StudentTemplate } from "@/components/student/shared/StudentTemplate";
import { DesignModuleProgress } from "./DesignModuleProgress";
import { DesignQuizModules } from "./DesignQuizModules";
import { DesignQuizStats } from "./DesignQuizStats";
import { WordPressModuleProgress } from "./WordPressModuleProgress";
import { WordPressQuizModules } from "./WordPressQuizModules";
import { WordPressQuizStats } from "./WordPressQuizStats";
export function QuizzesTemplates() {
  return (
    <>
      <StudentTemplate
        data-state="course:1"
        data-region="[data-region=&#x27;course-1&#x27;]"
      >
        <DesignQuizStats />
      </StudentTemplate>
      <StudentTemplate
        data-state="course:1"
        data-region="[data-region=&#x27;course-2&#x27;]"
      >
        <DesignModuleProgress />
      </StudentTemplate>
      <StudentTemplate
        data-state="course:1"
        data-region="[data-region=&#x27;course-3&#x27;]"
      >
        <DesignQuizModules />
      </StudentTemplate>
      <StudentTemplate
        data-state="course:0"
        data-region="[data-region=&#x27;course-1&#x27;]"
      >
        <WordPressQuizStats />
      </StudentTemplate>
      <StudentTemplate
        data-state="course:0"
        data-region="[data-region=&#x27;course-2&#x27;]"
      >
        <WordPressModuleProgress animate={false} />
      </StudentTemplate>
      <StudentTemplate
        data-state="course:0"
        data-region="[data-region=&#x27;course-3&#x27;]"
      >
        <WordPressQuizModules />
      </StudentTemplate>
    </>
  );
}
