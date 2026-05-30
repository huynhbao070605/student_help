import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppHeader, AppScreen, AppSearchBar, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { campusQuickLinks } from "@/data/prompt4Demo";

const filters = ["all", "saved", "Bản đồ", "Di chuyển", "Học vụ", "An toàn", "KTX", "library"];

export default function CampusQuickLinksScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [saved, setSaved] = useState(campusQuickLinks.filter((link) => link.saved).map((link) => link.id));

  const links = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return campusQuickLinks.filter((link) => {
      const text = `${link.group} ${link.title} ${link.description} ${link.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !normalized || text.includes(normalized);
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "saved" && saved.includes(link.id)) ||
        link.group === activeFilter ||
        link.tags.includes(activeFilter);
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query, saved]);

  function toggleSaved(id: string) {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Campus Quick Links" title="Link nhanh campus" subtitle="Nhóm link bản đồ, bus, học vụ, thư viện và an toàn cho sinh viên." />
      <AppSearchBar value={query} onChangeText={setQuery} placeholder="Tìm bus, thư viện, UIT, KTX..." />
      <View style={styles.chips}>
        {filters.map((filter) => (
          <Pressable key={filter} onPress={() => setActiveFilter(filter)}>
            <AppBadge label={filter} tone={activeFilter === filter ? "peach" : "sky"} />
          </Pressable>
        ))}
      </View>
      <SectionHeader title="Theo nhóm" action={`${links.length} link`} />
      {links.map((link) => (
        <AppCard key={link.id} tone={saved.includes(link.id) ? "butter" : "default"}>
          <View style={styles.rowBetween}>
            <View style={styles.flex}>
              <Text style={styles.title}>{link.title}</Text>
              <Text style={styles.text}>{link.group} · {link.description}</Text>
            </View>
            <AppBadge label={saved.includes(link.id) ? "saved" : "link"} tone={saved.includes(link.id) ? "mint" : "lavender"} />
          </View>
          <View style={styles.chips}>
            {link.tags.map((tag) => <AppBadge key={tag} label={tag} tone="sky" />)}
          </View>
          <View style={styles.actions}>
            <AppButton title="Mở" icon={<Ionicons name="open" size={18} color={colors.ink} />} onPress={() => Linking.openURL(link.url)} />
            <AppButton title={saved.includes(link.id) ? "Bỏ lưu" : "Lưu link"} variant="secondary" onPress={() => toggleSaved(link.id)} />
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
