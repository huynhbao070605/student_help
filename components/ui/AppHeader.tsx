import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/constants/theme";

type AppHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
};

export function AppHeader({ eyebrow, title, subtitle, right }: AppHeaderProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.copy}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  copy: {
    flex: 1,
    gap: spacing.xs
  },
  eyebrow: {
    color: colors.peachDark,
    fontSize: typography.small,
    fontWeight: "800"
  },
  title: {
    color: colors.ink,
    fontSize: typography.title,
    fontWeight: "900",
    flexShrink: 1
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 21
  },
  right: {
    flexShrink: 0
  }
});
