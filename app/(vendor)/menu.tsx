import { PlaceholderListScreen } from "@/components/screens/PlaceholderListScreen";
import { foodCards } from "@/data/placeholders";

export default function VendorMenuScreen() {
  return (
    <PlaceholderListScreen
      eyebrow="Vendor"
      title="Menu"
      subtitle="Placeholder cho upload ảnh menu và chỉnh món thủ công trong prompt sau."
      searchPlaceholder="Tìm món trong menu..."
      cards={foodCards}
      filterLabels={["Ảnh menu", "Món đang bán", "Hết món", "Deal SV"]}
    />
  );
}

