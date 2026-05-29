import { PlaceholderListScreen } from "@/components/screens/PlaceholderListScreen";
import { adminCards } from "@/data/placeholders";

export default function AdminReportsScreen() {
  return (
    <PlaceholderListScreen
      eyebrow="Admin"
      title="Báo cáo"
      subtitle="Theo dõi report, block và các nội dung cần xử lý an toàn."
      searchPlaceholder="Tìm báo cáo..."
      cards={adminCards}
      filterLabels={["Mới", "Đang xử lý", "Spam", "An toàn", "Đã đóng"]}
    />
  );
}

