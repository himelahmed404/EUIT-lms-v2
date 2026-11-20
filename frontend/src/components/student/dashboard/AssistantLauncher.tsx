import { ArrowUp,ArrowUpRight,MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AssistantLauncher() {
  return (
    <section
      className="widget assistant-launcher"
      aria-labelledby="launcher-title"
    >
      <div className="launcher-title">
        <Image
          width={104}
          height={100}
          className="launcher-milo"
          src="/student-assets/milo.svg"
          alt=""
        />
        <h2 id="launcher-title">Study assistant</h2>
        <Link
          href="/student/assistant"
          className="launcher-link"
          aria-label="Open study assistant"
        >
          Open chat{" "}
          <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
      <form
        className="launcher-composer"
        action="/student/assistant"
        method="get"
      >
        <MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" />
        <input
          name="q"
          aria-label="Ask the study assistant"
          placeholder="Ask Milo about your courses…"
          required
          maxLength={300}
        />
        <button
          type="submit"
          className="send-question"
          aria-label="Send question"
        >
          <ArrowUp size={20} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}
