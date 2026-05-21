import { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';

import {
  categoryAccent,
  minTapTarget,
  palette,
  radius,
  space,
  typeScale,
  type CategorySlug,
} from '~/theme';
import { ProgressBar } from './ProgressBar';

type Props = {
  category: CategorySlug;
  name: string;
  emoji: string;
  total: number;
  seen: number;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export function CategoryTile({
  category,
  name,
  emoji,
  total,
  seen,
  onPress,
  disabled,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const accent = categoryAccent[category];
  const progress = total === 0 ? 0 : seen / total;

  const pressIn = () => {
    Animated.timing(scale, {
      toValue: 0.96,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
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
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.count}>
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
}

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
  emoji: {
    fontSize: 22,
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
