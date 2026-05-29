import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryTile } from '~/components';
import { CATEGORIES } from '~/data/categories';
import { palette, space, typeScale } from '~/theme';
import { usePreferences, useStats } from '~/state';

export default function DecksScreen() {
  const router = useRouter();
  const { preferences } = usePreferences();
  const { stats } = useStats();

  const visible = CATEGORIES.filter((c) => c.slug !== 'spicy' || preferences.showSpicy);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headline} accessibilityRole="header">Attune</Text>
          <Text style={styles.subtitle}>Pick a deck to begin.</Text>
        </View>

        <View style={styles.grid}>
          {visible.map((cat) => {
            const seen = stats.categorySeenIds[cat.slug]?.length ?? 0;
            return (
              <View key={cat.slug} style={styles.cell}>
                <CategoryTile
                  category={cat.slug}
                  name={cat.name}
                  total={cat.total}
                  seen={seen}
                  onPress={() => router.push(`/category/${cat.slug}`)}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.void,
  },
  scroll: {
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space['2xl'],
    gap: space.xl,
  },
  header: {
    gap: space.sm,
  },
  headline: {
    ...typeScale.display,
    color: palette.text,
  },
  subtitle: {
    ...typeScale.uiBody,
    color: palette.textFaint,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.md,
  },
  cell: {
    width: '48%',
  },
});
