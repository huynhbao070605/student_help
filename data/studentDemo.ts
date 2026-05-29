export type DemoProfile = {
  id: string;
  displayName: string;
  role: "student" | "vendor" | "admin";
  verificationStatus: "approved" | "pending" | "not_submitted" | "rejected" | "resubmit_requested";
  reputationScore: number;
  phone?: string;
  createdAt: string;
  lastActiveAt: string;
};

export type RidePost = {
  id: string;
  ownerId: string;
  ownerName: string;
  origin: string;
  destination: string;
  campus: string;
  area: string;
  departAt: string;
  scheduleNote: string;
  transportType: string;
  roleType: string;
  genderPreference: string;
  seatsAvailable: number;
  safetyNote: string;
  locationNote: string;
  verified: boolean;
  reputation: number;
  status: "active" | "closed" | "paused" | "draft" | "removed";
  createdAt: string;
};

export type MarketplacePost = {
  id: string;
  ownerId: string;
  ownerName: string;
  listingType: "sell" | "exchange" | "free" | "borrow" | "lend";
  title: string;
  description: string;
  category: string;
  subjectTag: string;
  university: string;
  faculty: string;
  area: string;
  condition: string;
  priceVnd: number | null;
  imagePaths: string[];
  verified: boolean;
  reputation: number;
  status: "active" | "closed" | "paused" | "draft" | "removed";
  createdAt: string;
};

export type LostFoundPost = {
  id: string;
  ownerId: string;
  ownerName: string;
  postType: "lost" | "found";
  title: string;
  description: string;
  category: string;
  color: string;
  brand: string;
  locationText: string;
  eventAt: string;
  imagePaths: string[];
  privacyReviewStatus: "auto_pass" | "admin_review" | "auto_rejected" | "approved" | "rejected";
  ocrRiskScore: number;
  ocrEvidence: string;
  status: "active" | "closed" | "paused" | "draft" | "removed";
  returned: boolean;
  createdAt: string;
};

export type ChatPreview = {
  id: string;
  title: string;
  context: "general" | "ride" | "marketplace" | "lost_found" | "vendor" | "food_order" | "service";
  participantName: string;
  participantRole: "student" | "vendor";
  participantReputation: number;
  lastMessage: string;
  unread: boolean;
  phoneRequestStatus: "none" | "pending" | "approved" | "rejected";
  phone?: string;
  messages: { id: string; sender: "me" | "them"; body: string; createdAt: string; imagePath?: string }[];
};

export const demoProfile: DemoProfile = {
  id: "demo-student",
  displayName: "Minh Anh",
  role: "student",
  verificationStatus: "approved",
  reputationScore: 86,
  phone: "0900000101",
  createdAt: "2026-04-02T08:00:00Z",
  lastActiveAt: "2026-05-29T09:30:00Z"
};

export const demoAlerts = [
  { id: "a1", title: "Đường vào KTX B đông sau 17:30", body: "Hẹn điểm gặp rõ ràng khi đi chung, không chia sẻ vị trí realtime.", severity: "info", area: "Làng Đại học" },
  { id: "a2", title: "Cảnh báo giấy tờ trong ảnh Lost & Found", body: "Che MSSV, CCCD, số điện thoại trước khi đăng ảnh.", severity: "warning", area: "VNU-HCM" }
];

export const demoQuickLinks = [
  { id: "q1", title: "Bản đồ VNU-HCM", description: "Mở Google Maps khu Làng Đại học", url: "https://maps.google.com/?q=VNU-HCM" },
  { id: "q2", title: "Tuyến bus sinh viên", description: "Tra nhanh các tuyến qua KTX", url: "https://maps.google.com/?q=KTX%20Khu%20B" },
  { id: "q3", title: "Phòng CTSV", description: "Link hỗ trợ giấy tờ sinh viên", url: "https://vnuhcm.edu.vn" }
];

