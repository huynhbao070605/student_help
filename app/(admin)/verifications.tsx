import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppBadge, AppButton, AppCard, AppErrorState, AppHeader, AppLoadingState, AppScreen } from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { supabase } from "@/lib/supabase/client";

type VerificationRow = {
  id: string;
  student_id: string;
  status: string;
  created_at: string;
  admin_note: string | null;
};

export default function AdminVerificationsScreen() {
  const [rows, setRows] = useState<VerificationRow[]>([]);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [message, setMessage] = useState<string | null>(null);

  async function loadRows() {
    if (!supabase) {
      setRows([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("student_verifications")
      .select("id, student_id, status, created_at, admin_note")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      setMessage(error.message);
    } else {
      setRows((data ?? []) as VerificationRow[]);
    }
    setLoading(false);
  }

  async function review(id: string, action: "approve" | "reject") {
    if (!supabase) return;
    setMessage(null);
    const rpcName = action === "approve" ? "approve_student_verification" : "reject_student_verification";
    const { error } = await supabase.rpc(rpcName, {
      target_verification_id: id,
      admin_note_text: action === "approve" ? "Admin mobile approval" : "Admin mobile rejection"
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage(action === "approve" ? "Đã duyệt và cộng 20 điểm uy tín." : "Đã từ chối hồ sơ.");
      await loadRows();
    }
  }

  useEffect(() => {
    Promise.resolve()
      .then(loadRows)
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : "Không tải được hàng duyệt."));
  }, []);

  if (loading) {
    return <AppLoadingState label="Đang tải hàng duyệt..." />;
  }

  return (
    <AppScreen>
      <AppHeader
        eyebrow="Admin"
        title="Duyệt SV"
        subtitle="Xác minh thẻ sinh viên thủ công. AI không được tự phê duyệt."
      />
      {!supabase ? (
        <AppErrorState message="Supabase chưa được cấu hình. Hàng duyệt sẽ có dữ liệu sau khi chạy migration và seed trên cloud/staging hoặc local." />
      ) : null}
      {message ? <AppErrorState title="Thông báo" message={message} /> : null}
      {(rows.length ? rows : [
        { id: "demo-1", student_id: "Minh Anh", status: "pending", created_at: new Date().toISOString(), admin_note: null },
        { id: "demo-2", student_id: "Quang Huy", status: "rejected", created_at: new Date().toISOString(), admin_note: "Ảnh hơi mờ" }
      ]).map((row) => (
        <AppCard key={row.id} tone={row.status === "pending" ? "butter" : "peach"}>
          <View style={styles.row}>
            <Text style={styles.title}>{row.student_id}</Text>
            <AppBadge label={row.status} tone={row.status === "pending" ? "butter" : "peach"} />
          </View>
          <Text style={styles.text}>Ngày gửi: {new Date(row.created_at).toLocaleDateString("vi-VN")}</Text>
          <Text style={styles.text}>Vendor không thể xem giấy tờ xác minh này.</Text>
          {row.status === "pending" && supabase ? (
            <View style={styles.actions}>
              <AppButton title="Duyệt +20 điểm" onPress={() => review(row.id, "approve")} />
              <AppButton title="Từ chối" variant="secondary" onPress={() => review(row.id, "reject")} />
            </View>
          ) : null}
        </AppCard>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "space-between"
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
