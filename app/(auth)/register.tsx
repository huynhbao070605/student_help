import { Link } from "expo-router";
import { useState } from "react";

import { AppButton, AppCard, AppErrorState, AppHeader, AppInput, AppScreen, VerifiedBadge } from "@/components/ui";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function RegisterScreen() {
  const { configured, signUpStudent } = useAuth();
  const [displayName, setDisplayName] = useState("Bạn sinh viên");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function submit() {
    setMessage(null);
    try {
      await signUpStudent({ email, password, displayName, phone });
      setMessage("Đã tạo tài khoản. Nếu Supabase yêu cầu xác nhận email, hãy xác nhận trước khi đăng nhập.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không tạo được tài khoản.");
    }
  }

  return (
    <AppScreen>
      <AppHeader
        eyebrow="Sinh viên mới"
        title="Tạo tài khoản"
        subtitle="Form được chia thành từng phần nhỏ để dễ dùng trên màn hình Android nhỏ."
      />
      {!configured ? (
        <AppErrorState message="Supabase chưa được cấu hình nên form chỉ hiển thị UI. Thêm env để tạo tài khoản thật." />
      ) : null}
      {message ? <AppErrorState title="Thông báo" message={message} /> : null}
      <AppCard tone="peach">
        <AppInput label="Tên hiển thị" placeholder="Ví dụ: Minh Anh" value={displayName} onChangeText={setDisplayName} />
        <AppInput label="Trường/khu vực" placeholder="ĐH KHTN, KTX B, Dĩ An..." />
        <AppInput label="Số điện thoại riêng tư" placeholder="Không hiển thị nếu chưa đồng ý" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      </AppCard>
      <AppCard>
        <AppInput label="Email sinh viên" placeholder="ban@student.edu.vn" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <AppInput label="Mật khẩu" placeholder="Tối thiểu 8 ký tự" secureTextEntry value={password} onChangeText={setPassword} />
        <VerifiedBadge status="pending" />
      </AppCard>
      <AppButton title="Tạo tài khoản sinh viên" onPress={submit} />
      <Link href="/(student)" asChild>
        <AppButton title="Xem shell sinh viên" variant="secondary" />
      </Link>
    </AppScreen>
  );
}

