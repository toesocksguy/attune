import type { CategorySlug } from '~/data/types';
import type { CategoryDeckState, DeckState } from './types';

export function shuffleDeck(cardIds: readonly number[], rng: () => number = Math.random): number[] {
  const arr = [...cardIds];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const a = arr[i]!;
    const b = arr[j]!;
    arr[i] = b;
    arr[j] = a;
  }
  return arr;
}

export function makeDeckState(
  cardIds: readonly number[],
  rng: () => number = Math.random,
): CategoryDeckState {
  return { order: shuffleDeck(cardIds, rng), pointer: 0, cycle: 0 };
}

export function currentCardId(state: CategoryDeckState): number | null {
  return state.order[state.pointer] ?? null;
}

export function advance(
  state: CategoryDeckState,
  cardIds: readonly number[],
  rng: () => number = Math.random,
): CategoryDeckState {
  const nextPointer = state.pointer + 1;
  if (nextPointer >= state.order.length) {
    return {
      order: shuffleDeck(cardIds, rng),
      pointer: 0,
      cycle: state.cycle + 1,
    };
  }
  return { ...state, pointer: nextPointer };
}

export function ensureDeck(
  decks: Partial<DeckState>,
  slug: CategorySlug,
  cardIds: readonly number[],
  rng: () => number = Math.random,
): { decks: DeckState; created: boolean } {
  const existing = decks[slug];
  if (existing && existing.order.length === cardIds.length) {
    return { decks: decks as DeckState, created: false };
  }
  return {
    decks: { ...decks, [slug]: makeDeckState(cardIds, rng) } as DeckState,
    created: true,
  };
}
