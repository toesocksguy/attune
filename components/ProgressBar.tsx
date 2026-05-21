import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { palette, radius, type CategorySlug, categoryAccent } from '~/theme';

type Variant = 'detail' | 'tile';

type Props = {
  progress: number;
  variant?: Variant;
  category?: CategorySlug;
  accessibilityLabel?: string;
};

const VARIANT_HEIGHT: Record<Variant, number> = {
  detail: 3,
  tile: 2,
};

export function ProgressBar({
  progress,
  variant = 'detail',
  category,
  accessibilityLabel,
}: Props) {
  const clamped = Math.max(0, Math.min(1, progress));
  const height = VARIANT_HEIGHT[variant];
  const fillColor = category ? categoryAccent[category] : palette.plum;

  return (
    <View
      style={[styles.track, { height }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
    >
      {variant === 'detail' ? (
        <LinearGradient
          colors={[palette.plum, palette.plumGlow]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.fill, { width: `${clamped * 100}%`, height }]}
        />
      ) : (
        <View
          style={[
            styles.fill,
            { width: `${clamped * 100}%`, height, backgroundColor: fillColor },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: palette.surface3,
    borderRadius: radius.bar,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radius.bar,
  },
});
