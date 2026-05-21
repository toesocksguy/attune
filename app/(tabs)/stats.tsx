import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, space, typeScale } from '~/theme';

export default function JourneyScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.body}>
        <Text style={styles.headline}>Journey</Text>
        <Text style={styles.subtitle}>Stats tab — scaffold</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.void,
  },
  body: {
    flex: 1,
    paddingHorizontal: space.lg,
    paddingTop: space['2xl'],
  },
  headline: {
    ...typeScale.statsHeadline,
    color: palette.text,
  },
  subtitle: {
    ...typeScale.uiBody,
    color: palette.textFaint,
    marginTop: space.sm,
  },
});
