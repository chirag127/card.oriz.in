export interface UserPreferences {
  incomeRange?: string;
  spendCategories?: string[];
  preferredNetworks?: string[];
  cardTypes?: string[];
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  cardId: string;
  addedAt: string;
  note?: string;
}

export interface SavedComparison {
  url: string;
  cards: string[];
  createdAt: string;
}

export interface UserReview {
  uid: string;
  cardId: string;
  rating: number;
  title: string;
  body: string;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}
