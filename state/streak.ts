const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function todayLocalDate(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y!, (m ?? 1) - 1, d ?? 1);
}

export function daysBetween(a: Date, b: Date): number {
  const aStart = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const bStart = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.round(Math.abs(bStart - aStart) / MS_PER_DAY);
}

export function calcStreak(days: readonly string[], now: Date = new Date()): number {
  if (days.length === 0) return 0;
  const unique = Array.from(new Set(days)).sort().reverse();
  const today = todayLocalDate(now);
  const todayDate = parseLocalDate(today);
  let streak = 0;
  let prev: Date | null = null;
  for (const d of unique) {
    const date = parseLocalDate(d);
    if (prev === null) {
      const gapFromToday = daysBetween(date, todayDate);
      if (gapFromToday > 1) return 0;
      streak = 1;
      prev = date;
      continue;
    }
    const gap = daysBetween(date, prev);
    if (gap === 0) continue;
    if (gap === 1) {
      streak += 1;
      prev = date;
    } else {
      break;
    }
  }
  return streak;
}

export function appendTodayIfMissing(
  days: readonly string[],
  now: Date = new Date(),
): string[] {
  const today = todayLocalDate(now);
  if (days.includes(today)) return [...days];
  return [...days, today];
}
