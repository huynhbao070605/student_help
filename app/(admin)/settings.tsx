import { AppCard, AppHeader, AppScreen, SectionHeader } from "@/components/ui";
import { Text, StyleSheet } from "react-native";

import { colors, typography } from "@/constants/theme";

export default function AdminSettingsScreen() {
  return (
    <AppScreen>
      <AppHeader eyebrow="Admin" title="Cài đặt" subtitle="Placeholder cho cấu hình demo và quyền quản trị." />
      <SectionHeader title="Nguyên tắc an toàn" />
      <AppCard tone="butter">
        <Text style={styles.title}>Không tự động duyệt thẻ SV</Text>
        <Text style={styles.text}>Admin là người duyệt cuối cùng. Dữ liệu riêng tư không hiển thị cho vendor.</Text>
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.ink,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  text: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 21
  }
});

