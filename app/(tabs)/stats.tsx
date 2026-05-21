import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryIcon, ProgressBar, StatCard } from '~/components';
import { CATEGORIES } from '~/data/categories';
import type { CategorySlug } from '~/data/types';
import { calcStreak, usePreferences, useStats } from '~/state';
import { categoryAccent, minTapTarget, palette, radius, space, typeScale } from '~/theme';

function formatElapsed(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function JourneyScreen() {
  const router = useRouter();
  const { stats } = useStats();
  const { preferences, setShowSpicy } = usePreferences();
  const sessionStartTime = stats.sessionStartTime;
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (sessionStartTime === 0) {
      setElapsedMs(0);
      return;
    }
    const tick = () => setElapsedMs(Date.now() - sessionStartTime);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [sessionStartTime]);

  const visible = CATEGORIES.filter((c) => c.slug !== 'spicy' || preferences.showSpicy);
  const streak = calcStreak(stats.daysUsed);

  let favourite: CategorySlug | null = null;
  let favouriteDraws = 0;
  for (const c of visible) {
    const draws = stats.categoryDraws[c.slug] ?? 0;
    if (draws > favouriteDraws) {
      favourite = c.slug;
      favouriteDraws = draws;
    }
  }
  const favouriteCategory = favourite ? visible.find((c) => c.slug === favourite) : null;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headline}>Journey</Text>
          <Text style={styles.subtitle}>Your time together, tracked locally.</Text>
        </View>

        <View style={styles.row}>
          <StatCard label="Cards drawn" value={String(stats.totalCardsDrawn)} />
          <StatCard label="Streak" value={`${streak}d`} icon="🔥" />
        </View>

        <View style={styles.row}>
          <StatCard label="Sessions" value={String(stats.totalSessions)} />
          <StatCard
            label="This session"
            value={sessionStartTime === 0 ? '—' : formatElapsed(elapsedMs)}
            icon="⏱"
          />
        </View>

        {favouriteCategory ? (
          <StatCard
            label="Favourite deck"
            value={favouriteCategory.name}
            accent={categoryAccent[favouriteCategory.slug]}
          />
        ) : null}

        <View style={styles.breakdown}>
          <Text style={styles.breakdownLabel}>Deck progress</Text>
          {visible.map((cat) => {
            const seen = stats.categorySeenIds[cat.slug]?.length ?? 0;
            const pct = cat.total === 0 ? 0 : seen / cat.total;
            return (
              <View key={cat.slug} style={styles.breakdownRow}>
                <CategoryIcon slug={cat.slug} size={20} color={categoryAccent[cat.slug]} />
                <View style={styles.breakdownBody}>
                  <View style={styles.breakdownHeader}>
                    <Text style={styles.breakdownName}>{cat.name}</Text>
                    <Text style={styles.breakdownPct}>{Math.round(pct * 100)}%</Text>
                  </View>
                  <ProgressBar
                    progress={pct}
                    variant="tile"
                    category={cat.slug}
                    accessibilityLabel={`${cat.name} progress`}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.settings}>
          <Text style={styles.settingsLabel}>Settings</Text>
          <View style={styles.settingsRow}>
            <View style={styles.settingsCopy}>
              <Text style={styles.settingsTitle}>Show Spicy deck</Text>
              <Text style={styles.settingsHelp}>
                Romantic and intimate dares. Toggle off to hide from Decks and Journey.
              </Text>
            </View>
            <Switch
              value={preferences.showSpicy}
              onValueChange={setShowSpicy}
              trackColor={{ false: palette.surface3, true: palette.plum }}
              thumbColor={palette.text}
              accessibilityLabel="Show Spicy deck"
            />
          </View>

          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Privacy"
            onPress={() => router.push('/privacy')}
            style={({ pressed }) => [styles.linkRow, pressed && styles.linkPressed]}
          >
            <Text style={styles.settingsTitle}>Privacy</Text>
            <Ionicons name="chevron-forward" size={18} color={palette.textFaint} />
          </Pressable>

          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Content note"
            onPress={() => router.push('/content-note')}
            style={({ pressed }) => [styles.linkRow, pressed && styles.linkPressed]}
          >
            <Text style={styles.settingsTitle}>Content note</Text>
            <Ionicons name="chevron-forward" size={18} color={palette.textFaint} />
          </Pressable>
        </View>

        <Text style={styles.footnote}>
          Everything you see here lives only on this device.{'\n'}Nothing leaves. Nothing watches.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.void },
  scroll: {
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space['2xl'],
    gap: space.lg,
  },
  header: { gap: space.sm },
  headline: { ...typeScale.statsHeadline, color: palette.text },
  subtitle: { ...typeScale.uiBody, color: palette.textFaint },
  row: {
    flexDirection: 'row',
    gap: space.md,
  },
  breakdown: {
    gap: space.md,
    marginTop: space.md,
  },
  breakdownLabel: {
    ...typeScale.labelCap,
    color: palette.textFaint,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  breakdownBody: {
    flex: 1,
    gap: space.xs,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownName: {
    ...typeScale.uiBody,
    color: palette.text,
  },
  breakdownPct: {
    ...typeScale.metaHint,
    color: palette.textSoft,
  },
  settings: {
    marginTop: space.lg,
    gap: space.md,
  },
  settingsLabel: {
    ...typeScale.labelCap,
    color: palette.textFaint,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: palette.surface,
    borderColor: palette.rim,
    borderWidth: 1,
    borderRadius: radius.stat,
    padding: space.md,
  },
  settingsCopy: {
    flex: 1,
    gap: space.xs,
  },
  settingsTitle: {
    ...typeScale.uiBody,
    color: palette.text,
  },
  settingsHelp: {
    ...typeScale.metaHint,
    color: palette.textFaint,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.surface,
    borderColor: palette.rim,
    borderWidth: 1,
    borderRadius: radius.stat,
    paddingVertical: space.md,
    paddingHorizontal: space.md,
    minHeight: minTapTarget,
  },
  linkPressed: { opacity: 0.85 },
  footnote: {
    ...typeScale.cardText,
    color: palette.textGhost,
    textAlign: 'center',
    marginTop: space.xl,
    fontSize: 14,
  },
});
