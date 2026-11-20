import { BasicsModuleToggleTemplate } from "./BasicsModuleToggleTemplate";
import { ColourModuleToggleTemplate } from "./ColourModuleToggleTemplate";
import { DesignBasicsToggleTemplate } from "./DesignBasicsToggleTemplate";
import { QuizzesTemplates } from "./QuizzesTemplates";
import { TemplatesModuleToggleTemplate } from "./TemplatesModuleToggleTemplate";
import { ThemeModuleToggleTemplate } from "./ThemeModuleToggleTemplate";
import { WordPressModuleProgress } from "./WordPressModuleProgress";
import { WordPressQuizModules } from "./WordPressQuizModules";
import { WordPressQuizStats } from "./WordPressQuizStats";
export function QuizzesScreen() {
  return (
    <>
      <main className="p-main">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              maxWidth: "660px",
            }}
          >
            <h1 className="student-page-title p-h1">Quizzes</h1>
            <p className="p-body">
              A short quiz opens after every class. Take each one to unlock the
              next module. Get every answer right to unlock the next module.
            </p>
          </div>
          <div className="p-seg" role="group" aria-label="Course">
            <button
              type="button"
              aria-pressed="true"
              data-part-of="course"
              data-part="0"
              data-value="0"
            >
              WordPress · B14
            </button>
            <button
              type="button"
              aria-pressed="false"
              data-part-of="course"
              data-part="0"
              data-value="1"
            >
              Graphic Design · B9
            </button>
          </div>
        </div>
        <WordPressQuizStats />
        <WordPressModuleProgress />
        <WordPressQuizModules />
      </main>
      <ThemeModuleToggleTemplate />
      <TemplatesModuleToggleTemplate />
      <BasicsModuleToggleTemplate />
      <QuizzesTemplates />

      <ColourModuleToggleTemplate />
      <DesignBasicsToggleTemplate />
    </>
  );
}
