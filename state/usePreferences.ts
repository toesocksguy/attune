import { useCallback, useEffect, useState } from 'react';

import { readJson, writeJson } from './storage';
import { DEFAULT_PREFERENCES, STORAGE_KEYS, type AppPreferences } from './types';

export function usePreferences() {
  const [value, setValue] = useState<AppPreferences>(DEFAULT_PREFERENCES);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    readJson<AppPreferences>(STORAGE_KEYS.preferences).then((loaded) => {
      if (!mounted) return;
      if (loaded) setValue({ ...DEFAULT_PREFERENCES, ...loaded });
      setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback(async (next: AppPreferences) => {
    setValue(next);
    await writeJson(STORAGE_KEYS.preferences, next);
  }, []);

  const confirmAge = useCallback(async () => {
    await persist({
      ageConfirmed: true,
      showSpicy: true,
      firstLaunchCompleted: true,
    });
  }, [persist]);

  const declineAge = useCallback(async () => {
    await persist({
      ageConfirmed: false,
      showSpicy: false,
      firstLaunchCompleted: true,
    });
  }, [persist]);

  const setShowSpicy = useCallback(
    async (show: boolean) => {
      await persist({ ...value, showSpicy: show });
    },
    [persist, value],
  );

  return { ready, preferences: value, confirmAge, declineAge, setShowSpicy };
}
