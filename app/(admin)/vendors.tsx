import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppHeader, AppInput, AppScreen, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { foodVendors } from "@/data/prompt4Demo";

export default function AdminVendorsScreen() {
  const [rows, setRows] = useState(foodVendors);
  const [phone, setPhone] = useState("0900000001");
  const [name, setName] = useState("Vendor demo mới");

  function createVendor() {
    setRows((current) => [
      {
        ...foodVendors[0],
        id: `vendor-local-${Date.now()}`,
        ownerPhone: phone,
        name,
        openingStatus: "closed",
        tags: ["Admin verified"],
        menuItems: []
      },
      ...current
    ]);
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Admin Vendor" title="Quản lý vendor" subtitle="Admin tạo tài khoản vendor bằng phone-style login và seed password vendor123456." />

      <AppCard tone="butter">
        <Text style={styles.title}>Create vendor account</Text>
        <AppInput label="Phone-style login" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <AppInput label="Tên shop" value={name} onChangeText={setName} />
        <Text style={styles.text}>Email nội bộ: {phone}@vendor.studenthelp.local · seed password: vendor123456</Text>
        <AppButton title="Tạo vendor demo" onPress={createVendor} />
      </AppCard>

      <SectionHeader title="Vendor management" action={`${rows.length} shop`} />
      {rows.map((vendor) => (
        <AppCard key={vendor.id} tone={vendor.openingStatus === "temporarily_closed" ? "peach" : "default"}>
          <View style={styles.rowBetween}>
            <View style={styles.flex}>
              <Text style={styles.title}>{vendor.name}</Text>
              <Text style={styles.text}>{vendor.ownerPhone} · {vendor.area} · {vendor.locationQuery}</Text>
            </View>
            <AppBadge label={vendor.openingStatus} tone={vendor.openingStatus === "open" ? "mint" : "butter"} />
          </View>
          <View style={styles.chips}>
            {vendor.tags.map((tag) => <AppBadge key={tag} label={tag} tone="lavender" />)}
          </View>
          <View style={styles.actions}>
            <AppButton title="Reset vendor" variant="secondary" />
            <Pressable onPress={() => setRows((current) => current.map((item) => item.id === vendor.id ? { ...item, openingStatus: "temporarily_closed" } : item))}>
              <AppBadge label="Suspend" tone="danger" />
            </Pressable>
            <AppButton title="Vendor posts" variant="ghost" />
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
  flex: {
    flex: 1,
    gap: spacing.xs
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
    fontSize: typography.h2,
    fontWeight: "900"
  },
  text: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 21
  }
});
