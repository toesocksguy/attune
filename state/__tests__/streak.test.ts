import { appendTodayIfMissing, calcStreak, daysBetween, todayLocalDate } from '../streak';

describe('todayLocalDate', () => {
  it('formats local date as YYYY-MM-DD', () => {
    expect(todayLocalDate(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(todayLocalDate(new Date(2026, 11, 31))).toBe('2026-12-31');
  });
});

describe('daysBetween', () => {
  it('returns 0 for same day', () => {
    expect(daysBetween(new Date(2026, 4, 21, 0, 0), new Date(2026, 4, 21, 23, 59))).toBe(0);
  });
  it('returns 1 across midnight', () => {
    expect(daysBetween(new Date(2026, 4, 20), new Date(2026, 4, 21))).toBe(1);
  });
  it('crosses month boundary', () => {
    expect(daysBetween(new Date(2026, 0, 31), new Date(2026, 1, 1))).toBe(1);
  });
  it('crosses year boundary', () => {
    expect(daysBetween(new Date(2026, 11, 31), new Date(2027, 0, 1))).toBe(1);
  });
});

describe('calcStreak', () => {
  const now = new Date(2026, 4, 21);

  it('returns 0 for empty days', () => {
    expect(calcStreak([], now)).toBe(0);
  });

  it('returns 1 when only today is recorded', () => {
    expect(calcStreak(['2026-05-21'], now)).toBe(1);
  });

  it('handles same-day duplicates without inflating', () => {
    expect(calcStreak(['2026-05-21', '2026-05-21', '2026-05-21'], now)).toBe(1);
  });

  it('counts consecutive yesterday continuity', () => {
    expect(calcStreak(['2026-05-21', '2026-05-20', '2026-05-19'], now)).toBe(3);
  });

  it('breaks on two-day gap', () => {
    expect(calcStreak(['2026-05-21', '2026-05-18'], now)).toBe(1);
  });

  it('counts 1 when yesterday only but not today', () => {
    expect(calcStreak(['2026-05-20'], now)).toBe(1);
  });

  it('returns 0 when most recent day is older than yesterday', () => {
    expect(calcStreak(['2026-05-19', '2026-05-18'], now)).toBe(0);
  });

  it('spans month boundary', () => {
    const may1 = new Date(2026, 4, 1);
    expect(calcStreak(['2026-05-01', '2026-04-30', '2026-04-29'], may1)).toBe(3);
  });

  it('spans year boundary', () => {
    const jan1 = new Date(2026, 0, 1);
    expect(calcStreak(['2026-01-01', '2025-12-31', '2025-12-30'], jan1)).toBe(3);
  });

  it('survives daylight saving spring forward', () => {
    const afterDst = new Date(2026, 2, 9);
    expect(calcStreak(['2026-03-09', '2026-03-08', '2026-03-07'], afterDst)).toBe(3);
  });

  it('survives daylight saving fall back', () => {
    const afterDst = new Date(2026, 10, 2);
    expect(calcStreak(['2026-11-02', '2026-11-01', '2026-10-31'], afterDst)).toBe(3);
  });
});

describe('appendTodayIfMissing', () => {
  const now = new Date(2026, 4, 21);

  it('appends today when absent', () => {
    expect(appendTodayIfMissing(['2026-05-20'], now)).toEqual(['2026-05-20', '2026-05-21']);
  });

  it('returns a copy unchanged when today already present', () => {
    const input = ['2026-05-20', '2026-05-21'];
    const out = appendTodayIfMissing(input, now);
    expect(out).toEqual(input);
    expect(out).not.toBe(input);
  });
});
