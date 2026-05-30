import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
import { demoMarketplace, demoProfile, demoRides } from "@/data/studentDemo";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useChatPreviews } from "@/lib/student/chatStore";

const actionLinks = [
  { href: "/(student)/rides" as const, title: "Đi chung", subtitle: "Đặt hẹn, tìm bạn cùng tuyến", icon: "bicycle" as const, tone: "mint" as const },
  { href: "/(student)/marketplace" as const, title: "Chợ đồ học tập", subtitle: "Bán, đổi, mượn tài liệu", icon: "storefront" as const, tone: "lavender" as const },
  { href: "/(student)/chat" as const, title: "Tin nhắn", subtitle: "Trao đổi nhanh và an toàn", icon: "chatbubbles" as const, tone: "sky" as const }
];

export default function StudentHomeScreen() {
  const { profile } = useAuth();
  const chats = useChatPreviews();
  const displayName = profile?.display_name ?? demoProfile.displayName;
  const verificationStatus = profile?.verification_status ?? demoProfile.verificationStatus;
  const reputationScore = profile?.reputation_score ?? demoProfile.reputationScore;

  return (
    <AppScreen>
      <AppHeader
        eyebrow={`Xin chào, ${displayName}`}
        title="Hôm nay học gì?"
        subtitle="Đi chung, trao đổi tài liệu và nhắn tin an toàn quanh UIT/KTX."
        right={<Avatar name={displayName} />}
      />

      <AppCard tone="peach">
        <View style={styles.profileRow}>
          <VerifiedBadge
            status={
              verificationStatus === "approved"
                ? "verified"
                : verificationStatus === "pending"
                  ? "pending"
                  : "rejected"
            }
          />
          <ReputationBadge score={reputationScore} />
          <AppBadge label="Không chia sẻ GPS trực tiếp" tone="mint" />
        </View>
        <Text style={styles.cardTitle}>Sẵn sàng đi học hôm nay</Text>
        <Text style={styles.text}>
          Bạn đã sẵn sàng tìm bạn đi chung, trao đổi đồ học tập và nhắn tin an toàn quanh UIT/KTX.
        </Text>
      </AppCard>

      <SectionHeader title="Lối tắt nhanh" />
      <View style={styles.grid}>
        {actionLinks.map((action) => (
          <Link key={action.title} href={action.href} asChild>
            <QuickActionCard title={action.title} subtitle={action.subtitle} icon={action.icon} tone={action.tone} />
          </Link>
        ))}
      </View>

      <SectionHeader title="Gợi ý đi chung" action={`${demoRides.length} tuyến`} />
      {demoRides.slice(0, 3).map((ride) => (
        <AppCard key={ride.id}>
          <Text style={styles.cardTitle}>{ride.origin} → {ride.destination}</Text>
          <Text style={styles.text}>{ride.transportType} · {ride.scheduleNote}</Text>
          <Text style={styles.text}>Điểm hẹn: {ride.locationNote}</Text>
          <Link href="/(student)/rides" asChild>
            <AppButton title="Mở danh sách đi chung" variant="secondary" />
          </Link>
        </AppCard>
      ))}

      <SectionHeader title="Bài đăng tài liệu" action={`${demoMarketplace.length} bài`} />
      {demoMarketplace.slice(0, 3).map((post) => (
        <AppCard key={post.id} tone={post.listingType === "free" ? "mint" : "default"}>
          <Text style={styles.cardTitle}>{post.title}</Text>
          <Text style={styles.text}>{post.category} · {post.area}</Text>
          <Text style={styles.text}>{post.description}</Text>
          <Link href="/(student)/marketplace" asChild>
            <AppButton title="Mở chợ đồ học" variant="secondary" />
          </Link>
        </AppCard>
      ))}

      <SectionHeader title="Tin nhắn gần đây" />
      {chats.slice(0, 3).map((chat) => (
        <Link key={chat.id} href="/(student)/chat" asChild>
          <Pressable>
            <AppCard tone={chat.unread ? "lavender" : "default"}>
              <Text style={styles.cardTitle}>{chat.participantName}</Text>
              <Text style={styles.text}>{chat.lastMessage}</Text>
            </AppCard>
          </Pressable>
        </Link>
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
  cardTitle: {
    color: colors.ink,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  text: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 23
  }
});
