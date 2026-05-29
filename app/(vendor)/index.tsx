import { PlaceholderListScreen } from "@/components/screens/PlaceholderListScreen";
import { vendorCards } from "@/data/placeholders";

export default function VendorDashboardScreen() {
  return (
    <PlaceholderListScreen
      eyebrow="Vendor"
      title="Tổng quan quán"
      subtitle="Quản lý menu và chat thủ công. Không thanh toán, không tracking giao hàng."
      searchPlaceholder="Tìm món, chat, bài đăng..."
      cards={vendorCards}
      filterLabels={["Menu", "Tin mới", "Deal", "Đang mở", "Cần cập nhật"]}
    />
  );
}

