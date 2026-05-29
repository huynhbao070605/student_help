import { PlaceholderListScreen } from "@/components/screens/PlaceholderListScreen";
import { foodCards } from "@/data/placeholders";

export default function VendorPostsScreen() {
  return (
    <PlaceholderListScreen
      eyebrow="Vendor"
      title="Bài đăng"
      subtitle="Các deal và thông báo quán cho sinh viên, quản lý trong phạm vi quán của mình."
      searchPlaceholder="Tìm bài đăng..."
      cards={foodCards}
      filterLabels={["Deal", "Thông báo", "Đang hiện", "Ẩn", "Hết hạn"]}
    />
  );
}

