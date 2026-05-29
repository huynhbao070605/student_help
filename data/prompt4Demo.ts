export type OpenStatus = "open" | "busy" | "closed" | "temporarily_closed";
export type MenuAvailability = "Còn món" | "Hết món" | "Còn ít" | "Sắp có lại";
export type VendorPostType = "daily deal" | "new item" | "combo" | "notice" | "sold out" | "group order";

export type MenuItem = {
  id: string;
  vendorId: string;
  name: string;
  category: "rice meal" | "noodles" | "drinks" | "snacks" | "service";
  description: string;
  priceVnd: number;
  availability: MenuAvailability;
  tags: string[];
  options: string[];
  saved?: boolean;
  orderedBefore?: boolean;
};

export type FoodVendor = {
  id: string;
  ownerPhone: string;
  name: string;
  category: string;
  area: "KTX A" | "KTX B" | "Di An" | "Dĩ An" | "Thu Duc" | "Thủ Đức" | "Làng Đại học";
  locationQuery: string;
  locationNote: string;
  mapsUrl: string;
  openingStatus: OpenStatus;
  distanceMeters: number;
  walkingMinutes: number;
  rating: number;
  reputation: number;
  priceHint: string;
  tags: string[];
  menuImage: string;
  isFavorite?: boolean;
  deliveryAvailable?: boolean;
  preorderAvailable?: boolean;
  menuItems: MenuItem[];
};

export type VendorPost = {
  id: string;
  vendorId: string;
  type: VendorPostType;
  title: string;
  body: string;
  badge: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  category: string;
  area: string;
  description: string;
  priceHint: string;
  openStatus: OpenStatus;
  rating: number;
  tags: string[];
};

export type CommunityAlert = {
  id: string;
  title: string;
  body: string;
  area: string;
  severity: "info" | "warning" | "urgent";
  active: boolean;
  dismissed?: boolean;
};

export type CampusQuickLink = {
  id: string;
  group: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  saved?: boolean;
};

export const vendorTags = [
  "Giảm giá sinh viên",
  "Gần KTX",
  "Mở khuya",
  "Có giao tận nơi",
  "Có đặt trước",
  "Phù hợp học nhóm",
  "Admin verified"
];

export const foodFilters = [
  "nearby",
  "open now",
  "near KTX A",
  "near KTX B",
  "under 20k",
  "under 30k",
  "under 50k",
  "rice meal",
  "noodles",
  "drinks",
  "snacks",
  "late night food",
  "student combo",
  "daily deal",
  "delivery available",
  "preorder available",
  "favorite vendors",
  "popular items",
  "best seller"
];

