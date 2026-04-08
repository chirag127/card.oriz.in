import { cn } from "@/lib/utils";

interface CardCompareButtonProps {
  isInCompare: boolean;
  onToggle: () => void;
  className?: string;
}

export default function CardCompareButton({
  isInCompare,
  onToggle,
  className,
}: CardCompareButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "px-3 py-1.5 text-xs font-medium rounded-lg border transition-all",
        isInCompare
          ? "border-gold text-gold bg-gold/10"
          : "border-border-default text-text-secondary hover:text-gold hover:border-gold/50",
        className
      )}
    >
      {isInCompare ? "✓ In Compare" : "+ Compare"}
    </button>
  );
}
