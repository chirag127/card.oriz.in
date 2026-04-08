import { useState, useMemo } from "react";
import type { CardData } from "@/types/card";

interface FuelSavingsCalculatorProps {
  allCards: CardData[];
}

function calculateFuelSavings(
  card: CardData,
  monthlySpend: number
): number {
  const fs = card.fuelSurcharge;
  if (!fs?.available) return 0;

  const waiver = fs.waiverPercent / 100;
  const typicalSurchargeRate = 0.025; // 2.5% typical fuel surcharge

  // Max waiver per cycle caps the savings
  const maxPerCycle = fs.maxWaiverPerCycle;
  const monthlySurcharge = monthlySpend * typicalSurchargeRate;
  const monthlyWaiver = Math.min(monthlySurcharge * waiver, maxPerCycle > 0 ? maxPerCycle : Infinity);

  return Math.round(monthlyWaiver * 12);
}

export default function FuelSavingsCalculator({
  allCards,
}: FuelSavingsCalculatorProps) {
  const [monthlySpend, setMonthlySpend] = useState(5000);

  const topFuelCards = useMemo(() => {
    return allCards
      .filter((c): c is CardData & { fuelSurcharge: NonNullable<CardData["fuelSurcharge"]> } => !!c.fuelSurcharge?.available)
      .map((card) => ({
        card,
        annualSavings: calculateFuelSavings(card, monthlySpend),
      }))
      .sort((a, b) => b.annualSavings - a.annualSavings)
      .slice(0, 5);
  }, [monthlySpend, allCards]);

  const bestFuelCard = topFuelCards[0];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border-default p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-text-primary mb-6">
          Fuel Savings Calculator
        </h2>

        {/* Input */}
        <div className="mb-8">
          <label className="block text-sm text-text-secondary mb-2">
            Monthly Fuel Spend (₹)
          </label>
          <input
            type="number"
            value={monthlySpend}
            onChange={(e) => setMonthlySpend(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-default text-text-primary text-sm focus:outline-none focus:border-gold/50"
          />
          <p className="text-xs text-text-tertiary mt-1">
            Typical fuel surcharge in India is 2.5% per transaction.
          </p>
        </div>

        {/* Summary */}
        {bestFuelCard && bestFuelCard.annualSavings > 0 && (
          <div className="rounded-xl bg-bg-primary border border-border-default p-4 text-center mb-8">
            <p className="text-xs text-text-tertiary mb-1">
              Best Annual Fuel Savings
            </p>
            <p className="text-3xl font-display font-bold text-emerald-card">
              ₹{bestFuelCard.annualSavings.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              with {bestFuelCard.card.name}
            </p>
          </div>
        )}

        {/* Top 5 Fuel Cards */}
        <div>
          <h3 className="font-semibold text-text-primary mb-4">
            Top 5 Fuel Cards by Savings
          </h3>
          {topFuelCards.length === 0 ? (
            <p className="text-sm text-text-tertiary">
              No fuel surcharge waiver cards found.
            </p>
          ) : (
            <div className="space-y-3">
              {topFuelCards.map(({ card, annualSavings }, i) => (
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
                    <p className="text-xs text-text-tertiary">
                      {card.fuelSurcharge?.waiverPercent}% waiver · ₹
                      {card.fuelSurcharge?.maxWaiverPerCycle?.toLocaleString(
                        "en-IN"
                      )}
                      /cycle cap
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className={`text-sm font-bold ${
                        annualSavings > 0
                          ? "text-emerald-card"
                          : "text-text-tertiary"
                      }`}
                    >
                      ₹{annualSavings.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-text-tertiary">/year</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
