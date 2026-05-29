import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

type AppSearchBarProps = {
  value?: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
};

export function AppSearchBar({ value, placeholder = "Tìm nhanh...", onChangeText }: AppSearchBarProps) {
  return (
    <View style={styles.wrap}>
      <Ionicons color={colors.muted} name="search" size={20} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.lg
  },
  input: {
    color: colors.ink,
    flex: 1,
    fontSize: typography.body
  }
});

