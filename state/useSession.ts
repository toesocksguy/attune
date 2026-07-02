import { useEffect, useState } from 'react';

import { useStats } from './useStats';

/** Ticks once per second while `startMs` is non-zero; returns 0 otherwise. */
export function useElapsedSince(startMs: number): number {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (startMs === 0) {
      setElapsedMs(0);
      return;
    }
    const tick = () => setElapsedMs(Date.now() - startMs);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startMs]);

  return elapsedMs;
}

export function useSession() {
  const { ready, stats, startSessionIfStale } = useStats();

  useEffect(() => {
    if (!ready) return;
    startSessionIfStale();
  }, [ready, startSessionIfStale]);

  const elapsedMs = useElapsedSince(ready ? stats.sessionStartTime : 0);

  return {
    ready,
    sessionStartTime: stats.sessionStartTime,
    totalSessions: stats.totalSessions,
    elapsedMs,
  };
}
