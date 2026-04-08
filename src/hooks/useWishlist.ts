import { useStore } from "@nanostores/react";
import {
  wishlistIds,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  clearWishlist,
} from "@/stores/wishlistStore";

export function useWishlist() {
  const ids = useStore(wishlistIds);

  return {
    ids: Array.from(ids),
    count: ids.size,
    add: addToWishlist,
    remove: removeFromWishlist,
    contains: isInWishlist,
    clear: clearWishlist,
    toggle: (cardId: string) => {
      if (isInWishlist(cardId)) {
        removeFromWishlist(cardId);
      } else {
        addToWishlist(cardId);
      }
    },
  };
}
