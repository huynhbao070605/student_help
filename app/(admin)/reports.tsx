import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppHeader, AppScreen, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { adminQueues } from "@/data/prompt4Demo";

export default function AdminReportsScreen() {
  const [reports, setReports] = useState(adminQueues.reports);
  const [blocks, setBlocks] = useState(adminQueues.blocks);

  return (
    <AppScreen>
      <AppHeader eyebrow="Admin Safety" title="Reports & Blocks" subtitle="Moderation cho ride, marketplace, lost_found, vendor posts, services, chat và user." />

      <SectionHeader title="Reports" action={`${reports.length} mục`} />
      {reports.map((report) => (
        <AppCard key={report.id} tone={report.status === "open" ? "butter" : "default"}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{report.target}</Text>
            <AppBadge label={report.status} tone={report.status === "resolved" ? "mint" : "butter"} />
          </View>
          <Text style={styles.text}>{report.reason}</Text>
          <View style={styles.actions}>
            <AppButton title="Moderate" variant="secondary" />
            <Pressable onPress={() => setReports((current) => current.map((item) => item.id === report.id ? { ...item, status: "resolved" } : item))}>
              <AppBadge label="Close" tone="mint" />
            </Pressable>
          </View>
        </AppCard>
      ))}

      <SectionHeader title="Blocks" action={`${blocks.length} block`} />
      {blocks.map((block) => (
        <AppCard key={block.id} tone="peach">
          <Text style={styles.title}>{block.blocker} chặn {block.blocked}</Text>
          <Text style={styles.text}>{block.reason}</Text>
          <View style={styles.actions}>
            <AppButton title="Xem chat" variant="secondary" />
            <AppButton title="Gỡ block demo" variant="ghost" onPress={() => setBlocks((current) => current.filter((item) => item.id !== block.id))} />
          </View>
        </AppCard>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  actions: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  title: {
    color: colors.ink,
    flex: 1,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  text: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 21
  }
});
