import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import type { WishlistItem, SavedComparison, UserReview } from "@/types/user";

export async function getWishlist(uid: string): Promise<WishlistItem[]> {
  const db = getFirebaseDb();
  const ref = collection(db, "users", uid, "wishlist");
  const snap = await getDocs(ref);
  return snap.docs.map((d) => ({ cardId: d.id, ...d.data() } as WishlistItem));
}

export async function addToWishlistFirestore(
  uid: string,
  cardId: string,
  note?: string
) {
  const db = getFirebaseDb();
  const ref = doc(db, "users", uid, "wishlist", cardId);
  await setDoc(ref, {
    cardId,
    addedAt: new Date().toISOString(),
    ...(note ? { note } : {}),
  });
}

export async function removeFromWishlistFirestore(
  uid: string,
  cardId: string
) {
  const db = getFirebaseDb();
  const ref = doc(db, "users", uid, "wishlist", cardId);
  await deleteDoc(ref);
}

export async function saveComparison(
  uid: string,
  url: string,
  cards: string[]
) {
  const db = getFirebaseDb();
  const ref = doc(collection(db, "users", uid, "savedComparisons"));
  await setDoc(ref, {
    url,
    cards,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function getSavedComparisons(
  uid: string
): Promise<SavedComparison[]> {
  const db = getFirebaseDb();
  const ref = collection(db, "users", uid, "savedComparisons");
  const snap = await getDocs(ref);
  return snap.docs.map((d) => d.data() as SavedComparison);
}

export async function submitReview(review: Omit<UserReview, "createdAt" | "updatedAt">) {
  const db = getFirebaseDb();
  const ref = doc(collection(db, "reviews", review.cardId, "reviews"));
  await setDoc(ref, {
    ...review,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    helpful: 0,
  });
  return ref.id;
}

export async function getReviews(cardId: string): Promise<UserReview[]> {
  const db = getFirebaseDb();
  const ref = collection(db, "reviews", cardId, "reviews");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as UserReview);
}
