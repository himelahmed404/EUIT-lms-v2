import { ColourModuleQuizzes } from "./ColourModuleQuizzes";
import { DesignBasicsQuizzes } from "./DesignBasicsQuizzes";
export function DesignQuizModules() {
  return (
    <div
      className="p-stagger"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      data-region="course-3"
    >
      <ColourModuleQuizzes />
      <DesignBasicsQuizzes />
    </div>
  );
}
