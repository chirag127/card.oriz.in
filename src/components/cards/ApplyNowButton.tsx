import type { CardData } from "@/types/card";
import { cn } from "@/lib/utils";

interface ApplyNowButtonProps {
  card: CardData;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ApplyNowButton({
  card,
  size = "md",
  className,
}: ApplyNowButtonProps) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  if (!card.applyUrl) {
    return (
      <span className={cn("text-text-tertiary text-xs", className)}>
        Apply link unavailable
      </span>
    );
  }

  const url = new URL(card.applyUrl);
  url.searchParams.set("utm_source", "card.oriz.in");
  url.searchParams.set("utm_medium", "affiliate");
  url.searchParams.set("utm_campaign", card.id);

  return (
    <a
      href={url.toString()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-lg bg-gold text-bg-primary hover:bg-gold-2 transition-all shadow-lg shadow-gold/20",
        sizes[size],
        className
      )}
    >
      Apply Now
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}
