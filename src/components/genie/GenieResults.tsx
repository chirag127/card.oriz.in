import type { CardData } from "@/types/card";

interface GenieResultsProps {
  cardIds: string[];
  allCards: CardData[];
}

export default function GenieResults({ cardIds, allCards }: GenieResultsProps) {
  const cards = cardIds
    .map((id) => allCards.find((c) => c.id === id))
    .filter((c): c is CardData => !!c);

  if (cards.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      <p className="text-sm text-text-secondary font-medium">Recommended Cards:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map((card) => (
          <a
            key={card.id}
            href={`/credit-cards/${card.id}`}
            className="group flex items-center gap-3 p-3 rounded-xl bg-bg-secondary border border-border-default hover:border-gold/30 transition-all"
          >
            <div
              className="shrink-0 w-14 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${card.gradientColors[0]}, ${card.gradientColors[1]})`,
              }}
            >
              <span className="text-white/70 text-[10px] font-bold">
                {card.bank.slice(0, 2)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-text-primary group-hover:text-gold transition-colors truncate">
                {card.name}
              </p>
              <p className="text-xs text-text-tertiary">{card.bank}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
