import { atom, computed } from "nanostores";
import type { CardData } from "@/types/card";

const MAX_COMPARE = 4;

export const compareIds = atom<string[]>([]);

export const compareCount = computed(compareIds, (ids) => ids.length);

export function addToCompare(cardId: string) {
  const current = compareIds.get();
  if (current.includes(cardId)) return;
  if (current.length >= MAX_COMPARE) return;
  compareIds.set([...current, cardId]);
  if (typeof window !== "undefined") {
    sessionStorage.setItem("compare", JSON.stringify([...current, cardId]));
  }
}

export function removeFromCompare(cardId: string) {
  const current = compareIds.get().filter((id) => id !== cardId);
  compareIds.set(current);
  if (typeof window !== "undefined") {
    sessionStorage.setItem("compare", JSON.stringify(current));
  }
}

export function clearCompare() {
  compareIds.set([]);
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("compare");
  }
}

export function isInCompare(cardId: string) {
  return compareIds.get().includes(cardId);
}

export function initCompare() {
  if (typeof window === "undefined") return;
  const stored = sessionStorage.getItem("compare");
  if (stored) {
    try {
      const ids = JSON.parse(stored);
      if (Array.isArray(ids)) {
        compareIds.set(ids.slice(0, MAX_COMPARE));
      }
    } catch {}
  }
}

export function getCompareUrl(cards: CardData[]) {
  const slugs = cards.map((c) => c.id).join("-vs-");
  return `/compare/${slugs}`;
}
