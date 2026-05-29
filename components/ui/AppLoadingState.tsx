import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/constants/theme";

type AppLoadingStateProps = {
  label?: string;
};

export function AppLoadingState({ label = "Dang chuan bi du lieu..." }: AppLoadingStateProps) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={colors.peachDark} />
      <Text style={styles.text}>{label}</Text>
      <View style={styles.skeletonWide} />
      <View style={styles.skeletonShort} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    gap: spacing.sm,
    justifyContent: "center",
    padding: spacing.xl
  },
  text: {
    color: colors.muted,
    fontSize: typography.body,
    textAlign: "center"
  },
  skeletonWide: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    height: 10,
    marginTop: spacing.sm,
    width: 180
  },
  skeletonShort: {
    backgroundColor: colors.line,
    borderRadius: 999,
    height: 10,
    width: 120
  }
});
