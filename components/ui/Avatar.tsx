import { StyleSheet, Text, View } from "react-native";

import { colors, typography } from "@/constants/theme";

type AvatarProps = {
  name: string;
  size?: number;
};

export function Avatar({ name, size = 44 }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={[styles.avatar, { height: size, width: size, borderRadius: size / 2 }]}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    backgroundColor: colors.lavenderSoft,
    borderColor: colors.surface,
    borderWidth: 2,
    justifyContent: "center"
  },
  text: {
    color: colors.ink,
    fontSize: typography.small,
    fontWeight: "900"
  }
});
