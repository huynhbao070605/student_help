import { StyleSheet, Text, View } from "react-native";

import { AppBadge, AppCard, AppHeader, AppScreen, Avatar, ReputationBadge, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";

export default function VendorProfileScreen() {
  return (
    <AppScreen>
      <AppHeader eyebrow="Vendor" title="Cơm tấm Cô Ba" subtitle="Quán demo gần KTX Khu B" right={<Avatar name="Cô Ba" size={56} />} />
      <AppCard tone="peach">
        <View style={styles.row}>
          <AppBadge label="Đang mở" tone="mint" />
          <ReputationBadge score={91} />
        </View>
        <Text style={styles.title}>Hồ sơ quán thân thiện</Text>
        <Text style={styles.text}>Vendor chỉ quản lý shop, menu, bài đăng và chat của chính mình.</Text>
      </AppCard>
      <SectionHeader title="Nhãn demo" />
      <View style={styles.row}>
        <AppBadge label="Deal SV" tone="peach" />
        <AppBadge label="Menu ảnh" tone="sky" />
        <AppBadge label="Chat để đặt" tone="butter" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  title: {
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

