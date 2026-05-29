import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppHeader, AppScreen, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { adminQueues, communityAlerts, foodVendors, services } from "@/data/prompt4Demo";

const manageAreas = [
  "student verification",
  "ride posts",
  "marketplace posts",
  "lost_found posts",
  "vendor posts",
  "services",
  "reports",
  "community alerts",
  "quick links"
];

export default function AdminDashboardScreen() {
  return (
    <AppScreen>
      <AppHeader
        eyebrow="Admin mobile"
        title="Tổng quan điều hành"
        subtitle="Duyệt thủ công, quản lý vendor, báo cáo, block, nội dung cộng đồng và cấu hình an toàn."
      />

      <View style={styles.grid}>
        {adminQueues.stats.map((stat, index) => (
          <AppCard key={stat.label} tone={index % 2 === 0 ? "mint" : "butter"} style={styles.statCard}>
            <Text style={styles.stat}>{stat.value}</Text>
            <Text style={styles.text}>{stat.label}</Text>
          </AppCard>
        ))}
      </View>

      <AppCard tone="peach">
        <Text style={styles.title}>AI không được duyệt thẻ sinh viên</Text>
        <Text style={styles.text}>AI/OCR chỉ hiển thị gợi ý rủi ro. Admin là người duyệt cuối cùng cho student verification.</Text>
        <View style={styles.chips}>
          <AppBadge label="manual admin review only" tone="danger" />
          <AppBadge label="OCR ambiguous -> admin review" tone="butter" />
        </View>
      </AppCard>

      <SectionHeader title="Hàng đợi nhanh" />
      {adminQueues.verifications.map((item) => (
        <AppCard key={item.id}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{item.student}</Text>
            <AppBadge label={item.status} tone={item.status === "approved" ? "mint" : "butter"} />
          </View>
          <Text style={styles.text}>{item.note}</Text>
          <Link href="/(admin)/verifications" asChild>
            <AppButton title="Mở duyệt SV" variant="secondary" />
          </Link>
        </AppCard>
      ))}

      <SectionHeader title="Quản lý được" />
      <View style={styles.chips}>
        {manageAreas.map((area) => <AppBadge key={area} label={area} tone="sky" />)}
      </View>

      <SectionHeader title="Nội dung đang bật" />
      <AppCard tone="lavender">
        <Text style={styles.title}>{foodVendors.length} vendors · {services.length} services · {communityAlerts.length} alerts</Text>
        <Text style={styles.text}>Admin CRUD nằm trong các tab Vendor, Báo cáo và Cài đặt demo.</Text>
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  statCard: {
    flexBasis: "47%",
    flexGrow: 1
  },
  rowBetween: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  stat: {
    color: colors.ink,
    fontSize: typography.title,
    fontWeight: "900"
  },
  title: {
    color: colors.ink,
    flex: 1,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  text: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 21
  }
});
