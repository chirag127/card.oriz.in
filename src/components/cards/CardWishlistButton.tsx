import { cn } from "@/lib/utils";

interface CardWishlistButtonProps {
  isInWishlist: boolean;
  onToggle: () => void;
  className?: string;
}

export default function CardWishlistButton({
  isInWishlist,
  onToggle,
  className,
}: CardWishlistButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "p-2 rounded-lg transition-all",
        isInWishlist
          ? "text-rose-card bg-rose-card/10"
          : "text-text-tertiary hover:text-rose-card hover:bg-rose-card/10",
        className
      )}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        className="w-5 h-5"
        fill={isInWishlist ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
