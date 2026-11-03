import type { Metadata } from "next";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { UiProvider } from "@/components/providers/UiProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "European IT LMS",
  description: "European IT Institute learning portal — student, mentor and admin panels.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="eit-skip" href="#main-content">
          Skip to main content
        </a>
        <ThemeScript />
        <ToastProvider>
          <UiProvider>{children}</UiProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
