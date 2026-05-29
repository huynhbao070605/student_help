import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import {
  AppBadge,
  AppBottomSheet,
  AppButton,
  AppCard,
  AppHeader,
  AppInput,
  AppScreen,
  AppSearchBar,
  SectionHeader
} from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { demoLostFound, demoSavedSearches, type LostFoundPost } from "@/data/studentDemo";
import { useAuth } from "@/lib/auth/AuthProvider";
import { analyzePrivacyText, smartFilterLostFound } from "@/lib/student/privacySearch";
import { pickImageFromLibrary, uploadLocalImage } from "@/lib/storage/uploadImage";
import { supabase } from "@/lib/supabase/client";

const filterLabels = ["Mất/Nhặt", "Danh mục", "Khu vực", "Ngày", "Màu", "Hãng", "Trạng thái duyệt", "Đã trả", "Có ảnh", "Smart search"];
const emptyForm = {
  postType: "lost" as LostFoundPost["postType"],
  title: "",
  description: "",
  category: "Đồ cá nhân",
  color: "",
  brand: "",
  locationText: "",
  privacyText: "",
  privacyChecked: false
};

export default function LostFoundListScreen() {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<LostFoundPost[]>(demoLostFound);
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<LostFoundPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<"all" | LostFoundPost["postType"]>("all");
  const [savedSearches, setSavedSearches] = useState(demoSavedSearches);
  const [message, setMessage] = useState<string | null>(null);
  const [visibleLimit, setVisibleLimit] = useState(18);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("lost_found_posts")
      .select("id, owner_id, post_type, title, description, category, color, brand, location_text, event_at, image_paths, privacy_review_status, ocr_risk_score, ocr_evidence, status, created_at")
      .order("created_at", { ascending: false })
      .limit(40)
      .then(({ data }) => {
        if (!data?.length) return;
        setPosts(data.map((row) => ({
          id: row.id,
          ownerId: row.owner_id,
          ownerName: row.owner_id === profile?.id ? profile.display_name : "Bạn sinh viên",
          postType: row.post_type,
          title: row.title,
          description: row.description ?? "",
          category: row.category ?? "Đồ cá nhân",
          color: row.color ?? "",
          brand: row.brand ?? "",
          locationText: row.location_text ?? "Làng Đại học",
          eventAt: row.event_at ?? row.created_at,
          imagePaths: row.image_paths ?? [],
          privacyReviewStatus: row.privacy_review_status,
          ocrRiskScore: row.ocr_risk_score ?? 0,
          ocrEvidence: row.ocr_evidence ?? "Chưa có OCR.",
          status: row.status,
          returned: row.status === "closed",
          createdAt: row.created_at
        })));
      });
  }, [profile]);

  const visiblePosts = useMemo(() => {
    return smartFilterLostFound(posts, query)
      .filter(({ post }) => typeFilter === "all" || post.postType === typeFilter)
      .filter(({ post }) => post.status === "active" || post.status === "closed")
      .slice(0, visibleLimit);
  }, [posts, query, typeFilter, visibleLimit]);

  const privacyRisk = useMemo(() => analyzePrivacyText(`${form.title} ${form.description} ${form.privacyText}`), [form.description, form.privacyText, form.title]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setImageUri(null);
    setFormOpen(true);
  }

  function openEdit(post: LostFoundPost) {
    setEditing(post);
    setForm({
      postType: post.postType,
      title: post.title,
      description: post.description,
      category: post.category,
      color: post.color,
      brand: post.brand,
      locationText: post.locationText,
      privacyText: post.ocrEvidence,
      privacyChecked: post.privacyReviewStatus === "auto_pass" || post.privacyReviewStatus === "approved"
    });
    setImageUri(null);
    setFormOpen(true);
  }

  async function chooseImage() {
    try {
      const image = await pickImageFromLibrary();
      if (image) setImageUri(image.uri);
      setMessage("Nhắc nhẹ: hãy che SĐT, MSSV, CCCD, ngân hàng hoặc địa chỉ rõ trước khi đăng.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không chọn được ảnh.");
    }
  }

  async function savePost() {
    let imagePaths = editing?.imagePaths ?? [];
    if (imageUri && supabase && profile) {
      const path = `${profile.id}/lost-found-${Date.now()}.jpg`;
      await uploadLocalImage("lost-found-images", path, imageUri);
      imagePaths = [path, ...imagePaths];
    } else if (imageUri) {
      imagePaths = [imageUri, ...imagePaths];
    }

    const nextPost: LostFoundPost = {
      id: editing?.id ?? `local-lf-${Date.now()}`,
      ownerId: profile?.id ?? "demo-student",
      ownerName: profile?.display_name ?? "Bạn",
      postType: form.postType,
      title: form.title || (form.postType === "lost" ? "Mình bị mất đồ" : "Mình nhặt được đồ"),
      description: `${form.description}${form.privacyChecked ? "\nĐã tự kiểm tra và che thông tin nhạy cảm." : ""}`,
      category: form.category,
      color: form.color,
      brand: form.brand,
      locationText: form.locationText,
      eventAt: new Date().toISOString(),
      imagePaths,
      privacyReviewStatus: privacyRisk.status,
      ocrRiskScore: privacyRisk.score,
      ocrEvidence: privacyRisk.evidence.length ? privacyRisk.evidence.join(", ") : "Không phát hiện thông tin nhạy cảm bằng rule-based fallback.",
      status: "active",
      returned: false,
      createdAt: editing?.createdAt ?? new Date().toISOString()
    };

    if (supabase && profile) {
      const payload = {
        owner_id: profile.id,
        post_type: nextPost.postType,
        title: nextPost.title,
        description: nextPost.description,
        category: nextPost.category,
        color: nextPost.color,
        brand: nextPost.brand,
        location_text: nextPost.locationText,
        event_at: nextPost.eventAt,
        image_paths: nextPost.imagePaths,
        privacy_review_status: nextPost.privacyReviewStatus,
        ocr_risk_score: nextPost.ocrRiskScore,
        ocr_evidence: nextPost.ocrEvidence,
        status: "active" as const
      };
      const request = editing
        ? supabase.from("lost_found_posts").update(payload).eq("id", editing.id).eq("owner_id", profile.id)
        : supabase.from("lost_found_posts").insert(payload).select("id").single();
      const { data, error } = await request;
      if (error) {
        setMessage(error.message);
        return;
      }
      if (!editing && data && "id" in data) nextPost.id = data.id;
    }

    setPosts((current) => editing ? current.map((post) => post.id === editing.id ? nextPost : post) : [nextPost, ...current]);
    setMessage(`Đã lưu bài. Kết quả riêng tư: ${privacyRisk.status}, ${privacyRisk.score}% rủi ro.`);
    setFormOpen(false);
  }

  async function deletePost(post: LostFoundPost) {
    if (supabase && profile && post.ownerId === profile.id) {
      await supabase.from("lost_found_posts").delete().eq("id", post.id).eq("owner_id", profile.id);
    }
    setPosts((current) => current.filter((item) => item.id !== post.id));
    setMessage("Đã xoá bài Lost & Found.");
  }

  async function markReturned(post: LostFoundPost) {
    if (supabase && profile) {
      await supabase.from("lost_found_posts").update({ status: "closed" }).eq("id", post.id);
      await supabase.from("reputation_events").insert({
        user_id: profile.id,
        event_type: "helpful_post",
        points: 10,
        source_type: "lost_found_post",
        source_id: post.id,
        note: "Trả đồ thành công qua Lost & Found."
      });
    }
    setPosts((current) => current.map((item) => item.id === post.id ? { ...item, status: "closed", returned: true } : item));
    setMessage("Đã ghi nhận trả đồ thành công. +10 uy tín và badge sẽ hiển thị khi đồng bộ.");
  }

  async function saveSearch() {
    const name = query.trim() ? `Tìm: ${query.trim()}` : "Tìm đồ quanh KTX";
    const next = { id: `saved-${Date.now()}`, name, criteria: query || "ví, tai nghe, KTX B" };
    if (supabase && profile) {
      await supabase.from("lost_found_saved_searches").insert({
        student_id: profile.id,
        name: next.name,
        criteria: { query: next.criteria, type: typeFilter }
      });
    }
    setSavedSearches((current) => [next, ...current]);
    setMessage("Đã lưu tìm kiếm. Chưa bật push notification trong demo này.");
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Lost & Found" title="Tìm đồ" subtitle="Smart search tiếng Việt, kiểm tra riêng tư bằng rule-based OCR fallback an toàn." />
      {message ? <AppCard tone="butter"><Text style={styles.text}>{message}</Text></AppCard> : null}
      <View style={styles.searchRow}>
        <View style={styles.search}>
          <AppSearchBar value={query} onChangeText={setQuery} placeholder="ví, bóp, thẻ sinh viên, airpods, KTX B..." />
        </View>
        <AppButton title="Lọc" variant="secondary" icon={<Ionicons color={colors.ink} name="options" size={18} />} onPress={() => setFilterOpen(true)} style={styles.filterButton} />
      </View>
      <View style={styles.actions}>
        <AppButton title="Đăng mất/nhặt đồ" onPress={openCreate} />
        <AppButton title="Lưu tìm kiếm" variant="secondary" onPress={saveSearch} />
      </View>
      <SectionHeader title="Tìm kiếm đã lưu" />
      <View style={styles.chips}>
        {savedSearches.map((saved) => <AppBadge key={saved.id} label={saved.name} tone="lavender" />)}
      </View>
      <SectionHeader title={`${visiblePosts.length} kết quả smart search`} action="Không cần AI" />
      {visiblePosts.map(({ post, match }) => {
        const own = post.ownerId === profile?.id;
        return (
          <AppCard key={post.id} tone={post.returned ? "mint" : own ? "peach" : "default"}>
            <View style={styles.cardTop}>
              <Text style={styles.title}>{post.title}</Text>
              <View style={styles.chips}>
                <AppBadge label={post.postType === "lost" ? "Mất" : "Nhặt được"} tone={post.postType === "lost" ? "danger" : "mint"} />
                <AppBadge label={match.label} tone="sky" />
                <AppBadge label={`${post.ocrRiskScore}% riêng tư`} tone={post.privacyReviewStatus === "auto_rejected" ? "danger" : post.privacyReviewStatus === "admin_review" ? "butter" : "mint"} />
              </View>
            </View>
            {post.imagePaths.length > 0 ? <View style={styles.imageStub}><Ionicons color={colors.peachDark} name="image" size={20} /><Text style={styles.imageText}>Ảnh đã qua bước nhắc che thông tin</Text></View> : null}
            <Text style={styles.text}>{post.description}</Text>
            <Text style={styles.text}>{post.category} · {post.color} · {post.brand || "Không rõ hãng"} · {post.locationText}</Text>
            <Text style={styles.safety}>Bằng chứng OCR fallback: {post.ocrEvidence}</Text>
            <View style={styles.actions}>
              <AppButton title={post.returned ? "Đã trả" : "Đã trả đồ"} variant="secondary" onPress={() => markReturned(post)} />
              <AppButton title="Chat" variant="ghost" onPress={() => setMessage("Mở tab Tin nhắn để chat theo bài Lost & Found này.")} />
              {own ? <AppButton title="Sửa" variant="secondary" onPress={() => openEdit(post)} /> : null}
              {own ? <AppButton title="Xoá" variant="ghost" onPress={() => deletePost(post)} /> : null}
            </View>
          </AppCard>
        );
      })}

      <AppBottomSheet visible={filterOpen} title="Bộ lọc Tìm đồ" onClose={() => setFilterOpen(false)}>
        {visiblePosts.length >= visibleLimit ? (
          <AppButton title="Tai them ket qua" variant="secondary" onPress={() => setVisibleLimit((value) => value + 12)} />
        ) : null}
        {filterLabels.map((label, index) => <AppBadge key={label} label={label} tone={index % 2 ? "sky" : "peach"} />)}
        <View style={styles.actions}>
          <AppButton title="Tất cả" variant={typeFilter === "all" ? "primary" : "secondary"} onPress={() => setTypeFilter("all")} />
          <AppButton title="Mất" variant={typeFilter === "lost" ? "primary" : "secondary"} onPress={() => setTypeFilter("lost")} />
          <AppButton title="Nhặt được" variant={typeFilter === "found" ? "primary" : "secondary"} onPress={() => setTypeFilter("found")} />
        </View>
        <Text style={styles.text}>Từ đồng nghĩa: ví=bóp, thẻ sinh viên=MSSV, tai nghe=airpods=earbuds, KTX B=ký túc xá khu B, bình nước=chai nước.</Text>
        <AppButton title="Áp dụng bộ lọc" onPress={() => setFilterOpen(false)} />
      </AppBottomSheet>

      <AppBottomSheet visible={formOpen} title={editing ? "Sửa bài Tìm đồ" : "Đăng Lost & Found"} onClose={() => setFormOpen(false)}>
        <View style={styles.actions}>
          <AppButton title="Mình mất đồ" variant={form.postType === "lost" ? "primary" : "secondary"} onPress={() => setForm((value) => ({ ...value, postType: "lost" }))} />
          <AppButton title="Mình nhặt được" variant={form.postType === "found" ? "primary" : "secondary"} onPress={() => setForm((value) => ({ ...value, postType: "found" }))} />
        </View>
        <AppCard tone="butter">
          <Text style={styles.safety}>Nhắc riêng tư: hãy che SĐT, MSSV, CCCD/CMND, số ngân hàng, biển số xe và địa chỉ chi tiết. OCR native chưa thêm để tránh development build; rule-based fallback luôn hoạt động.</Text>
        </AppCard>
        <AppInput label="Tiêu đề" value={form.title} onChangeText={(title) => setForm((value) => ({ ...value, title }))} />
        <AppInput label="Mô tả" value={form.description} onChangeText={(description) => setForm((value) => ({ ...value, description }))} multiline />
        <AppInput label="Danh mục" value={form.category} onChangeText={(category) => setForm((value) => ({ ...value, category }))} />
        <AppInput label="Màu" value={form.color} onChangeText={(color) => setForm((value) => ({ ...value, color }))} />
        <AppInput label="Hãng/đặc điểm" value={form.brand} onChangeText={(brand) => setForm((value) => ({ ...value, brand }))} />
        <AppInput label="Vị trí" value={form.locationText} onChangeText={(locationText) => setForm((value) => ({ ...value, locationText }))} />
        <AppInput label="Nội dung OCR đọc được (demo fallback)" value={form.privacyText} onChangeText={(privacyText) => setForm((value) => ({ ...value, privacyText }))} multiline />
        <AppCard tone={privacyRisk.status === "auto_rejected" ? "peach" : privacyRisk.status === "admin_review" ? "butter" : "mint"}>
          <Text style={styles.title}>Privacy score: {privacyRisk.score}%</Text>
          <Text style={styles.text}>{privacyRisk.status === "auto_pass" ? "Auto pass" : privacyRisk.status === "admin_review" ? "Cần admin review nếu OCR mơ hồ." : "Auto reject chỉ khi bằng chứng mạnh."}</Text>
          <Text style={styles.text}>Dấu hiệu: {privacyRisk.evidence.join(", ") || "Không có"}</Text>
        </AppCard>
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}
        <AppButton title="Chọn ảnh" variant="secondary" onPress={chooseImage} />
        <AppButton title={form.privacyChecked ? "Đã đánh dấu privacy checked" : "Tôi đã che thông tin nhạy cảm"} variant="secondary" onPress={() => setForm((value) => ({ ...value, privacyChecked: !value.privacyChecked }))} />
        <AppButton title={editing ? "Lưu thay đổi" : "Đăng bài"} onPress={savePost} />
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
  actions: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  imageStub: { alignItems: "center", backgroundColor: colors.surfaceWarm, borderRadius: 16, flexDirection: "row", gap: spacing.sm, padding: spacing.md },
  imageText: { color: colors.peachDark, fontWeight: "900" },
  preview: { borderRadius: 16, height: 140, width: "100%" }
});
