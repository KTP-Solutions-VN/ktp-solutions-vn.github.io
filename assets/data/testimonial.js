/*
 * Entity: Testimonial
 * Trường: id, ten, chuc_danh, cong_ty, noi_dung, avatar_chu_cai (chữ cái hiển thị trong avatar tròn),
 *         rating (số nguyên 1-5, số sao đánh giá), hang_muc (khía cạnh được khen, hiển thị cạnh rating)
 * Song ngữ: chuc_danh_en, noi_dung_en, hang_muc_en (tên người và công ty không dịch).
 * Dùng chung ở: Trang chủ (social proof, dạng marquee 2 hàng chạy ngược chiều).
 */
const DATA_TESTIMONIAL = [
  {
    id: "tm-1",
    ten: "Nguyễn Thị Loan",
    chuc_danh: "Chủ chuỗi cửa hàng",
    chuc_danh_en: "Retail chain owner",
    cong_ty: "Loomi Fashion",
    noi_dung: "Trước đây cuối tuần nào tôi cũng phải gọi từng chi nhánh hỏi doanh thu. Giờ mở điện thoại lên là thấy hết, còn biết chi nhánh nào sắp hết hàng để chuyển kho kịp.",
    noi_dung_en: "Before, every weekend I had to call each store for revenue figures. Now I open my phone and see everything. I even know which store is about to run out of stock so I can transfer inventory in time.",
    avatar_chu_cai: "L",
    rating: 5,
    hang_muc: "Phát triển phần mềm",
    hang_muc_en: "Software development"
  },
  {
    id: "tm-2",
    ten: "Trần Minh Khoa",
    chuc_danh: "Giám đốc vận hành",
    chuc_danh_en: "Operations director",
    cong_ty: "VietForge Precision",
    noi_dung: "KTP không bán cho mình 1 gói giải pháp có sẵn. Họ ngồi với tổ trưởng sản xuất cả buổi để hiểu đúng chỗ nào đang mất tiền nhất trước khi đề xuất làm gì.",
    noi_dung_en: "KTP didn't sell me an off-the-shelf package. They sat with our production lead all morning to understand exactly where we were losing money before proposing anything.",
    avatar_chu_cai: "K",
    rating: 5,
    hang_muc: "Tư vấn chiến lược",
    hang_muc_en: "Strategy consulting"
  },
  {
    id: "tm-3",
    ten: "Phạm Anh Đức",
    chuc_danh: "Founder",
    chuc_danh_en: "Founder",
    cong_ty: "An Phá Trading",
    noi_dung: "Đội sales của tôi không rành công nghệ. KTP làm cái mini-CRM dễ dùng đến mức nhân viên lớn tuổi nhất team cũng quen chỉ sau 2 ngày.",
    noi_dung_en: "My sales team isn't tech-savvy. KTP built a mini-CRM so easy to use that even our oldest team member was comfortable with it after just two days.",
    avatar_chu_cai: "Đ",
    rating: 5,
    hang_muc: "Dễ sử dụng",
    hang_muc_en: "Ease of use"
  },
  {
    id: "tm-4",
    ten: "Vũ Thanh Hà",
    chuc_danh: "Quản lý vận hành",
    chuc_danh_en: "Operations manager",
    cong_ty: "GreenSpoon Kitchen",
    noi_dung: "Trước đây đặt nguyên liệu qua Zalo hay lệch số lượng. Từ khi có công cụ KTP làm, mọi đơn đặt đều có lịch sử rõ ràng, cãi nhau giữa bếp trung tâm và cửa hàng giảm hẳn.",
    noi_dung_en: "Before, we ordered ingredients over chat and quantities were always wrong. Since we got KTP's system, every order has a clear history, and disputes between the central kitchen and stores have dropped sharply.",
    avatar_chu_cai: "H",
    rating: 4,
    hang_muc: "Quy trình vận hành",
    hang_muc_en: "Operations process"
  },
  {
    id: "tm-5",
    ten: "Đỗ Quang Huy",
    chuc_danh: "Giám đốc",
    chuc_danh_en: "Director",
    cong_ty: "CleanPro Services",
    noi_dung: "Trước kia cuối quý tôi mới biết hợp đồng nào lỗ. Giờ nhìn dashboard là biết ngay hợp đồng nào đang phát sinh chi phí bất thường để xử lý sớm.",
    noi_dung_en: "Previously, I didn't know which contracts were losing money until the end of the quarter. Now I look at the dashboard and immediately see which contract has unusual costs so I can handle it early.",
    avatar_chu_cai: "H",
    rating: 5,
    hang_muc: "Báo cáo & Dashboard",
    hang_muc_en: "Reports & Dashboard"
  },
  {
    id: "tm-6",
    ten: "Lê Thị Hồng Nhung",
    chuc_danh: "Chủ salon",
    chuc_danh_en: "Salon owner",
    cong_ty: "Nhung Hair Salon",
    noi_dung: "Website đặt lịch KTP làm giúp khách tự chọn giờ trống, không phải nhắn tin qua lại như trước. Lượng khách đặt lịch online tăng rõ rệt sau 1 tháng.",
    noi_dung_en: "The booking website KTP built lets customers pick an open slot themselves instead of texting back and forth. Online bookings jumped noticeably within a month.",
    avatar_chu_cai: "N",
    rating: 5,
    hang_muc: "Thiết kế Web",
    hang_muc_en: "Web design"
  },
  {
    id: "tm-7",
    ten: "Trịnh Công Danh",
    chuc_danh: "Giám đốc marketing",
    chuc_danh_en: "Marketing director",
    cong_ty: "VinaFood Trading",
    noi_dung: "KTP giúp mình chọn đúng 1 kênh thay vì dàn trải, kèm báo cáo chi phí/lead rõ ràng mỗi tháng. Lần đầu tiên marketing được tính bằng số chứ không phải cảm giác.",
    noi_dung_en: "KTP helped us pick the right channel instead of spreading thin, with clear cost-per-lead reports each month. For the first time, marketing is measured in numbers, not hunches.",
    avatar_chu_cai: "D",
    rating: 5,
    hang_muc: "Truyền thông số",
    hang_muc_en: "Digital marketing"
  },
  {
    id: "tm-8",
    ten: "Bùi Thu Trang",
    chuc_danh: "Founder",
    chuc_danh_en: "Founder",
    cong_ty: "Trang's Bakery",
    noi_dung: "Bộ nhận diện mới đồng bộ từ bao bì đến fanpage, khách quen còn tưởng tiệm đổi chủ vì trông chuyên nghiệp hẳn lên. Đáng đồng tiền.",
    noi_dung_en: "The new brand identity is consistent from packaging to social media. Regular customers think we changed owners because it looks so much more professional. Worth every penny.",
    avatar_chu_cai: "T",
    rating: 4,
    hang_muc: "Thiết kế thương hiệu",
    hang_muc_en: "Brand design"
  }
];
