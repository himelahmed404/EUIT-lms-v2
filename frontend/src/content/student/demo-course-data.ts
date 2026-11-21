export interface DemoLesson {
  id: string;
  number: number;
  moduleIndex: number;
  moduleTitle: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  youtubeId: string;
  mentor: string;
  summary: string;
  takeaways: string[];
  notice: string;
}

export const DEMO_COURSE_LESSONS: DemoLesson[] = [
  {
    id: "demo-lesson-1",
    number: 1,
    moduleIndex: 1,
    moduleTitle: "MODULE 1 · FOUNDATIONS",
    title: "Lesson 1 · Course Introduction & Setup",
    subtitle: "Getting started with your learning environment and workflow",
    durationLabel: "Video · Lesson 1",
    youtubeId: "b-EP7QimkFo",
    mentor: "Nadia Rahman",
    summary:
      "Welcome to the course! In this introductory lesson, we outline the roadmap, walk through software setup, establish project standards, and get everything prepared for hands-on sessions.",
    takeaways: [
      "Understand the course structure, milestones, and grading criteria",
      "Configure your design and coding workspace with recommended tooling",
      "Learn best practices for reviewing video lessons, taking notes, and submitting questions",
    ],
    notice:
      "Watch this video to unlock Lesson 2. Complete each lesson in sequence to ensure a solid foundation.",
  },
  {
    id: "demo-lesson-2",
    number: 2,
    moduleIndex: 1,
    moduleTitle: "MODULE 1 · FOUNDATIONS",
    title: "Lesson 2 · Core Principles & Visual Hierarchy",
    subtitle: "Structuring layouts, spacing, and visual weight",
    durationLabel: "Video · Lesson 2",
    youtubeId: "U1v2xy_xUlY",
    mentor: "Nadia Rahman",
    summary:
      "Master the fundamental rules of visual hierarchy. Learn how contrast, scale, white space, and alignment guide the user's attention and communicate information clearly.",
    takeaways: [
      "Master layout grid alignment and visual rhythm",
      "Apply contrast ratios and spacing to establish intuitive content hierarchy",
      "Identify common structural mistakes and how to fix them efficiently",
    ],
    notice:
      "Complete this lesson to proceed to the practical implementation in Lesson 3.",
  },
  {
    id: "demo-lesson-3",
    number: 3,
    moduleIndex: 1,
    moduleTitle: "MODULE 1 · FOUNDATIONS",
    title: "Lesson 3 · Hands-on Implementation & Practice",
    subtitle: "Applying principles to real-world projects and client briefs",
    durationLabel: "Video · Lesson 3",
    youtubeId: "h_cSyDoAVHE",
    mentor: "Nadia Rahman",
    summary:
      "Putting everything together. In this session, we execute a realistic design and development brief from initial concept through to polished production deliverables.",
    takeaways: [
      "Translate a project brief into concrete design decisions",
      "Execute the project from wireframe to polished interactive asset",
      "Export production-ready files and prepare your work for mentor review",
    ],
    notice:
      "Finishing this lesson completes the initial module demonstration.",
  },
];
