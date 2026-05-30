import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import {
  AppBadge,
  AppBottomSheet,
  AppButton,
  AppCard,
  AppEmptyState,
  AppErrorState,
  AppHeader,
  AppInput,
  AppLoadingState,
  AppScreen,
  AppSearchBar,
  Avatar,
  ReputationBadge,
  SectionHeader
} from "@/components/ui";
import { colors, spacing, typography } from "@/constants/theme";
import { quickMessages, type ChatPreview } from "@/data/studentDemo";
import { useAuth } from "@/lib/auth/AuthProvider";
import { appendChatMessage, setRemoteConversationId, updateConversation, upsertConversation, useChatPreviews } from "@/lib/student/chatStore";
import { isUuid } from "@/lib/student/ids";
import { pickImageFromLibrary, uploadLocalImage } from "@/lib/storage/uploadImage";
import { supabase } from "@/lib/supabase/client";

type ChatContext = ChatPreview["context"];

function isChatContext(value: string | null | undefined): value is ChatContext {
  return Boolean(value && value in quickMessages);
}

function contextLabel(context: ChatContext) {
  const labels: Record<ChatContext, string> = {
    ride: "Đi chung",
    marketplace: "Chợ đồ",
    lost_found: "Lost & Found",
    vendor: "Đối tác",
    food_order: "Đồ ăn",
    service: "Dịch vụ",
    general: "Tin nhắn"
  };
  return labels[context];
}

