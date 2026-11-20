import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "ui-badge-default border-transparent bg-primary text-primary-foreground",
    secondary: "ui-badge-secondary border-transparent bg-secondary text-secondary-foreground",
    destructive: "ui-badge-destructive border-transparent bg-destructive text-destructive-foreground",
    outline: "ui-badge-outline text-foreground border-border",
    success: "ui-badge-success border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    warning: "ui-badge-warning border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400",
  }[variant];

  return (
    <div
      className={cn(
        "ui-badge inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantClasses,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
