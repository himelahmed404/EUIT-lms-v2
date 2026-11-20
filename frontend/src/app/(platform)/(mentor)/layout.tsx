import { ConsoleShellRouted } from "@/components/shell/ConsoleShellRouted";
import { ConsoleHtmlClass } from "./ConsoleHtmlClass";

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConsoleHtmlClass />
      <ConsoleShellRouted role="mentor">{children}</ConsoleShellRouted>
    </>
  );
}
