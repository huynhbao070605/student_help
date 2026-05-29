import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "@/constants/theme";

type QuickActionCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: "peach" | "mint" | "butter" | "lavender" | "sky";
  onPress?: () => void;
};

const tones = {
  peach: colors.surfaceWarm,
  mint: colors.mintSoft,
  butter: colors.butterSoft,
  lavender: colors.lavenderSoft,
  sky: colors.skySoft
};

export function QuickActionCard({ title, subtitle, icon, tone = "peach", onPress }: QuickActionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: tones[tone] }, pressed && styles.pressed]}
    >
      <View style={styles.icon}>
        <Ionicons color={colors.ink} name={icon} size={22} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    flexBasis: "46%",
    gap: spacing.sm,
    minHeight: 132,
    minWidth: 148,
    padding: spacing.md,
    ...shadows.card
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }]
  },
  icon: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  title: {
    color: colors.ink,
    fontSize: typography.body,
    fontWeight: "900",
    flexShrink: 1
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.small,
    flexShrink: 1,
    lineHeight: 18
  }
});
