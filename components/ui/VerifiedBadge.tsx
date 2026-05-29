import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

type VerifiedBadgeProps = {
  status?: "verified" | "pending" | "rejected";
};

const copy = {
  verified: { label: "Đã xác minh SV", color: colors.success, icon: "checkmark-circle" as const },
  pending: { label: "Đang chờ duyệt", color: colors.warning, icon: "time" as const },
  rejected: { label: "Cần gửi lại", color: colors.danger, icon: "alert-circle" as const }
};

export function VerifiedBadge({ status = "verified" }: VerifiedBadgeProps) {
  const item = copy[status];

  return (
    <View style={styles.badge}>
      <Ionicons color={item.color} name={item.icon} size={15} />
      <Text style={[styles.text, { color: item.color }]}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  text: {
    fontSize: typography.tiny,
    fontWeight: "900"
  }
});

