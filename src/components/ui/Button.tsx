import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gold text-bg-primary hover:bg-gold-2 shadow-lg shadow-gold/20",
    secondary: "border border-border-default text-text-primary hover:bg-bg-tertiary hover:border-border-bright",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary",
    danger: "bg-rose-card/20 text-rose-card border border-rose-card/30 hover:bg-rose-card/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
