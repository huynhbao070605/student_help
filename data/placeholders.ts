import { ComponentProps } from "react";

import { QuickActionCard } from "@/components/ui";

type Tone = ComponentProps<typeof QuickActionCard>["tone"];

export const homeActions: {
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof QuickActionCard>["icon"];
  tone: Tone;
}[] = [
  {
    title: "Đi chung",
    subtitle: "Tìm bạn cùng tuyến qua Thủ Đức, Dĩ An",
    icon: "bicycle",
    tone: "mint"
  },
  {
    title: "Tìm đồ",
    subtitle: "Đồ thất lạc, đồ học tập, trao đổi nhanh",
    icon: "search-circle",
    tone: "butter"
  },
  {
    title: "Đồ ăn",
    subtitle: "Deal quán quen và đặt thủ công qua chat",
    icon: "fast-food",
    tone: "peach"
  },
  {
    title: "Dịch vụ SV",
    subtitle: "In ấn, giặt ủi, sửa xe, sửa laptop",
    icon: "sparkles",
    tone: "lavender"
  }
];

export const rideCards = [
  {
    title: "KTX Khu B -> ĐH KHTN",
    meta: "07:10 sáng · Xe máy · Còn 1 bạn",
    badge: "Hôm nay"
  },
  {
    title: "Dĩ An -> Làng ĐH",
    meta: "Thứ 2-6 · Bus + đi bộ · Bạn nữ ưu tiên",
    badge: "Lặp lại"
  }
];

export const marketplaceCards = [
  {
    title: "Máy tính Casio fx-580VN X",
    meta: "Bán · 420k · Gần ĐH Bách Khoa",
    badge: "Học tập"
  },
  {
    title: "Mượn giáo trình Cấu trúc dữ liệu",
    meta: "Mượn/lend · 1 tuần · KTX A",
    badge: "Mượn"
  }
];

export const lostFoundCards = [
  {
    title: "Nhặt được ví màu nâu",
    meta: "Cổng Nhà văn hóa SV · Chờ duyệt riêng tư",
    badge: "Admin review"
  },
  {
    title: "Mất tai nghe trắng",
    meta: "Bus 53 · Tìm theo mô tả và thời gian",
    badge: "Đang tìm"
  }
];

export const foodCards = [
  {
    title: "Cơm tấm Cô Ba",
    meta: "Gần KTX B · Combo SV 32k · Chat để đặt",
    badge: "Deal trưa"
  },
  {
    title: "Trà sữa Mây Nhỏ",
    meta: "Dĩ An · Mua 2 giảm 10% · Menu ảnh",
    badge: "Yêu thích"
  }
];

export const chatCards = [
  {
    title: "Minh Anh · Ví màu nâu",
    meta: "Bạn ơi ví có thẻ thư viện không?",
    badge: "Tin mới"
  },
  {
    title: "Cơm tấm Cô Ba",
    meta: "Cho em 1 cơm sườn, nhận ở cổng KTX B ạ",
    badge: "Đặt thủ công"
  }
];

export const adminCards = [
  {
    title: "12 thẻ sinh viên chờ duyệt",
    meta: "Chỉ admin xem được ảnh xác minh",
    badge: "Duyệt SV"
  },
  {
    title: "5 bài Lost & Found cần kiểm tra",
    meta: "OCR mơ hồ hoặc có thông tin riêng tư",
    badge: "Riêng tư"
  }
];

export const vendorCards = [
  {
    title: "Menu hôm nay",
    meta: "8 món đang bật · 2 món cần cập nhật giá",
    badge: "Menu"
  },
  {
    title: "4 cuộc chat mới",
    meta: "Đơn thủ công, không thanh toán trong app",
    badge: "Tin nhắn"
  }
];
