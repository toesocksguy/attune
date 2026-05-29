import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { palette } from '~/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: palette.void,
          borderTopColor: palette.rim,
          borderTopWidth: 1,
          paddingTop: 14,
          paddingBottom: 30,
          paddingHorizontal: 20,
          height: 84,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          letterSpacing: 0.5,
        },
        tabBarAllowFontScaling: false,
        tabBarActiveTintColor: palette.plumLight,
        tabBarInactiveTintColor: palette.textSoft,
        tabBarInactiveBackgroundColor: palette.void,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Decks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size ?? 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Journey',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="radio-button-on-outline" size={size ?? 20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
