import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppHeader, AppInput, AppScreen, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { campusQuickLinks, communityAlerts, services } from "@/data/prompt4Demo";

export default function AdminSettingsScreen() {
  const [alerts, setAlerts] = useState(communityAlerts);
  const [links, setLinks] = useState(campusQuickLinks);
  const [serviceRows, setServiceRows] = useState(services);
  const [newAlertTitle, setNewAlertTitle] = useState("Thông báo demo mới");

  return (
    <AppScreen>
      <AppHeader eyebrow="Admin Settings" title="Cài đặt & CRUD demo" subtitle="AI/OCR policy, community alerts, Campus Quick Links và services CRUD trên mobile." />

      <AppCard tone="peach">
        <Text style={styles.title}>AI/OCR settings display</Text>
        <Text style={styles.text}>Student cards: AI cannot approve. Lost & Found OCR: 0-10 auto pass, 11-59 admin review, 60-100 auto reject only with strong evidence.</Text>
        <View style={styles.chips}>
          <AppBadge label="AI approval disabled" tone="danger" />
          <AppBadge label="Ambiguous OCR -> admin review" tone="butter" />
        </View>
      </AppCard>

      <SectionHeader title="Community alerts CRUD" action={`${alerts.length} active`} />
      <AppCard tone="butter">
        <AppInput label="Tiêu đề cảnh báo" value={newAlertTitle} onChangeText={setNewAlertTitle} />
        <AppButton title="Create alert" onPress={() => setAlerts((current) => [{ id: `alert-local-${Date.now()}`, title: newAlertTitle, body: "Nội dung cảnh báo demo do admin tạo.", area: "VNU-HCM", severity: "info", active: true }, ...current])} />
      </AppCard>
      {alerts.slice(0, 4).map((alert) => (
        <AppCard key={alert.id}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{alert.title}</Text>
            <AppBadge label={alert.active ? "active" : "hidden"} tone={alert.active ? "mint" : "danger"} />
          </View>
          <Text style={styles.text}>{alert.area} · {alert.body}</Text>
          <View style={styles.actions}>
            <Pressable onPress={() => setAlerts((current) => current.map((item) => item.id === alert.id ? { ...item, active: !item.active } : item))}>
              <AppBadge label="Toggle" tone="sky" />
            </Pressable>
            <AppButton title="Delete" variant="ghost" onPress={() => setAlerts((current) => current.filter((item) => item.id !== alert.id))} />
          </View>
        </AppCard>
      ))}

      <SectionHeader title="Campus Quick Links CRUD" action={`${links.length} links`} />
      {links.slice(0, 3).map((link) => (
        <AppCard key={link.id} tone="sky">
          <Text style={styles.title}>{link.title}</Text>
          <Text style={styles.text}>{link.group} · {link.url}</Text>
          <View style={styles.actions}>
            <AppButton title="Edit" variant="secondary" />
            <AppButton title="Delete" variant="ghost" onPress={() => setLinks((current) => current.filter((item) => item.id !== link.id))} />
          </View>
        </AppCard>
      ))}

      <SectionHeader title="Services CRUD" action={`${serviceRows.length} services`} />
      {serviceRows.slice(0, 3).map((service) => (
        <AppCard key={service.id} tone="mint">
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.text}>{service.category} · {service.area} · {service.priceHint}</Text>
          <View style={styles.actions}>
            <AppButton title="Edit" variant="secondary" />
            <AppButton title="Delete" variant="ghost" onPress={() => setServiceRows((current) => current.filter((item) => item.id !== service.id))} />
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
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
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
