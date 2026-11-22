import { StudentShellRouted } from "@/components/student/layout/StudentShellRouted";

export default function StudentSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentShellRouted>{children}</StudentShellRouted>;
}
