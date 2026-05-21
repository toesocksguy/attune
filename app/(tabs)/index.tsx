import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, space, typeScale } from '~/theme';

export default function DecksScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.body}>
        <Text style={styles.headline}>Attune</Text>
        <Text style={styles.subtitle}>Decks tab — scaffold</Text>
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
    ...typeScale.display,
    color: palette.text,
  },
  subtitle: {
    ...typeScale.uiBody,
    color: palette.textFaint,
    marginTop: space.sm,
  },
});
