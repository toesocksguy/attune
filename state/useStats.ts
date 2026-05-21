import { useCallback, useEffect, useState } from 'react';

import { CATEGORIES } from '~/data/categories';
import type { CategorySlug } from '~/data/types';

import { readJson, writeJson } from './storage';
import { appendTodayIfMissing } from './streak';
import { STORAGE_KEYS, type AppStats } from './types';

const SESSION_GAP_MS = 30 * 60 * 1000;

function emptyStats(): AppStats {
  const categoryDraws = {} as Record<CategorySlug, number>;
  const categorySeenIds = {} as Record<CategorySlug, number[]>;
  for (const c of CATEGORIES) {
    categoryDraws[c.slug] = 0;
    categorySeenIds[c.slug] = [];
  }
  return {
    totalCardsDrawn: 0,
    totalSessions: 0,
    daysUsed: [],
    sessionStartTime: 0,
    lastSessionStartedAt: 0,
    categoryDraws,
    categorySeenIds,
  };
}

function normalize(raw: Partial<AppStats> | null): AppStats {
  const base = emptyStats();
  if (!raw) return base;
  const categoryDraws = { ...base.categoryDraws, ...(raw.categoryDraws ?? {}) };
  const categorySeenIds = { ...base.categorySeenIds, ...(raw.categorySeenIds ?? {}) };
  return {
    ...base,
    ...raw,
    categoryDraws,
    categorySeenIds,
  };
}

export function useStats() {
  const [value, setValue] = useState<AppStats>(emptyStats);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    readJson<AppStats>(STORAGE_KEYS.stats).then((loaded) => {
      if (!mounted) return;
      setValue(normalize(loaded));
      setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback(async (next: AppStats) => {
    setValue(next);
    await writeJson(STORAGE_KEYS.stats, next);
  }, []);

  const startSessionIfStale = useCallback(
    async (now: number = Date.now()) => {
      const isStale =
        value.lastSessionStartedAt === 0 || now - value.lastSessionStartedAt > SESSION_GAP_MS;
      if (!isStale) return;
      const next: AppStats = {
        ...value,
        totalSessions: value.totalSessions + 1,
        sessionStartTime: now,
        lastSessionStartedAt: now,
        daysUsed: appendTodayIfMissing(value.daysUsed, new Date(now)),
      };
      await persist(next);
    },
    [persist, value],
  );

  const recordCardSeen = useCallback(
    async (category: CategorySlug, cardId: number) => {
      const alreadySeen = value.categorySeenIds[category]?.includes(cardId) ?? false;
      const next: AppStats = {
        ...value,
        totalCardsDrawn: value.totalCardsDrawn + 1,
        categoryDraws: {
          ...value.categoryDraws,
          [category]: (value.categoryDraws[category] ?? 0) + 1,
        },
        categorySeenIds: alreadySeen
          ? value.categorySeenIds
          : {
              ...value.categorySeenIds,
              [category]: [...(value.categorySeenIds[category] ?? []), cardId],
            },
        daysUsed: appendTodayIfMissing(value.daysUsed),
      };
      await persist(next);
    },
    [persist, value],
  );

  return { ready, stats: value, startSessionIfStale, recordCardSeen };
}
