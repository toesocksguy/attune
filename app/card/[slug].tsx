import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardFlip } from '~/components';
import { CARDS } from '~/data/cards';
import { CATEGORY_BY_SLUG } from '~/data/categories';
import type { CategorySlug } from '~/data/types';
import { useDeck, usePreferences, useSession, useStats } from '~/state';
import { minTapTarget, palette, radius, space, typeScale } from '~/theme';

export default function CardScreen() {
  const { slug } = useLocalSearchParams<{ slug: CategorySlug }>();
  const router = useRouter();
  const { preferences, ready: prefsReady } = usePreferences();
  const { current, skip, next, ready: deckReady } = useDeck();
  const { recordCardSeen } = useStats();
  useSession();

  const category = slug ? CATEGORY_BY_SLUG[slug] : undefined;
  const blocked = slug === 'spicy' && prefsReady && !preferences.showSpicy;

  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (blocked) router.replace('/');
  }, [blocked, router]);

  const cardsById = useMemo(() => {
    const m = new Map<number, (typeof CARDS)[number]>();
    for (const c of CARDS) m.set(c.id, c);
    return m;
  }, []);

  const currentId = deckReady && slug ? current(slug) : null;
  const card = currentId != null ? cardsById.get(currentId) : null;

  const onSkip = async () => {
    if (!slug) return;
    setFlipped(false);
    await skip(slug);
  };

  const onNext = async () => {
    if (!slug) return;
    setFlipped(false);
    const seenId = await next(slug);
    if (seenId != null && category) await recordCardSeen(category.slug, seenId);
  };

  if (!category || blocked) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <Stack.Screen options={{ headerShown: true, headerTitle: '', headerTintColor: palette.text }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Stack.Screen
        options={{ headerShown: true, headerTitle: category.name, headerTintColor: palette.text }}
      />
      <View style={styles.body}>
        <View style={styles.cardWrap}>
          {card ? (
            <CardFlip
              flipped={flipped}
              onPress={() => setFlipped((f) => !f)}
              accessibilityLabel={
                flipped ? `Card ${card.id}: ${card.text}` : `Tap to reveal card from ${category.name}`
              }
              front={
                <View style={styles.cardFront}>
                  <Text style={styles.wordmark}>Attune</Text>
                </View>
              }
              back={
                <LinearGradient
                  colors={[palette.surface2, palette.surface]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardBack}
                >
                  <Text style={styles.cardText}>{card.text}</Text>
                </LinearGradient>
              }
            />
          ) : (
            <Text style={styles.empty}>Loading deck…</Text>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Skip card"
            onPress={onSkip}
            style={({ pressed }) => [styles.btn, styles.btnSecondary, pressed && styles.btnPressed]}
          >
            <Text style={[styles.btnText, styles.btnSecondaryText]}>Skip</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next card"
            onPress={onNext}
            style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.btnPressed]}
          >
            <Text style={[styles.btnText, styles.btnPrimaryText]}>Next</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.void },
  body: {
    flex: 1,
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
    paddingBottom: space.xl,
    gap: space.xl,
  },
  cardWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    flex: 1,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBack: {
    flex: 1,
    paddingHorizontal: space.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {
    ...typeScale.cardWordmark,
    color: palette.plumGlow,
  },
  cardText: {
    ...typeScale.cardText,
    color: palette.text,
    textAlign: 'center',
  },
  empty: {
    ...typeScale.uiBody,
    color: palette.textFaint,
  },
  actions: {
    flexDirection: 'row',
    gap: space.md,
  },
  btn: {
    flex: 1,
    minHeight: minTapTarget,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  btnPressed: { opacity: 0.85 },
  btnSecondary: {
    backgroundColor: palette.surface2,
    borderWidth: 1,
    borderColor: palette.rim,
  },
  btnPrimary: {
    backgroundColor: palette.plum,
  },
  btnText: { ...typeScale.button },
  btnSecondaryText: { color: palette.textSoft },
  btnPrimaryText: { color: palette.text },
});
