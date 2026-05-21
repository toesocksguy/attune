import type { CategorySlug } from '~/data/types';

export type AppStats = {
  totalCardsDrawn: number;
  totalSessions: number;
  daysUsed: string[];
  sessionStartTime: number;
  lastSessionStartedAt: number;
  categoryDraws: Record<CategorySlug, number>;
  categorySeenIds: Record<CategorySlug, number[]>;
};

export type CategoryDeckState = {
  order: number[];
  pointer: number;
  cycle: number;
};

export type DeckState = Record<CategorySlug, CategoryDeckState>;

export type AppPreferences = {
  showSpicy: boolean;
};

export const STORAGE_KEYS = {
  stats: '@attune_stats',
  preferences: '@attune_preferences',
  decks: '@attune_decks',
} as const;

export const DEFAULT_PREFERENCES: AppPreferences = {
  showSpicy: true,
};
