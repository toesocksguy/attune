import { CARDS } from './cards';
import { CATEGORIES } from './categories';
import type { Card, CategorySlug } from './types';

function buildIdsByCategory(): Record<CategorySlug, readonly number[]> {
  const out = {} as Record<CategorySlug, number[]>;
  for (const c of CATEGORIES) out[c.slug] = [];
  for (const card of CARDS) out[card.category]!.push(card.id);
  return out;
}

export const CARD_IDS_BY_CATEGORY = buildIdsByCategory();

export const CARD_BY_ID: ReadonlyMap<number, Card> = new Map(CARDS.map((c) => [c.id, c]));
