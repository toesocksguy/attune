import { StyleSheet, Text, View } from 'react-native';

import { palette, radius, space, typeScale } from '~/theme';

type Tone = 'streak' | 'session';

type Props = {
  text: string;
  tone: Tone;
  accessibilityLabel?: string;
};

const DOT_COLOR: Record<Tone, string> = {
  streak: palette.plumLight,
  session: palette.rose,
};

export function PillBadge({ text, tone, accessibilityLabel }: Props) {
  return (
    <View
      style={styles.pill}
      accessible
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? text}
    >
      <View style={[styles.dot, { backgroundColor: DOT_COLOR[tone] }]} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: 7,
    paddingHorizontal: 14,
    backgroundColor: palette.surface2,
    borderColor: palette.rim,
    borderWidth: 1,
    borderRadius: radius.pill,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    ...typeScale.pillText,
    color: palette.textSoft,
  },
});
