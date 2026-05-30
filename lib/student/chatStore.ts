import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSyncExternalStore } from "react";

import { demoChats, type ChatPreview, type MarketplacePost, type RidePost } from "@/data/studentDemo";

type ChatMessage = ChatPreview["messages"][number];
const CHAT_STORAGE_KEY = "student-help:chat-previews:v3";

let chats: ChatPreview[] = demoChats.map((chat) => ({
  ...chat,
  messages: [...chat.messages]
}));

const listeners = new Set<() => void>();

function emit() {
  void persistChats();
  listeners.forEach((listener) => listener());
}

async function persistChats() {
  try {
    await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
  } catch {
    // Local persistence should never block the chat UI.
  }
}

async function hydrateChats() {
  try {
    const stored = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return;
    const parsed = JSON.parse(stored) as ChatPreview[];
    if (!Array.isArray(parsed)) return;
    chats = parsed;
    listeners.forEach((listener) => listener());
  } catch {
    // Keep bundled seed conversations if local storage is unavailable.
  }
}

void hydrateChats();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return chats;
}

function findOrCreateConversation(sourceId: string, create: () => ChatPreview) {
  const existing = chats.find((chat) => chat.id === sourceId);
  if (existing) return existing;

  const nextChat = create();
  chats = [nextChat, ...chats];
  emit();
  return nextChat;
}

function addOpeningMessageIfEmpty(conversationId: string, body: string) {
  const chat = chats.find((item) => item.id === conversationId);
  if (!chat || chat.messages.length > 0) return chat;

  const openingMessage: ChatMessage = {
    id: `${conversationId}-opening`,
    sender: "me",
    body,
    createdAt: "vừa xong"
  };

  updateConversation(conversationId, (current) => ({
    ...current,
    lastMessage: openingMessage.body,
    unread: false,
    messages: [openingMessage]
  }));

  return chats.find((item) => item.id === conversationId);
}

export function useChatPreviews() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function ensureRideConversation(ride: RidePost) {
  const conversationId = `ride-${ride.id}`;
  const openingBody = `Mình muốn đi chung tuyến ${ride.origin} → ${ride.destination}. Bạn xác nhận giúp mình trước khi đi nhé.`;

  findOrCreateConversation(conversationId, () => ({
    id: conversationId,
    title: `Đi chung ${ride.origin} → ${ride.destination}`,
    context: "ride",
    participantName: ride.ownerName,
    participantRole: "student",
    participantReputation: ride.reputation,
    lastMessage: openingBody,
    unread: false,
    phoneRequestStatus: "none",
    messages: []
  }));

  addOpeningMessageIfEmpty(conversationId, openingBody);
  return conversationId;
}

export function ensureMarketplaceConversation(post: MarketplacePost) {
  const conversationId = `marketplace-${post.id}`;
  const openingBody = `Bạn ơi, mình quan tâm bài đăng: ${post.title}. Mình muốn trao đổi thêm.`;

  findOrCreateConversation(conversationId, () => ({
    id: conversationId,
    title: post.title,
    context: "marketplace",
    participantName: post.ownerName,
    participantRole: "student",
    participantReputation: post.reputation,
    lastMessage: openingBody,
    unread: false,
    phoneRequestStatus: "none",
    messages: []
  }));

  addOpeningMessageIfEmpty(conversationId, openingBody);
  return conversationId;
}

export function upsertConversation(nextChat: ChatPreview) {
  const existing = chats.find((chat) => chat.id === nextChat.id || chat.remoteId === nextChat.id);
  if (existing) {
    chats = chats.map((chat) => chat.id === existing.id ? {
      ...chat,
      ...nextChat,
      id: existing.id,
      remoteId: nextChat.remoteId ?? nextChat.id,
      messages: nextChat.messages.length > 0 ? nextChat.messages : chat.messages,
      lastMessage: nextChat.messages.length > 0 ? nextChat.lastMessage : chat.lastMessage
    } : chat);
  } else {
    chats = [nextChat, ...chats];
  }
  emit();
}

export function updateConversation(conversationId: string, updater: (chat: ChatPreview) => ChatPreview) {
  chats = chats.map((chat) => chat.id === conversationId ? updater(chat) : chat);
  emit();
}

export function setRemoteConversationId(conversationId: string, remoteId: string) {
  updateConversation(conversationId, (chat) => ({ ...chat, remoteId }));
}

export function appendChatMessage(conversationId: string, message: ChatMessage) {
  updateConversation(conversationId, (chat) => ({
    ...chat,
    lastMessage: message.body,
    unread: false,
    messages: [...chat.messages, message]
  }));
}
