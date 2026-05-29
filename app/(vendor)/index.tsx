import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppHeader, AppInput, AppScreen, SectionHeader } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { foodVendors, OpenStatus, vendorPosts, vendorTags } from "@/data/prompt4Demo";

const statusOptions: OpenStatus[] = ["open", "busy", "closed", "temporarily_closed"];
const statusText: Record<OpenStatus, string> = {
  open: "open",
  busy: "busy",
  closed: "closed",
  temporarily_closed: "temporarily_closed"
};

export default function VendorDashboardScreen() {
  const baseVendor = foodVendors[0];
  const [openingStatus, setOpeningStatus] = useState<OpenStatus>(baseVendor.openingStatus);
  const [shopName, setShopName] = useState(baseVendor.name);
  const [locationQuery, setLocationQuery] = useState(baseVendor.locationQuery);
  const [locationNote, setLocationNote] = useState(baseVendor.locationNote);
  const posts = vendorPosts.filter((post) => post.vendorId === baseVendor.id);

  return (
    <AppScreen>
      <AppHeader
        eyebrow="Vendor"
        title="Tổng quan quán"
        subtitle="Quản lý shop, menu, bài đăng và chat thủ công. Không thanh toán, không tracking giao hàng."
      />

      <AppCard tone="peach">
        <View style={styles.rowBetween}>
          <View style={styles.flex}>
            <Text style={styles.title}>{shopName}</Text>
            <Text style={styles.text}>{baseVendor.area} · {baseVendor.priceHint} · reputation {baseVendor.reputation}</Text>
          </View>
          <AppBadge label={statusText[openingStatus]} tone={openingStatus === "open" ? "mint" : openingStatus === "busy" ? "butter" : "danger"} />
        </View>
        <View style={styles.chips}>
          {statusOptions.map((status) => (
            <Pressable key={status} onPress={() => setOpeningStatus(status)}>
              <AppBadge label={status} tone={openingStatus === status ? "peach" : "sky"} />
            </Pressable>
          ))}
        </View>
      </AppCard>

      <SectionHeader title="Shop profile edit" />
      <AppCard>
        <AppInput label="Tên quán" value={shopName} onChangeText={setShopName} />
        <AppInput label="location_query" value={locationQuery} onChangeText={setLocationQuery} />
        <AppInput label="location_note" value={locationNote} onChangeText={setLocationNote} />
        <Text style={styles.text}>Google Maps URL: {baseVendor.mapsUrl}</Text>
        <View style={styles.actions}>
          <AppButton title="Lưu hồ sơ demo" />
          <AppButton title="Mở Maps" variant="secondary" icon={<Ionicons name="map" size={18} color={colors.ink} />} onPress={() => Linking.openURL(baseVendor.mapsUrl)} />
        </View>
      </AppCard>

      <SectionHeader title="Tags hiển thị" />
      <View style={styles.chips}>
        {vendorTags.map((tag) => (
          <AppBadge key={tag} label={tag} tone={baseVendor.tags.includes(tag) ? "mint" : "lavender"} />
        ))}
      </View>

      <SectionHeader title="Hôm nay" action="chat-only" />
      <View style={styles.grid}>
        <AppCard tone="mint" style={styles.statCard}>
          <Text style={styles.stat}>18</Text>
          <Text style={styles.text}>Tin nhắn order</Text>
        </AppCard>
        <AppCard tone="butter" style={styles.statCard}>
          <Text style={styles.stat}>{baseVendor.menuItems.length}</Text>
          <Text style={styles.text}>Món đang nhập</Text>
        </AppCard>
      </View>

      <SectionHeader title="Bài đăng mới" />
      {posts.map((post) => (
        <AppCard key={post.id} tone="sky">
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{post.title}</Text>
            <AppBadge label={post.type} tone="peach" />
          </View>
          <Text style={styles.text}>{post.body}</Text>
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
  grid: {
    flexDirection: "row",
    gap: spacing.md
  },
  statCard: {
    flex: 1
  },
  stat: {
    color: colors.ink,
    fontSize: typography.title,
    fontWeight: "900"
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
