import { memo, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

import {
  categoryAccent,
  minTapTarget,
  palette,
  radius,
  space,
  typeScale,
  type CategorySlug,
} from '~/theme';
import { CategoryIcon } from './CategoryIcon';
import { ProgressBar } from './ProgressBar';

type Props = {
  category: CategorySlug;
  name: string;
  total: number;
  seen: number;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export const CategoryTile = memo(function CategoryTile({
  category,
  name,
  total,
  seen,
  onPress,
  disabled,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const reduceMotion = useReducedMotion();
  const accent = categoryAccent[category];
  const progress = total === 0 ? 0 : seen / total;

  const pressIn = () => {
    if (reduceMotion) return;
    Animated.timing(scale, {
      toValue: 0.96,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    if (reduceMotion) return;
    Animated.timing(scale, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${seen} of ${total} cards seen`}
      accessibilityState={{ disabled: !!disabled }}
      style={styles.pressable}
    >
      <Animated.View
        style={[
          styles.tile,
          { borderColor: `${accent}4D`, transform: [{ scale }] },
          disabled && styles.tileDisabled,
        ]}
      >
        <CategoryIcon slug={category} size={22} color={accent} strokeWidth={1.1} />
        <Text style={styles.name} numberOfLines={1} maxFontSizeMultiplier={1.4}>
          {name}
        </Text>
        <Text style={styles.count} maxFontSizeMultiplier={1.5}>
          {seen} / {total}
        </Text>
        <View style={styles.progressWrap}>
          <ProgressBar
            progress={progress}
            variant="tile"
            category={category}
            accessibilityLabel={`${name} progress`}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  pressable: {
    minHeight: minTapTarget,
    flex: 1,
  },
  tile: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderRadius: radius.tile,
    paddingTop: 16,
    paddingHorizontal: 15,
    paddingBottom: 14,
    gap: space.sm,
  },
  tileDisabled: {
    opacity: 0.4,
  },
  name: {
    ...typeScale.tileName,
    color: palette.text,
  },
  count: {
    ...typeScale.metaHint,
    color: palette.textFaint,
  },
  progressWrap: {
    marginTop: space.xs,
  },
});
