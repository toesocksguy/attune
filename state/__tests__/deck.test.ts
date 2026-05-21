import { advance, currentCardId, ensureDeck, makeDeckState, shuffleDeck } from '../deck';
import type { DeckState } from '../types';

function seededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

describe('shuffleDeck', () => {
  it('returns same length and same id set', () => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const out = shuffleDeck(ids, seededRng(42));
    expect(out).toHaveLength(ids.length);
    expect([...out].sort((a, b) => a - b)).toEqual(ids);
  });

  it('produces a permutation with no duplicates', () => {
    const ids = Array.from({ length: 30 }, (_, i) => i + 1);
    const out = shuffleDeck(ids, seededRng(7));
    expect(new Set(out).size).toBe(ids.length);
  });

  it('is deterministic given the same rng seed', () => {
    const ids = [1, 2, 3, 4, 5];
    expect(shuffleDeck(ids, seededRng(1))).toEqual(shuffleDeck(ids, seededRng(1)));
  });

  it('does not mutate input', () => {
    const ids = [1, 2, 3, 4, 5];
    const copy = [...ids];
    shuffleDeck(ids, seededRng(1));
    expect(ids).toEqual(copy);
  });
});

describe('makeDeckState', () => {
  it('initializes pointer and cycle at zero', () => {
    const state = makeDeckState([1, 2, 3], seededRng(1));
    expect(state.pointer).toBe(0);
    expect(state.cycle).toBe(0);
    expect(state.order).toHaveLength(3);
  });
});

describe('currentCardId', () => {
  it('returns the card at the current pointer', () => {
    expect(currentCardId({ order: [10, 20, 30], pointer: 1, cycle: 0 })).toBe(20);
  });
  it('returns null when pointer is out of range', () => {
    expect(currentCardId({ order: [10], pointer: 5, cycle: 0 })).toBeNull();
  });
});

describe('advance', () => {
  const ids = [1, 2, 3, 4];

  it('moves the pointer forward without reshuffling mid-deck', () => {
    const state = { order: [4, 3, 2, 1], pointer: 0, cycle: 0 };
    const next = advance(state, ids, seededRng(99));
    expect(next.order).toEqual([4, 3, 2, 1]);
    expect(next.pointer).toBe(1);
    expect(next.cycle).toBe(0);
  });

  it('reshuffles, resets pointer, increments cycle on exhaustion', () => {
    const state = { order: [4, 3, 2, 1], pointer: 3, cycle: 0 };
    const next = advance(state, ids, seededRng(1));
    expect(next.pointer).toBe(0);
    expect(next.cycle).toBe(1);
    expect([...next.order].sort((a, b) => a - b)).toEqual(ids);
  });

  it('does not repeat ids within a single cycle', () => {
    let state = makeDeckState(ids, seededRng(123));
    const seen: number[] = [];
    for (let i = 0; i < ids.length; i++) {
      const id = currentCardId(state);
      expect(id).not.toBeNull();
      seen.push(id!);
      state = advance(state, ids, seededRng(123));
    }
    expect([...seen].sort((a, b) => a - b)).toEqual(ids);
    expect(state.cycle).toBe(1);
  });
});

describe('ensureDeck', () => {
  const ids = [1, 2, 3];

  it('creates a new category deck when missing', () => {
    const decks: Partial<DeckState> = {};
    const { decks: out, created } = ensureDeck(decks, 'warmup', ids, seededRng(1));
    expect(created).toBe(true);
    expect(out.warmup.order).toHaveLength(3);
    expect(out.warmup.pointer).toBe(0);
    expect(out.warmup.cycle).toBe(0);
  });

  it('preserves an existing deck unchanged when sizes match', () => {
    const existing = { order: [3, 1, 2], pointer: 1, cycle: 0 };
    const decks: Partial<DeckState> = { warmup: existing };
    const { decks: out, created } = ensureDeck(decks, 'warmup', ids, seededRng(1));
    expect(created).toBe(false);
    expect(out.warmup).toBe(existing);
  });

  it('rebuilds when stored size differs from canonical card count', () => {
    const stale = { order: [99], pointer: 0, cycle: 5 };
    const decks: Partial<DeckState> = { warmup: stale };
    const { decks: out, created } = ensureDeck(decks, 'warmup', ids, seededRng(1));
    expect(created).toBe(true);
    expect(out.warmup.order).toHaveLength(3);
  });

  it('round-trips through JSON without losing state', () => {
    let state = makeDeckState(ids, seededRng(42));
    state = advance(state, ids, seededRng(42));
    const serialized = JSON.stringify(state);
    const restored = JSON.parse(serialized);
    expect(restored).toEqual(state);
  });
});
