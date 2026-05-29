import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppHeader, AppInput, AppScreen, AppSearchBar, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { VendorPost, VendorPostType, vendorPosts } from "@/data/prompt4Demo";

const postTypes: VendorPostType[] = ["daily deal", "new item", "combo", "notice", "sold out", "group order"];

export default function VendorPostsScreen() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<VendorPostType | "all">("all");
  const [rows, setRows] = useState<VendorPost[]>(vendorPosts);
  const [title, setTitle] = useState("Deal mới cho sinh viên");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return rows.filter((post) => {
      const matchesType = activeType === "all" || post.type === activeType;
      const matchesQuery = !normalized || `${post.title} ${post.body} ${post.type}`.toLowerCase().includes(normalized);
      return matchesType && matchesQuery;
    });
  }, [activeType, query, rows]);

  function addPost(type: VendorPostType) {
    setRows((current) => [
      {
        id: `local-${Date.now()}`,
        vendorId: "vendor-1",
        type,
        title,
        body: "Bài đăng demo hiển thị cho sinh viên, khách vẫn đặt qua chat.",
        badge: type
      },
      ...current
    ]);
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Vendor Posts" title="Bài đăng quán" subtitle="Daily deal, món mới, combo, notice, sold out và group order cho sinh viên." />
      <AppSearchBar value={query} onChangeText={setQuery} placeholder="Tìm deal, combo, sold out..." />
      <View style={styles.chips}>
        <Pressable onPress={() => setActiveType("all")}><AppBadge label="all" tone={activeType === "all" ? "peach" : "sky"} /></Pressable>
        {postTypes.map((type) => (
          <Pressable key={type} onPress={() => setActiveType(type)}>
            <AppBadge label={type} tone={activeType === type ? "peach" : "sky"} />
          </Pressable>
        ))}
      </View>
      <AppCard tone="butter">
        <AppInput label="Tiêu đề nhanh" value={title} onChangeText={setTitle} />
        <View style={styles.actions}>
          {postTypes.slice(0, 3).map((type) => <AppButton key={type} title={type} variant="secondary" onPress={() => addPost(type)} />)}
        </View>
      </AppCard>
      <SectionHeader title="Bài đang hiển thị" action={`${filtered.length} bài`} />
      {filtered.map((post) => (
        <AppCard key={post.id} tone={post.type === "sold out" ? "peach" : "default"}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{post.title}</Text>
            <AppBadge label={post.type} tone={post.type === "daily deal" ? "mint" : post.type === "sold out" ? "danger" : "lavender"} />
          </View>
          <Text style={styles.text}>{post.body}</Text>
          <View style={styles.actions}>
            <AppButton title="Sửa" variant="secondary" />
            <AppButton title="Ẩn" variant="ghost" onPress={() => setRows((current) => current.filter((row) => row.id !== post.id))} />
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