export const foodVendors: FoodVendor[] = [
  {
    id: "vendor-1",
    ownerPhone: "0900000001",
    name: "Cơm Tấm Cô Ba",
    category: "rice meal",
    area: "KTX B",
    locationQuery: "Cổng KTX Khu B, Dĩ An",
    locationNote: "Hẻm đối diện cổng B, bảng màu cam",
    mapsUrl: "https://maps.google.com/?q=KTX%20Khu%20B%20Di%20An",
    openingStatus: "open",
    distanceMeters: 450,
    walkingMinutes: 6,
    rating: 4.8,
    reputation: 94,
    priceHint: "22k-45k",
    tags: ["Giảm giá sinh viên", "Gần KTX", "Có giao tận nơi", "Admin verified"],
    menuImage: "vendor-menu-com-tam-co-ba.jpg",
    isFavorite: true,
    deliveryAvailable: true,
    preorderAvailable: true,
    menuItems: [
      {
        id: "mi-1",
        vendorId: "vendor-1",
        name: "Cơm sườn trứng",
        category: "rice meal",
        description: "Sườn nướng, trứng ốp, canh rong biển",
        priceVnd: 32000,
        availability: "Còn món",
        tags: ["best seller", "student favorite"],
        options: ["less spicy", "no onion", "pickup time"],
        saved: true,
        orderedBefore: true
      },
      {
        id: "mi-2",
        vendorId: "vendor-1",
        name: "Combo nhóm 3 phần",
        category: "rice meal",
        description: "3 cơm sườn, 3 trà đá, giảm 12k",
        priceVnd: 90000,
        availability: "Còn ít",
        tags: ["daily deal"],
        options: ["pickup time"]
      }
    ]
  },
  {
    id: "vendor-2",
    ownerPhone: "0900000002",
    name: "Trà Sữa Mây Nhỏ",
    category: "drinks",
    area: "Dĩ An",
    locationQuery: "Dĩ An Center",
    locationNote: "Ngay vòng xoay Dĩ An, có bàn học nhóm",
    mapsUrl: "https://maps.google.com/?q=Di%20An%20Center",
    openingStatus: "busy",
    distanceMeters: 850,
    walkingMinutes: 11,
    rating: 4.7,
    reputation: 90,
    priceHint: "18k-39k",
    tags: ["Mở khuya", "Có đặt trước", "Phù hợp học nhóm", "Admin verified"],
    menuImage: "vendor-menu-may-nho.jpg",
    isFavorite: true,
    preorderAvailable: true,
    menuItems: [
      {
        id: "mi-3",
        vendorId: "vendor-2",
        name: "Trà sữa lài size M",
        category: "drinks",
        description: "Ít ngọt mặc định, topping trân châu",
        priceVnd: 25000,
        availability: "Còn món",
        tags: ["new", "student favorite"],
        options: ["less ice", "size M/L", "pickup time"],
        saved: true
      },
      {
        id: "mi-4",
        vendorId: "vendor-2",
        name: "Matcha kem cheese",
        category: "drinks",
        description: "Vị mới trong tuần",
        priceVnd: 33000,
        availability: "Sắp có lại",
        tags: ["new"],
        options: ["less ice", "size M/L"]
      }
    ]
  },
  {
    id: "vendor-3",
    ownerPhone: "0900000003",
    name: "Mì Cay 2 Người Bạn",
    category: "noodles",
    area: "KTX A",
    locationQuery: "KTX Khu A VNU-HCM",
    locationNote: "Sau nhà xe KTX A, nhận đặt trước giờ tan học",
    mapsUrl: "https://maps.google.com/?q=KTX%20Khu%20A%20VNU-HCM",
    openingStatus: "open",
    distanceMeters: 620,
    walkingMinutes: 8,
    rating: 4.6,
    reputation: 87,
    priceHint: "29k-49k",
    tags: ["Gần KTX", "Mở khuya", "Có đặt trước"],
    menuImage: "vendor-menu-mi-cay.jpg",
    deliveryAvailable: true,
    preorderAvailable: true,
    menuItems: [
      {
        id: "mi-5",
        vendorId: "vendor-3",
        name: "Mì cay hải sản cấp 1",
        category: "noodles",
        description: "Phần vừa, hợp ăn tối sau lớp",
        priceVnd: 39000,
        availability: "Còn món",
        tags: ["best seller"],
        options: ["less spicy", "no onion", "pickup time"]
      }
    ]
  },
  {
    id: "vendor-4",
    ownerPhone: "0900000004",
    name: "Bánh Mì UIT Corner",
    category: "snacks",
    area: "Làng Đại học",
    locationQuery: "Đại học Công nghệ Thông tin VNU-HCM",
    locationNote: "Xe đẩy trước cổng UIT buổi sáng",
    mapsUrl: "https://maps.google.com/?q=UIT%20VNU-HCM",
    openingStatus: "closed",
    distanceMeters: 1200,
    walkingMinutes: 15,
    rating: 4.5,
    reputation: 82,
    priceHint: "15k-25k",
    tags: ["Giảm giá sinh viên", "Admin verified"],
    menuImage: "vendor-menu-banh-mi-uit.jpg",
    menuItems: [
      {
        id: "mi-6",
        vendorId: "vendor-4",
        name: "Bánh mì trứng pate",
        category: "snacks",
        description: "Bán sáng, hết nhanh trước 8:30",
        priceVnd: 18000,
        availability: "Hết món",
        tags: ["sold out"],
        options: ["no onion"]
      }
    ]
  },
  {
    id: "vendor-5",
    ownerPhone: "0900000005",
    name: "Bún Bò Cô Hạnh",
    category: "noodles",
    area: "Thủ Đức",
    locationQuery: "Linh Trung Thu Duc",
    locationNote: "Gần trạm bus Linh Trung",
    mapsUrl: "https://maps.google.com/?q=Linh%20Trung%20Thu%20Duc",
    openingStatus: "temporarily_closed",
    distanceMeters: 1800,
    walkingMinutes: 22,
    rating: 4.4,
    reputation: 80,
    priceHint: "30k-45k",
    tags: ["Có giao tận nơi"],
    menuImage: "vendor-menu-bun-bo.jpg",
    deliveryAvailable: true,
    menuItems: [
      {
        id: "mi-7",
        vendorId: "vendor-5",
        name: "Bún bò tô nhỏ",
        category: "noodles",
        description: "Đang nghỉ 2 ngày để sửa bếp",
        priceVnd: 30000,
        availability: "Sắp có lại",
        tags: ["student favorite"],
        options: ["less spicy", "no onion"]
      }
    ]
  },
  {
    id: "vendor-6",
    ownerPhone: "0900000006",
    name: "Ăn Vặt Nhà Mây",
    category: "snacks",
    area: "KTX B",
    locationQuery: "Nhà văn hóa Sinh viên VNU-HCM",
    locationNote: "Giao ở cổng Nhà văn hóa Sinh viên",
    mapsUrl: "https://maps.google.com/?q=Nha%20van%20hoa%20Sinh%20vien%20VNU-HCM",
    openingStatus: "open",
    distanceMeters: 700,
    walkingMinutes: 9,
    rating: 4.7,
    reputation: 89,
    priceHint: "12k-35k",
    tags: ["Mở khuya", "Có giao tận nơi", "Có đặt trước"],
    menuImage: "vendor-menu-an-vat.jpg",
    deliveryAvailable: true,
    preorderAvailable: true,
    menuItems: [
      {
        id: "mi-8",
        vendorId: "vendor-6",
        name: "Combo viên chiên học nhóm",
        category: "snacks",
        description: "Phần 2-3 bạn, có nước chấm riêng",
        priceVnd: 49000,
        availability: "Còn món",
        tags: ["daily deal", "best seller"],
        options: ["less spicy", "pickup time"]
      }
    ]
  }
];

