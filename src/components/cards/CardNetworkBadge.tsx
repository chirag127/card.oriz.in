import type { CardNetwork } from "@/types/card";
import { cn } from "@/lib/utils";

interface CardNetworkBadgeProps {
  network: CardNetwork;
  size?: "sm" | "md";
  className?: string;
}

export default function CardNetworkBadge({
  network,
  size = "sm",
  className,
}: CardNetworkBadgeProps) {
  const colors: Record<string, string> = {
    Visa: "bg-[#1A1F71] text-white",
    Mastercard: "bg-gradient-to-r from-[#EB001B] to-[#F79E1B] text-white",
    RuPay: "bg-[#FF6600] text-white",
    Amex: "bg-[#2E77BC] text-white",
    DinersClub: "bg-[#004A97] text-white",
    Discover: "bg-[#FF6000] text-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-bold uppercase tracking-wider",
        colors[network] ?? "bg-bg-tertiary text-text-secondary",
        sizes[size],
        className
      )}
    >
      {network}
    </span>
  );
}
