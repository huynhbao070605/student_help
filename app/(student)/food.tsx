import { PlaceholderListScreen } from "@/components/screens/PlaceholderListScreen";
import { foodCards } from "@/data/placeholders";

export default function FoodDealsScreen() {
  return (
    <PlaceholderListScreen
      eyebrow="Food & Deals"
      title="Đồ ăn"
      subtitle="Quán gần sinh viên, deal dễ thương, đặt món thủ công qua tin nhắn."
      searchPlaceholder="Tìm cơm, trà sữa, bún, in ấn..."
      cards={foodCards}
      filterLabels={["Gần đây", "Deal SV", "Đang mở", "Yêu thích", "Giá mềm"]}
    />
  );
}