export const vendorPosts: VendorPost[] = [
  { id: "vp-1", vendorId: "vendor-1", type: "daily deal", title: "Trưa nay cơm sườn 29k", body: "Áp dụng 11:00-13:00, đặt qua chat trước 15 phút.", badge: "daily deal" },
  { id: "vp-2", vendorId: "vendor-2", type: "new item", title: "Matcha kem cheese mới", body: "Có size M/L, chọn ít đá hoặc ít ngọt.", badge: "new item" },
  { id: "vp-3", vendorId: "vendor-3", type: "combo", title: "Combo mì cay 2 bạn", body: "2 tô + 2 trà tắc, phù hợp học nhóm tối.", badge: "combo" },
  { id: "vp-4", vendorId: "vendor-4", type: "sold out", title: "Bánh mì trứng đã hết", body: "Mai quán bán lại từ 6:30.", badge: "sold out" },
  { id: "vp-5", vendorId: "vendor-5", type: "notice", title: "Nghỉ sửa bếp 2 ngày", body: "Không nhận đơn đến hết Chủ nhật.", badge: "notice" },
  { id: "vp-6", vendorId: "vendor-6", type: "group order", title: "Nhận gom đơn KTX B", body: "Từ 4 phần trở lên quán giao một điểm hẹn.", badge: "group order" }
];

export const services: ServiceItem[] = [
  { id: "svc-1", title: "In ấn KTX B 24h", category: "printing", area: "KTX B", description: "In tài liệu, đóng gáy, scan bài tập.", priceHint: "500đ/trang", openStatus: "open", rating: 4.8, tags: ["open late", "student discount", "admin verified", "favorited by many"] },
  { id: "svc-2", title: "Giặt sấy Mây Sạch", category: "laundry", area: "Dĩ An", description: "Nhận giặt theo kg, có giao tận nơi.", priceHint: "18k/kg", openStatus: "busy", rating: 4.6, tags: ["delivery available", "good rating"] },
  { id: "svc-3", title: "Sửa xe Chú Tư", category: "bike repair", area: "Làng Đại học", description: "Vá xe, thay nhớt, cứu hộ gần KTX.", priceHint: "từ 15k", openStatus: "open", rating: 4.7, tags: ["admin verified", "good rating"] },
  { id: "svc-4", title: "Laptop UIT Care", category: "laptop repair", area: "Thủ Đức", description: "Vệ sinh laptop, cài phần mềm học tập.", priceHint: "từ 80k", openStatus: "closed", rating: 4.5, tags: ["preorder available", "student discount"] },
  { id: "svc-5", title: "Gia sư Toán cao cấp", category: "tutoring", area: "KTX A", description: "Nhóm ôn thi cuối kỳ buổi tối.", priceHint: "40k/buổi", openStatus: "open", rating: 4.9, tags: ["open late", "favorited by many", "good rating"] },
  { id: "svc-6", title: "Photo Cổng UIT", category: "printing", area: "Làng Đại học", description: "In slide, bìa kiếng, bán bút và giấy kiểm tra.", priceHint: "giá sinh viên", openStatus: "open", rating: 4.4, tags: ["student discount", "admin verified"] }
];

