import { NotFoundView } from "@/components/common/NotFoundView";

export const metadata = {
  title: "404 - Page Not Found · European IT Institute",
  description: "The requested page could not be found.",
};

export default function PlatformNotFound() {
  return <NotFoundView portal="general" />;
}
