import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardFlip } from '~/components';
import { CARD_BY_ID } from '~/data/lookup';
import type { CategorySlug } from '~/data/types';
import { useDeck, useSession, useSpicyGate, useStats } from '~/state';
import { minTapTarget, palette, radius, space, typeScale } from '~/theme';

export default function CardScreen() {
  const { slug } = useLocalSearchParams<{ slug: CategorySlug }>();
  const { category, gated } = useSpicyGate(slug);
  const { current, skip, next, ready: deckReady } = useDeck();
  const { recordCardSeen } = useStats();
  useSession();

  const [flipped, setFlipped] = useState(false);

  const currentId = deckReady && slug ? current(slug) : null;
  const card = currentId != null ? CARD_BY_ID.get(currentId) : null;

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

  if (!category || gated) {
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
                  <Text style={styles.wordmark} maxFontSizeMultiplier={1.2}>Attune</Text>
                </View>
              }
              back={
                <LinearGradient
                  colors={[palette.surface2, palette.surface]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardBack}
                >
                  <Text style={styles.cardText} maxFontSizeMultiplier={1.3}>{card.text}</Text>
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
            <Text style={[styles.btnText, styles.btnSecondaryText]} maxFontSizeMultiplier={1.4}>Skip</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next card"
            onPress={onNext}
            style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.btnPressed]}
          >
            <Text style={[styles.btnText, styles.btnPrimaryText]} maxFontSizeMultiplier={1.4}>Next</Text>
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
