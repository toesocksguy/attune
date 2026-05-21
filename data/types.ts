import type { CategorySlug } from '~/theme';

export type CardType = 'question' | 'activity' | 'dare';

export type CategoryLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type CategoryMeta = {
  slug: CategorySlug;
  name: string;
  type: CardType;
  level: CategoryLevel;
  total: number;
};

export type Card = {
  id: number;
  category: CategorySlug;
  type: CardType;
  level: CategoryLevel;
  text: string;
};

export type { CategorySlug };
