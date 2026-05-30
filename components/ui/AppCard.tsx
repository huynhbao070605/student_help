import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { colors, radius, shadows, spacing } from "@/constants/theme";

type AppCardProps = PropsWithChildren<{
  tone?: "default" | "peach" | "mint" | "butter" | "lavender" | "sky";
  style?: ViewStyle;
}>;

const toneMap = {
  default: colors.card,
  peach: colors.surfaceWarm,
  mint: colors.mintSoft,
  butter: colors.butterSoft,
  lavender: colors.lavenderSoft,
  sky: colors.skySoft
};

export function AppCard({ children, tone = "default", style }: AppCardProps) {
  return <View style={[styles.card, { backgroundColor: toneMap[tone] }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl,
    ...shadows.card
  }
});
