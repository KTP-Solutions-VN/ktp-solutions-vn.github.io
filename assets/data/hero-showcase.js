/*
 * Entity: Hero Showcase (case study xoay vòng trong Hero — không phải Dự án tiêu biểu)
 * Trường: id, domain (tên nhóm giải pháp), ten_du_an (mô tả ngắn 1 dòng), mo_ta (đoạn mở rộng),
 *         metric_value (số liệu nổi bật), metric_label (giải thích số liệu),
 *         anh (URL ảnh minh hoạ thật, Unsplash License — ảnh demo tạm thời, cần thay bằng screenshot sản phẩm thật),
 *         anh_alt (mô tả ảnh)
 * Dùng ở: Hero card trên Trang chủ, xoay vòng tự động mỗi ~6s.
 * LƯU Ý: 3 bản ghi này là placeholder minh hoạ theo yêu cầu — cần thay bằng dữ liệu case study thật + screenshot sản phẩm thật của KTP.
 */
const DATA_HERO_SHOWCASE = [
  {
    id: "hero-1",
    domain: "E-commerce & CRM",
    ten_du_an: "Nền tảng bán hàng đa kênh tích hợp CRM",
    mo_ta: "Đồng bộ đơn hàng từ website, mạng xã hội và tại quầy vào 1 hệ thống duy nhất, tự động cập nhật trạng thái khách hàng.",
    metric_value: "70%",
    metric_label: "giảm thời gian chốt đơn nhờ tự động hoá quy trình bán hàng",
    anh: "https://images.unsplash.com/photo-1634542984003-e0fb8e200e91?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Màn hình máy tính hiển thị biểu đồ phân tích dữ liệu kinh doanh"
  },
  {
    id: "hero-2",
    domain: "Monitoring & Quản lý nhà máy",
    ten_du_an: "Hệ thống giám sát dây chuyền sản xuất thời gian thực",
    mo_ta: "Theo dõi trạng thái máy móc và cảnh báo tức thời khi có bất thường, không cần chờ báo cáo cuối ca.",
    metric_value: "45%",
    metric_label: "giảm thời gian phát hiện sự cố máy móc",
    anh: "https://images.unsplash.com/photo-1717386255773-a456c611dc4e?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Màn hình cảm ứng bảng điều khiển máy móc công nghiệp trong nhà máy"
  },
  {
    id: "hero-3",
    domain: "Quản lý doanh nghiệp (Mini ERP)",
    ten_du_an: "Hợp nhất dữ liệu nhân sự, kho và tài chính",
    mo_ta: "Các phòng ban dùng chung 1 hệ thống dữ liệu, báo cáo tổng hợp tự động thay vì tổng hợp thủ công từ nhiều file Excel.",
    metric_value: "60%",
    metric_label: "giảm thời gian tổng hợp báo cáo liên phòng ban",
    anh: "https://images.unsplash.com/photo-1758873271321-4d6b3526ef42?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Nhóm nhân viên cùng thảo luận biểu đồ báo cáo kinh doanh"
  }
];
