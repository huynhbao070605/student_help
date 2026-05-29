import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

type AppBadgeProps = {
  label: string;
  tone?: "peach" | "mint" | "butter" | "lavender" | "sky" | "danger";
};

const badgeTones = {
  peach: { bg: colors.surfaceWarm, fg: colors.peachDark },
  mint: { bg: colors.mintSoft, fg: colors.success },
  butter: { bg: colors.butterSoft, fg: colors.warning },
  lavender: { bg: colors.lavenderSoft, fg: "#7057C8" },
  sky: { bg: colors.skySoft, fg: "#287EA6" },
  danger: { bg: "#FFE6E6", fg: colors.danger }
};

export function AppBadge({ label, tone = "peach" }: AppBadgeProps) {
  const selected = badgeTones[tone];

  return (
    <View style={[styles.badge, { backgroundColor: selected.bg }]}>
      <Text style={[styles.text, { color: selected.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    maxWidth: "100%",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  text: {
    fontSize: typography.tiny,
    fontWeight: "900",
    flexShrink: 1
  }
});
