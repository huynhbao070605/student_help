import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

type ReputationBadgeProps = {
  score: number;
};

export function ReputationBadge({ score }: ReputationBadgeProps) {
  return (
    <View style={styles.badge}>
      <Ionicons color={colors.warning} name="star" size={15} />
      <Text style={styles.text}>{score} điểm uy tín</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.butterSoft,
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  text: {
    color: colors.ink,
    fontSize: typography.tiny,
    fontWeight: "900"
  }
});

