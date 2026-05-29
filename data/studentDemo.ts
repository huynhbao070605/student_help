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

function hydrateStudentDemoData() {
const rideTemplates = [
  ["KTX Khu A", "UIT", "Xe may", "Sang thu 2-6"],
  ["KTX Khu B", "HCMUS", "Xe may", "7:00 hang ngay"],
  ["Di An Center", "HCMUT", "Bus", "Chieu tan hoc"],
  ["Linh Trung", "UEL", "Xe dap", "Toi thu 3"],
  ["Nha van hoa Sinh vien", "KTX Khu B", "Di bo", "Sau su kien"],
  ["Suoi Tien", "KTX Khu A", "Bus", "Cuoi tuan"],
  ["Thu Duc", "UIT", "Xe may", "Ca hoc 9:00"],
  ["KTX Khu B", "Thu vien Trung tam", "Di bo", "Nhom on thi"],
  ["Di An", "Nha van hoa Sinh vien", "Xe may", "18:30"],
  ["KTX Khu A", "HCMUT", "Bus + di bo", "Sang mai"],
  ["Linh Trung", "HCMUS", "Xe may", "Mua nhe van di"],
  ["KTX Khu B", "UEL", "Xe may", "Con 1 cho"],
  ["Suoi Tien", "UIT", "Bus", "Tuyen 53"]
];

demoRides.push(
  ...rideTemplates.map((item, index) => ({
    id: `ride-extra-${index + 1}`,
    ownerId: `demo-student-${index + 3}`,
    ownerName: ["Gia Linh", "Bao Ngoc", "Tuan Anh", "Ha Mi", "Nam Phuc", "Linh Chi"][index % 6],
    origin: item[0],
    destination: item[1],
    campus: "VNU-HCM",
    area: index % 3 === 0 ? "KTX A" : index % 3 === 1 ? "KTX B" : "Di An",
    departAt: `2026-05-${29 + (index % 2)}T0${7 + (index % 3)}:15:00+07:00`,
    scheduleNote: item[3],
    transportType: item[2],
    roleType: index % 2 === 0 ? "Tim ban di cung" : "Co the cho 1 ban",
    genderPreference: index % 4 === 0 ? "Ban nu" : "Khong yeu cau",
    seatsAvailable: 1,
    safetyNote: "Chi hen diem cong cong, xac nhan qua chat.",
    locationNote: "Gap o cong chinh hoac tram bus gan nhat.",
    verified: index % 5 !== 0,
    reputation: 45 + index * 4,
    status: "active",
    createdAt: `2026-05-2${index % 9}T10:00:00Z`
  })) as RidePost[]
);

const marketplaceTitles = [
  "Tai nghe trang con tot",
  "Binh nuoc xanh 700ml",
  "Ao lab HCMUS size M",
  "Giao trinh Giai tich 1",
  "Laptop stand gap gon",
  "Muon may tinh Casio cuoi tuan",
  "Cho muon sach Cau truc du lieu",
  "Doi balo den lay balo nho",
  "Ban den ban hoc KTX",
  "Bo but highlight pastel",
  "Free giay A4 con du",
  "Ban chuot khong day",
  "Muon ao dai chup ky yeu",
  "Pass ve workshop UIT",
  "Sach tieng Anh B1",
  "Bang ve mini",
  "Ban o cam dien KTX",
  "Trao doi flashcard TOEIC",
  "Cho muon du di mua",
  "Ban balo laptop",
  "Free ke sach nhua",
  "Muon tripod quay bai",
  "Ban keyboard co mini"
];

demoMarketplace.push(
  ...marketplaceTitles.map((title, index) => ({
    id: `market-extra-${index + 1}`,
    ownerId: `demo-student-${(index % 12) + 1}`,
    ownerName: ["Minh Anh", "Quang Huy", "Gia Linh", "Bao Ngoc", "Ha Mi", "Nam Phuc"][index % 6],
    listingType: (["sell", "exchange", "free", "borrow", "lend"] as const)[index % 5],
    title,
    description: `${title} - demo quanh VNU-HCM, hen nhan o KTX hoac thu vien.`,
    category: ["Sach", "Do hoc", "Dien tu", "Do KTX", "Ve su kien"][index % 5],
    subjectTag: ["Toan", "CNTT", "Anh van", "Vat ly", "Do an"][index % 5],
    university: ["UIT", "HCMUT", "HCMUS", "UEL"][index % 4],
    faculty: ["CNTT", "Kinh te", "Co khi", "Khoa hoc"][index % 4],
    area: ["KTX A", "KTX B", "Di An", "Lang Dai hoc"][index % 4],
    condition: ["Tot", "Kha", "Moi", "Can xem truoc"][index % 4],
    priceVnd: index % 5 === 2 || index % 5 === 3 || index % 5 === 4 ? null : 15000 + index * 12000,
    imagePaths: index % 3 === 0 ? [`market-${index + 1}.jpg`] : [],
    verified: index % 4 !== 0,
    reputation: 35 + index * 3,
    status: "active",
    createdAt: `2026-05-${10 + (index % 18)}T09:00:00Z`
  })) as MarketplacePost[]
);

const lostFoundSeeds = [
  ["found", "vi nau gan KTX B", "Vi mau nau nhat gan KTX B, da che thong tin rieng tu.", "Vi/bop", "Nau", "Khong ro", "Cong KTX B"],
  ["lost", "tai nghe trang thu vien", "Tai nghe trang quen o thu vien trung tam.", "Tai nghe", "Trang", "AirPods", "Thu vien Trung tam"],
  ["found", "the sinh vien UIT", "Nhat duoc the sinh vien UIT, can admin review vi co the co MSSV.", "The", "Xanh", "UIT", "Cong UIT"],
  ["lost", "binh nuoc xanh", "Binh nuoc xanh co sticker o nha van hoa sinh vien.", "Binh nuoc", "Xanh", "LocknLock", "Nha van hoa Sinh vien"]
];

const moreLostFound = Array.from({ length: 24 }, (_, index) => {
  const types = ["lost", "found"] as const;
  const categories = ["Chia khoa", "Sach", "O/du", "Vi/bop", "Tai nghe", "Binh nuoc"];
  return [
    types[index % 2],
    `${types[index % 2] === "lost" ? "Mat" : "Nhat duoc"} ${categories[index % categories.length]} demo ${index + 1}`,
    "Thong tin mo ta da tranh so dien thoai, CCCD va dia chi rieng.",
    categories[index % categories.length],
    ["Den", "Trang", "Xanh", "Nau"][index % 4],
    ["Khong ro", "Deli", "Casio", "Local"][index % 4],
    ["KTX A", "KTX B", "UIT", "HCMUS", "Di An"][index % 5]
  ];
});

demoLostFound.push(
  ...[...lostFoundSeeds, ...moreLostFound].map((row, index) => ({
    id: `lf-extra-${index + 1}`,
    ownerId: `demo-student-${(index % 12) + 1}`,
    ownerName: ["Minh Anh", "Quang Huy", "Gia Linh", "Bao Ngoc", "Ha Mi", "Nam Phuc"][index % 6],
    postType: row[0] as "lost" | "found",
    title: row[1],
    description: row[2],
    category: row[3],
    color: row[4],
    brand: row[5],
    locationText: row[6],
    eventAt: `2026-05-${12 + (index % 17)}T12:00:00+07:00`,
    imagePaths: index % 4 === 0 ? [`lost-found-${index + 1}.jpg`] : [],
    privacyReviewStatus: (["auto_pass", "admin_review", "approved", "auto_rejected"] as const)[index % 4],
    ocrRiskScore: [0, 38, 8, 88][index % 4],
    ocrEvidence: index % 4 === 3 ? "Strong evidence: visible phone-like number in image." : "Demo OCR/rule score.",
    status: "active",
    returned: index % 9 === 0,
    createdAt: `2026-05-${12 + (index % 17)}T07:00:00Z`
  })) as LostFoundPost[]
);

demoSavedSearches.push(
  { id: "saved-3", name: "The sinh vien UIT", criteria: "the sinh vien UIT MSSV admin review" },
  { id: "saved-4", name: "Binh nuoc xanh", criteria: "binh nuoc xanh sticker nha van hoa" }
);

demoChats.push(
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `chat-extra-${index + 1}`,
    title: ["Di chung KTX", "Pass sach", "Lost and Found", "Order do an", "Dich vu in an"][index % 5],
    context: (["ride", "marketplace", "lost_found", "food_order", "service"] as const)[index % 5],
    participantName: ["Gia Linh", "Bao Ngoc", "Com Tam Co Ba", "In an KTX B", "Tra Sua May Nho"][index % 5],
    participantRole: index % 5 === 3 || index % 5 === 4 ? "vendor" : "student",
    participantReputation: 60 + index * 3,
    lastMessage: "Tin nhan demo co du trang thai pending/approved/declined cho xin so dien thoai.",
    unread: index % 2 === 0,
    phoneRequestStatus: (["none", "pending", "approved", "rejected"] as const)[index % 4],
    phone: index % 4 === 2 ? `09000001${index}` : undefined,
    messages: [
      { id: `chat-extra-${index + 1}-m1`, sender: "them", body: "Ban con can ho tro khong?", createdAt: "08:10" },
      { id: `chat-extra-${index + 1}-m2`, sender: "me", body: "Minh xac nhan qua chat truoc nha.", createdAt: "08:12" }
    ]
  })) as ChatPreview[]
);
}

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

hydrateStudentDemoData();
