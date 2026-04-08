import { useState, useMemo } from "react";
import type { CardData } from "@/types/card";

interface RewardsCalculatorProps {
  allCards: CardData[];
}

const categories = [
  { key: "dining", label: "Dining" },
  { key: "travel", label: "Travel" },
  { key: "groceries", label: "Groceries" },
  { key: "fuel", label: "Fuel" },
  { key: "online", label: "Online Shopping" },
  { key: "other", label: "Other" },
] as const;

type SpendKey = (typeof categories)[number]["key"];

function estimateAnnualRewards(
  card: CardData,
  monthlySpend: Record<SpendKey, number>
): number {
  const totalMonthly = Object.values(monthlySpend).reduce((s, v) => s + v, 0);
  const annualSpend = totalMonthly * 12;

  if (annualSpend === 0) return 0;

  const baseRate = (card.rewardProgram?.effectiveCashbackPercent ?? 0) / 100;

  let bonusTotal = 0;
  const bonusCategories = card.rewardProgram?.bonusCategories ?? [];

  for (const bonus of bonusCategories) {
    const cat = bonus.category.toLowerCase();
    let monthlyAmount = 0;
    if (cat.includes("dining") || cat.includes("food"))
      monthlyAmount += monthlySpend.dining;
    if (cat.includes("travel")) monthlyAmount += monthlySpend.travel;
    if (cat.includes("grocer") || cat.includes("supermarket"))
      monthlyAmount += monthlySpend.groceries;
    if (cat.includes("fuel")) monthlyAmount += monthlySpend.fuel;
    if (cat.includes("online") || cat.includes("ecommerce"))
      monthlyAmount += monthlySpend.online;

    if (monthlyAmount > 0) {
      const extraRate =
        ((bonus.multiplier - 1) * (card.rewardProgram?.pointsPer100 ?? 0)) /
        100;
      bonusTotal += monthlyAmount * 12 * extraRate;
    }
  }

  const baseRewards = annualSpend * baseRate;
  return Math.round(baseRewards + bonusTotal);
}

export default function RewardsCalculator({ allCards }: RewardsCalculatorProps) {
  const [selectedCardId, setSelectedCardId] = useState(allCards[0]?.id ?? "");
  const [spend, setSpend] = useState<Record<SpendKey, number>>({
    dining: 5000,
    travel: 3000,
    groceries: 8000,
    fuel: 4000,
    online: 10000,
    other: 5000,
  });

  const creditCards = allCards.filter((c) => c.cardType === "credit");

  const selectedCard = creditCards.find((c) => c.id === selectedCardId);

  const selectedRewards = useMemo(() => {
    if (!selectedCard) return 0;
    return estimateAnnualRewards(selectedCard, spend);
  }, [selectedCard, spend]);

  const totalMonthly = Object.values(spend).reduce((s, v) => s + v, 0);
  const totalAnnual = totalMonthly * 12;

  const topCards = useMemo(() => {
    return creditCards
      .map((card) => ({
        card,
        annualRewards: estimateAnnualRewards(card, spend),
      }))
      .sort((a, b) => b.annualRewards - a.annualRewards)
      .slice(0, 5);
  }, [spend, creditCards]);

  function updateSpend(key: SpendKey, value: number) {
    setSpend((prev) => ({ ...prev, [key]: Math.max(0, value) }));
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border-default p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-text-primary mb-6">
          Rewards Value Calculator
        </h2>

        {/* Spend Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {categories.map((cat) => (
            <div key={cat.key}>
              <label className="block text-xs text-text-secondary mb-1.5">
                {cat.label} (₹/mo)
              </label>
              <input
                type="number"
                value={spend[cat.key]}
                onChange={(e) =>
                  updateSpend(cat.key, Number(e.target.value))
                }
                className="w-full px-3 py-2.5 rounded-xl bg-bg-tertiary border border-border-default text-text-primary text-sm focus:outline-none focus:border-gold/50"
              />
            </div>
          ))}
        </div>

        {/* Card Selector */}
        <div className="mb-6">
          <label className="block text-sm text-text-secondary mb-2">
            Select a Card
          </label>
          <select
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-default text-text-primary text-sm focus:outline-none focus:border-gold/50"
          >
            {creditCards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.name} ({card.bank})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Card Result */}
        {selectedCard && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl bg-bg-primary border border-border-default p-4 text-center">
              <p className="text-xs text-text-tertiary mb-1">Annual Points Value</p>
              <p className="text-xl font-display font-bold text-gold">
                ₹{selectedRewards.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl bg-bg-primary border border-border-default p-4 text-center">
              <p className="text-xs text-text-tertiary mb-1">Annual Spend</p>
              <p className="text-xl font-display font-bold text-text-primary">
                ₹{totalAnnual.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl bg-bg-primary border border-border-default p-4 text-center">
              <p className="text-xs text-text-tertiary mb-1">Effective Cashback</p>
              <p className="text-xl font-display font-bold text-emerald-card">
                {totalAnnual > 0
                  ? ((selectedRewards / totalAnnual) * 100).toFixed(1)
                  : "0.0"}
                %
              </p>
            </div>
          </div>
        )}

        {/* Top 5 */}
        <div>
          <h3 className="font-semibold text-text-primary mb-4">
            Top 5 Cards for Your Spend Pattern
          </h3>
          <div className="space-y-3">
            {topCards.map(({ card, annualRewards }, i) => (
              <a
                key={card.id}
                href={`/credit-cards/${card.id}`}
                className="group flex items-center gap-4 p-3 rounded-xl bg-bg-primary border border-border-default hover:border-gold/30 transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-xs font-bold text-gold shrink-0">
                  {i + 1}
                </span>
                <div
                  className="shrink-0 w-12 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${card.gradientColors[0]}, ${card.gradientColors[1]})`,
                  }}
                >
                  <span className="text-white/70 text-[9px] font-bold">
                    {card.bank.slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary group-hover:text-gold transition-colors truncate">
                    {card.name}
                  </p>
                  <p className="text-xs text-text-tertiary">{card.bank}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gold">
                    ₹{annualRewards.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-text-tertiary">/year</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
