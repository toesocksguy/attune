import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { CATEGORY_BY_SLUG } from '~/data/categories';
import type { CategoryMeta, CategorySlug } from '~/data/types';

import { usePreferences } from './usePreferences';

type SpicyGate = {
  category: CategoryMeta | undefined;
  /** True while the category is unknown, preferences are loading, or access is blocked. */
  gated: boolean;
};

/**
 * Resolves a category slug and enforces the Spicy visibility preference.
 * When Spicy is hidden, redirects to Decks and reports the screen as gated
 * so callers render a placeholder instead of category content.
 */
export function useSpicyGate(slug: CategorySlug | undefined): SpicyGate {
  const router = useRouter();
  const { preferences, ready } = usePreferences();

  const isSpicy = slug === 'spicy';
  const pending = isSpicy && !ready;
  const blocked = isSpicy && ready && !preferences.showSpicy;

  useEffect(() => {
    if (blocked) router.replace('/');
  }, [blocked, router]);

  const category = slug ? CATEGORY_BY_SLUG[slug] : undefined;
  return { category, gated: !category || pending || blocked };
}
