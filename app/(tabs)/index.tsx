import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    backgroundColor: '#0D0A12',
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  headline: {
    color: '#F0EAF8',
    fontSize: 42,
    fontWeight: '300',
    fontStyle: 'italic',
  },
  subtitle: {
    color: '#7A6A90',
    fontSize: 13,
    marginTop: 8,
  },
});
