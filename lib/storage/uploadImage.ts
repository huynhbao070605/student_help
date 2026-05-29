import * as ImagePicker from "expo-image-picker";

import { supabase } from "@/lib/supabase/client";

export async function pickImageFromLibrary() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    throw new Error("Cần quyền thư viện ảnh để tải hình lên.");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.78,
    allowsEditing: true
  });

  if (result.canceled) {
    return null;
  }

  return result.assets[0];
}

export async function uploadLocalImage(bucket: string, path: string, uri: string) {
  if (!supabase) {
    throw new Error("Supabase chưa được cấu hình.");
  }

  const response = await fetch(uri);
  const blob = await response.blob();

  const { error } = await supabase.storage.from(bucket).upload(path, blob, {
    contentType: blob.type || "image/jpeg",
    upsert: true
  });

  if (error) {
    throw error;
  }

  return path;
}

