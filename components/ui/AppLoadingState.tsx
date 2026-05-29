import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/constants/theme";

type AppLoadingStateProps = {
  label?: string;
};

export function AppLoadingState({ label = "Đang chuẩn bị dữ liệu..." }: AppLoadingStateProps) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={colors.peachDark} />
      <Text style={styles.text}>{label}</Text>
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
    fontSize: typography.body
  }
});

