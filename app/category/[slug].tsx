import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CATEGORY_BY_SLUG } from '~/data/categories';
import type { CategorySlug } from '~/data/types';
import { palette, space, typeScale } from '~/theme';

export default function CategoryDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: CategorySlug }>();
  const category = slug ? CATEGORY_BY_SLUG[slug] : undefined;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Stack.Screen options={{ headerShown: true, headerTitle: '', headerTintColor: palette.text }} />
      <View style={styles.body}>
        <Text style={styles.headline}>{category?.name ?? 'Unknown'}</Text>
        <Text style={styles.subtitle}>Detail screen — stub</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.void },
  body: { flex: 1, paddingHorizontal: space.lg, paddingTop: space.xl, gap: space.sm },
  headline: { ...typeScale.categoryName, color: palette.text },
  subtitle: { ...typeScale.uiBody, color: palette.textFaint },
});
