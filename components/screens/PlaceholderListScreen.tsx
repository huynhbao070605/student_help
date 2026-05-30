import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import {
  AppBadge,
  AppBottomSheet,
  AppButton,
  AppCard,
  AppHeader,
  AppScreen,
  AppSearchBar,
  SectionHeader
} from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";

type PlaceholderCard = {
  title: string;
  meta: string;
  badge: string;
};

type PlaceholderListScreenProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  cards: PlaceholderCard[];
  filterLabels: string[];
};

export function PlaceholderListScreen({
  eyebrow,
  title,
  subtitle,
  searchPlaceholder,
  cards,
  filterLabels
}: PlaceholderListScreenProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <AppScreen>
      <AppHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <View style={styles.searchRow}>
        <View style={styles.search}>
          <AppSearchBar placeholder={searchPlaceholder} />
        </View>
        <AppButton
          title="Lọc"
          variant="secondary"
          icon={<Ionicons color={colors.ink} name="options" size={18} />}
          onPress={() => setSheetOpen(true)}
          style={styles.filterButton}
        />
      </View>
      <View style={styles.chips}>
        {filterLabels.slice(0, 3).map((label, index) => (
          <AppBadge key={label} label={label} tone={index === 0 ? "peach" : "sky"} />
        ))}
      </View>
      <SectionHeader title="Gợi ý nổi bật" action="Xem tất cả" />
      {cards.map((card, index) => (
        <AppCard key={card.title} tone={index % 2 === 0 ? "default" : "mint"}>
          <View style={styles.cardTop}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <AppBadge label={card.badge} tone={index % 2 === 0 ? "butter" : "mint"} />
          </View>
          <Text style={styles.meta}>{card.meta}</Text>
          <View style={styles.actions}>
            <AppButton title="Xem chi tiết" variant="secondary" />
            <AppButton title="Chat" variant="ghost" />
          </View>
        </AppCard>
      ))}
      <AppBottomSheet visible={sheetOpen} title={`Bộ lọc ${title.toLowerCase()}`} onClose={() => setSheetOpen(false)}>
        {filterLabels.map((label, index) => (
          <AppCard key={label} tone={index % 2 === 0 ? "peach" : "sky"} style={styles.filterItem}>
            <Text style={styles.filterText}>{label}</Text>
          </AppCard>
        ))}
        <AppButton title="Áp dụng bộ lọc" onPress={() => setSheetOpen(false)} />
      </AppBottomSheet>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  search: {
    flex: 1
  },
  filterButton: {
    minHeight: 48,
    paddingHorizontal: spacing.md
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  cardTop: {
    gap: spacing.sm
  },
  cardTitle: {
    color: colors.ink,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  meta: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 21
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  filterItem: {
    paddingVertical: spacing.md
  },
  filterText: {
    color: colors.ink,
    fontSize: typography.body,
    fontWeight: "800"
  }
});
