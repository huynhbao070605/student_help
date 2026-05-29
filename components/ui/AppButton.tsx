import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

type AppButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  style?: ViewStyle;
};

export function AppButton({ title, onPress, variant = "primary", icon, style }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}
    >
      {icon}
      <Text style={[styles.text, variant === "ghost" && styles.ghostText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.lg
  },
  primary: {
    backgroundColor: colors.peach
  },
  secondary: {
    backgroundColor: colors.butterSoft,
    borderColor: colors.butter,
    borderWidth: 1
  },
  ghost: {
    backgroundColor: "transparent"
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }]
  },
  text: {
    color: colors.ink,
    fontSize: typography.body,
    fontWeight: "800"
  },
  ghostText: {
    color: colors.peachDark
  }
});

