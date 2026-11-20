import { StudentIcon } from "@/components/student/shared/StudentIcon";

export function HelpContact() {
  return (
    <section
      className="p-card"
      aria-labelledby="talk-title"
      style={{ display: "flex", flexDirection: "column", gap: "6px" }}
    >
      <h2 id="talk-title" className="p-h3">
        Still stuck? Talk to us
      </h2>
      <p className="p-small" style={{ margin: "0px 0px 8px" }}>
        Tell us your student ID, EIT-24-0148, so we can find you quickly.
      </p>
      <ul className="p-rows" style={{ margin: "0px -12px" }}>
        <li>
          <span className="p-tile p-tile--green">
            <StudentIcon width="20" height="20">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </StudentIcon>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "15px" }}>WhatsApp</strong>
            <span className="p-small">Fastest way to reach support</span>
          </span>
          <a className="p-link" href="#">
            Chat
          </a>
        </li>
        <li>
          <span className="p-tile">
            <StudentIcon width="20" height="20">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </StudentIcon>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "15px" }}>Call us</strong>
            <span className="p-small">[SUPPORT PHONE]</span>
          </span>
          <a className="p-link" href="#">
            Call
          </a>
        </li>
        <li>
          <span className="p-tile p-tile--amber">
            <StudentIcon width="20" height="20">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </StudentIcon>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "15px" }}>Visit the campus</strong>
            <span className="p-small">Front desk, Mirpur-10</span>
          </span>
          <a className="p-link" href="#">
            Map
          </a>
        </li>
      </ul>
    </section>
  );
}
