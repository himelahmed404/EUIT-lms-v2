import { NotFoundView } from "@/components/common/NotFoundView";
import "@/app/globals.css";

export const metadata = {
  title: "404 - Page Not Found · European IT Institute",
  description: "The requested page could not be found.",
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/student-assets/book.svg" />
      </head>
      <body style={{ margin: 0, backgroundColor: "#f8fafc" }}>
        <NotFoundView portal="general" />
      </body>
    </html>
  );
}
