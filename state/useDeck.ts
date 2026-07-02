import { useCallback, useEffect, useState } from 'react';

import { CATEGORIES } from '~/data/categories';
import { CARD_IDS_BY_CATEGORY } from '~/data/lookup';
import type { CategorySlug } from '~/data/types';

import { advance, currentCardId, ensureDeck } from './deck';
import { readJson, writeJson } from './storage';
import { STORAGE_KEYS, type DeckState } from './types';

function initializeState(stored: Partial<DeckState> | null): DeckState {
  let decks: Partial<DeckState> = stored ?? {};
  for (const c of CATEGORIES) {
    decks = ensureDeck(decks, c.slug, CARD_IDS_BY_CATEGORY[c.slug]).decks;
  }
  return decks as DeckState;
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
      const next: DeckState = {
        ...decks,
        [slug]: advance(decks[slug], CARD_IDS_BY_CATEGORY[slug]),
      };
      await persist(next);
    },
    [decks, persist],
  );

  const next = useCallback(
    async (slug: CategorySlug): Promise<number | null> => {
      if (!decks) return null;
      const seenId = currentCardId(decks[slug]);
      const advanced: DeckState = {
        ...decks,
        [slug]: advance(decks[slug], CARD_IDS_BY_CATEGORY[slug]),
      };
      await persist(advanced);
      return seenId;
    },
    [decks, persist],
  );

  return { ready, decks, current, skip, next };
}
