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
  remoteId?: string;
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
  id: "seed-student",
  displayName: "Minh Anh",
  role: "student",
  verificationStatus: "approved",
  reputationScore: 86,
  phone: "0900000101",
  createdAt: "2026-04-02T08:00:00Z",
  lastActiveAt: "2026-05-30T08:30:00Z"
};

export const demoAlerts = [
  { id: "a1", title: "Đường vào KTX B đông sau 17:30", body: "Hẹn điểm gặp rõ ràng khi đi chung và xác nhận trước qua chat.", severity: "info", area: "Làng Đại học" },
  { id: "a2", title: "Nhắc nhẹ khi đăng Lost & Found", body: "Che MSSV, CCCD và số điện thoại trước khi đăng ảnh.", severity: "warning", area: "VNU-HCM" }
];

export const demoQuickLinks = [
  { id: "q1", title: "Bản đồ VNU-HCM", description: "Mở Google Maps khu Làng Đại học", url: "https://maps.google.com/?q=VNU-HCM" },
  { id: "q2", title: "Tuyến bus sinh viên", description: "Tra nhanh các tuyến qua KTX", url: "https://maps.google.com/?q=KTX%20Khu%20B" },
  { id: "q3", title: "Phòng Công tác sinh viên", description: "Link hỗ trợ giấy tờ sinh viên", url: "https://vnuhcm.edu.vn" }
];

export const demoFood = [
  { id: "f1", name: "Cơm tấm Cô Ba", area: "KTX B", deal: "Combo sườn trứng 32k", minutes: 6 },
  { id: "f2", name: "Trà sữa Mây Nhỏ", area: "Dĩ An", deal: "Mua 2 giảm 10%", minutes: 9 }
];

export const demoRides: RidePost[] = [
  {
    id: "uit-ride-1",
    ownerId: "seed-student-1",
    ownerName: "Ngọc Trâm",
    origin: "KTX Khu B",
    destination: "UIT cổng chính",
    campus: "UIT",
    area: "Làng Đại học",
    departAt: "2026-05-30T07:15:00+07:00",
    scheduleNote: "Sáng nay 07:15, hẹn sớm 5 phút",
    transportType: "Xe máy",
    roleType: "Có thể chở 1 bạn",
    genderPreference: "Không yêu cầu",
    seatsAvailable: 1,
    safetyNote: "Xác nhận qua chat trước khi đi, chỉ hẹn ở cổng KTX.",
    locationNote: "Cổng KTX B, gần tiệm photocopy.",
    verified: true,
    reputation: 88,
    status: "active",
    createdAt: "2026-05-30T00:30:00Z"
  },
  {
    id: "uit-ride-2",
    ownerId: "seed-student-2",
    ownerName: "Minh Quân",
    origin: "Suối Tiên",
    destination: "Thư viện UIT",
    campus: "UIT",
    area: "Suối Tiên",
    departAt: "2026-05-30T13:00:00+07:00",
    scheduleNote: "Ca chiều ôn thi, đi bus 53 rồi đi bộ",
    transportType: "Bus",
    roleType: "Tìm bạn đi cùng",
    genderPreference: "Không yêu cầu",
    seatsAvailable: 1,
    safetyNote: "Chat xác nhận giờ và điểm hẹn, không chia sẻ GPS trực tiếp.",
    locationNote: "Trạm bus Suối Tiên.",
    verified: true,
    reputation: 76,
    status: "active",
    createdAt: "2026-05-30T00:10:00Z"
  },
  {
    id: "uit-ride-3",
    ownerId: "seed-student-3",
    ownerName: "Gia Linh",
    origin: "Dĩ An Center",
    destination: "UIT tòa E",
    campus: "UIT",
    area: "Dĩ An",
    departAt: "2026-05-30T16:45:00+07:00",
    scheduleNote: "Chiều nay 16:45 sau ca thực hành",
    transportType: "Xe máy",
    roleType: "Tìm bạn ngồi sau",
    genderPreference: "Bạn nữ",
    seatsAvailable: 1,
    safetyNote: "Chỉ hẹn ở nơi đông người, xác nhận trước qua tin nhắn.",
    locationNote: "Trước Highlands Dĩ An.",
    verified: true,
    reputation: 91,
    status: "active",
    createdAt: "2026-05-29T05:00:00Z"
  },
  {
    id: "uit-ride-4",
    ownerId: "seed-student-4",
    ownerName: "Bảo Ngọc",
    origin: "KTX Khu A",
    destination: "Nhà văn hóa Sinh viên",
    campus: "VNU-HCM",
    area: "KTX Khu A",
    departAt: "2026-05-31T08:00:00+07:00",
    scheduleNote: "Sáng mai 08:00 đi sự kiện CLB",
    transportType: "Đi bộ",
    roleType: "Tìm bạn đi cùng",
    genderPreference: "Không yêu cầu",
    seatsAvailable: 1,
    safetyNote: "Đi theo nhóm nhỏ, hẹn ở cổng chính.",
    locationNote: "Cổng KTX Khu A.",
    verified: true,
    reputation: 73,
    status: "active",
    createdAt: "2026-05-29T09:00:00Z"
  }
];

