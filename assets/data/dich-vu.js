/*
 * Entity: Dịch vụ
 * Trường: id (string), slug (string), ten (string), ten_en (tên tiếng Anh cho nút EN), icon (string — key SVG dùng ở service-card),
 *         mo_ta_ngan (string, ~1 câu), mo_ta_dai (string, đoạn mở đầu trang chi tiết dịch vụ),
 *         loi_ich (string[] — 4-6 bullet lợi ích cụ thể), quy_trinh (string[] — các bước triển khai dịch vụ này),
 *         anh (URL ảnh minh hoạ thật, Unsplash License), anh_alt (mô tả ảnh),
 *         noi_bat (boolean — true = dịch vụ cốt lõi, hiển thị dạng khối lớn hơn trên Trang chủ)
 * Dùng chung ở: Trang chủ (section Dịch vụ), trang Dịch vụ (tổng quan), 4 trang chi tiết dịch vụ, Footer.
 */
const DATA_DICH_VU = [
  {
    id: "dv-1",
    slug: "phat-trien-phan-mem",
    ten: "Phát triển phần mềm",
    ten_en: "Software development",
    icon: "code",
    mo_ta_ngan: "Xây dựng ứng dụng web, mobile và hệ thống quản lý tùy chỉnh theo đúng bài toán vận hành của doanh nghiệp bạn.",
    mo_ta_dai: "SME thường gặp 1 trong 2 tình huống: phần mềm đóng gói có sẵn không khớp quy trình thật, hoặc thuê ngoài code nhưng không ai tư vấn xem giải pháp có đúng bài toán không. KTP giải quyết cả hai bằng cách để cùng 1 đội ngũ vừa phân tích nghiệp vụ vừa trực tiếp phát triển — từ ứng dụng web nội bộ, app di động cho khách hàng/nhân viên, đến hệ thống quản lý (kho, bán hàng, nhân sự) đặt riêng theo quy trình thật của bạn, không phải ép quy trình của bạn theo 1 phần mềm đóng gói.",
    loi_ich: [
      "Phân tích quy trình thật trước khi viết dòng code đầu tiên — không đoán yêu cầu",
      "Kiến trúc phù hợp quy mô SME: đủ chắc để chạy thật, không thừa phức tạp gây tốn chi phí vận hành",
      "Bàn giao kèm tài liệu kỹ thuật và hướng dẫn sử dụng, không phụ thuộc mãi vào 1 đội ngũ",
      "Hỗ trợ vận hành/bảo trì sau bàn giao, không giao xong là hết trách nhiệm",
    ],
    quy_trinh: [
      "Khảo sát quy trình vận hành thực tế và điểm nghẽn hiện tại",
      "Thiết kế giải pháp kỹ thuật và xác nhận phạm vi cùng khách hàng",
      "Phát triển theo từng đợt (sprint), demo tiến độ định kỳ",
      "Kiểm thử, đào tạo sử dụng và bàn giao kèm tài liệu",
    ],
    anh: "https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Đội ngũ lập trình viên cùng thảo luận trước màn hình máy tính trong văn phòng",
    noi_bat: true
  },
  {
    id: "dv-2",
    slug: "thiet-ke-phat-trien-web",
    ten: "Thiết kế & phát triển Web",
    ten_en: "Web design & development",
    icon: "layout",
    mo_ta_ngan: "Website tối ưu tốc độ tải, chuẩn SEO và responsive trên mọi thiết bị — không chỉ đẹp mà còn ra chuyển đổi.",
    mo_ta_dai: "Một website đẹp nhưng tải chậm hoặc không lên được Google tìm kiếm gần như vô nghĩa với SME đang cần khách hàng mới. KTP thiết kế website với 3 tiêu chí song song ngay từ đầu: tốc độ tải (Core Web Vitals), cấu trúc chuẩn SEO kỹ thuật, và trải nghiệm chuyển đổi (CTA rõ ràng, form dễ điền) — thay vì chỉ tập trung hình ảnh rồi tối ưu sau.",
    loi_ich: [
      "Tối ưu tốc độ tải và Core Web Vitals ngay từ giai đoạn thiết kế, không phải sửa vá sau",
      "Chuẩn SEO kỹ thuật (thẻ meta, schema, sitemap) để dễ được tìm thấy trên Google",
      "Responsive đầy đủ từ mobile đến desktop — đa số khách SME tiếp cận qua điện thoại trước",
      "Có thể tự cập nhật nội dung sau bàn giao, không phụ thuộc lập trình viên cho từng thay đổi nhỏ",
    ],
    quy_trinh: [
      "Xác định mục tiêu chuyển đổi chính của website (bán hàng/thu lead/giới thiệu)",
      "Thiết kế giao diện theo bộ nhận diện thương hiệu",
      "Phát triển và tối ưu hiệu năng/SEO kỹ thuật",
      "Bàn giao kèm hướng dẫn quản trị nội dung",
    ],
    anh: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Người dùng bút cảm ứng phác thảo wireframe website trên máy tính bảng",
    noi_bat: false
  },
  {
    id: "dv-3",
    slug: "truyen-thong-so",
    ten: "Truyền thông số",
    ten_en: "Digital marketing",
    icon: "megaphone",
    mo_ta_ngan: "Digital marketing, quản lý mạng xã hội và sản xuất nội dung giúp thương hiệu SME hiện diện đúng nơi khách hàng ở.",
    mo_ta_dai: "Ngân sách marketing của SME thường không đủ để dàn trải mọi kênh. KTP giúp xác định đúng 1-2 kênh có tỷ lệ chuyển đổi tốt nhất với đúng tệp khách hàng của bạn trước, rồi mới sản xuất nội dung và quản lý vận hành kênh đó bài bản — thay vì lên bài đều đặn nhưng không đo được hiệu quả.",
    loi_ich: [
      "Xác định kênh trọng tâm phù hợp ngân sách và tệp khách hàng thay vì dàn trải mọi nền tảng",
      "Lịch nội dung rõ ràng, gắn với mục tiêu kinh doanh cụ thể theo từng tháng",
      "Báo cáo hiệu quả theo số liệu (tương tác, lead, chi phí/khách hàng tiềm năng)",
      "Đồng bộ thông điệp với bộ nhận diện thương hiệu đã xây dựng",
    ],
    quy_trinh: [
      "Phân tích tệp khách hàng và chọn kênh trọng tâm",
      "Lên kế hoạch nội dung theo tháng, gắn mục tiêu cụ thể",
      "Sản xuất và đăng tải nội dung, quản lý tương tác",
      "Đo lường hiệu quả và điều chỉnh chiến thuật hàng tháng",
    ],
    anh: "https://images.unsplash.com/photo-1769596722541-40dedee6789d?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Lịch nội dung mạng xã hội đặt trên bàn làm việc",
    noi_bat: false
  },
  {
    id: "dv-4",
    slug: "thiet-ke-thuong-hieu",
    ten: "Thiết kế thương hiệu",
    ten_en: "Brand design",
    icon: "palette",
    mo_ta_ngan: "Logo, bộ nhận diện thương hiệu và ấn phẩm thiết kế nhất quán, đủ chuyên nghiệp để cạnh tranh với đối thủ lớn hơn.",
    mo_ta_dai: "Nhiều SME lớn dần nhưng bộ nhận diện thương hiệu vẫn dừng ở mức logo tự làm ban đầu, thiếu nhất quán giữa website, mạng xã hội và ấn phẩm in. KTP xây dựng bộ nhận diện đầy đủ (logo, màu sắc, typography, quy tắc sử dụng) để thương hiệu trông chuyên nghiệp và nhất quán ở mọi điểm chạm với khách hàng.",
    loi_ich: [
      "Bộ nhận diện đầy đủ: logo, bảng màu, typography, quy tắc sử dụng — không chỉ 1 file logo rời rạc",
      "Áp dụng nhất quán từ website, mạng xã hội đến ấn phẩm in/namecard",
      "Phù hợp định vị và tệp khách hàng mục tiêu, không chạy theo xu hướng nhất thời",
      "Bàn giao file nguồn đầy đủ, chủ động sử dụng lâu dài không phụ thuộc 1 đơn vị thiết kế",
    ],
    quy_trinh: [
      "Tìm hiểu định vị thương hiệu và đối tượng khách hàng mục tiêu",
      "Phác thảo hướng thiết kế và xin phản hồi",
      "Hoàn thiện bộ nhận diện và quy tắc sử dụng (brand guideline)",
      "Bàn giao file nguồn và hỗ trợ áp dụng lên các kênh",
    ],
    anh: "https://images.unsplash.com/photo-1716471330463-f475b00f0506?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Bàn làm việc với bàn phím, bút chì và các mẫu màu sắc thiết kế thương hiệu",
    noi_bat: false
  }
];
