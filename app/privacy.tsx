import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, space, typeScale } from '~/theme';

const POINTS = [
  'No accounts. No sign-in. No identity to create or recover.',
  'No backend. The app does not talk to any server.',
  'No analytics. No telemetry, no crash reports, no third-party SDKs.',
  'No ads. No tracking pixels. No in-app purchases.',
  'No cloud sync. Your progress, sessions, and streaks live only on this device.',
  'Local storage only. Preferences and deck state persist via AsyncStorage on your phone. Uninstalling the app erases everything.',
  'Open source. Attune is GPL-3.0; you can read every line.',
];

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Stack.Screen
        options={{ headerShown: true, headerTitle: 'Privacy', headerTintColor: palette.text }}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.headline}>Private by design</Text>
        <Text style={styles.lead}>
          Attune is built so the two of you can be present with each other, not with a service.
          Nothing you do here leaves this device.
        </Text>

        <View style={styles.list}>
          {POINTS.map((p, i) => (
            <View key={i} style={styles.row}>
              <View style={styles.bullet} />
              <Text style={styles.point}>{p}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          If the privacy posture ever changes, it will be called out in the release notes and in a
          revised version of this screen — never silently.
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
  headline: { ...typeScale.statsHeadline, color: palette.text },
  lead: { ...typeScale.uiBody, color: palette.textSoft, lineHeight: 20 },
  list: { gap: space.md },
  row: {
    flexDirection: 'row',
    gap: space.md,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.plumLight,
    marginTop: 7,
  },
  point: {
    ...typeScale.uiBody,
    color: palette.text,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    ...typeScale.metaHint,
    color: palette.textFaint,
    marginTop: space.md,
    lineHeight: 18,
  },
});
