export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): T {
  let last = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  }) as T;
}

export function getAnnualFee(card: import("@/types/card").CardData): number {
  return (
    card.charges.find((c) => c.label.toLowerCase().includes("annual"))
      ?.amount ?? 0
  );
}

export function getJoiningFee(card: import("@/types/card").CardData): number {
  return (
    card.charges.find((c) => c.label.toLowerCase().includes("joining"))
      ?.amount ?? 0
  );
}

export function getCardUrl(
  card: import("@/types/card").CardData
): string {
  const typeMap = {
    credit: "credit-cards",
    debit: "debit-cards",
    prepaid: "prepaid-cards",
  };
  return `/${typeMap[card.cardType]}/${card.id}`;
}

export function getNetworkColor(network: string): string {
  const colors: Record<string, string> = {
    Visa: "#1A1F71",
    Mastercard: "#EB001B",
    RuPay: "#FF6600",
    Amex: "#2E77BC",
    DinersClub: "#004A97",
    Discover: "#FF6000",
  };
  return colors[network] ?? "#666";
}
