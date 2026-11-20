import Image from "next/image";
import { AssistantAgenda } from "./AssistantAgenda";
import { Conversation } from "./Conversation";
export function AssistantScreen() {
  return (
    <>
      <main className="assistant-workspace">
        <header data-motion-intro="" className="assistant-intro">
          <div className="milo-scene" aria-hidden="true">
            <i className="orbit orbit-far" />
            <i className="orbit orbit-near" />
            <span className="star star-one">✦</span>
            <span className="star star-two">✦</span>
            <Image
              width={104}
              height={100}
              className="milo-portrait"
              src="/student-assets/milo.svg"
              alt=""
            />
          </div>
          <div className="intro-copy">
            <h1>Study assistant</h1>
            <p>
              Ask Milo about your lessons, upcoming classes, and project
              deadlines.
            </p>
          </div>
        </header>
        <Conversation />
        <AssistantAgenda />
      </main>
    </>
  );
}
