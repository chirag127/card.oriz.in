import type { CardData } from "@/types/card";

export interface FilterOptions {
  cardType?: string[];
  network?: string[];
  bank?: string[];
  tier?: string[];
  category?: string[];
  feeRange?: string;
  benefits?: string[];
  creditScoreRange?: string;
  incomeRange?: string;
  material?: string[];
  sortBy?: string;
  searchQuery?: string;
}

export function filterCards(cards: CardData[], filters: FilterOptions): CardData[] {
  let result = [...cards];

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.bank.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q)
    );
  }

  if (filters.cardType?.length) {
    result = result.filter((c) => filters.cardType!.includes(c.cardType));
  }

  if (filters.network?.length) {
    result = result.filter((c) => filters.network!.includes(c.network));
  }

  if (filters.bank?.length) {
    result = result.filter((c) =>
      filters.bank!.some(
        (b) =>
          c.bankCode.toLowerCase() === b.toLowerCase() ||
          c.bank.toLowerCase().toLowerCase().includes(b.toLowerCase())
      )
    );
  }

  if (filters.tier?.length) {
    result = result.filter((c) => filters.tier!.includes(c.tier));
  }

  if (filters.category?.length) {
    result = result.filter((c) =>
      c.category ? filters.category!.includes(c.category) : false
    );
  }

  if (filters.feeRange) {
    result = result.filter((c) => {
      const fee = c.charges.find((ch) =>
        ch.label.toLowerCase().includes("annual")
      )?.amount ?? 0;
      switch (filters.feeRange) {
        case "free": return fee === 0;
        case "under500": return fee > 0 && fee < 500;
        case "500to2000": return fee >= 500 && fee < 2000;
        case "2000to5000": return fee >= 2000 && fee < 5000;
        case "above5000": return fee >= 5000;
        default: return true;
      }
    });
  }

  if (filters.material?.length) {
    result = result.filter((c) => filters.material!.includes(c.material));
  }

  return result;
}

export function sortCards(cards: CardData[], sortBy: string): CardData[] {
  const sorted = [...cards];
  switch (sortBy) {
    case "value-high":
      return sorted.sort((a, b) => b.value.averageValue - a.value.averageValue);
    case "fee-low":
      return sorted.sort((a, b) => {
        const feeA = a.charges.find((ch) => ch.label.toLowerCase().includes("annual"))?.amount ?? 0;
        const feeB = b.charges.find((ch) => ch.label.toLowerCase().includes("annual"))?.amount ?? 0;
        return feeA - feeB;
      });
    case "reward-high":
      return sorted.sort((a, b) => {
        const rA = a.rewardProgram?.effectiveCashbackPercent ?? 0;
        const rB = b.rewardProgram?.effectiveCashbackPercent ?? 0;
        return rB - rA;
      });
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      );
    default:
      return sorted;
  }
}

export function paginateCards(cards: CardData[], page: number, perPage: number = 24) {
  const start = (page - 1) * perPage;
  return {
    cards: cards.slice(start, start + perPage),
    totalPages: Math.ceil(cards.length / perPage),
    currentPage: page,
    total: cards.length,
  };
}
