import { ConsoleShellRouted } from "@/components/shell/ConsoleShellRouted";
import { ConsoleHtmlClass } from "../(mentor)/ConsoleHtmlClass";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConsoleHtmlClass />
      <ConsoleShellRouted role="admin">{children}</ConsoleShellRouted>
    </>
  );
}
