import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const variantClasses = {
      default: "ui-button-default bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive: "ui-button-destructive bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline: "ui-button-outline border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary: "ui-button-secondary bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "ui-button-ghost hover:bg-accent hover:text-accent-foreground",
      link: "ui-button-link text-primary underline-offset-4 hover:underline",
    }[variant];

    const sizeClasses = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    }[size];

    const combinedClassName = cn(
      "ui-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      variantClasses,
      sizeClasses,
      className
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(combinedClassName, child.props?.className),
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
