import { NotFoundView } from "@/components/common/NotFoundView";

export const metadata = {
  title: "Page Not Found · Student Portal · European IT",
};

export default function StudentNotFound() {
  return <NotFoundView portal="student" />;
}
