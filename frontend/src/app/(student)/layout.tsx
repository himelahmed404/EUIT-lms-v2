import { AuthProvider, AccessGate } from "@/components/account/auth-provider";
import type { Metadata,Viewport } from "next";
export const metadata: Metadata = {
  icons: { icon: "/student-assets/book.svg" },
};
export const viewport: Viewport = { themeColor: "#f5f5f5" };
export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="is-student" data-theme="light">
      <body className="portal-body" data-role="student">
        <AuthProvider><AccessGate>{children}</AccessGate></AuthProvider>
      </body>
    </html>
  );
}
