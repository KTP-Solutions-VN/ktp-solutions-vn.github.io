/*
 * Entity: Dự án đã triển khai (sản phẩm thật đang vận hành, link ra website của khách — khác DATA_DU_AN là prototype white-label)
 * Trường: id, ten (tên sản phẩm + mô tả ngắn), url (website đang chạy), linh_vuc (slug icon: sports / environment / ecommerce,
 *         xem KTP.domainIcon), nganh (nhãn lĩnh vực), anh (ảnh chụp trang chủ 1440×900 @2x, lưu JPEG rộng 2400, đường dẫn tính từ gốc website),
 *         anh_alt, mo_ta (1-2 câu: sản phẩm làm gì, chỉ những gì website có thật), mang (string[] — chip hạng mục, tiếng Anh dùng chung 2 ngôn ngữ).
 * Song ngữ: mọi trường chữ có bản _en (ten_en, nganh_en, anh_alt_en, mo_ta_en).
 * Dùng ở: Trang chủ (#du-an-trien-khai) và trang Dự án, render bằng KTP.liveProjects(root) trong assets/js/global.js.
 * Nội dung VITOOL lấy từ bản stage (stage-asin-vitool.ktpsolutions.vn), link trỏ về vitool.com.vn.
 */
const DATA_TRIEN_KHAI = [
  {
    id: "ghepdoi",
    ten: "Ghepdoi.vn — nền tảng Pickleball: đặt sân, tìm đối, giải đấu",
    ten_en: "Ghepdoi.vn — Pickleball platform: court booking, matchmaking, tournaments",
    url: "https://ghepdoi.vn/",
    linh_vuc: "sports",
    nganh: "Thể thao & Cộng đồng",
    nganh_en: "Sports & Community",
    anh: "assets/img/du-an-trien-khai/ghepdoi.jpg",
    anh_alt: "Trang chủ Ghepdoi.vn: đặt sân Pickleball và tìm bạn chơi",
    anh_alt_en: "Ghepdoi.vn home page: Pickleball court booking and finding partners",
    mo_ta: "Nền tảng kết nối cộng đồng Pickleball Việt Nam: đặt sân online, tìm bạn chơi cùng trình độ, bảng xếp hạng người chơi, giải đấu và câu lạc bộ, với tài khoản riêng cho người chơi, huấn luyện viên, chủ sân và ban tổ chức giải.",
    mo_ta_en: "A platform for Vietnam's Pickleball community: online court booking, finding partners at the same level, player rankings, tournaments and clubs, with dedicated accounts for players, coaches, court owners and tournament organizers.",
    mang: ["Web platform", "Court booking", "Matchmaking", "Tournaments", "Rankings"]
  },
  {
    id: "envilink",
    ten: "ENVILINK — website giải pháp giám sát môi trường",
    ten_en: "ENVILINK — environmental monitoring solutions website",
    url: "https://envilink.vn/",
    linh_vuc: "environment",
    nganh: "Môi trường & Công nghiệp",
    nganh_en: "Environment & Industrial",
    anh: "assets/img/du-an-trien-khai/envilink.jpg",
    anh_alt: "Trang chủ ENVILINK: giải pháp giám sát môi trường",
    anh_alt_en: "ENVILINK home page: environmental monitoring solutions",
    mo_ta: "Website song ngữ Việt – Anh cho đơn vị cung cấp thiết bị phân tích, đo lường và giám sát môi trường: giới thiệu dịch vụ và giải pháp, danh mục sản phẩm theo nhóm thiết bị, dự án tiêu biểu, tin tức, giỏ hàng và chính sách bán hàng.",
    mo_ta_en: "A bilingual Vietnamese–English website for a supplier of environmental analysis, measurement and monitoring equipment: services and solutions, a product catalogue by equipment group, featured projects, news, a shopping cart and sales policies.",
    mang: ["Corporate website", "Bilingual VI/EN", "Product catalogue", "E-commerce"]
  },
  {
    id: "vitool",
    ten: "VITOOL — thương mại điện tử thiết bị công nghiệp",
    ten_en: "VITOOL — industrial equipment e-commerce",
    url: "https://vitool.com.vn/",
    linh_vuc: "ecommerce",
    nganh: "Thương mại điện tử B2B",
    nganh_en: "B2B e-commerce",
    anh: "assets/img/du-an-trien-khai/vitool.jpg",
    anh_alt: "Trang chủ VITOOL: danh mục thiết bị và công cụ công nghiệp",
    anh_alt_en: "VITOOL home page: industrial equipment and tools catalogue",
    mo_ta: "Website thương mại điện tử cho nhà phân phối thiết bị và công cụ công nghiệp: danh mục sản phẩm nhiều tầng (quan trắc, đo kiểm, phân tích nước – khí, điện & tự động hoá…), tìm kiếm theo nhãn hàng và sản phẩm, deal giá tốt, combo tiết kiệm, gợi ý sản phẩm, tin tức kỹ thuật và giỏ hàng.",
    mo_ta_en: "An e-commerce website for an industrial equipment and tools distributor: a multi-level product catalogue (monitoring, test & measurement, water and gas analysis, electrical & automation…), search by brand and product, deals, money-saving bundles, product suggestions, technical articles and a shopping cart.",
    mang: ["E-commerce", "Product catalogue", "Brand search", "Deals & bundles", "Tech blog"]
  }
];
