import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "gold" | "blue" | "green" | "red" | "outline";
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
}

export default function Badge({
  variant = "default",
  size = "sm",
  children,
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-bg-tertiary text-text-secondary",
    gold: "bg-gold/20 text-gold border border-gold/30",
    blue: "bg-blue-card/20 text-blue-card border border-blue-card/30",
    green: "bg-emerald-card/20 text-emerald-card border border-emerald-card/30",
    red: "bg-rose-card/20 text-rose-card border border-rose-card/30",
    outline: "border border-border-default text-text-secondary",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
