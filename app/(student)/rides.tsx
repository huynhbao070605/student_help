import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

import {
  AppBadge,
  AppBottomSheet,
  AppButton,
  AppCard,
  AppHeader,
  AppInput,
  AppScreen,
  AppSearchBar,
  ReputationBadge,
  SectionHeader,
  VerifiedBadge
} from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { demoRides, type RidePost } from "@/data/studentDemo";
import { useAuth } from "@/lib/auth/AuthProvider";
import { supabase } from "@/lib/supabase/client";

const filterLabels = ["Đi từ", "Đến", "Khu vực", "Trường", "Thời gian", "Phương tiện", "Vai trò", "Giới tính", "Đã xác minh", "Uy tín tối thiểu", "Còn chỗ", "Mới nhất"];

const emptyForm = {
  origin: "",
  destination: "",
  campus: "VNU-HCM",
  area: "Làng Đại học",
  departAt: "",
  transportType: "Xe máy",
  roleType: "Tìm bạn đi cùng",
  genderPreference: "Không yêu cầu",
  locationNote: "",
  safetyNote: ""
};

export default function RideListScreen() {
  const { profile } = useAuth();
  const [rides, setRides] = useState<RidePost[]>(demoRides);
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<RidePost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [openOnly, setOpenOnly] = useState(true);
  const [minRep, setMinRep] = useState("0");
  const [visibleLimit, setVisibleLimit] = useState(16);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("ride_posts")
      .select("id, owner_id, origin, destination, campus, depart_at, schedule_note, transport_type, seats_available, safety_note, status, created_at")
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (!data?.length) return;
        setRides(data.map((row) => ({
          id: row.id,
          ownerId: row.owner_id,
          ownerName: row.owner_id === profile?.id ? profile.display_name : "Bạn sinh viên",
          origin: row.origin,
          destination: row.destination,
          campus: row.campus ?? "VNU-HCM",
          area: row.campus ?? "Làng Đại học",
          departAt: row.depart_at ?? new Date().toISOString(),
          scheduleNote: row.schedule_note ?? "Hẹn giờ qua chat",
          transportType: row.transport_type ?? "Chưa rõ",
          roleType: "Tìm bạn đi cùng",
          genderPreference: "Không yêu cầu",
          seatsAvailable: row.seats_available ?? 1,
          safetyNote: row.safety_note ?? "Chỉ xác nhận qua chat, không dùng GPS realtime.",
          locationNote: row.schedule_note ?? "Hẹn ở điểm công cộng.",
          verified: true,
          reputation: 70,
          status: row.status,
          createdAt: row.created_at
        })));
      });
  }, [profile]);

  const visibleRides = useMemo(() => {
    const lower = query.toLowerCase();
    return rides
      .filter((ride) => !openOnly || (ride.status === "active" && ride.seatsAvailable > 0))
      .filter((ride) => !verifiedOnly || ride.verified)
      .filter((ride) => ride.reputation >= Number(minRep || 0))
      .filter((ride) => [ride.origin, ride.destination, ride.area, ride.campus, ride.transportType, ride.locationNote].join(" ").toLowerCase().includes(lower))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .slice(0, visibleLimit);
  }, [minRep, openOnly, query, rides, verifiedOnly, visibleLimit]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function openEdit(ride: RidePost) {
    setEditing(ride);
    setForm({
      origin: ride.origin,
      destination: ride.destination,
      campus: ride.campus,
      area: ride.area,
      departAt: ride.departAt,
      transportType: ride.transportType,
      roleType: ride.roleType,
      genderPreference: ride.genderPreference,
      locationNote: ride.locationNote,
      safetyNote: ride.safetyNote
    });
    setFormOpen(true);
  }

  async function saveRide() {
    const now = new Date().toISOString();
    const ownerId = profile?.id ?? "demo-student";
    const nextRide: RidePost = {
      id: editing?.id ?? `local-ride-${Date.now()}`,
      ownerId,
      ownerName: profile?.display_name ?? "Bạn",
      origin: form.origin || "KTX Khu B",
      destination: form.destination || "ĐH KHTN",
      campus: form.campus,
      area: form.area,
      departAt: form.departAt || now,
      scheduleNote: form.locationNote || "Hẹn giờ qua chat",
      transportType: form.transportType,
      roleType: form.roleType,
      genderPreference: form.genderPreference,
      seatsAvailable: 1,
      safetyNote: form.safetyNote || "Chỉ gặp ở nơi công cộng, không chia sẻ GPS realtime.",
      locationNote: form.locationNote || "Hẹn ở cổng trường/KTX.",
      verified: profile?.verification_status === "approved",
      reputation: profile?.reputation_score ?? 50,
      status: "active",
      createdAt: editing?.createdAt ?? now
    };

    if (supabase && profile) {
      const payload = {
        owner_id: profile.id,
        origin: nextRide.origin,
        destination: nextRide.destination,
        campus: nextRide.campus,
        depart_at: nextRide.departAt,
        schedule_note: `${nextRide.scheduleNote} · ${nextRide.locationNote} · ${nextRide.roleType} · ${nextRide.genderPreference}`,
        transport_type: nextRide.transportType,
        seats_available: 1,
        safety_note: nextRide.safetyNote,
        status: "active" as const
      };
      const request = editing
        ? supabase.from("ride_posts").update(payload).eq("id", editing.id).eq("owner_id", profile.id)
        : supabase.from("ride_posts").insert(payload).select("id").single();
      const { data, error } = await request;
      if (error) {
        setMessage(error.message);
        return;
      }
      if (!editing && data && "id" in data) nextRide.id = data.id;
    }

    setRides((current) => editing ? current.map((ride) => ride.id === editing.id ? nextRide : ride) : [nextRide, ...current]);
    setMessage(editing ? "Đã cập nhật bài đi chung." : "Đã đăng bài đi chung.");
    setFormOpen(false);
  }

  async function deleteRide(ride: RidePost) {
    if (supabase && profile && ride.ownerId === profile.id) {
      await supabase.from("ride_posts").delete().eq("id", ride.id).eq("owner_id", profile.id);
    }
    setRides((current) => current.filter((item) => item.id !== ride.id));
    setMessage("Đã xoá bài đi chung.");
  }

  async function requestMatch(ride: RidePost) {
    if (supabase && profile) {
      await supabase.from("matches").insert({
        source_type: "ride_post",
        source_id: ride.id,
        target_type: "profile",
        target_id: profile.id,
        score: 86,
        reason: `Tuyến ${ride.origin} → ${ride.destination}, ${ride.transportType}`
      });
    }
    setMessage(`Đã gửi yêu cầu đi chung. Nhớ đọc ghi chú an toàn: ${ride.safetyNote}`);
  }

  async function completeRide(ride: RidePost) {
    if (supabase && profile) {
      await supabase.from("reputation_events").insert({
        user_id: profile.id,
        event_type: "successful_meetup",
        points: 5,
        source_type: "ride_post",
        source_id: ride.id,
        note: "Hoàn tất một lượt đi chung an toàn."
      });
    }
    setMessage("Đã ghi nhận hoàn tất. +5 uy tín sẽ hiển thị sau khi đồng bộ.");
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Ride Together" title="Đi chung" subtitle="Tìm bạn cùng tuyến bằng điểm hẹn và thời gian. Không realtime GPS." />
      {message ? <AppCard tone="butter"><Text style={styles.text}>{message}</Text></AppCard> : null}
      <View style={styles.searchRow}>
        <View style={styles.search}>
          <AppSearchBar value={query} onChangeText={setQuery} placeholder="Tìm điểm đi, điểm đến, khu vực..." />
        </View>
        <AppButton title="Lọc" variant="secondary" icon={<Ionicons color={colors.ink} name="options" size={18} />} onPress={() => setFilterOpen(true)} style={styles.filterButton} />
      </View>
      <View style={styles.chips}>
        <AppBadge label="Không GPS realtime" tone="mint" />
        <AppBadge label="Có Google Maps" tone="sky" />
        <AppBadge label="Ghi chú an toàn" tone="butter" />
      </View>
      <AppButton title="Đăng tuyến đi chung" onPress={openCreate} />
      <SectionHeader title={`${visibleRides.length} gợi ý phù hợp`} action="Mới nhất" />
      {visibleRides.map((ride) => {
        const own = ride.ownerId === profile?.id;
        return (
          <AppCard key={ride.id} tone={own ? "peach" : "default"}>
            <View style={styles.cardTop}>
              <Text style={styles.title}>{ride.origin} → {ride.destination}</Text>
              <View style={styles.chips}>
                <VerifiedBadge status={ride.verified ? "verified" : "pending"} />
                <ReputationBadge score={ride.reputation} />
                <AppBadge label={ride.transportType} tone="sky" />
              </View>
            </View>
            <Text style={styles.text}>{ride.scheduleNote}</Text>
            <Text style={styles.text}>Điểm hẹn: {ride.locationNote}</Text>
            <Text style={styles.text}>Vai trò: {ride.roleType} · Ưu tiên: {ride.genderPreference}</Text>
            <Text style={styles.safety}>Sau khi match: {ride.safetyNote}</Text>
            <View style={styles.actions}>
              <AppButton title="Mở Maps" variant="secondary" onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(`${ride.origin} ${ride.destination}`)}`)} />
              <AppButton title="Xin match" variant="ghost" onPress={() => requestMatch(ride)} />
              <AppButton title="Hoàn tất" variant="ghost" onPress={() => completeRide(ride)} />
              {own ? <AppButton title="Sửa" variant="secondary" onPress={() => openEdit(ride)} /> : null}
              {own ? <AppButton title="Xoá" variant="ghost" onPress={() => deleteRide(ride)} /> : null}
            </View>
          </AppCard>
        );
      })}

      <AppBottomSheet visible={filterOpen} title="Bộ lọc đi chung" onClose={() => setFilterOpen(false)}>
        {visibleRides.length >= visibleLimit ? (
          <AppButton title="Tai them tuyen" variant="secondary" onPress={() => setVisibleLimit((value) => value + 12)} />
        ) : null}
        {filterLabels.map((label, index) => <AppBadge key={label} label={label} tone={index % 3 === 0 ? "peach" : index % 3 === 1 ? "sky" : "mint"} />)}
        <AppInput label="Uy tín tối thiểu" value={minRep} onChangeText={setMinRep} keyboardType="number-pad" />
        <AppButton title={verifiedOnly ? "Đang lọc: đã xác minh" : "Chỉ người đã xác minh"} variant="secondary" onPress={() => setVerifiedOnly((value) => !value)} />
        <AppButton title={openOnly ? "Đang lọc: còn chỗ" : "Chỉ bài còn match"} variant="secondary" onPress={() => setOpenOnly((value) => !value)} />
        <AppButton title="Áp dụng bộ lọc" onPress={() => setFilterOpen(false)} />
      </AppBottomSheet>

      <AppBottomSheet visible={formOpen} title={editing ? "Sửa tuyến đi chung" : "Đăng tuyến đi chung"} onClose={() => setFormOpen(false)}>
        <AppInput label="Đi từ" value={form.origin} onChangeText={(origin) => setForm((value) => ({ ...value, origin }))} />
        <AppInput label="Đến" value={form.destination} onChangeText={(destination) => setForm((value) => ({ ...value, destination }))} />
        <AppInput label="Khu vực" value={form.area} onChangeText={(area) => setForm((value) => ({ ...value, area }))} />
        <AppInput label="Trường/campus" value={form.campus} onChangeText={(campus) => setForm((value) => ({ ...value, campus }))} />
        <AppInput label="Thời gian" value={form.departAt} onChangeText={(departAt) => setForm((value) => ({ ...value, departAt }))} placeholder="VD: 07:10 sáng mai" />
        <AppInput label="Phương tiện" value={form.transportType} onChangeText={(transportType) => setForm((value) => ({ ...value, transportType }))} />
        <AppInput label="Vai trò" value={form.roleType} onChangeText={(roleType) => setForm((value) => ({ ...value, roleType }))} />
        <AppInput label="Ưu tiên giới tính" value={form.genderPreference} onChangeText={(genderPreference) => setForm((value) => ({ ...value, genderPreference }))} />
        <AppInput label="Ghi chú điểm hẹn" value={form.locationNote} onChangeText={(locationNote) => setForm((value) => ({ ...value, locationNote }))} />
        <AppInput label="Ghi chú an toàn sau match" value={form.safetyNote} onChangeText={(safetyNote) => setForm((value) => ({ ...value, safetyNote }))} multiline />
        <AppButton title={editing ? "Lưu thay đổi" : "Đăng bài"} onPress={saveRide} />
      </AppBottomSheet>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  searchRow: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  search: { flex: 1 },
  filterButton: { minHeight: 48, paddingHorizontal: spacing.md },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  cardTop: { gap: spacing.sm },
  title: { color: colors.ink, fontSize: typography.h2, fontWeight: "900" },
  text: { color: colors.muted, fontSize: typography.body, lineHeight: 21 },
  safety: { color: colors.ink, fontSize: typography.small, fontWeight: "800", lineHeight: 19 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }
});
