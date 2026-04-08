import { atom } from "nanostores";

export const wishlistIds = atom<Set<string>>(new Set());

export function addToWishlist(cardId: string) {
  const current = new Set(wishlistIds.get());
  current.add(cardId);
  wishlistIds.set(current);
}

export function removeFromWishlist(cardId: string) {
  const current = new Set(wishlistIds.get());
  current.delete(cardId);
  wishlistIds.set(current);
}

export function isInWishlist(cardId: string) {
  return wishlistIds.get().has(cardId);
}

export function clearWishlist() {
  wishlistIds.set(new Set());
}
