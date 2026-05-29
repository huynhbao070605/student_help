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

  TabBarIcon.displayName = `AdminTabIcon(${name})`;
  return TabBarIcon;
}

export default function AdminTabsLayout() {
  const guard = useRoleGuard("admin");
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
      <Tabs.Screen name="verifications" options={{ title: "Duyệt SV", tabBarIcon: tabIcon("shield-checkmark") }} />
      <Tabs.Screen name="reports" options={{ title: "Báo cáo", tabBarIcon: tabIcon("flag") }} />
      <Tabs.Screen name="vendors" options={{ title: "Vendor", tabBarIcon: tabIcon("storefront") }} />
      <Tabs.Screen name="settings" options={{ title: "Cài đặt", tabBarIcon: tabIcon("settings") }} />
    </Tabs>
  );
}
