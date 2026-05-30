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
import { demoChats, demoMarketplace, demoProfile, demoRides } from "@/data/studentDemo";
import { useAuth } from "@/lib/auth/AuthProvider";

const actionLinks = [
  { href: "/(student)/rides" as const, title: "Di chung", subtitle: "Dat xe, tim ban cung tuyen", icon: "bicycle" as const, tone: "mint" as const },
  { href: "/(student)/marketplace" as const, title: "Cho do hoc", subtitle: "Ban, doi, muon tai lieu", icon: "storefront" as const, tone: "lavender" as const },
  { href: "/(student)/chat" as const, title: "Tin nhan", subtitle: "Trao doi nhanh va an toan", icon: "chatbubbles" as const, tone: "sky" as const }
];

export default function StudentHomeScreen() {
  const { profile } = useAuth();
  const displayName = profile?.display_name ?? demoProfile.displayName;
  const verificationStatus = profile?.verification_status ?? demoProfile.verificationStatus;
  const reputationScore = profile?.reputation_score ?? demoProfile.reputationScore;

  return (
    <AppScreen>
      <AppHeader
        eyebrow={`Xin chao, ${displayName}`}
        title="Demo luong chinh"
        subtitle="Tap trung vao di chung, mua ban va trao doi tai lieu de demo gon va on dinh hon."
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
          <AppBadge label="Khong GPS realtime" tone="mint" />
        </View>
        <Text style={styles.cardTitle}>Ban demo du thi</Text>
        <Text style={styles.text}>
          Ban nay co y an bot tinh nang phu. Muc tieu la demo nhanh cac luong chinh va giam loi phat sinh.
        </Text>
      </AppCard>

      <SectionHeader title="Loi tat nhanh" />
      <View style={styles.grid}>
        {actionLinks.map((action) => (
          <Link key={action.title} href={action.href} asChild>
            <QuickActionCard title={action.title} subtitle={action.subtitle} icon={action.icon} tone={action.tone} />
          </Link>
        ))}
      </View>

      <SectionHeader title="Goi y di chung" action={`${demoRides.length} tuyen`} />
      {demoRides.slice(0, 3).map((ride) => (
        <AppCard key={ride.id}>
          <Text style={styles.cardTitle}>{ride.origin} {"->"} {ride.destination}</Text>
          <Text style={styles.text}>{ride.transportType} · {ride.scheduleNote}</Text>
          <Text style={styles.text}>Diem hen: {ride.locationNote}</Text>
          <Link href="/(student)/rides" asChild>
            <AppButton title="Mo danh sach di chung" variant="secondary" />
          </Link>
        </AppCard>
      ))}

      <SectionHeader title="Bai dang tai lieu" action={`${demoMarketplace.length} bai`} />
      {demoMarketplace.slice(0, 3).map((post) => (
        <AppCard key={post.id} tone={post.listingType === "free" ? "mint" : "default"}>
          <Text style={styles.cardTitle}>{post.title}</Text>
          <Text style={styles.text}>{post.category} · {post.area}</Text>
          <Text style={styles.text}>{post.description}</Text>
          <Link href="/(student)/marketplace" asChild>
            <AppButton title="Mo cho do hoc" variant="secondary" />
          </Link>
        </AppCard>
      ))}

      <SectionHeader title="Tin nhan gan day" />
      {demoChats.slice(0, 3).map((chat) => (
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
    lineHeight: 21
  }
});
