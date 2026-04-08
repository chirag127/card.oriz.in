import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children: ReactNode;
  className?: string;
}

export default function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span className={cn("relative group inline-flex", className)}>
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-bg-elevated text-text-primary rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 border border-border-default">
        {content}
      </span>
    </span>
  );
}
