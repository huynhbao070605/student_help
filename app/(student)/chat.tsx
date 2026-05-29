import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import {
  AppBadge,
  AppBottomSheet,
  AppButton,
  AppCard,
  AppHeader,
  AppInput,
  AppScreen,
  AppSearchBar,
  Avatar,
  ReputationBadge,
  SectionHeader
} from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { demoChats, quickMessages, type ChatPreview } from "@/data/studentDemo";
import { useAuth } from "@/lib/auth/AuthProvider";
import { pickImageFromLibrary, uploadLocalImage } from "@/lib/storage/uploadImage";
import { supabase } from "@/lib/supabase/client";

export default function ChatInboxScreen() {
  const { profile } = useAuth();
  const [chats, setChats] = useState<ChatPreview[]>(demoChats);
  const [selectedId, setSelectedId] = useState<string | null>(demoChats[0]?.id ?? null);
  const [query, setQuery] = useState("");
  const [body, setBody] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || !profile) return;
    supabase
      .from("conversation_participants")
      .select("conversation_id, conversations(id, title, context, created_at)")
      .eq("user_id", profile.id)
      .limit(20)
      .then(({ data }) => {
        if (!data?.length) return;
        setChats((current) => current.length ? current : data.map((row) => ({
          id: row.conversation_id,
          title: row.conversations?.title ?? "Cuộc trò chuyện",
          context: row.conversations?.context ?? "general",
          participantName: "Bạn sinh viên",
          participantRole: "student",
          participantReputation: 70,
          lastMessage: "Mở cuộc trò chuyện để xem tin nhắn.",
          unread: false,
          phoneRequestStatus: "none",
          messages: []
        })));
      });
  }, [profile]);

  const visibleChats = useMemo(() => {
    const lower = query.toLowerCase();
    return chats.filter((chat) => [chat.title, chat.participantName, chat.lastMessage, chat.context].join(" ").toLowerCase().includes(lower));
  }, [chats, query]);

  const selected = chats.find((chat) => chat.id === selectedId) ?? visibleChats[0];
  const contextMessages = selected ? quickMessages[selected.context] ?? quickMessages.general : quickMessages.general;

  async function sendMessage(text = body, imagePath?: string) {
    if (!selected || !text.trim()) return;
    const nextMessage = { id: `local-msg-${Date.now()}`, sender: "me" as const, body: text.trim(), createdAt: "vừa xong", imagePath };

    if (supabase && profile && !selected.id.startsWith("chat-")) {
      await supabase.from("messages").insert({
        conversation_id: selected.id,
        sender_id: profile.id,
        body: nextMessage.body,
        image_path: imagePath
      });
    }

    setChats((current) => current.map((chat) => chat.id === selected.id ? {
      ...chat,
      lastMessage: nextMessage.body,
      unread: false,
      messages: [...chat.messages, nextMessage]
    } : chat));
    setBody("");
  }

  async function sendImage() {
    if (!selected) return;
    try {
      const image = await pickImageFromLibrary();
      if (!image) return;
      let imagePath = image.uri;
      if (supabase && profile) {
        imagePath = `${profile.id}/chat-${Date.now()}.jpg`;
        await uploadLocalImage("chat-images", imagePath, image.uri);
      }
      await sendMessage("Mình gửi ảnh để bạn kiểm tra nha.", imagePath);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không gửi được ảnh.");
    }
  }

  function requestPhone() {
    if (!selected) return;
    setChats((current) => current.map((chat) => chat.id === selected.id ? { ...chat, phoneRequestStatus: "pending" } : chat));
    setMessage("Đã gửi yêu cầu SĐT. Chỉ hiển thị nếu người kia đồng ý.");
  }

  function respondPhone(status: "approved" | "rejected") {
    if (!selected) return;
    setChats((current) => current.map((chat) => chat.id === selected.id ? { ...chat, phoneRequestStatus: status, phone: status === "approved" ? chat.phone ?? "0900000101" : undefined } : chat));
    setMessage(status === "approved" ? "Đã đồng ý chia sẻ SĐT cho cuộc trò chuyện này." : "Đã từ chối chia sẻ SĐT.");
  }

  async function reportOrBlock(kind: "report" | "block") {
    if (supabase && profile && selected) {
      if (kind === "report") {
        await supabase.from("reports").insert({
          reporter_id: profile.id,
          target_type: "conversation",
          target_id: selected.id,
          reason: "student_report",
          details: "Báo cáo từ màn chat mobile."
        });
      }
    }
    setMessage(kind === "report" ? "Đã gửi báo cáo cho admin." : "Đã chặn trong demo. Người này sẽ không được ưu tiên chat tiếp.");
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Tin nhắn" title="Hộp chat an toàn" subtitle="Chat với sinh viên/vendor, quick messages, báo cáo/chặn và xin SĐT có đồng ý." />
      {message ? <AppCard tone="butter"><Text style={styles.text}>{message}</Text></AppCard> : null}
      <AppSearchBar value={query} onChangeText={setQuery} placeholder="Tìm cuộc trò chuyện..." />
      <SectionHeader title="Cuộc trò chuyện" />
      {visibleChats.map((chat) => (
        <Pressable key={chat.id} onPress={() => setSelectedId(chat.id)}>
          <AppCard tone={selected?.id === chat.id ? "peach" : chat.unread ? "lavender" : "default"}>
            <View style={styles.row}>
              <Avatar name={chat.participantName} size={44} />
              <View style={styles.flex}>
                <Text style={styles.title}>{chat.participantName}</Text>
                <Text style={styles.text}>{chat.lastMessage}</Text>
              </View>
              {chat.unread ? <AppBadge label="Mới" tone="peach" /> : null}
            </View>
          </AppCard>
        </Pressable>
      ))}

      {selected ? (
        <>
          <SectionHeader title={selected.title} action={selected.context} />
          <AppCard tone="mint">
            <View style={styles.row}>
              <Avatar name={selected.participantName} size={48} />
              <View style={styles.flex}>
                <Text style={styles.title}>{selected.participantName}</Text>
                <Text style={styles.text}>{selected.participantRole === "vendor" ? "Vendor demo" : "Sinh viên quanh campus"}</Text>
              </View>
              <ReputationBadge score={selected.participantReputation} />
            </View>
            <View style={styles.actions}>
              <AppButton title="Báo cáo" variant="secondary" onPress={() => reportOrBlock("report")} />
              <AppButton title="Chặn" variant="ghost" onPress={() => reportOrBlock("block")} />
            </View>
          </AppCard>

          <AppCard tone={selected.phoneRequestStatus === "approved" ? "mint" : "butter"}>
            <Text style={styles.title}>Xin SĐT có đồng ý</Text>
            <Text style={styles.text}>
              {selected.phoneRequestStatus === "approved"
                ? `Đã đồng ý. SĐT được phép xem: ${selected.phone}`
                : selected.phoneRequestStatus === "pending"
                  ? "Đang chờ phản hồi. Chưa hiển thị số điện thoại."
                  : "SĐT riêng tư. Vendor/sinh viên không thấy nếu chưa được đồng ý."}
            </Text>
            <View style={styles.actions}>
              <AppButton title="Xin SĐT" variant="secondary" onPress={requestPhone} />
              <AppButton title="Đồng ý" variant="ghost" onPress={() => respondPhone("approved")} />
              <AppButton title="Từ chối" variant="ghost" onPress={() => respondPhone("rejected")} />
            </View>
          </AppCard>

          <SectionHeader title="Tin nhắn" action={selected.messages.some((item) => item.sender === "them") ? "Đã đọc" : "Mới"} />
          {selected.messages.map((item) => (
            <View key={item.id} style={[styles.bubble, item.sender === "me" ? styles.mine : styles.theirs]}>
              <Text style={styles.bubbleText}>{item.body}</Text>
              {item.imagePath ? <Image source={{ uri: item.imagePath }} style={styles.image} /> : null}
              <Text style={styles.time}>{item.createdAt}</Text>
            </View>
          ))}

          <View style={styles.actions}>
            <AppInput value={body} onChangeText={setBody} placeholder="Nhắn gì đó dễ thương..." style={styles.input} />
            <AppButton title="Gửi" onPress={() => sendMessage()} />
          </View>
          <View style={styles.actions}>
            <AppButton title="Ảnh" variant="secondary" icon={<Ionicons color={colors.ink} name="image" size={18} />} onPress={sendImage} />
            <AppButton title="Tin nhắn nhanh" variant="secondary" onPress={() => setSheetOpen(true)} />
          </View>
        </>
      ) : null}

      <AppBottomSheet visible={sheetOpen} title="Tin nhắn nhanh" onClose={() => setSheetOpen(false)}>
        {contextMessages.map((item) => (
          <AppButton key={item} title={item} variant="secondary" onPress={() => { setSheetOpen(false); sendMessage(item); }} />
        ))}
      </AppBottomSheet>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: "center", flexDirection: "row", gap: spacing.md },
  flex: { flex: 1, gap: spacing.xs },
  title: { color: colors.ink, fontSize: typography.h2, fontWeight: "900" },
  text: { color: colors.muted, fontSize: typography.body, lineHeight: 21 },
  actions: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  input: { minWidth: 220 },
  bubble: { borderRadius: 18, gap: spacing.xs, maxWidth: "86%", padding: spacing.md },
  mine: { alignSelf: "flex-end", backgroundColor: colors.surfaceWarm },
  theirs: { alignSelf: "flex-start", backgroundColor: colors.surface },
  bubbleText: { color: colors.ink, fontSize: typography.body, lineHeight: 21 },
  time: { color: colors.muted, fontSize: typography.tiny, fontWeight: "800" },
  image: { borderRadius: 12, height: 120, width: 160 }
});
