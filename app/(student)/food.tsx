import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { AppBadge, AppBottomSheet, AppButton, AppCard, AppHeader, AppScreen, AppSearchBar, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { foodFilters, foodVendors, MenuItem, OpenStatus } from "@/data/prompt4Demo";

const statusLabel: Record<OpenStatus, string> = {
  open: "Đang mở",
  busy: "Đang bận",
  closed: "Đã đóng",
  temporarily_closed: "Tạm nghỉ"
};

function money(value: number) {
  return `${Math.round(value / 1000)}k`;
}

export default function FoodDealsScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("nearby");
  const [selectedVendorId, setSelectedVendorId] = useState(foodVendors[0]?.id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [savedVendors, setSavedVendors] = useState<string[]>(foodVendors.filter((vendor) => vendor.isFavorite).map((vendor) => vendor.id));
  const [savedItems, setSavedItems] = useState<string[]>(foodVendors.flatMap((vendor) => vendor.menuItems).filter((item) => item.saved).map((item) => item.id));

  const vendors = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return foodVendors.filter((vendor) => {
      const allItems = vendor.menuItems.map((item) => `${item.name} ${item.category} ${item.tags.join(" ")}`).join(" ");
      const text = `${vendor.name} ${vendor.area} ${vendor.tags.join(" ")} ${allItems}`.toLowerCase();
      const matchesQuery = !normalized || text.includes(normalized);
      const matchesFilter =
        activeFilter === "nearby" ||
        (activeFilter === "open now" && vendor.openingStatus === "open") ||
        (activeFilter === "near KTX A" && vendor.area === "KTX A") ||
        (activeFilter === "near KTX B" && vendor.area === "KTX B") ||
        (activeFilter === "under 20k" && vendor.menuItems.some((item) => item.priceVnd <= 20000)) ||
        (activeFilter === "under 30k" && vendor.menuItems.some((item) => item.priceVnd <= 30000)) ||
        (activeFilter === "under 50k" && vendor.menuItems.some((item) => item.priceVnd <= 50000)) ||
        (activeFilter === "favorite vendors" && savedVendors.includes(vendor.id)) ||
        (activeFilter === "delivery available" && vendor.deliveryAvailable) ||
        (activeFilter === "preorder available" && vendor.preorderAvailable) ||
        vendor.category === activeFilter ||
        vendor.menuItems.some((item) => item.tags.includes(activeFilter) || item.category === activeFilter);
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query, savedVendors]);

  const selectedVendor = foodVendors.find((vendor) => vendor.id === selectedVendorId) ?? foodVendors[0];

  function toggleVendor(vendorId: string) {
    setSavedVendors((current) => current.includes(vendorId) ? current.filter((id) => id !== vendorId) : [...current, vendorId]);
  }

  function toggleItem(itemId: string) {
    setSavedItems((current) => current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]);
  }

  return (
    <AppScreen>
      <AppHeader
        eyebrow="Food & Deals"
        title="Đồ ăn quanh trường"
        subtitle="Không thanh toán, không order thật, không tracking. Sinh viên đặt món thủ công qua chat với vendor."
      />

      <AppSearchBar value={query} onChangeText={setQuery} placeholder="Tìm cơm, trà sữa, mì, deal KTX..." />
      <View style={styles.chips}>
        {foodFilters.map((filter) => (
          <Pressable key={filter} onPress={() => setActiveFilter(filter)}>
            <AppBadge label={filter} tone={activeFilter === filter ? "peach" : "sky"} />
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Quán gần bạn" action={`${vendors.length} quán`} />
      {vendors.map((vendor) => (
        <AppCard key={vendor.id} tone={savedVendors.includes(vendor.id) ? "mint" : "default"}>
          <View style={styles.rowBetween}>
            <View style={styles.flex}>
              <Text style={styles.title}>{vendor.name}</Text>
              <Text style={styles.text}>{vendor.area} · {vendor.walkingMinutes} phút đi bộ · {vendor.priceHint}</Text>
            </View>
            <AppBadge label={statusLabel[vendor.openingStatus]} tone={vendor.openingStatus === "open" ? "mint" : vendor.openingStatus === "busy" ? "butter" : "danger"} />
          </View>
          <View style={styles.chips}>
            {vendor.tags.slice(0, 4).map((tag) => <AppBadge key={tag} label={tag} tone="lavender" />)}
          </View>
          <Text style={styles.text}>{vendor.locationNote}</Text>
          <View style={styles.actions}>
            <AppButton title="Xem quán" variant="secondary" onPress={() => setSelectedVendorId(vendor.id)} />
            <AppButton title={savedVendors.includes(vendor.id) ? "Đã lưu" : "Lưu quán"} variant="ghost" onPress={() => toggleVendor(vendor.id)} />
            <AppButton title="Chat đặt món" onPress={() => setSelectedItem(vendor.menuItems[0])} />
          </View>
        </AppCard>
      ))}

      <SectionHeader title="Hồ sơ vendor" action={selectedVendor.name} />
      <AppCard tone="peach">
        <Text style={styles.title}>{selectedVendor.name}</Text>
        <Text style={styles.text}>location_query: {selectedVendor.locationQuery}</Text>
        <Text style={styles.text}>Google Maps URL: {selectedVendor.mapsUrl}</Text>
        <View style={styles.actions}>
          <AppButton title="Mở bản đồ" variant="secondary" icon={<Ionicons name="map" size={18} color={colors.ink} />} onPress={() => Linking.openURL(selectedVendor.mapsUrl)} />
          <AppButton title="Chat nhanh" onPress={() => setSelectedItem(selectedVendor.menuItems[0])} />
        </View>
      </AppCard>

      <SectionHeader title="Menu quick view" action="Ảnh + món" />
      <AppCard tone="sky">
        <Text style={styles.title}>Ảnh menu</Text>
        <Text style={styles.text}>{selectedVendor.menuImage}</Text>
        <Text style={styles.text}>Tab ảnh menu giúp khách xem menu chụp nhanh khi vendor chưa nhập đủ món có cấu trúc.</Text>
      </AppCard>
      {selectedVendor.menuItems.map((item) => (
        <AppCard key={item.id} tone={savedItems.includes(item.id) ? "butter" : "default"}>
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
            <AppButton title="Chat đặt món" onPress={() => setSelectedItem(item)} />
            <AppButton title={savedItems.includes(item.id) ? "Đã lưu món" : "Lưu món"} variant="secondary" onPress={() => toggleItem(item.id)} />
            {item.orderedBefore ? <AppButton title="Đặt lại" variant="ghost" onPress={() => setSelectedItem(item)} /> : null}
          </View>
        </AppCard>
      ))}

      <SectionHeader title="Yêu thích & đặt lại" />
      <AppCard tone="lavender">
        <Text style={styles.title}>Favorite vendors: {savedVendors.length}</Text>
        <Text style={styles.text}>Saved menu items: {savedItems.length}. Reorder mở lại chat với món đã từng đặt, không tạo order thật.</Text>
      </AppCard>

      <SectionHeader title="Dịch vụ & link nhanh" />
      <View style={styles.actions}>
        <Link href="/(student)/services" asChild>
          <AppButton title="Dịch vụ sinh viên" variant="secondary" />
        </Link>
        <Link href="/(student)/quick-links" asChild>
          <AppButton title="Campus Quick Links" variant="ghost" />
        </Link>
      </View>

      <AppBottomSheet visible={Boolean(selectedItem)} title="Quick order qua chat" onClose={() => setSelectedItem(null)}>
        {selectedItem ? (
          <>
            <Text style={styles.title}>{selectedItem.name}</Text>
            <Text style={styles.text}>Tin nhắn gợi ý: Cho em đặt {selectedItem.name}, nhận ở cổng KTX B. Quán cho em xin thời gian chuẩn bị nha.</Text>
            <View style={styles.chips}>
              {selectedItem.options.map((option) => <AppBadge key={option} label={option} tone="sky" />)}
            </View>
            <AppButton title="Gửi trong chat demo" onPress={() => setSelectedItem(null)} />
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