export const demoFood = [
  { id: "f1", name: "Cơm tấm Cô Ba", area: "KTX B", deal: "Combo sườn trứng 32k", minutes: 6 },
  { id: "f2", name: "Trà sữa Mây Nhỏ", area: "Dĩ An", deal: "Mua 2 giảm 10%", minutes: 9 }
];

export const demoRides: RidePost[] = [
  {
    id: "ride-1",
    ownerId: "demo-other-1",
    ownerName: "Quang Huy",
    origin: "KTX Khu B",
    destination: "ĐH KHTN",
    campus: "VNU-HCM",
    area: "Làng Đại học",
    departAt: "2026-05-29T07:10:00+07:00",
    scheduleNote: "Thứ 2-6, có thể lệch 10 phút",
    transportType: "Xe máy",
    roleType: "Tìm bạn ngồi sau",
    genderPreference: "Không yêu cầu",
    seatsAvailable: 1,
    safetyNote: "Chỉ hẹn ở cổng KTX, đội mũ bảo hiểm.",
    locationNote: "Gặp tại cổng B, gần tiệm photocopy.",
    verified: true,
    reputation: 72,
    status: "active",
    createdAt: "2026-05-28T20:00:00Z"
  },
  {
    id: "ride-2",
    ownerId: "demo-other-2",
    ownerName: "Linh Chi",
    origin: "Dĩ An Center",
    destination: "UIT",
    campus: "VNU-HCM",
    area: "Dĩ An",
    departAt: "2026-05-29T16:45:00+07:00",
    scheduleNote: "Chiều nay, ưu tiên bạn nữ",
    transportType: "Bus + đi bộ",
    roleType: "Tìm bạn đi cùng",
    genderPreference: "Bạn nữ",
    seatsAvailable: 1,
    safetyNote: "Xác nhận qua chat trước khi đi.",
    locationNote: "Gặp trước Highlands Dĩ An.",
    verified: true,
    reputation: 91,
    status: "active",
    createdAt: "2026-05-29T05:00:00Z"
  }
];

export const demoMarketplace: MarketplacePost[] = [
  {
    id: "market-1",
    ownerId: "demo-other-3",
    ownerName: "Hà My",
    listingType: "sell",
    title: "Casio fx-580VN X còn mới",
    description: "Dùng một học kỳ, còn hộp. Hẹn ở ĐH Bách Khoa.",
    category: "Máy tính",
    subjectTag: "Toán cao cấp",
    university: "HCMUT",
    faculty: "Cơ khí",
    area: "Dĩ An",
    condition: "Tốt",
    priceVnd: 420000,
    imagePaths: ["demo-casio.jpg"],
    verified: true,
    reputation: 84,
    status: "active",
    createdAt: "2026-05-28T11:30:00Z"
  },
  {
    id: "market-2",
    ownerId: "demo-other-4",
    ownerName: "Nam Phúc",
    listingType: "borrow",
    title: "Mượn giáo trình Cấu trúc dữ liệu",
    description: "Cần mượn 1 tuần, giữ kỹ, có thể cọc thẻ thư viện.",
    category: "Sách",
    subjectTag: "Cấu trúc dữ liệu",
    university: "UIT",
    faculty: "Khoa học máy tính",
    area: "KTX A",
    condition: "Không yêu cầu",
    priceVnd: null,
    imagePaths: [],
    verified: false,
    reputation: 38,
    status: "active",
    createdAt: "2026-05-29T02:15:00Z"
  }
];

