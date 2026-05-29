import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppHeader, AppScreen, QuickActionCard } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";

export default function OnboardingScreen() {
  return (
    <AppScreen contentStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.logoBubble}>
          <Ionicons color={colors.peachDark} name="school" size={42} />
        </View>
        <AppBadge label="VNU-HCM · Thủ Đức · Dĩ An" tone="peach" />
        <Text style={styles.title}>Student Help</Text>
        <Text style={styles.subtitle}>
          Bạn học dễ thương để đi chung, tìm đồ, săn deal và chat an toàn quanh làng đại học.
        </Text>
      </View>
      <View style={styles.grid}>
        <QuickActionCard title="Xác minh thủ công" subtitle="Admin duyệt thẻ SV, AI không tự duyệt" icon="shield-checkmark" tone="mint" />
        <QuickActionCard title="Không GPS realtime" subtitle="Tôn trọng riêng tư, chỉ dùng điểm hẹn" icon="location" tone="butter" />
      </View>
      <AppCard tone="lavender">
        <AppHeader
          title="Demo vẫn đầy đủ"
          subtitle="Màn hình nền đã có card, chip, filter sheet và nhãn tiếng Việt để khách hàng xem không bị trống."
        />
      </AppCard>
      <View style={styles.actions}>
        <Link href="/(auth)/login" asChild>
          <AppButton title="Đăng nhập" />
        </Link>
        <Link href="/(auth)/register" asChild>
          <AppButton title="Tạo tài khoản SV" variant="secondary" />
        </Link>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "space-between"
  },
  hero: {
    alignItems: "center",
    gap: spacing.md,
    paddingTop: spacing.xl
  },
  logoBubble: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.surface,
    borderRadius: 34,
    borderWidth: 3,
    height: 68,
    justifyContent: "center",
    width: 68
  },
  title: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center"
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 22,
    maxWidth: 320,
    textAlign: "center"
  },
  grid: {
    flexDirection: "row",
    gap: spacing.md
  },
  actions: {
    gap: spacing.md
  }
});

