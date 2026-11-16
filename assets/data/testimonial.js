/*
 * Entity: Testimonial
 * Trường: id, ten, chuc_danh, cong_ty, noi_dung, avatar_chu_cai (chữ cái hiển thị trong avatar tròn),
 *         rating (số nguyên 1-5, số sao đánh giá), hang_muc (khía cạnh được khen, hiển thị cạnh rating)
 * Dùng chung ở: Trang chủ (social proof, dạng marquee 2 hàng chạy ngược chiều).
 */
const DATA_TESTIMONIAL = [
  {
    id: "tm-1",
    ten: "Nguyễn Thị Loan",
    chuc_danh: "Chủ chuỗi cửa hàng",
    cong_ty: "Loomi Fashion",
    noi_dung: "Trước đây cuối tuần nào tôi cũng phải gọi từng chi nhánh hỏi doanh thu. Giờ mở điện thoại lên là thấy hết, còn biết chi nhánh nào sắp hết hàng để chuyển kho kịp.",
    avatar_chu_cai: "L",
    rating: 5,
    hang_muc: "Phát triển phần mềm"
  },
  {
    id: "tm-2",
    ten: "Trần Minh Khoa",
    chuc_danh: "Giám đốc vận hành",
    cong_ty: "VietForge Precision",
    noi_dung: "KTP không bán cho mình 1 gói giải pháp có sẵn. Họ ngồi với tổ trưởng sản xuất cả buổi để hiểu đúng chỗ nào đang mất tiền nhất trước khi đề xuất làm gì.",
    avatar_chu_cai: "K",
    rating: 5,
    hang_muc: "Tư vấn chiến lược"
  },
  {
    id: "tm-3",
    ten: "Phạm Anh Đức",
    chuc_danh: "Founder",
    cong_ty: "An Phá Trading",
    noi_dung: "Đội sales của tôi không rành công nghệ. KTP làm cái mini-CRM dễ dùng đến mức nhân viên lớn tuổi nhất team cũng quen chỉ sau 2 ngày.",
    avatar_chu_cai: "Đ",
    rating: 5,
    hang_muc: "Dễ sử dụng"
  },
  {
    id: "tm-4",
    ten: "Vũ Thanh Hà",
    chuc_danh: "Quản lý vận hành",
    cong_ty: "GreenSpoon Kitchen",
    noi_dung: "Trước đây đặt nguyên liệu qua Zalo hay lệch số lượng. Từ khi có công cụ KTP làm, mọi đơn đặt đều có lịch sử rõ ràng, cãi nhau giữa bếp trung tâm và cửa hàng giảm hẳn.",
    avatar_chu_cai: "H",
    rating: 4,
    hang_muc: "Quy trình vận hành"
  },
  {
    id: "tm-5",
    ten: "Đỗ Quang Huy",
    chuc_danh: "Giám đốc",
    cong_ty: "CleanPro Services",
    noi_dung: "Trước kia cuối quý tôi mới biết hợp đồng nào lỗ. Giờ nhìn dashboard là biết ngay hợp đồng nào đang phát sinh chi phí bất thường để xử lý sớm.",
    avatar_chu_cai: "H",
    rating: 5,
    hang_muc: "Báo cáo & Dashboard"
  },
  {
    id: "tm-6",
    ten: "Lê Thị Hồng Nhung",
    chuc_danh: "Chủ salon",
    cong_ty: "Nhung Hair Salon",
    noi_dung: "Website đặt lịch KTP làm giúp khách tự chọn giờ trống, không phải nhắn tin qua lại như trước. Lượng khách đặt lịch online tăng rõ rệt sau 1 tháng.",
    avatar_chu_cai: "N",
    rating: 5,
    hang_muc: "Thiết kế Web"
  },
  {
    id: "tm-7",
    ten: "Trịnh Công Danh",
    chuc_danh: "Giám đốc marketing",
    cong_ty: "VinaFood Trading",
    noi_dung: "KTP giúp mình chọn đúng 1 kênh thay vì dàn trải, kèm báo cáo chi phí/lead rõ ràng mỗi tháng. Lần đầu tiên marketing được tính bằng số chứ không phải cảm giác.",
    avatar_chu_cai: "D",
    rating: 5,
    hang_muc: "Truyền thông số"
  },
  {
    id: "tm-8",
    ten: "Bùi Thu Trang",
    chuc_danh: "Founder",
    cong_ty: "Trang's Bakery",
    noi_dung: "Bộ nhận diện mới đồng bộ từ bao bì đến fanpage, khách quen còn tưởng tiệm đổi chủ vì trông chuyên nghiệp hẳn lên. Đáng đồng tiền.",
    avatar_chu_cai: "T",
    rating: 4,
    hang_muc: "Thiết kế thương hiệu"
  }
];