export const communityAlerts: CommunityAlert[] = [
  { id: "alert-1", title: "Đường vào KTX B đông sau 17:30", body: "Ưu tiên hẹn điểm rõ ràng khi đi chung. Không cần chia sẻ GPS realtime.", area: "KTX B", severity: "info", active: true },
  { id: "alert-2", title: "Che MSSV trước khi đăng Lost & Found", body: "Ảnh có thẻ sinh viên, CCCD, số điện thoại hoặc tài khoản ngân hàng phải qua kiểm tra riêng tư.", area: "VNU-HCM", severity: "warning", active: true },
  { id: "alert-3", title: "Cảnh báo giả danh shipper", body: "Không chuyển khoản trong app. Student Help không có thanh toán hoặc tracking giao hàng.", area: "Dĩ An", severity: "urgent", active: true },
  { id: "alert-4", title: "Mưa lớn quanh Linh Trung", body: "Mang áo mưa, ưu tiên điểm hẹn có mái che.", area: "Thủ Đức", severity: "info", active: true }
];

export const campusQuickLinks: CampusQuickLink[] = [
  { id: "ql-1", group: "Bản đồ", title: "Bản đồ VNU-HCM", description: "Mở khu Làng Đại học trên Google Maps.", url: "https://maps.google.com/?q=VNU-HCM", tags: ["map", "campus"], saved: true },
  { id: "ql-2", group: "Di chuyển", title: "Tuyến bus qua KTX", description: "Tra nhanh các tuyến đi KTX A/B.", url: "https://maps.google.com/?q=bus%20KTX%20Khu%20B", tags: ["bus", "KTX"] },
  { id: "ql-3", group: "Học vụ", title: "Cổng thông tin UIT", description: "Link demo đến trang trường.", url: "https://www.uit.edu.vn", tags: ["UIT", "student office"] },
  { id: "ql-4", group: "Học vụ", title: "Thư viện Trung tâm", description: "Giờ mở cửa và mượn trả sách.", url: "https://vnuhcm.edu.vn", tags: ["library"], saved: true },
  { id: "ql-5", group: "An toàn", title: "Số khẩn cấp khu KTX", description: "Danh bạ demo cho bảo vệ và y tế.", url: "tel:0900000999", tags: ["emergency", "KTX"] }
];

export const adminQueues = {
  stats: [
    { label: "SV chờ xác minh", value: "7" },
    { label: "Vendor đang hoạt động", value: "6" },
    { label: "Báo cáo mở", value: "9" },
    { label: "Cảnh báo đang bật", value: "4" }
  ],
  verifications: [
    { id: "verify-1", student: "Gia Linh - UIT", status: "pending", note: "Ảnh rõ, cần admin đối chiếu thủ công" },
    { id: "verify-2", student: "Hoàng Nam - HCMUT", status: "resubmit_requested", note: "Thiếu mặt sau thẻ" },
    { id: "verify-3", student: "Bảo Ngọc - HCMUS", status: "approved", note: "Đã duyệt thủ công, AI không tham gia" }
  ],
  users: [
    { id: "user-1", name: "Minh Anh", role: "student", status: "verified", action: "Xem hồ sơ" },
    { id: "user-2", name: "Quang Huy", role: "student", status: "pending", action: "Nhắc bổ sung" },
    { id: "user-3", name: "Cơm Tấm Cô Ba", role: "vendor", status: "active", action: "Reset vendor" }
  ],
  reports: [
    { id: "report-1", target: "lost_found: ví nâu", reason: "Có thể lộ MSSV", status: "open" },
    { id: "report-2", target: "marketplace: tai nghe", reason: "Nghi spam giá", status: "reviewing" },
    { id: "report-3", target: "chat: order trà sữa", reason: "Xin số điện thoại khi chưa duyệt", status: "resolved" }
  ],
  blocks: [
    { id: "block-1", blocker: "Minh Anh", blocked: "Demo Spam", reason: "Nhắn tin ngoài chủ đề" },
    { id: "block-2", blocker: "Gia Linh", blocked: "Tài khoản lạ", reason: "Đòi chuyển khoản" }
  ]
};

export const lostFoundSearchDemos = [
  "ví nâu gần KTX B",
  "tai nghe trắng thư viện",
  "thẻ sinh viên UIT",
  "bình nước xanh"
];
