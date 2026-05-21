import type { CategoryMeta } from './types';

export const CATEGORIES: readonly CategoryMeta[] = [
  { slug: 'warmup', name: 'Warmup', type: 'question', level: 1, total: 30 },
  { slug: 'connection', name: 'Connection', type: 'question', level: 2, total: 40 },
  { slug: 'depth', name: 'Depth', type: 'question', level: 3, total: 40 },
  { slug: 'intimacy', name: 'Intimacy', type: 'question', level: 4, total: 30 },
  { slug: 'challenges', name: 'Challenges', type: 'activity', level: 5, total: 30 },
  { slug: 'spicy', name: 'Spicy', type: 'dare', level: 6, total: 30 },
] as const;

export const CATEGORY_BY_SLUG = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
) as Record<CategoryMeta['slug'], CategoryMeta>;

export const TOTAL_CARDS = CATEGORIES.reduce((sum, c) => sum + c.total, 0);
