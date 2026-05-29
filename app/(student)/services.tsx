import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppHeader, AppScreen, AppSearchBar, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { services } from "@/data/prompt4Demo";

const filters = ["category", "area", "open now", "open late", "student discount", "delivery available", "preorder available", "admin verified", "favorited by many", "good rating"];

export default function StudentServicesScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("category");
  const [favorites, setFavorites] = useState(["svc-1", "svc-5"]);

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return services.filter((service) => {
      const text = `${service.title} ${service.category} ${service.area} ${service.description} ${service.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !normalized || text.includes(normalized);
      const matchesFilter =
        activeFilter === "category" ||
        activeFilter === "area" ||
        (activeFilter === "open now" && service.openStatus === "open") ||
        (activeFilter === "good rating" && service.rating >= 4.6) ||
        service.tags.includes(activeFilter);
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query]);

  function toggleFavorite(id: string) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Student Services" title="Dịch vụ sinh viên" subtitle="In ấn, giặt sấy, sửa xe, laptop, gia sư và hỗ trợ campus quanh VNU-HCM." />
      <AppSearchBar value={query} onChangeText={setQuery} placeholder="Tìm in ấn, giặt sấy, sửa xe..." />
      <View style={styles.chips}>
        {filters.map((filter) => (
          <Pressable key={filter} onPress={() => setActiveFilter(filter)}>
            <AppBadge label={filter} tone={activeFilter === filter ? "peach" : "sky"} />
          </Pressable>
        ))}
      </View>
      <SectionHeader title="Danh bạ dịch vụ" action={`${rows.length} kết quả`} />
      {rows.map((service) => (
        <AppCard key={service.id} tone={favorites.includes(service.id) ? "mint" : "default"}>
          <View style={styles.rowBetween}>
            <View style={styles.flex}>
              <Text style={styles.title}>{service.title}</Text>
              <Text style={styles.text}>{service.category} · {service.area} · {service.priceHint}</Text>
            </View>
            <AppBadge label={service.openStatus === "open" ? "open now" : service.openStatus} tone={service.openStatus === "open" ? "mint" : "butter"} />
          </View>
          <Text style={styles.text}>{service.description}</Text>
          <View style={styles.chips}>
            {service.tags.map((tag) => <AppBadge key={tag} label={tag} tone="lavender" />)}
            <AppBadge label={`${service.rating.toFixed(1)}★`} tone="butter" />
          </View>
          <View style={styles.actions}>
            <AppButton title="Chat hỏi dịch vụ" />
            <AppButton title={favorites.includes(service.id) ? "Đã lưu" : "Lưu"} variant="secondary" onPress={() => toggleFavorite(service.id)} />
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
