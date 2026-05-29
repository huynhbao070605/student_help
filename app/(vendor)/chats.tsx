import { PlaceholderListScreen } from "@/components/screens/PlaceholderListScreen";
import { chatCards } from "@/data/placeholders";

export default function VendorChatsScreen() {
  return (
    <PlaceholderListScreen
      eyebrow="Vendor"
      title="Tin nhắn"
      subtitle="Nhận order thủ công qua chat. Số điện thoại sinh viên chỉ hiện khi được duyệt."
      searchPlaceholder="Tìm khách, món, đoạn chat..."
      cards={chatCards}
      filterLabels={["Tin mới", "Đặt món", "Yêu cầu SĐT", "Đã trả lời"]}
    />
  );
}

