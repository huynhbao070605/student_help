import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, typography } from "@/constants/theme";
import { AppButton } from "./AppButton";
import { AppCard } from "./AppCard";

type AppErrorStateProps = {
  title?: string;
  message: string;
  actionLabel?: string;
};

export function AppErrorState({ title = "Có lỗi nhỏ rồi", message, actionLabel }: AppErrorStateProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.icon}>
        <Ionicons color={colors.danger} name="alert-circle" size={24} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel ? <AppButton title={actionLabel} variant="secondary" /> : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center"
  },
  icon: {
    alignItems: "center",
    backgroundColor: "#FFE6E6",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  title: {
    color: colors.ink,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  message: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 21,
    textAlign: "center"
  }
});
