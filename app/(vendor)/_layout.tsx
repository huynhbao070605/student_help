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

  TabBarIcon.displayName = `VendorTabIcon(${name})`;
  return TabBarIcon;
}

export default function VendorTabsLayout() {
  const guard = useRoleGuard("vendor");
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
      <Tabs.Screen name="index" options={{ title: "Tổng quan", tabBarIcon: tabIcon("grid") }} />
      <Tabs.Screen name="menu" options={{ title: "Menu", tabBarIcon: tabIcon("restaurant") }} />
      <Tabs.Screen name="posts" options={{ title: "Bài đăng", tabBarIcon: tabIcon("pricetags") }} />
      <Tabs.Screen name="chats" options={{ title: "Tin nhắn", tabBarIcon: tabIcon("chatbubbles") }} />
      <Tabs.Screen name="profile" options={{ title: "Hồ sơ quán", tabBarIcon: tabIcon("storefront") }} />
    </Tabs>
  );
}
