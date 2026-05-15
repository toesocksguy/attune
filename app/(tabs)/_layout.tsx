import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const VOID = '#0D0A12';
const RIM = '#3D3255';
const TEXT_SOFT = '#B8A8D0';
const PLUM_LIGHT = '#9B6EC8';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: VOID,
          borderTopColor: RIM,
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
        tabBarActiveTintColor: PLUM_LIGHT,
        tabBarInactiveTintColor: TEXT_SOFT,
        tabBarInactiveBackgroundColor: VOID,
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
