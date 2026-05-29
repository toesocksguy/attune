import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, space, typeScale } from '~/theme';

const SECTIONS: { title: string; body: string }[] = [
  {
    title: 'What you may encounter',
    body:
      'Prompts about intimacy, sexuality, conflict, grief, and other emotionally sensitive topics. Cards are designed to open conversation, not to push past comfort.',
  },
  {
    title: 'How to use it well',
    body:
      'Skip any card without explanation. There is no scoring, no streak penalty, and no shared log. Slow down. Step back to small talk when you need to.',
  },
  {
    title: 'About Spicy',
    body:
      'Spicy is the most suggestive deck — romantic and intimate dares for couples comfortable being playful together. It is on by default in V1; you can hide it from Journey settings any time.',
  },
  {
    title: 'Editorial sourcing',
    body:
      'All card text is original. Decks are informed by research from Arthur Aron, the Gottmans, Brené Brown, and Masters & Johnson, but no card reproduces copyrighted material.',
  },
];

export default function ContentNoteScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Stack.Screen
        options={{ headerShown: true, headerTitle: 'Content note', headerTintColor: palette.text }}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.headline} accessibilityRole="header">A gentle heads-up</Text>
        <Text style={styles.lead}>
          Attune is meant to deepen connection. Some prompts go to vulnerable places. Read this
          before you draw your first card.
        </Text>

        <View style={styles.sections}>
          {SECTIONS.map((s) => (
            <View key={s.title} style={styles.section}>
              <Text style={styles.sectionTitle} accessibilityRole="header">{s.title}</Text>
              <Text style={styles.sectionBody}>{s.body}</Text>
            </View>
          ))}
        </View>
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
  headline: { ...typeScale.statsHeadline, color: palette.text },
  lead: { ...typeScale.uiBody, color: palette.textSoft, lineHeight: 20 },
  sections: { gap: space.lg },
  section: { gap: space.sm },
  sectionTitle: { ...typeScale.labelCap, color: palette.plumGlow },
  sectionBody: { ...typeScale.uiBody, color: palette.text, lineHeight: 20 },
});
