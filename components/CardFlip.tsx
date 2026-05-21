import { useEffect, useState, type ReactNode } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { palette, radius, shadow } from '~/theme';

type Props = {
  front: ReactNode;
  back: ReactNode;
  flipped: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
};

const FLIP_DURATION = 650;
const FADE_DURATION = 200;
const CARD_MAX_WIDTH = 316;
const CARD_ASPECT = 2.8 / 4;
const EASING = Easing.bezier(0.4, 0, 0.2, 1);

export function CardFlip({ front, back, flipped, onPress, accessibilityLabel }: Props) {
  const progress = useSharedValue(flipped ? 1 : 0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (mounted) setReduceMotion(value);
    });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  useEffect(() => {
    progress.value = withTiming(flipped ? 1 : 0, {
      duration: reduceMotion ? FADE_DURATION : FLIP_DURATION,
      easing: EASING,
    });
  }, [flipped, reduceMotion, progress]);

  const frontStyle = useAnimatedStyle(() => {
    if (reduceMotion) {
      return { opacity: interpolate(progress.value, [0, 1], [1, 0]) };
    }
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${interpolate(progress.value, [0, 1], [0, 180])}deg` },
      ],
    };
  });

  const backStyle = useAnimatedStyle(() => {
    if (reduceMotion) {
      return { opacity: interpolate(progress.value, [0, 1], [0, 1]) };
    }
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${interpolate(progress.value, [0, 1], [180, 360])}deg` },
      ],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ expanded: flipped }}
      style={styles.outer}
    >
      <View style={styles.frame} pointerEvents="none">
        <Animated.View style={[styles.face, frontStyle]}>{front}</Animated.View>
        <Animated.View style={[styles.face, backStyle]}>{back}</Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    alignSelf: 'center',
    aspectRatio: CARD_ASPECT,
  },
  frame: {
    flex: 1,
    borderRadius: radius.card,
    ...shadow.playingCard,
  },
  face: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: palette.surface,
    borderColor: palette.rim2,
    borderWidth: 1,
    borderRadius: radius.card,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
});
