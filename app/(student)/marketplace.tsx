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
  ReputationBadge,
  SectionHeader,
  VerifiedBadge
} from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { demoMarketplace, type MarketplacePost } from "@/data/studentDemo";
import { useAuth } from "@/lib/auth/AuthProvider";
import { pickImageFromLibrary, uploadLocalImage } from "@/lib/storage/uploadImage";
import { supabase } from "@/lib/supabase/client";

const postTypes = ["sell", "exchange", "free", "borrow", "lend"] as const;
const filterLabels = ["Loại bài", "Danh mục", "Môn học", "Trường/khoa", "Khu vực", "Khoảng giá", "Tình trạng", "Có ảnh", "Đã xác minh", "Uy tín tối thiểu", "Đang active", "Mới nhất"];

const emptyForm = {
  listingType: "sell" as MarketplacePost["listingType"],
  title: "",
  description: "",
  category: "Sách",
  subjectTag: "",
  university: "VNU-HCM",
  faculty: "",
  area: "KTX B",
  condition: "Tốt",
  priceVnd: ""
};

export default function MarketplaceListScreen() {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<MarketplacePost[]>(demoMarketplace);
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MarketplacePost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<"all" | MarketplacePost["listingType"]>("all");
  const [hasImageOnly, setHasImageOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("marketplace_posts")
      .select("id, owner_id, listing_type, title, description, category, condition, price_vnd, exchange_terms, location_text, image_paths, status, created_at")
      .order("created_at", { ascending: false })
      .limit(40)
      .then(({ data }) => {
        if (!data?.length) return;
        setPosts(data.map((row) => ({
          id: row.id,
          ownerId: row.owner_id,
          ownerName: row.owner_id === profile?.id ? profile.display_name : "Bạn sinh viên",
          listingType: row.listing_type,
          title: row.title,
          description: row.description ?? row.exchange_terms ?? "",
          category: row.category ?? "Đồ học tập",
          subjectTag: row.exchange_terms ?? "",
          university: "VNU-HCM",
          faculty: "",
          area: row.location_text ?? "Làng Đại học",
          condition: row.condition ?? "Chưa rõ",
          priceVnd: row.price_vnd,
          imagePaths: row.image_paths ?? [],
          verified: true,
          reputation: 70,
          status: row.status,
          createdAt: row.created_at
        })));
      });
  }, [profile]);

  const visiblePosts = useMemo(() => {
    const lower = query.toLowerCase();
    return posts
      .filter((post) => typeFilter === "all" || post.listingType === typeFilter)
      .filter((post) => !hasImageOnly || post.imagePaths.length > 0)
      .filter((post) => !verifiedOnly || post.verified)
      .filter((post) => post.status === "active")
      .filter((post) => [post.title, post.description, post.category, post.subjectTag, post.university, post.faculty, post.area, post.condition].join(" ").toLowerCase().includes(lower))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }, [hasImageOnly, posts, query, typeFilter, verifiedOnly]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setImageUri(null);
    setFormOpen(true);
  }

  function openEdit(post: MarketplacePost) {
    setEditing(post);
    setForm({
      listingType: post.listingType,
      title: post.title,
      description: post.description,
      category: post.category,
      subjectTag: post.subjectTag,
      university: post.university,
      faculty: post.faculty,
      area: post.area,
      condition: post.condition,
      priceVnd: post.priceVnd ? String(post.priceVnd) : ""
    });
    setImageUri(null);
    setFormOpen(true);
  }

  async function chooseImage() {
    try {
      const image = await pickImageFromLibrary();
      if (image) setImageUri(image.uri);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không chọn được ảnh.");
    }
  }

  async function savePost() {
    const ownerId = profile?.id ?? "demo-student";
    let imagePaths = editing?.imagePaths ?? [];
    if (imageUri && supabase && profile) {
      const path = `${profile.id}/market-${Date.now()}.jpg`;
      await uploadLocalImage("marketplace-images", path, imageUri);
      imagePaths = [path, ...imagePaths];
    } else if (imageUri) {
      imagePaths = [imageUri, ...imagePaths];
    }

    const nextPost: MarketplacePost = {
      id: editing?.id ?? `local-market-${Date.now()}`,
      ownerId,
      ownerName: profile?.display_name ?? "Bạn",
      listingType: form.listingType,
      title: form.title || "Đồ học tập cần trao đổi",
      description: form.description,
      category: form.category,
      subjectTag: form.subjectTag,
      university: form.university,
      faculty: form.faculty,
      area: form.area,
      condition: form.condition,
      priceVnd: form.priceVnd ? Number(form.priceVnd) : null,
      imagePaths,
      verified: profile?.verification_status === "approved",
      reputation: profile?.reputation_score ?? 50,
      status: "active",
      createdAt: editing?.createdAt ?? new Date().toISOString()
    };

    if (supabase && profile) {
      const payload = {
        owner_id: profile.id,
        listing_type: nextPost.listingType,
        title: nextPost.title,
        description: nextPost.description,
        category: nextPost.category,
        condition: nextPost.condition,
        price_vnd: nextPost.priceVnd,
        exchange_terms: nextPost.subjectTag,
        location_text: `${nextPost.area} · ${nextPost.university} ${nextPost.faculty}`,
        image_paths: nextPost.imagePaths,
        status: "active" as const
      };
      const request = editing
        ? supabase.from("marketplace_posts").update(payload).eq("id", editing.id).eq("owner_id", profile.id)
        : supabase.from("marketplace_posts").insert(payload).select("id").single();
      const { data, error } = await request;
      if (error) {
        setMessage(error.message);
        return;
      }
      if (!editing && data && "id" in data) nextPost.id = data.id;
    }

    setPosts((current) => editing ? current.map((post) => post.id === editing.id ? nextPost : post) : [nextPost, ...current]);
    setMessage(editing ? "Đã cập nhật bài chợ đồ học." : "Đã đăng bài chợ đồ học.");
    setFormOpen(false);
  }

  async function deletePost(post: MarketplacePost) {
    if (supabase && profile && post.ownerId === profile.id) {
      await supabase.from("marketplace_posts").delete().eq("id", post.id).eq("owner_id", profile.id);
    }
    setPosts((current) => current.filter((item) => item.id !== post.id));
    setMessage("Đã xoá bài.");
  }

  async function completePost(post: MarketplacePost) {
    if (supabase && profile) {
      await supabase.from("reputation_events").insert({
        user_id: profile.id,
        event_type: "positive_feedback",
        points: 6,
        source_type: "marketplace_post",
        source_id: post.id,
        note: "Hoàn tất trao đổi/mượn/cho mượn an toàn."
      });
    }
    setMessage("Đã xác nhận hoàn tất. +6 uy tín sẽ đồng bộ sau.");
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Marketplace" title="Chợ đồ học tập" subtitle="Bán, đổi, tặng, mượn và cho mượn đồ học tập quanh campus." />
      {message ? <AppCard tone="butter"><Text style={styles.text}>{message}</Text></AppCard> : null}
      <View style={styles.searchRow}>
        <View style={styles.search}>
          <AppSearchBar value={query} onChangeText={setQuery} placeholder="Tìm sách, máy tính, môn học..." />
        </View>
        <AppButton title="Lọc" variant="secondary" icon={<Ionicons color={colors.ink} name="options" size={18} />} onPress={() => setFilterOpen(true)} style={styles.filterButton} />
      </View>
      <View style={styles.chips}>
        {postTypes.map((type) => <AppBadge key={type} label={type} tone={typeFilter === type ? "peach" : "sky"} />)}
      </View>
      <AppButton title="Đăng đồ học tập" onPress={openCreate} />
      <SectionHeader title={`${visiblePosts.length} bài phù hợp`} action="Có chat" />
      {visiblePosts.map((post) => {
        const own = post.ownerId === profile?.id;
        return (
          <AppCard key={post.id} tone={own ? "peach" : post.listingType === "free" ? "mint" : "default"}>
            <View style={styles.cardTop}>
              <Text style={styles.title}>{post.title}</Text>
              <View style={styles.chips}>
                <AppBadge label={post.listingType} tone="lavender" />
                <VerifiedBadge status={post.verified ? "verified" : "pending"} />
                <ReputationBadge score={post.reputation} />
              </View>
            </View>
            {post.imagePaths.length > 0 ? <View style={styles.imageStub}><Ionicons color={colors.peachDark} name="image" size={20} /><Text style={styles.imageText}>{post.imagePaths.length} ảnh</Text></View> : null}
            <Text style={styles.text}>{post.description}</Text>
            <Text style={styles.text}>{post.category} · {post.subjectTag || "Không tag môn"} · {post.area}</Text>
            <Text style={styles.price}>{post.priceVnd ? `${post.priceVnd.toLocaleString("vi-VN")}đ` : "Không đặt giá"}</Text>
            <View style={styles.actions}>
              <AppButton title="Chat" variant="secondary" onPress={() => setMessage("Mở tab Tin nhắn để tiếp tục chat theo bài này.")} />
              <AppButton title="Hoàn tất" variant="ghost" onPress={() => completePost(post)} />
              {own ? <AppButton title="Sửa" variant="secondary" onPress={() => openEdit(post)} /> : null}
              {own ? <AppButton title="Xoá" variant="ghost" onPress={() => deletePost(post)} /> : null}
            </View>
          </AppCard>
        );
      })}

      <AppBottomSheet visible={filterOpen} title="Bộ lọc chợ đồ học" onClose={() => setFilterOpen(false)}>
        {filterLabels.map((label, index) => <AppBadge key={label} label={label} tone={index % 2 ? "sky" : "peach"} />)}
        <View style={styles.actions}>
          <AppButton title="Tất cả" variant={typeFilter === "all" ? "primary" : "secondary"} onPress={() => setTypeFilter("all")} />
          {postTypes.map((type) => <AppButton key={type} title={type} variant={typeFilter === type ? "primary" : "secondary"} onPress={() => setTypeFilter(type)} />)}
        </View>
        <AppButton title={hasImageOnly ? "Đang lọc: có ảnh" : "Chỉ bài có ảnh"} variant="secondary" onPress={() => setHasImageOnly((value) => !value)} />
        <AppButton title={verifiedOnly ? "Đang lọc: đã xác minh" : "Chỉ người đã xác minh"} variant="secondary" onPress={() => setVerifiedOnly((value) => !value)} />
        <AppButton title="Áp dụng bộ lọc" onPress={() => setFilterOpen(false)} />
      </AppBottomSheet>

      <AppBottomSheet visible={formOpen} title={editing ? "Sửa bài" : "Đăng bài mới"} onClose={() => setFormOpen(false)}>
        <View style={styles.actions}>
          {postTypes.map((type) => <AppButton key={type} title={type} variant={form.listingType === type ? "primary" : "secondary"} onPress={() => setForm((value) => ({ ...value, listingType: type }))} />)}
        </View>
        <AppInput label="Tiêu đề" value={form.title} onChangeText={(title) => setForm((value) => ({ ...value, title }))} />
        <AppInput label="Mô tả" value={form.description} onChangeText={(description) => setForm((value) => ({ ...value, description }))} multiline />
        <AppInput label="Danh mục" value={form.category} onChangeText={(category) => setForm((value) => ({ ...value, category }))} />
        <AppInput label="Tag môn học" value={form.subjectTag} onChangeText={(subjectTag) => setForm((value) => ({ ...value, subjectTag }))} />
        <AppInput label="Trường" value={form.university} onChangeText={(university) => setForm((value) => ({ ...value, university }))} />
        <AppInput label="Khoa" value={form.faculty} onChangeText={(faculty) => setForm((value) => ({ ...value, faculty }))} />
        <AppInput label="Khu vực" value={form.area} onChangeText={(area) => setForm((value) => ({ ...value, area }))} />
        <AppInput label="Tình trạng" value={form.condition} onChangeText={(condition) => setForm((value) => ({ ...value, condition }))} />
        <AppInput label="Giá VND (nếu có)" value={form.priceVnd} onChangeText={(priceVnd) => setForm((value) => ({ ...value, priceVnd }))} keyboardType="number-pad" />
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}
        <AppButton title="Chọn ảnh" variant="secondary" onPress={chooseImage} />
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
  price: { color: colors.peachDark, fontSize: typography.h2, fontWeight: "900" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  imageStub: { alignItems: "center", backgroundColor: colors.surfaceWarm, borderRadius: 16, flexDirection: "row", gap: spacing.sm, padding: spacing.md },
  imageText: { color: colors.peachDark, fontWeight: "900" },
  preview: { borderRadius: 16, height: 140, width: "100%" }
});