export const demoMarketplace: MarketplacePost[] = [
  {
    id: "uit-market-1",
    ownerId: "seed-student-5",
    ownerName: "Bảo An",
    listingType: "lend",
    title: "Cho mượn giáo trình Cấu trúc dữ liệu UIT",
    description: "Sách còn sạch, cho mượn 5 ngày để ôn thi, hẹn nhận ở thư viện UIT.",
    category: "Sách",
    subjectTag: "Cấu trúc dữ liệu",
    university: "UIT",
    faculty: "Khoa Khoa học máy tính",
    area: "Thư viện UIT",
    condition: "Tốt",
    priceVnd: null,
    imagePaths: [],
    verified: true,
    reputation: 82,
    status: "active",
    createdAt: "2026-05-30T01:00:00Z"
  },
  {
    id: "uit-market-2",
    ownerId: "seed-student-6",
    ownerName: "Khánh Linh",
    listingType: "free",
    title: "Tặng bộ đề ôn Nhập môn lập trình",
    description: "Bộ đề photo có ghi chú, phù hợp sinh viên năm nhất UIT.",
    category: "Tài liệu",
    subjectTag: "Nhập môn lập trình",
    university: "UIT",
    faculty: "Kỹ thuật phần mềm",
    area: "KTX Khu B",
    condition: "Đã dùng, còn rõ chữ",
    priceVnd: null,
    imagePaths: [],
    verified: true,
    reputation: 91,
    status: "active",
    createdAt: "2026-05-30T00:45:00Z"
  },
  {
    id: "uit-market-3",
    ownerId: "seed-student-7",
    ownerName: "Hà My",
    listingType: "sell",
    title: "Casio fx-580VN X còn mới",
    description: "Dùng một học kỳ, còn hộp, phù hợp Toán rời rạc và Xác suất thống kê.",
    category: "Máy tính",
    subjectTag: "Toán rời rạc",
    university: "UIT",
    faculty: "Hệ thống thông tin",
    area: "Làng Đại học",
    condition: "Tốt",
    priceVnd: 420000,
    imagePaths: ["casio-uit.jpg"],
    verified: true,
    reputation: 84,
    status: "active",
    createdAt: "2026-05-29T11:30:00Z"
  },
  {
    id: "uit-market-4",
    ownerId: "seed-student-8",
    ownerName: "Nam Phúc",
    listingType: "borrow",
    title: "Mượn laptop stand gấp gọn cuối tuần",
    description: "Cần mượn để thuyết trình nhóm, giữ kỹ và trả tại KTX B.",
    category: "Đồ học",
    subjectTag: "Kỹ năng nghề nghiệp",
    university: "UIT",
    faculty: "Mạng máy tính",
    area: "KTX Khu B",
    condition: "Không yêu cầu",
    priceVnd: null,
    imagePaths: [],
    verified: false,
    reputation: 58,
    status: "active",
    createdAt: "2026-05-29T02:15:00Z"
  }
];

