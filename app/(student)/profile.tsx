import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import {
  AppBadge,
  AppButton,
  AppCard,
  AppErrorState,
  AppHeader,
  AppInput,
  AppLoadingState,
  AppScreen,
  Avatar,
  ReputationBadge,
  SectionHeader,
  VerifiedBadge
} from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { demoProfile } from "@/data/studentDemo";
import { useAuth } from "@/lib/auth/AuthProvider";
import { pickImageFromLibrary, uploadLocalImage } from "@/lib/storage/uploadImage";
import { supabase } from "@/lib/supabase/client";

function formatDate(value?: string | null) {
  if (!value) return "Chưa có";
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

export default function ProfileScreen() {
  const { configured, loading, logout, profile, refreshProfile, user } = useAuth();
  const activeProfile = profile ?? {
    display_name: demoProfile.displayName,
    phone: demoProfile.phone ?? "",
    phone_share_enabled: false,
    verification_status: demoProfile.verificationStatus,
    reputation_score: demoProfile.reputationScore,
    created_at: demoProfile.createdAt,
    last_active_at: demoProfile.lastActiveAt
  };
  const [displayName, setDisplayName] = useState(activeProfile.display_name);
  const [phone, setPhone] = useState(activeProfile.phone ?? "");
  const [phoneShareEnabled, setPhoneShareEnabled] = useState(activeProfile.phone_share_enabled ?? false);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const stats = useMemo(() => [
    { label: "Đi chung hoàn tất", value: 4 },
    { label: "Trao đổi, mượn trả", value: 7 },
    { label: "Trả đồ thành công", value: 2 }
  ], []);

  async function saveProfile() {
    if (!supabase || !user) {
      setMessage("Chưa thể lưu hồ sơ lúc này. Vui lòng đăng nhập lại hoặc thử sau.");
      return;
    }

    setBusy(true);
    setMessage(null);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        phone,
        phone_share_enabled: phoneShareEnabled,
        last_active_at: new Date().toISOString()
      })
      .eq("id", user.id);

    if (error) {
      console.error("Failed to save profile", error);
      setMessage("Chưa lưu được hồ sơ. Vui lòng thử lại.");
    } else {
      await refreshProfile();
      setMessage("Đã lưu hồ sơ.");
    }
    setBusy(false);
  }

  async function uploadAvatar() {
    if (!supabase || !user) {
      setMessage("Chưa thể tải ảnh lúc này. Vui lòng đăng nhập lại hoặc thử sau.");
      return;
    }

    const image = await pickImageFromLibrary();
    if (!image) return;

    setBusy(true);
    setMessage(null);
    try {
      const path = `${user.id}/avatar-${Date.now()}.jpg`;
      await uploadLocalImage("avatars", path, image.uri);
      const { error } = await supabase.from("profiles").update({ avatar_path: path }).eq("id", user.id);
      if (error) throw error;
      await refreshProfile();
      setMessage("Đã tải ảnh đại diện.");
    } catch (error) {
      console.error("Failed to upload avatar", error);
      setMessage("Không tải được ảnh. Vui lòng thử lại.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadStudentCard() {
    if (!supabase || !user) {
      setMessage("Chưa thể gửi thẻ sinh viên lúc này. Vui lòng đăng nhập lại hoặc thử sau.");
      return;
    }

    const image = await pickImageFromLibrary();
    if (!image) return;

    setBusy(true);
    setMessage(null);
    try {
      const path = `${user.id}/student-card-${Date.now()}.jpg`;
      await uploadLocalImage("student-cards", path, image.uri);
      const { error } = await supabase.from("student_verifications").insert({
        student_id: user.id,
        card_front_path: path,
        status: "pending",
        submitted_note: "Uploaded from mobile profile screen"
      });
      if (error) throw error;
      await supabase.from("profiles").update({ verification_status: "pending" }).eq("id", user.id);
      await refreshProfile();
      setMessage("Đã gửi thẻ sinh viên. Admin sẽ duyệt thủ công.");
    } catch (error) {
      console.error("Failed to upload student card", error);
      setMessage("Không gửi được thẻ sinh viên. Vui lòng thử lại.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <AppLoadingState label="Đang tải hồ sơ..." />;
  }

  return (
    <AppScreen>
      <AppHeader
        eyebrow="Cá nhân"
        title={activeProfile.display_name}
        subtitle="Hồ sơ sinh viên, uy tín, huy hiệu và quyền riêng tư số điện thoại."
        right={<Avatar name={activeProfile.display_name} size={56} />}
      />
      {!configured ? (
        <AppErrorState message="Chưa kết nối hệ thống đăng nhập. Màn này đang hiển thị dữ liệu gợi ý và các thao tác sẽ báo lỗi thân thiện." />
      ) : null}
      {message ? <AppErrorState title="Thông báo" message={message} /> : null}

      <AppCard tone="mint">
        <View style={styles.row}>
          <VerifiedBadge status={activeProfile.verification_status === "approved" ? "verified" : activeProfile.verification_status === "pending" ? "pending" : "rejected"} />
          <ReputationBadge score={activeProfile.reputation_score} />
        </View>
        <Text style={styles.title}>Uy tín giúp tạo niềm tin, không thay thế an toàn cá nhân</Text>
        <Text style={styles.text}>Điểm tăng khi xác minh sinh viên, đi chung hoàn tất, trao đổi tốt hoặc trả đồ thành công. Báo cáo vi phạm có thể làm giảm điểm sau khi admin duyệt.</Text>
      </AppCard>

      <SectionHeader title="Thống kê sinh viên" />
      <View style={styles.statsGrid}>
        {stats.map((item) => (
          <AppCard key={item.label} tone="butter" style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.text}>{item.label}</Text>
          </AppCard>
        ))}
      </View>

      <SectionHeader title="Thông tin hồ sơ" />
      <AppCard>
        <AppInput label="Tên hiển thị" value={displayName} onChangeText={setDisplayName} />
        <AppInput label="Số điện thoại riêng tư" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <View style={styles.switchRow}>
          <View style={styles.switchCopy}>
            <Text style={styles.title}>Cho phép gửi yêu cầu SĐT</Text>
            <Text style={styles.text}>Người khác vẫn phải được bạn đồng ý trước khi thấy số.</Text>
          </View>
          <Switch value={phoneShareEnabled} onValueChange={setPhoneShareEnabled} />
        </View>
        <View style={styles.metaRows}>
          <Text style={styles.text}>Tạo tài khoản: {formatDate(activeProfile.created_at)}</Text>
          <Text style={styles.text}>Hoạt động gần nhất: {formatDate(activeProfile.last_active_at)}</Text>
        </View>
        <AppButton title={busy ? "Đang lưu..." : "Lưu hồ sơ"} onPress={saveProfile} />
      </AppCard>

      <SectionHeader title="Xác minh sinh viên" />
      <AppCard tone="butter">
        <Text style={styles.text}>Thẻ sinh viên chỉ được admin duyệt thủ công. Đối tác không thấy ảnh giấy tờ xác minh.</Text>
        <AppButton title="Tải ảnh thẻ sinh viên" variant="secondary" onPress={uploadStudentCard} />
        <AppButton title="Tải ảnh đại diện" variant="ghost" onPress={uploadAvatar} />
      </AppCard>

      <SectionHeader title="Huy hiệu" />
      <View style={styles.row}>
        <AppBadge label="Sinh viên đã xác minh" tone="mint" />
        <AppBadge label="Bạn đi chung tử tế" tone="sky" />
        <AppBadge label="Tìm đồ có tâm" tone="butter" />
        <AppBadge label="Săn ưu đãi" tone="peach" />
      </View>

      <SectionHeader title="Quyền riêng tư" />
      <AppCard tone="lavender">
        <Text style={styles.text}>SĐT chỉ hiện sau yêu cầu được duyệt. Ảnh thẻ sinh viên chỉ dành cho chủ tài khoản và admin. Không chia sẻ GPS trực tiếp.</Text>
      </AppCard>

      <AppButton title="Đăng xuất" variant="secondary" onPress={logout} />
      <Link href="/(auth)/onboarding" asChild>
        <AppButton title="Về màn chào mừng" variant="ghost" />
      </Link>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  switchRow: { alignItems: "center", flexDirection: "row", gap: spacing.md, justifyContent: "space-between" },
  switchCopy: { flex: 1, gap: spacing.xs },
  title: { color: colors.ink, fontSize: typography.h2, fontWeight: "900" },
  text: { color: colors.muted, fontSize: typography.body, lineHeight: 23 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  statCard: { flexBasis: "30%", flexGrow: 1, minWidth: 100 },
  statValue: { color: colors.primaryDark, fontSize: 28, fontWeight: "900" },
  metaRows: { gap: spacing.xs }
});
