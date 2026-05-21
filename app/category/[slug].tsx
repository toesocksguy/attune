import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryIcon, ProgressBar } from '~/components';
import { CATEGORY_BY_SLUG } from '~/data/categories';
import type { CategorySlug } from '~/data/types';
import { usePreferences, useStats } from '~/state';
import { categoryAccent, minTapTarget, palette, radius, shadow, space, typeScale } from '~/theme';

const TYPE_LABEL: Record<string, string> = {
  question: 'Questions',
  activity: 'Activities',
  dare: 'Dares',
};

export default function CategoryDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: CategorySlug }>();
  const router = useRouter();
  const { preferences, ready: prefsReady } = usePreferences();
  const { stats } = useStats();

  const category = slug ? CATEGORY_BY_SLUG[slug] : undefined;
  const blocked = slug === 'spicy' && prefsReady && !preferences.showSpicy;

  useEffect(() => {
    if (blocked) router.replace('/');
  }, [blocked, router]);

  if (!category || blocked) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <Stack.Screen options={{ headerShown: true, headerTitle: '', headerTintColor: palette.text }} />
      </SafeAreaView>
    );
  }

  const accent = categoryAccent[category.slug];
  const seen = stats.categorySeenIds[category.slug]?.length ?? 0;
  const progress = category.total === 0 ? 0 : seen / category.total;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Stack.Screen options={{ headerShown: true, headerTitle: '', headerTintColor: palette.text }} />
      <View style={styles.body}>
        <View style={styles.hero}>
          <CategoryIcon slug={category.slug} size={56} color={accent} strokeWidth={1.1} />
          <Text style={styles.name}>{category.name}</Text>
          <Text style={styles.meta}>
            {TYPE_LABEL[category.type] ?? category.type} · Level {category.level}
          </Text>
        </View>

        <View style={styles.progressBlock}>
          <ProgressBar
            progress={progress}
            variant="detail"
            accessibilityLabel={`${category.name} progress`}
          />
          <Text style={styles.progressMeta}>
            {seen} of {category.total} seen
          </Text>
        </View>

        <View style={styles.spacer} />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Draw a card from ${category.name}`}
          onPress={() => router.push(`/card/${category.slug}`)}
          style={({ pressed }) => [styles.ctaWrap, pressed && styles.ctaPressed]}
        >
          <LinearGradient
            colors={[palette.plum, '#9B50C8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cta}
          >
            <Text style={styles.ctaText}>Draw a Card</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.void },
  body: {
    flex: 1,
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space.xl,
  },
  hero: {
    alignItems: 'center',
    gap: space.md,
    paddingTop: space.xl,
  },
  name: {
    ...typeScale.categoryName,
    color: palette.text,
    textAlign: 'center',
  },
  meta: {
    ...typeScale.labelCap,
    color: palette.textFaint,
  },
  progressBlock: {
    marginTop: space['2xl'],
    gap: space.sm,
  },
  progressMeta: {
    ...typeScale.metaHint,
    color: palette.textSoft,
  },
  spacer: { flex: 1 },
  ctaWrap: {
    minHeight: minTapTarget,
    borderRadius: radius.button,
    ...shadow.ctaButton,
  },
  ctaPressed: { opacity: 0.9 },
  cta: {
    paddingVertical: 17,
    paddingHorizontal: space.lg,
    borderRadius: radius.button,
    alignItems: 'center',
  },
  ctaText: {
    ...typeScale.button,
    color: palette.text,
  },
});
