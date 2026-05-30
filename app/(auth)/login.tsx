import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

import { AppBadge, AppButton, AppCard, AppErrorState, AppHeader, AppInput, AppLoadingState, AppScreen } from "@/components/ui";
import { colors, typography } from "@/constants/theme";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function LoginScreen() {
  const router = useRouter();
  const { configured, loading, profile, signInStudent, signInVendor } = useAuth();
  const [email, setEmail] = useState("minhanh@studenthelp.local");
  const [phone, setPhone] = useState("0900000001");
  const [password, setPassword] = useState("student123456");
  const [vendorPassword, setVendorPassword] = useState("vendor123456");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!profile) return;
    if (profile.role === "admin") router.replace("/(admin)");
    if (profile.role === "vendor") router.replace("/(vendor)");
    if (profile.role === "student") router.replace("/(student)");
  }, [profile, router]);

  async function submitStudent() {
    setSubmitting(true);
    setError(null);
    try {
      await signInStudent(email, password);
    } catch (nextError) {
      console.error("Student login failed", nextError);
      setError("Không đăng nhập được. Vui lòng kiểm tra tài khoản và thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitVendor() {
    setSubmitting(true);
    setError(null);
    try {
      await signInVendor(phone, vendorPassword);
    } catch (nextError) {
      console.error("Partner login failed", nextError);
      setError("Không đăng nhập được tài khoản đối tác. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <AppLoadingState label="Đang kiểm tra phiên đăng nhập..." />;
  }

  return (
    <AppScreen>
      <AppHeader
        eyebrow="Chào bạn quay lại"
        title="Đăng nhập"
        subtitle="Sinh viên dùng email. Đối tác dùng số điện thoại đã được cấp."
      />
      {!configured ? (
        <AppErrorState
          title="Chưa kết nối hệ thống"
          message="Bạn vẫn có thể xem nhanh các màn chính bên dưới trong lúc cấu hình đăng nhập được chuẩn bị."
        />
      ) : null}
      {profile ? <AppBadge label={`Đã đăng nhập: ${profile.display_name}`} tone="mint" /> : null}
      {error ? <AppErrorState message={error} /> : null}
      <AppCard>
        <AppInput label="Email sinh viên" placeholder="ban@student.edu.vn" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <AppInput label="Mật khẩu" placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />
        <AppButton title={submitting ? "Đang đăng nhập..." : "Đăng nhập sinh viên"} onPress={submitStudent} />
      </AppCard>
      <AppCard tone="butter">
        <Text style={styles.noteTitle}>Đăng nhập đối tác</Text>
        <Text style={styles.note}>Tài khoản đối tác dùng số điện thoại đã được quản trị viên cấp.</Text>
        <AppInput label="Số điện thoại đối tác" placeholder="0900000201" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <AppInput label="Mật khẩu đối tác" placeholder="••••••••" secureTextEntry value={vendorPassword} onChangeText={setVendorPassword} />
        <AppButton title="Đăng nhập đối tác" variant="secondary" onPress={submitVendor} />
      </AppCard>
      <Text style={styles.note}>Tài khoản gợi ý: minhanh@studenthelp.local / student123456, 0900000001 / vendor123456.</Text>
      <Link href="/(auth)/register" asChild>
        <AppButton title="Chưa có tài khoản? Đăng ký" variant="ghost" />
      </Link>
      {!configured ? (
        <>
          <Link href="/(student)" asChild>
            <AppButton title="Xem nhanh màn sinh viên" variant="secondary" />
          </Link>
          <Link href="/(admin)" asChild>
            <AppButton title="Xem nhanh màn quản trị" variant="ghost" />
          </Link>
          <Link href="/(vendor)" asChild>
            <AppButton title="Xem nhanh màn đối tác" variant="ghost" />
          </Link>
        </>
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  noteTitle: {
    color: colors.ink,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  note: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 23
  }
});