export const demoLostFound: LostFoundPost[] = [
  {
    id: "lf-1",
    ownerId: "demo-other-5",
    ownerName: "Bảo Ngọc",
    postType: "found",
    title: "Nhặt được ví màu nâu",
    description: "Ví nhỏ, có thẻ thư viện. Mình đã che thông tin riêng tư trước khi đăng.",
    category: "Ví/bóp",
    color: "Nâu",
    brand: "Không rõ",
    locationText: "Cổng Nhà văn hóa Sinh viên",
    eventAt: "2026-05-29T08:20:00+07:00",
    imagePaths: ["demo-wallet.jpg"],
    privacyReviewStatus: "admin_review",
    ocrRiskScore: 42,
    ocrEvidence: "Có thể có MSSV trong ảnh, cần admin xem lại.",
    status: "active",
    returned: false,
    createdAt: "2026-05-29T01:35:00Z"
  },
  {
    id: "lf-2",
    ownerId: "demo-other-6",
    ownerName: "Tuấn Kiệt",
    postType: "lost",
    title: "Mất tai nghe trắng gần bus 53",
    description: "Tai nghe trắng, hộp có vết xước nhỏ bên phải.",
    category: "Tai nghe",
    color: "Trắng",
    brand: "AirPods",
    locationText: "Trạm bus 53 KTX B",
    eventAt: "2026-05-28T18:15:00+07:00",
    imagePaths: [],
    privacyReviewStatus: "auto_pass",
    ocrRiskScore: 0,
    ocrEvidence: "Không có ảnh nhạy cảm.",
    status: "active",
    returned: false,
    createdAt: "2026-05-28T13:00:00Z"
  }
];

export const demoSavedSearches = [
  { id: "saved-1", name: "Ví/bóp quanh KTX B", criteria: "ví, bóp, KTX B, thẻ sinh viên" },
  { id: "saved-2", name: "Tai nghe trắng", criteria: "tai nghe, airpods, bus 53" }
];

export const demoChats: ChatPreview[] = [
  {
    id: "chat-1",
    title: "Ví màu nâu",
    context: "lost_found",
    participantName: "Bảo Ngọc",
    participantRole: "student",
    participantReputation: 78,
    lastMessage: "Bạn ơi ví có thẻ thư viện không?",
    unread: true,
    phoneRequestStatus: "pending",
    messages: [
      { id: "m1", sender: "them", body: "Mình nhặt ví ở Nhà văn hóa SV, bạn mô tả thêm giúp mình nha.", createdAt: "09:02" },
      { id: "m2", sender: "me", body: "Ví nâu có dây kéo nhỏ, bên trong có thẻ thư viện.", createdAt: "09:04" }
    ]
  },
  {
    id: "chat-2",
    title: "Cơm tấm Cô Ba",
    context: "food_order",
    participantName: "Cơm tấm Cô Ba",
    participantRole: "vendor",
    participantReputation: 91,
    lastMessage: "Cho em 1 cơm sườn, nhận ở cổng KTX B ạ.",
    unread: false,
    phoneRequestStatus: "approved",
    phone: "0900000201",
    messages: [
      { id: "m3", sender: "me", body: "Cho em 1 cơm sườn, nhận ở cổng KTX B ạ.", createdAt: "11:20" },
      { id: "m4", sender: "them", body: "Quán nhận tin rồi, khoảng 12 phút có món nha.", createdAt: "11:21" }
    ]
  }
];

export const quickMessages = {
  ride: ["Mình đi cùng tuyến này được không?", "Bạn hẹn ở đâu cho dễ thấy?", "Mình chỉ xác nhận qua chat, không cần GPS nha."],
  marketplace: ["Món này còn không bạn?", "Mình có thể hẹn lấy ở KTX B không?", "Bạn giữ giúp mình tới chiều được không?"],
  lost_found: ["Bạn mô tả thêm giúp mình được không?", "Mình đã che thông tin riêng tư trong ảnh rồi.", "Mình có thể hẹn nhận ở cổng trường không?"],
  food_order: ["Cho em đặt món này ạ.", "Em nhận ở cổng KTX B được không?", "Quán cho em xin thời gian chuẩn bị nha."],
  vendor: ["Quán còn mở không ạ?", "Cho em xem menu hôm nay với.", "Em đặt thủ công qua chat nha."],
  service: ["Dịch vụ còn nhận hôm nay không ạ?", "Cho em xin giá sinh viên với.", "Mình hẹn ở đâu tiện nhất?"],
  general: ["Cảm ơn bạn nhiều nha!", "Mình xác nhận lại chút nhé.", "Bạn nhắn mình khi tới nơi nha."]
};
