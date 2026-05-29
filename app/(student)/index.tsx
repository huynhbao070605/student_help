import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import {
  AppBadge,
  AppButton,
  AppCard,
  AppHeader,
  AppScreen,
  Avatar,
  QuickActionCard,
  ReputationBadge,
  SectionHeader,
  VerifiedBadge
} from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import {
  demoAlerts,
  demoChats,
  demoFood,
  demoProfile,
  demoQuickLinks,
  demoRides
} from "@/data/studentDemo";
import { useAuth } from "@/lib/auth/AuthProvider";
import { supabase } from "@/lib/supabase/client";

const actionLinks = [
  { href: "/(student)/rides" as const, title: "Đi chung", subtitle: "Tìm bạn cùng tuyến", icon: "bicycle" as const, tone: "mint" as const },
  { href: "/(student)/lost-found" as const, title: "Tìm đồ", subtitle: "Smart search không cần AI", icon: "search-circle" as const, tone: "butter" as const },
  { href: "/(student)/marketplace" as const, title: "Chợ đồ học", subtitle: "Bán, đổi, mượn, cho mượn", icon: "storefront" as const, tone: "lavender" as const },
  { href: "/(student)/chat" as const, title: "Tin nhắn", subtitle: "Chat và xin SĐT có đồng ý", icon: "chatbubbles" as const, tone: "sky" as const }
];

type AlertRow = { id: string; title: string; body: string; severity: string | null; area: string | null };
type LinkRow = { id: string; title: string; description: string | null; url: string };

export default function StudentHomeScreen() {
  const { profile } = useAuth();
  const [alerts, setAlerts] = useState<AlertRow[]>(demoAlerts);
  const [quickLinks, setQuickLinks] = useState<LinkRow[]>(demoQuickLinks);

  useEffect(() => {
    if (!supabase) return;

    supabase
      .from("community_alerts")
      .select("id, title, body, severity, area")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data?.length) setAlerts(data);
      });

    supabase
      .from("campus_quick_links")
      .select("id, title, description, url")
      .eq("is_active", true)
      .order("sort_order")
      .limit(3)
      .then(({ data }) => {
        if (data?.length) setQuickLinks(data);
      });
  }, []);

  const activeProfile = useMemo(
    () => ({
      displayName: profile?.display_name ?? demoProfile.displayName,
      verificationStatus: profile?.verification_status ?? demoProfile.verificationStatus,
      reputationScore: profile?.reputation_score ?? demoProfile.reputationScore
    }),
    [profile]
  );

  return (
    <AppScreen>
      <AppHeader
        eyebrow={`Xin chào, ${activeProfile.displayName}`}
        title="Hôm nay cần giúp gì?"
        subtitle="Đi chung, tìm đồ, trao đổi đồ học và chat an toàn quanh VNU-HCM."
        right={<Avatar name={activeProfile.displayName} />}
      />

      <AppCard tone="peach">
        <View style={styles.profileRow}>
          <VerifiedBadge status={activeProfile.verificationStatus === "approved" ? "verified" : activeProfile.verificationStatus === "pending" ? "pending" : "rejected"} />
          <ReputationBadge score={activeProfile.reputationScore} />
        </View>
        <Text style={styles.cardTitle}>Không chia sẻ SĐT nếu chưa đồng ý</Text>
        <Text style={styles.text}>Student Help không dùng GPS realtime, không thanh toán, không theo dõi giao hàng. Mọi thứ quan trọng đều xác nhận qua chat.</Text>
      </AppCard>

      <SectionHeader title="Lối tắt nhanh" />
      <View style={styles.grid}>
        {actionLinks.map((action) => (
          <Link key={action.title} href={action.href} asChild>
            <QuickActionCard title={action.title} subtitle={action.subtitle} icon={action.icon} tone={action.tone} />
          </Link>
        ))}
      </View>

      <SectionHeader title="Cảnh báo cộng đồng" action="3 mới" />
      {alerts.slice(0, 2).map((alert, index) => (
        <AppCard key={alert.id} tone={index === 0 ? "sky" : "butter"}>
          <View style={styles.cardTop}>
            <AppBadge label={alert.area ?? "VNU-HCM"} tone={alert.severity === "warning" ? "butter" : "sky"} />
            <Text style={styles.cardTitle}>{alert.title}</Text>
          </View>
          <Text style={styles.text}>{alert.body}</Text>
        </AppCard>
      ))}

      <SectionHeader title="Gần bạn có gì ngon?" action="Đặt qua chat" />
      {demoFood.map((item) => (
        <AppCard key={item.id} tone="mint">
          <View style={styles.rowBetween}>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.text}>{item.area} · đi bộ khoảng {item.minutes} phút · {item.deal}</Text>
            </View>
            <Ionicons color={colors.peachDark} name="fast-food" size={24} />
          </View>
          <Link href="/(student)/food" asChild>
            <AppButton title="Xem deal" variant="secondary" />
          </Link>
        </AppCard>
      ))}

      <SectionHeader title="Gợi ý đi chung" />
      {demoRides.slice(0, 2).map((ride) => (
        <AppCard key={ride.id}>
          <Text style={styles.cardTitle}>{ride.origin} → {ride.destination}</Text>
          <Text style={styles.text}>{ride.transportType} · {ride.scheduleNote} · {ride.locationNote}</Text>
          <Link href="/(student)/rides" asChild>
            <AppButton title="Xem tuyến" variant="ghost" />
          </Link>
        </AppCard>
      ))}

      <SectionHeader title="Tin nhắn mới" />
      {demoChats.slice(0, 2).map((chat) => (
        <Link key={chat.id} href="/(student)/chat" asChild>
          <Pressable>
            <AppCard tone={chat.unread ? "lavender" : "default"}>
              <View style={styles.rowBetween}>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{chat.participantName}</Text>
                  <Text style={styles.text}>{chat.lastMessage}</Text>
                </View>
                {chat.unread ? <AppBadge label="Tin mới" tone="peach" /> : null}
              </View>
            </AppCard>
          </Pressable>
        </Link>
      ))}

      <SectionHeader title="Campus Quick Links" />
      {quickLinks.map((item) => (
        <AppCard key={item.id} tone="butter">
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.text}>{item.description}</Text>
          <AppButton title="Mở liên kết" variant="secondary" onPress={() => Linking.openURL(item.url)} />
        </AppCard>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  profileRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  cardTop: {
    gap: spacing.sm
  },
  rowBetween: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  flex: {
    flex: 1,
    gap: spacing.xs
  },
  cardTitle: {
    color: colors.ink,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  text: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 21
  }
});
