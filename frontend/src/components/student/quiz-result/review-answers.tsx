import type { CSSProperties,ReactNode } from "react";
export type ReviewAnswer = {
  question: ReactNode;
  answer: ReactNode;
  answerStyle: CSSProperties;
  score: ReactNode;
};
export const reviewAnswers: ReviewAnswer[] = [
  {
    question: <>1. Which files must every WordPress theme have?</>,
    answer: <>index.php and style.css</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
  {
    question: (
      <>2. Which function is the right way to load a theme stylesheet?</>
    ),
    answer: <>wp_enqueue_style()</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
  {
    question: (
      <>
        3. For a single blog post, which template does WordPress look for first?
      </>
    ),
    answer: <>single.php</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
  {
    question: <>4. What does get_header() do?</>,
    answer: <>Loads the header.php template</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
  {
    question: <>5. Where do you register a navigation menu location?</>,
    answer: <>functions.php, with register_nav_menus()</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
  {
    question: <>6. What is &quot;The Loop&quot; used for?</>,
    answer: <>Showing posts from the current query</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
  {
    question: <>7. Which hook should you use to enqueue scripts?</>,
    answer: <>wp_enqueue_scripts</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
  {
    question: <>8. A child theme’s style.css needs which header line?</>,
    answer: <>Template: parent-folder-name</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
  {
    question: <>9. What does the_title() do?</>,
    answer: <>Prints the current post’s title</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
  {
    question: (
      <>10. Which file is the final fallback in the template hierarchy?</>
    ),
    answer: <>index.php</>,
    answerStyle: {
      fontWeight: "600",
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      color: "var(--ink)",
    },
    score: <>1 / 1</>,
  },
];
