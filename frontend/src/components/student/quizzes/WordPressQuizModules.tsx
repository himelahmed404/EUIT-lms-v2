import { TemplatesModuleQuizzes } from "./TemplatesModuleQuizzes";
import { ThemeModuleQuizzes } from "./ThemeModuleQuizzes";
import { WordPressBasicsQuizzes } from "./WordPressBasicsQuizzes";
export function WordPressQuizModules() {
  return (
    <div
      className="p-stagger"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      data-region="course-3"
    >
      <ThemeModuleQuizzes />
      <TemplatesModuleQuizzes />
      <WordPressBasicsQuizzes />
    </div>
  );
}
