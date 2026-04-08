import type { CardData } from "@/types/card";
import { cn, getAnnualFee, getCardUrl } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface CardThumbnailProps {
  card: CardData;
  showCompare?: boolean;
  onCompareToggle?: () => void;
  isInCompare?: boolean;
}

export default function CardThumbnail({
  card,
  showCompare = true,
  onCompareToggle,
  isInCompare = false,
}: CardThumbnailProps) {
  const annualFee = getAnnualFee(card);
  const cardUrl = getCardUrl(card);

  const networkColors: Record<string, string> = {
    Visa: "bg-[#1A1F71]",
    Mastercard: "bg-[#EB001B]",
    RuPay: "bg-[#FF6600]",
    Amex: "bg-[#2E77BC]",
    DinersClub: "bg-[#004A97]",
  };

  return (
    <div className="group relative bg-bg-secondary border border-border-default rounded-xl overflow-hidden hover:border-border-bright transition-all duration-200 hover:shadow-xl hover:shadow-black/20">
      {/* Card Image */}
      <a href={cardUrl} className="block">
        <div className="relative aspect-[1.586/1] bg-bg-tertiary overflow-hidden">
          <div
            className="card-3d w-full h-full flex items-center justify-center p-6"
            style={{
              background: `linear-gradient(135deg, ${card.gradientColors[0]}, ${card.gradientColors[1]})`,
            }}
          >
            <span className="text-white/90 font-display text-lg font-bold text-center drop-shadow-lg">
              {card.bank}
            </span>
          </div>
          {/* Network badge */}
          <div className="absolute top-3 right-3">
            <span
              className={cn(
                "inline-flex items-center px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider",
                networkColors[card.network] ?? "bg-bg-tertiary"
              )}
            >
              {card.network}
            </span>
          </div>
        </div>
      </a>

      {/* Content */}
      <div className="p-4">
        <a href={cardUrl}>
          <h3 className="font-semibold text-sm text-text-primary group-hover:text-gold transition-colors line-clamp-2 leading-snug">
            {card.name}
          </h3>
        </a>
        <p className="text-xs text-text-tertiary mt-1">{card.bank}</p>

        {/* Annual fee */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            {annualFee === 0 ? (
              <span className="text-emerald-card font-medium">No Annual Fee</span>
            ) : (
              <>₹{annualFee.toLocaleString("en-IN")}/yr</>
            )}
          </span>
          {card.value.averageValue > 0 && (
            <span className="text-xs text-gold font-mono font-medium">
              ₹{card.value.averageValue.toLocaleString("en-IN")}/yr value
            </span>
          )}
        </div>

        {/* Top benefits */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {card.benefits.slice(0, 3).map((b, i) => (
            <Badge key={i} variant="outline" size="sm">
              {b.title.length > 20 ? b.title.slice(0, 20) + "..." : b.title}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <a
            href={cardUrl}
            className="flex-1 text-center px-3 py-2 text-xs font-medium text-gold border border-gold/30 rounded-lg hover:bg-gold/10 transition-colors"
          >
            View Details
          </a>
          {card.applyUrl && (
            <a
              href={card.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 text-xs font-medium text-bg-primary bg-gold rounded-lg hover:bg-gold-2 transition-colors"
            >
              Apply Now ↗
            </a>
          )}
        </div>

        {/* Compare checkbox */}
        {showCompare && (
          <button
            onClick={onCompareToggle}
            className={cn(
              "mt-2 w-full py-1.5 text-xs rounded-lg border transition-colors",
              isInCompare
                ? "border-gold text-gold bg-gold/10"
                : "border-border-default text-text-tertiary hover:text-text-secondary hover:border-border-bright"
            )}
          >
            {isInCompare ? "✓ In Compare" : "+ Add to Compare"}
          </button>
        )}
      </div>
    </div>
  );
}
