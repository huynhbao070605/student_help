import * as ImagePicker from "expo-image-picker";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppBadge, AppBottomSheet, AppButton, AppCard, AppHeader, AppInput, AppScreen, AppSearchBar, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { foodVendors, MenuAvailability, MenuItem } from "@/data/prompt4Demo";

const availabilityOptions: MenuAvailability[] = ["Còn món", "Hết món", "Còn ít", "Sắp có lại"];
const itemTags = ["best seller", "new", "sold out", "daily deal", "student favorite"];
const itemOptions = ["less spicy", "no onion", "less ice", "size M/L", "pickup time"];

function money(value: number) {
  return `${Math.round(value / 1000)}k`;
}

export default function VendorMenuScreen() {
  const vendor = foodVendors[0];
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"items" | "image">("items");
  const [menuImage, setMenuImage] = useState(vendor.menuImage);
  const [items, setItems] = useState<MenuItem[]>(vendor.menuItems);
  const [editing, setEditing] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => `${item.name} ${item.category} ${item.tags.join(" ")}`.toLowerCase().includes(normalized));
  }, [items, query]);

  async function pickMenuImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.75
    });
    if (!result.canceled) {
      setMenuImage(result.assets[0]?.uri ?? menuImage);
      setTab("image");
    }
  }

  function saveItem() {
    if (!editing) return;
    setItems((current) => current.some((item) => item.id === editing.id) ? current.map((item) => item.id === editing.id ? editing : item) : [editing, ...current]);
    setEditing(null);
  }

  function addItem() {
    setEditing({
      id: `local-${Date.now()}`,
      vendorId: vendor.id,
      name: "Món mới",
      category: "rice meal",
      description: "Mô tả ngắn cho sinh viên",
      priceVnd: 25000,
      availability: "Còn món",
      tags: ["new"],
      options: ["pickup time"]
    });
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Vendor Menu" title="Menu quán" subtitle="Upload ảnh menu, nhập món có cấu trúc, đánh dấu tình trạng và tuỳ chọn món." />
      <View style={styles.actions}>
        <Pressable onPress={() => setTab("items")}><AppBadge label="structured items" tone={tab === "items" ? "peach" : "sky"} /></Pressable>
        <Pressable onPress={() => setTab("image")}><AppBadge label="menu image tab" tone={tab === "image" ? "peach" : "sky"} /></Pressable>
      </View>

      {tab === "image" ? (
        <AppCard tone="sky">
          <Text style={styles.title}>Ảnh menu hiện tại</Text>
          <Text style={styles.text}>{menuImage}</Text>
          <Text style={styles.text}>Ảnh được dùng cho khách xem nhanh khi chưa cần đặt món có cấu trúc.</Text>
          <AppButton title="Upload menu image" onPress={pickMenuImage} />
        </AppCard>
      ) : (
        <>
          <AppSearchBar value={query} onChangeText={setQuery} placeholder="Tìm món, best seller, daily deal..." />
          <View style={styles.actions}>
            <AppButton title="Thêm món" onPress={addItem} />
            <AppButton title="Upload ảnh menu" variant="secondary" onPress={pickMenuImage} />
          </View>
          <SectionHeader title="Món có cấu trúc" action={`${filtered.length} món`} />
          {filtered.map((item) => (
            <AppCard key={item.id} tone={item.availability === "Hết món" ? "peach" : "default"}>
              <View style={styles.rowBetween}>
                <View style={styles.flex}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.text}>{money(item.priceVnd)} · {item.description}</Text>
                </View>
                <AppBadge label={item.availability} tone={item.availability === "Còn món" ? "mint" : item.availability === "Còn ít" ? "butter" : "danger"} />
              </View>
              <View style={styles.chips}>
                {item.tags.map((tag) => <AppBadge key={tag} label={tag} tone="peach" />)}
                {item.options.map((option) => <AppBadge key={option} label={option} tone="sky" />)}
              </View>
              <View style={styles.actions}>
                <AppButton title="Sửa" variant="secondary" onPress={() => setEditing(item)} />
                <AppButton title="Xoá" variant="ghost" onPress={() => setItems((current) => current.filter((row) => row.id !== item.id))} />
              </View>
            </AppCard>
          ))}
        </>
      )}

      <AppBottomSheet visible={Boolean(editing)} title="Add / edit structured menu item" onClose={() => setEditing(null)}>
        {editing ? (
          <>
            <AppInput label="Tên món" value={editing.name} onChangeText={(name) => setEditing({ ...editing, name })} />
            <AppInput label="Mô tả" value={editing.description} onChangeText={(description) => setEditing({ ...editing, description })} />
            <AppInput label="Giá VND" keyboardType="numeric" value={String(editing.priceVnd)} onChangeText={(value) => setEditing({ ...editing, priceVnd: Number(value) || 0 })} />
            <Text style={styles.title}>Tình trạng</Text>
            <View style={styles.chips}>
              {availabilityOptions.map((availability) => (
                <Pressable key={availability} onPress={() => setEditing({ ...editing, availability })}>
                  <AppBadge label={availability} tone={editing.availability === availability ? "peach" : "sky"} />
                </Pressable>
              ))}
            </View>
            <Text style={styles.title}>Item tags</Text>
            <View style={styles.chips}>
              {itemTags.map((tag) => <AppBadge key={tag} label={tag} tone={editing.tags.includes(tag) ? "mint" : "lavender"} />)}
            </View>
            <Text style={styles.title}>Item options</Text>
            <View style={styles.chips}>
              {itemOptions.map((option) => <AppBadge key={option} label={option} tone={editing.options.includes(option) ? "mint" : "sky"} />)}
            </View>
            <AppButton title="Lưu món" onPress={saveItem} />
          </>
        ) : null}
      </AppBottomSheet>
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
