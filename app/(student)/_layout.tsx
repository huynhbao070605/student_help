import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";

import { colors } from "@/constants/theme";
import { useRoleGuard } from "@/lib/auth/useRoleGuard";

type IconName = keyof typeof Ionicons.glyphMap;

function tabIcon(name: IconName) {
  function TabBarIcon({ color, size }: { color: ColorValue; size: number }) {
    return <Ionicons color={String(color)} name={name} size={size} />;
  }

  TabBarIcon.displayName = `StudentTabIcon(${name})`;
  return TabBarIcon;
}

export default function StudentTabsLayout() {
  const guard = useRoleGuard("student");
  if (guard) return guard;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.peachDark,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "800" },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.line,
          height: 68,
          paddingBottom: 10,
          paddingTop: 8
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Trang chủ", tabBarIcon: tabIcon("home") }} />
      <Tabs.Screen name="rides" options={{ title: "Đi chung", tabBarIcon: tabIcon("bicycle") }} />
      <Tabs.Screen name="lost-found" options={{ title: "Tìm đồ", tabBarIcon: tabIcon("search") }} />
      <Tabs.Screen name="food" options={{ title: "Đồ ăn", tabBarIcon: tabIcon("fast-food") }} />
      <Tabs.Screen name="chat" options={{ title: "Tin nhắn", tabBarIcon: tabIcon("chatbubbles") }} />
      <Tabs.Screen name="profile" options={{ title: "Cá nhân", tabBarIcon: tabIcon("person-circle") }} />
      <Tabs.Screen name="marketplace" options={{ href: null }} />
      <Tabs.Screen name="services" options={{ href: null }} />
      <Tabs.Screen name="quick-links" options={{ href: null }} />
    </Tabs>
  );
}
