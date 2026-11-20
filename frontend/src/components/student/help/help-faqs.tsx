import Link from "next/link";
import type { ReactNode } from "react";
import { StudentIcon } from "../shared/StudentIcon";
import { HelpFeedbackPrompt } from "./HelpFeedbackPrompt";
export type HelpFaq = {
  category: string;
  categoryLabel: string;
  question: ReactNode;
  targetId: string;
  lookId: string;
  expanded: boolean;
  answer: ReactNode;
};
export const helpFaqs: HelpFaq[] = [
  {
    category: "quizzes",
    categoryLabel: "Quizzes & points",
    question: <>How do I earn points?</>,
    targetId: "rv0",
    lookId: "rvlook1",
    expanded: true,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Leaderboard points come from your marked projects. Quizzes unlock the
          next module — take your time before you submit.
        </p>
        <Link className="p-link" href="/student/leaderboard">
          See your points
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "quizzes",
    categoryLabel: "Quizzes & points",
    question: <>When does a class quiz open?</>,
    targetId: "rv2",
    lookId: "rvlook3",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Right after each class ends, online or offline. You’ll get a
          notification. Take it soon while the class is fresh in your mind.
        </p>
        <Link className="p-link" href="/student/quizzes">
          Open quizzes
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "quizzes",
    categoryLabel: "Quizzes & points",
    question: <>Why is the next module locked?</>,
    targetId: "rv4",
    lookId: "rvlook5",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          You need to take every class quiz in a module before the next module
          opens. Your score doesn’t hold you back. Only a quiz you haven’t taken
          does.
        </p>
        <Link className="p-link" href="/student/quizzes">
          See which quizzes are left
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "quizzes",
    categoryLabel: "Quizzes & points",
    question: <>Can I retake a quiz?</>,
    targetId: "rv6",
    lookId: "rvlook7",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Yes, you can retake a quiz to practise. Points only come from your
          first try.
        </p>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "quizzes",
    categoryLabel: "Quizzes & points",
    question: <>What can I use my points for?</>,
    targetId: "rv8",
    lookId: "rvlook9",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Right now, late passes for milestone projects: 15 points buys 1 extra
          day, up to 3 days for each project. European IT will add more rewards
          later.
        </p>
        <Link className="p-link" href="/student/projects">
          Go to projects
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "quizzes",
    categoryLabel: "Quizzes & points",
    question: <>How is the leaderboard ranked?</>,
    targetId: "rv10",
    lookId: "rvlook11",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          By the points you’ve earned in that batch. Spending points on a late
          pass never moves you down. If two students have the same points,
          whoever got there first ranks higher. You can hide your name from
          classmates on the leaderboard.
        </p>
        <Link className="p-link" href="/student/leaderboard">
          Open the leaderboard
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "classes",
    categoryLabel: "Classes & recordings",
    question: <>Why can’t I open the next video?</>,
    targetId: "rv12",
    lookId: "rvlook13",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Videos open one at a time. Watch the current video to the end and the
          next one unlocks straight away.
        </p>
        <Link className="p-link" href="/student/course-player">
          Continue where you stopped
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "classes",
    categoryLabel: "Classes & recordings",
    question: <>Where is the recording of my class?</>,
    targetId: "rv14",
    lookId: "rvlook15",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Your mentor uploads the recording after every class, online or
          offline. Find it on Routine under the class date.
        </p>
        <Link className="p-link" href="/student/routine">
          Routine
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "classes",
    categoryLabel: "Classes & recordings",
    question: <>I missed a class. What should I do?</>,
    targetId: "rv16",
    lookId: "rvlook17",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Watch the recording, then take that class’s quiz so your next module
          still opens. The class still counts as absent, and you need 75%
          attendance for your certificate.
        </p>
        <Link className="p-link" href="/student/routine">
          Find the recording
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "projects",
    categoryLabel: "Projects",
    question: <>When do I submit a project?</>,
    targetId: "rv18",
    lookId: "rvlook19",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          There’s one project at the end of every milestone. Its due date is on
          the Projects page and in the project’s details.
        </p>
        <Link className="p-link" href="/student/projects">
          See your projects
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "projects",
    categoryLabel: "Projects",
    question: <>How do I submit a project?</>,
    targetId: "rv20",
    lookId: "rvlook21",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Open Projects and press Details on the project. Add your files or a
          link, then press Submit. Your mentor gets it straight away.
        </p>
        <Link className="p-link" href="/student/projects">
          Go to projects
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "projects",
    categoryLabel: "Projects",
    question: <>I need more time. Can I submit late?</>,
    targetId: "rv22",
    lookId: "rvlook23",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          After the due date the project closes. You can open it again with a
          late pass from the project’s details: 15 points per day, up to 3 days.
        </p>
        <Link className="p-link" href="/student/project-detail">
          Buy a late pass
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "projects",
    categoryLabel: "Projects",
    question: <>How is my project marked?</>,
    targetId: "rv24",
    lookId: "rvlook25",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Your mentor marks it out of 100 using the rubric in the project’s
          details, and leaves feedback. Marks usually arrive within 3 days, with
          a notification and an SMS.
        </p>
        <Link className="p-link" href="/student/project-feedback">
          See marked feedback
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "payments",
    categoryLabel: "Payments & installments",
    question: <>How do I pay my next installment?</>,
    targetId: "rv26",
    lookId: "rvlook27",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Go to Payments and press Pay now. You pay on SSLCommerz’s secure page
          with bKash, Nagad, Rocket or a card. Your receipt shows straight
          after.
        </p>
        <Link className="p-link" href="/student/payments">
          Go to payments
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "payments",
    categoryLabel: "Payments & installments",
    question: <>What happens if I miss an installment?</>,
    targetId: "rv28",
    lookId: "rvlook29",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          If an installment is 7 days late, your course access pauses. Your
          progress and points are kept. Pay the installment and access opens
          again.
        </p>
        <Link className="p-link" href="/student/payments">
          Check your installments
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "payments",
    categoryLabel: "Payments & installments",
    question: <>Can I change my installment plan?</>,
    targetId: "rv30",
    lookId: "rvlook31",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Prices and installment plans are set by European IT. Talk to the
          support team if you need a different plan.
        </p>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "account",
    categoryLabel: "Account & login",
    question: <>How do I log in?</>,
    targetId: "rv32",
    lookId: "rvlook33",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Everyone logs in on the same page with their phone number and
          password. Your account was made when you paid at checkout.
        </p>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "account",
    categoryLabel: "Account & login",
    question: <>I forgot my password.</>,
    targetId: "rv34",
    lookId: "rvlook35",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          On the login page, choose Forgot password. Enter your phone number,
          type the 6-digit code we send by SMS, then choose a new password.
        </p>
        <Link className="p-link" href="/student/forgot-password">
          Reset my password
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "account",
    categoryLabel: "Account & login",
    question: <>Can I take two courses on one account?</>,
    targetId: "rv36",
    lookId: "rvlook37",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Yes. One account holds all your courses. On Quizzes and the
          Leaderboard, use the course switch at the top to move between them.
        </p>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "certificates",
    categoryLabel: "Certificates",
    question: <>How do I get my certificate?</>,
    targetId: "rv38",
    lookId: "rvlook39",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Finish every lesson, attend at least 75% of classes and get all 3
          milestone projects marked. Your certificate then unlocks on the
          Certificates page.
        </p>
        <Link className="p-link" href="/student/certificates">
          Check your progress
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
  {
    category: "certificates",
    categoryLabel: "Certificates",
    question: <>Can an employer check my certificate?</>,
    targetId: "rv40",
    lookId: "rvlook41",
    expanded: false,
    answer: (
      <>
        <p className="p-body" style={{ maxWidth: "620px" }}>
          Yes. Every certificate has an ID and a QR code. Anyone can check it at
          europeanit-inst.com/verify.
        </p>
        <Link className="p-link" href="/student/certificates">
          Your certificates
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <HelpFeedbackPrompt />
      </>
    ),
  },
];
