"use client";
import {
ArrowUp,
ArrowUpRight,
BookOpen,
CalendarDays,
ListChecks,
MessagesSquare,
PenSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect,useRef,useState } from "react";
function answerFor(question: string) {
  if (/project|deadline|assignment|due/i.test(question)) {
    return [
      "Your next Graphic Design project is the social media post set. Submit it by Tuesday, 27 October at 11:59 PM.",
      "Open project brief",
      "/student/project-detail",
    ];
  }
  if (/class|schedule|week|when/i.test(question)) {
    return [
      "Your next WordPress class is on Monday, 19 October at 7 PM. Meet in Lab 2 at Mirpur-10 for Class 13, on navigation menus.",
      "Open schedule",
      "/student/routine",
    ];
  }
  if (/quiz/i.test(question)) {
    return [
      "The Class 12 WordPress quiz is open. It covers building a custom header.",
      "Open quizzes",
      "/student/quizzes",
    ];
  }
  if (/progress/i.test(question)) {
    return [
      "You’ve completed 7 of 40 Graphic Design lessons and 23 of 54 Web Development lessons. Your Digital Marketing course is complete.",
      "Open my courses",
      "/student/courses",
    ];
  }
  if (/course|learn|study|lesson|next/i.test(question)) {
    return [
      "Pick up where you left off in Graphic Design. Your next lesson covers colour and contrast for social posts.",
      "Continue lesson",
      "/student/course-player",
    ];
  }
  return [
    "I can help with your courses, class schedule and project deadlines. For detailed feedback on your work, you can ask your mentor.",
    "My questions",
    "/student/questions",
  ];
}

function makeTurn(question: string) {
  const [answer, label, href] = answerFor(question);
  return { question, answer, label, href };
}
export function Conversation() {
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<ReturnType<typeof makeTurn>[]>([]);
  const input = useRef<HTMLTextAreaElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initial = new URLSearchParams(location.search)
      .get("q")
      ?.trim()
      .slice(0, 300);
    if (initial) setTurns([makeTurn(initial)]);
  }, []);
  useEffect(() => {
    const el = input.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 112) + "px";
    }
  }, [draft]);
  useEffect(() => {
    if (thread.current)
      thread.current.scrollTop = turns.length ? thread.current.scrollHeight : 0;
  }, [turns]);
  function post(text: string) {
    const question = text.trim().slice(0, 300);
    if (!question) return;
    setTurns((current) => [...current, makeTurn(question)]);
    setDraft("");
    input.current?.focus({ preventScroll: true });
  }
  function reset() {
    setTurns([]);
    setDraft("");
    const url = new URL(location.href);
    url.searchParams.delete("q");
    history.replaceState(history.state, "", url);
    input.current?.focus({ preventScroll: true });
  }
  return (
    <section
      data-motion-intro=""
      className="conversation"
      aria-labelledby="conversation-title"
    >
      <header className="conversation-top">
        <div className="conversation-name">
          <span className="conversation-icon">
            <MessagesSquare size={20} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <h2 id="conversation-title">Chat with Milo</h2>
        </div>
        <button
          type="button"
          id="new-chat"
          className="new-chat"
          disabled={!turns.length}
          onClick={reset}
        >
          <PenSquare size={16} strokeWidth={1.8} aria-hidden="true" /> New chat
        </button>
      </header>
      <div
        className="conversation-scroll"
        ref={thread}
        tabIndex={0}
        aria-label="Conversation"
      >
        <section
          id="chat-welcome"
          className="chat-welcome"
          hidden={turns.length > 0}
        >
          <h3>How can I help, Nusrat?</h3>
          <p>Start with a question or write your own.</p>
          <div className="prompt-options">
            <button
              type="button"
              data-motion-card=""
              className="prompt-card"
              data-prompt="What should I study next?"
              onClick={() => post("What should I study next?")}
            >
              <span data-motion-detail="" className="prompt-mark">
                <BookOpen size={21} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>What should I study next?</span>
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              data-motion-card=""
              className="prompt-card"
              data-prompt="When is my next class?"
              onClick={() => post("When is my next class?")}
            >
              <span data-motion-detail="" className="prompt-mark">
                <CalendarDays size={21} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>When is my next class?</span>
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              data-motion-card=""
              className="prompt-card"
              data-prompt="Which projects are due?"
              onClick={() => post("Which projects are due?")}
            >
              <span data-motion-detail="" className="prompt-mark">
                <ListChecks size={21} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>Which projects are due?</span>
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </section>
        <div
          id="messages"
          className="chat-messages"
          role="log"
          aria-label="Messages"
          aria-live="polite"
          aria-relevant="additions"
        >
          {turns.map((turn, index) => (
            <div data-motion-reveal="" className="chat-turn" key={index}>
              <div className="chat-user">
                <span className="sr-only">You: </span>
                <span data-question="">{turn.question}</span>
              </div>
              <div className="chat-answer">
                <Image
                  width={104}
                  height={100}
                  className="answer-avatar"
                  src="/student-assets/milo.svg"
                  alt=""
                />
                <div className="answer-copy">
                  <strong>Milo</strong>
                  <div className="chat-reply">
                    <p>{turn.answer}</p>
                    <Link href={turn.href}>
                      {turn.label}
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="conversation-bottom">
        <form
          id="chat-form"
          className="chat-composer"
          onSubmit={(e) => {
            e.preventDefault();
            post(draft);
          }}
        >
          <textarea
            ref={input}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                post(draft);
              }
            }}
            name="question"
            rows={1}
            aria-label="Your question"
            placeholder="Message Milo…"
            maxLength={300}
            required
          />
          <button
            className="send-question"
            type="submit"
            aria-label="Send question"
            disabled={!draft.trim()}
          >
            <ArrowUp size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </form>
        <p className="composer-hint">
          Enter to send <span aria-hidden="true">·</span> Shift + Enter for a
          new line
        </p>
      </div>
    </section>
  );
}