export const demoLostFound: LostFoundPost[] = [
  {
    id: "lf-1",
    ownerId: "seed-student-9",
    ownerName: "Bảo Ngọc",
    postType: "found",
    title: "Nhặt được ví màu nâu",
    description: "Ví nhỏ, có thẻ thư viện. Mình đã che thông tin riêng tư trước khi đăng.",
    category: "Ví/bóp",
    color: "Nâu",
    brand: "Không rõ",
    locationText: "Cổng Nhà văn hóa Sinh viên",
    eventAt: "2026-05-29T08:20:00+07:00",
    imagePaths: ["wallet-uit.jpg"],
    privacyReviewStatus: "admin_review",
    ocrRiskScore: 42,
    ocrEvidence: "Có thể có MSSV trong ảnh, cần admin xem lại.",
    status: "active",
    returned: false,
    createdAt: "2026-05-29T01:35:00Z"
  },
  {
    id: "lf-2",
    ownerId: "seed-student-10",
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
  { id: "saved-2", name: "Tai nghe trắng", criteria: "tai nghe, bus 53" }
];

export const demoChats: ChatPreview[] = [
  {
    id: "uit-chat-1",
    title: "Mượn giáo trình Cấu trúc dữ liệu",
    context: "marketplace",
    participantName: "Bảo An",
    participantRole: "student",
    participantReputation: 82,
    lastMessage: "Mình hẹn ở thư viện UIT lúc 16:30 được không?",
    unread: false,
    phoneRequestStatus: "none",
    messages: [
      { id: "uit-chat-1-m1", sender: "them", body: "Sách còn nha, bạn cần mượn mấy ngày?", createdAt: "15:20" },
      { id: "uit-chat-1-m2", sender: "me", body: "Mình mượn 5 ngày để ôn thi, giữ sách kỹ.", createdAt: "15:22" }
    ]
  },
  {
    id: "uit-chat-2",
    title: "Đi chung KTX B → UIT",
    context: "ride",
    participantName: "Ngọc Trâm",
    participantRole: "student",
    participantReputation: 88,
    lastMessage: "Mình đứng ở cổng KTX B lúc 07:10 nha.",
    unread: true,
    phoneRequestStatus: "pending",
    messages: [
      { id: "uit-chat-2-m1", sender: "them", body: "Mình đứng ở cổng KTX B lúc 07:10 nha.", createdAt: "06:55" },
      { id: "uit-chat-2-m2", sender: "me", body: "Ổn nha, mình xác nhận qua chat trước khi đi.", createdAt: "06:57" }
    ]
  },
  {
    id: "uit-chat-3",
    title: "Ví màu nâu",
    context: "lost_found",
    participantName: "Bảo Ngọc",
    participantRole: "student",
    participantReputation: 78,
    lastMessage: "Bạn ơi ví có thẻ thư viện không?",
    unread: true,
    phoneRequestStatus: "pending",
    messages: [
      { id: "uit-chat-3-m1", sender: "them", body: "Mình nhặt ví ở Nhà văn hóa SV, bạn mô tả thêm giúp mình nha.", createdAt: "09:02" },
      { id: "uit-chat-3-m2", sender: "me", body: "Ví nâu có dây kéo nhỏ, bên trong có thẻ thư viện.", createdAt: "09:04" }
    ]
  },
  {
    id: "uit-chat-4",
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
      { id: "uit-chat-4-m1", sender: "me", body: "Cho em 1 cơm sườn, nhận ở cổng KTX B ạ.", createdAt: "11:20" },
      { id: "uit-chat-4-m2", sender: "them", body: "Quán nhận tin rồi, khoảng 12 phút có món nha.", createdAt: "11:21" }
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
} satisfies Record<ChatPreview["context"], string[]>;
