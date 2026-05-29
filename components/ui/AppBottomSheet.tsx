import { Ionicons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "@/constants/theme";

type AppBottomSheetProps = PropsWithChildren<{
  visible: boolean;
  title: string;
  onClose: () => void;
}>;

export function AppBottomSheet({ visible, title, onClose, children }: AppBottomSheetProps) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Pressable accessibilityRole="button" hitSlop={12} onPress={onClose}>
            <Ionicons color={colors.ink} name="close" size={24} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(52, 43, 43, 0.28)",
    flex: 1
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    bottom: 0,
    gap: spacing.lg,
    left: 0,
    padding: spacing.lg,
    position: "absolute",
    right: 0,
    ...shadows.card
  },
  handle: {
    alignSelf: "center",
    backgroundColor: colors.line,
    borderRadius: radius.pill,
    height: 5,
    width: 44
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    color: colors.ink,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  body: {
    gap: spacing.md,
    maxHeight: 520
  }
});
