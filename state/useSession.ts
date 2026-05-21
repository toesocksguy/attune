import { useEffect, useState } from 'react';

import { useStats } from './useStats';

export function useSession() {
  const { ready, stats, startSessionIfStale } = useStats();
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (!ready) return;
    startSessionIfStale();
  }, [ready, startSessionIfStale]);

  useEffect(() => {
    if (!ready || stats.sessionStartTime === 0) return;
    const tick = () => setElapsedMs(Date.now() - stats.sessionStartTime);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [ready, stats.sessionStartTime]);

  return {
    ready,
    sessionStartTime: stats.sessionStartTime,
    totalSessions: stats.totalSessions,
    elapsedMs,
  };
}
