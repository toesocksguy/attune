import { StyleSheet, Text, View } from 'react-native';

import { palette, radius, space, typeScale } from '~/theme';

type Props = {
  label: string;
  value: string;
  icon?: string;
  accent?: string;
  accessibilityLabel?: string;
};

export function StatCard({ label, value, icon, accent, accessibilityLabel }: Props) {
  return (
    <View
      style={styles.card}
      accessible
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? `${label}: ${value}`}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      </View>
      <Text style={[styles.value, accent ? { color: accent } : null]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderColor: palette.rim,
    borderWidth: 1,
    borderRadius: radius.stat,
    paddingVertical: space.md,
    paddingHorizontal: space.md,
    flex: 1,
    gap: space.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...typeScale.labelCap,
    color: palette.textFaint,
  },
  icon: {
    fontSize: 14,
  },
  value: {
    ...typeScale.statValue,
    color: palette.text,
  },
});