function createLocalId(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

export default function ChatInboxScreen() {
  const params = useLocalSearchParams<{ conversationId?: string }>();
  const router = useRouter();
  const { profile } = useAuth();
  const chats = useChatPreviews();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [body, setBody] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!supabase || !profile) return;
    supabase
      .from("conversation_participants")
      .select("conversation_id, conversations(id, title, context, created_at)")
      .eq("user_id", profile.id)
      .limit(20)
      .then(({ data }) => {
        if (!data?.length) return;
        data.forEach((row) => {
          const conversation = Array.isArray(row.conversations) ? row.conversations[0] : row.conversations;
          upsertConversation({
            id: row.conversation_id,
            remoteId: row.conversation_id,
            title: conversation?.title ?? "Cuộc trò chuyện",
            context: isChatContext(conversation?.context) ? conversation.context : "general",
            participantName: "Bạn sinh viên",
            participantRole: "student",
            participantReputation: 70,
            lastMessage: "Mở cuộc trò chuyện để xem tin nhắn.",
            unread: false,
            phoneRequestStatus: "none",
            messages: []
          });
        });
      }, () => setSyncError("Chưa đồng bộ được tin nhắn mới nhất. Bạn vẫn có thể dùng lịch sử đã lưu trên máy."));
  }, [profile]);

  const visibleChats = useMemo(() => {
    const lower = query.toLowerCase();
    return chats.filter((chat) => [chat.title, chat.participantName, chat.lastMessage, contextLabel(chat.context)].join(" ").toLowerCase().includes(lower));
  }, [chats, query]);

  const routeConversationId = typeof params.conversationId === "string" ? params.conversationId : null;
  const activeConversationId = selectedId ?? routeConversationId;
  const selected = activeConversationId ? chats.find((chat) => chat.id === activeConversationId) ?? null : null;
  const contextMessages = selected ? quickMessages[selected.context] ?? quickMessages.general : quickMessages.general;

  async function resolveRemoteConversationId(conversation: ChatPreview) {
    if (!supabase || !profile) return null;
    if (isUuid(conversation.remoteId)) return conversation.remoteId;
    if (isUuid(conversation.id)) return conversation.id;

    const { data: createdConversation, error: conversationError } = await supabase
      .from("conversations")
      .insert({
        context: conversation.context,
        title: conversation.title,
        created_by: profile.id
      })
      .select("id")
      .single();

    if (conversationError || !createdConversation?.id) {
      throw conversationError ?? new Error("Conversation was not created");
    }

    const { error: participantError } = await supabase
      .from("conversation_participants")
      .upsert({
        conversation_id: createdConversation.id,
        user_id: profile.id
      });

    if (participantError) throw participantError;

    setRemoteConversationId(conversation.id, createdConversation.id);
    return createdConversation.id;
  }

  async function sendMessage(text = body, imagePath?: string) {
    if (!selected) return;
    if (!text.trim()) {
      setMessage("Nhập nội dung trước khi gửi nha.");
      return;
    }
    setSending(true);
    const nextMessage = { id: createLocalId("local-msg"), sender: "me" as const, body: text.trim(), createdAt: "vừa xong", imagePath };

    try {
      if (supabase && profile) {
        const remoteConversationId = await resolveRemoteConversationId(selected);
        if (!remoteConversationId) throw new Error("Conversation UUID is missing");
        const { error } = await supabase.from("messages").insert({
          conversation_id: remoteConversationId,
          sender_id: profile.id,
          body: nextMessage.body,
          created_at: new Date().toISOString(),
          image_path: imagePath
        });
        if (error) throw error;
      }

      appendChatMessage(selected.id, nextMessage);
      setBody("");
      setMessage("Đã gửi tin nhắn.");
    } catch (error) {
      console.error("Failed to send chat message", error);
      setMessage("Không gửi được tin nhắn. Vui lòng thử lại.");
    } finally {
      setSending(false);
    }
  }

  async function sendImage() {
    if (!selected) return;
    try {
      const image = await pickImageFromLibrary();
      if (!image) return;
      let imagePath = image.uri;
      if (supabase && profile) {
        imagePath = `${profile.id}/${createLocalId("chat")}.jpg`;
        await uploadLocalImage("chat-images", imagePath, image.uri);
      }
      await sendMessage("Mình gửi ảnh để bạn kiểm tra nha.", imagePath);
    } catch (error) {
      console.error("Failed to send chat image", error);
      setMessage("Không gửi được ảnh. Vui lòng thử lại.");
    }
  }

  function requestPhone() {
    if (!selected) return;
    updateConversation(selected.id, (chat) => ({ ...chat, phoneRequestStatus: "pending" }));
    setMessage("Đã gửi yêu cầu SĐT. Chỉ hiển thị nếu người kia đồng ý.");
  }

  function respondPhone(status: "approved" | "rejected") {
    if (!selected) return;
    updateConversation(selected.id, (chat) => ({ ...chat, phoneRequestStatus: status, phone: status === "approved" ? chat.phone ?? "0900000101" : undefined }));
    setMessage(status === "approved" ? "Đã đồng ý chia sẻ SĐT cho cuộc trò chuyện này." : "Đã từ chối chia sẻ SĐT.");
  }

  async function reportOrBlock(kind: "report" | "block") {
    const reportTargetId = selected?.remoteId ?? selected?.id;
    if (supabase && profile && selected && kind === "report" && isUuid(reportTargetId)) {
      const targetId = reportTargetId;
      const { error } = await supabase.from("reports").insert({
        reporter_id: profile.id,
        target_type: "conversation",
        target_id: targetId,
        reason: "student_report",
        details: "Báo cáo từ màn chat mobile."
      });
      if (error) console.error("Failed to submit chat report", error);
    }
    setMessage(kind === "report" ? "Đã gửi báo cáo cho admin." : "Đã chặn người này trong cuộc trò chuyện.");
  }

  return (
    <AppScreen>
      <AppHeader eyebrow="Tin nhắn" title="Hộp chat an toàn" subtitle="Nhắn tin theo bài đi chung, chợ đồ học, báo cáo/chặn và xin SĐT có đồng ý." />
      {chats.length === 0 ? <AppLoadingState label="Đang mở hộp chat..." /> : null}
      {syncError ? <AppErrorState title="Dùng tin nhắn đã lưu" message={syncError} actionLabel="Đã hiểu" onAction={() => setSyncError(null)} /> : null}
      {message ? <AppCard tone="butter"><Text style={styles.text}>{message}</Text></AppCard> : null}

      {!selected ? (
        <>
          <AppSearchBar value={query} onChangeText={setQuery} placeholder="Tìm cuộc trò chuyện..." />
          <SectionHeader title="Cuộc trò chuyện" />
          {visibleChats.length === 0 ? (
            <AppEmptyState title="Chưa có cuộc trò chuyện phù hợp" message="Bạn có thể xin ghép chuyến ở Đi chung hoặc bấm Nhắn tin ở Chợ đồ học để bắt đầu." />
          ) : null}
          {visibleChats.map((chat) => (
            <Pressable key={chat.id} onPress={() => setSelectedId(chat.id)}>
              <AppCard tone={chat.unread ? "lavender" : "default"}>
                <View style={styles.row}>
                  <Avatar name={chat.participantName} size={44} />
                  <View style={styles.flex}>
                    <Text style={styles.title}>{chat.participantName}</Text>
                    <Text style={styles.text}>{chat.lastMessage}</Text>
                  </View>
                  {chat.unread ? <AppBadge label="Mới" tone="peach" /> : null}
                  <Ionicons color={colors.muted} name="chevron-forward" size={20} />
                </View>
              </AppCard>
            </Pressable>
          ))}
        </>
      ) : (
        <>
          <AppButton
            title="Quay lại danh sách"
            variant="secondary"
            icon={<Ionicons color={colors.ink} name="chevron-back" size={18} />}
            onPress={() => {
              setSelectedId(null);
              router.setParams({ conversationId: undefined });
            }}
          />
          <SectionHeader title={selected.title} action={contextLabel(selected.context)} />
          <AppCard tone="mint">
            <View style={styles.row}>
              <Avatar name={selected.participantName} size={48} />
              <View style={styles.flex}>
                <Text style={styles.title}>{selected.participantName}</Text>
                <Text style={styles.text}>{selected.participantRole === "vendor" ? "Đối tác sinh viên" : "Sinh viên quanh campus"}</Text>
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
                  : "SĐT riêng tư. Sinh viên và đối tác không thấy nếu chưa được đồng ý."}
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
            <AppButton title={sending ? "Đang gửi..." : "Gửi"} onPress={() => sendMessage()} disabled={sending} />
          </View>
          <View style={styles.actions}>
            <AppButton title="Ảnh" variant="secondary" icon={<Ionicons color={colors.ink} name="image" size={18} />} onPress={sendImage} />
            <AppButton title="Tin nhắn nhanh" variant="secondary" onPress={() => setSheetOpen(true)} />
          </View>
        </>
      )}

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
  text: { color: colors.muted, fontSize: typography.body, lineHeight: 23 },
  actions: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  input: { minWidth: 220 },
  bubble: { borderRadius: 20, gap: spacing.xs, maxWidth: "86%", padding: spacing.md },
  mine: { alignSelf: "flex-end", backgroundColor: colors.surfaceWarm },
  theirs: { alignSelf: "flex-start", backgroundColor: colors.card },
  bubbleText: { color: colors.ink, fontSize: typography.body, lineHeight: 23 },
  time: { color: colors.muted, fontSize: typography.tiny, fontWeight: "800" },
  image: { borderRadius: 14, height: 120, width: 160 }
});
