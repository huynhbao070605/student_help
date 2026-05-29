import { PlaceholderListScreen } from "@/components/screens/PlaceholderListScreen";
import { adminCards } from "@/data/placeholders";

export default function AdminDashboardScreen() {
  return (
    <PlaceholderListScreen
      eyebrow="Admin"
      title="Tổng quan"
      subtitle="Hàng đợi demo cho xác minh sinh viên, riêng tư Lost & Found và báo cáo."
      searchPlaceholder="Tìm hồ sơ, bài đăng, vendor..."
      cards={adminCards}
      filterLabels={["Chờ duyệt", "Rủi ro cao", "Vendor", "Báo cáo", "Đã xử lý"]}
    />
  );
}

