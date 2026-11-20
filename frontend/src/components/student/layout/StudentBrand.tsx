import { BookOpen } from "lucide-react";
import Link from "next/link";
export function StudentBrand({ href }: { href: string }) {
  return (
    <Link
      className="brand flex items-center"
      href={href}
      aria-label="European IT Institute home"
    >
      <span className="brand-book">
        <BookOpen size={22} strokeWidth={1.8} aria-hidden="true" />
      </span>
      European IT
    </Link>
  );
}
