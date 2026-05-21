import { useCallback, useEffect, useState } from 'react';

import { CARDS } from '~/data/cards';
import { CATEGORIES } from '~/data/categories';
import type { CategorySlug } from '~/data/types';

import { advance, currentCardId, makeDeckState } from './deck';
import { readJson, writeJson } from './storage';
import { STORAGE_KEYS, type DeckState } from './types';

function cardIdsByCategory(): Record<CategorySlug, number[]> {
  const out = {} as Record<CategorySlug, number[]>;
  for (const c of CATEGORIES) out[c.slug] = [];
  for (const card of CARDS) out[card.category]!.push(card.id);
  return out;
}

function initializeState(stored: Partial<DeckState> | null): DeckState {
  const ids = cardIdsByCategory();
  const out = {} as DeckState;
  for (const c of CATEGORIES) {
    const existing = stored?.[c.slug];
    if (existing && existing.order.length === ids[c.slug].length) {
      out[c.slug] = existing;
    } else {
      out[c.slug] = makeDeckState(ids[c.slug]);
    }
  }
  return out;
}

export function useDeck() {
  const [decks, setDecks] = useState<DeckState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    readJson<DeckState>(STORAGE_KEYS.decks).then((loaded) => {
      if (!mounted) return;
      const initial = initializeState(loaded);
      setDecks(initial);
      writeJson(STORAGE_KEYS.decks, initial).finally(() => {
        if (mounted) setReady(true);
      });
    });
    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback(async (next: DeckState) => {
    setDecks(next);
    await writeJson(STORAGE_KEYS.decks, next);
  }, []);

  const current = useCallback(
    (slug: CategorySlug): number | null => {
      if (!decks) return null;
      return currentCardId(decks[slug]);
    },
    [decks],
  );

  const skip = useCallback(
    async (slug: CategorySlug) => {
      if (!decks) return;
      const ids = CARDS.filter((c) => c.category === slug).map((c) => c.id);
      const next: DeckState = { ...decks, [slug]: advance(decks[slug], ids) };
      await persist(next);
    },
    [decks, persist],
  );

  const next = useCallback(
    async (slug: CategorySlug): Promise<number | null> => {
      if (!decks) return null;
      const seenId = currentCardId(decks[slug]);
      const ids = CARDS.filter((c) => c.category === slug).map((c) => c.id);
      const advanced: DeckState = { ...decks, [slug]: advance(decks[slug], ids) };
      await persist(advanced);
      return seenId;
    },
    [decks, persist],
  );

  return { ready, decks, current, skip, next };
}
