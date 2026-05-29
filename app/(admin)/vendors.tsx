import { PlaceholderListScreen } from "@/components/screens/PlaceholderListScreen";
import { foodCards } from "@/data/placeholders";

export default function AdminVendorsScreen() {
  return (
    <PlaceholderListScreen
      eyebrow="Admin"
      title="Vendor"
      subtitle="Admin tạo tài khoản vendor bằng phone-style login và seed password."
      searchPlaceholder="Tìm quán, dịch vụ..."
      cards={foodCards}
      filterLabels={["Nhà hàng", "In ấn", "Giặt ủi", "Sửa xe", "Đang mở"]}
    />
  );
}

