import { useStore } from "@nanostores/react";
import {
  compareIds,
  compareCount,
  addToCompare,
  removeFromCompare,
  clearCompare,
  isInCompare,
  initCompare,
  getCompareUrl,
} from "@/stores/compareStore";
import type { CardData } from "@/types/card";

export function useCompare() {
  const ids = useStore(compareIds);
  const count = useStore(compareCount);

  return {
    ids,
    count,
    add: addToCompare,
    remove: removeFromCompare,
    clear: clearCompare,
    contains: isInCompare,
    init: initCompare,
    getUrl: (cards: CardData[]) => getCompareUrl(cards),
  };
}
