/*
 * Entity: Dự án (Case study/Portfolio)
 * Trường: id, slug, ten_du_an, khach_hang (tên công ty mock), nganh, anh (URL ảnh thật đã xác minh, Unsplash License),
 *         anh_alt (mô tả ảnh), tom_tat (1-2 câu), thach_thuc (đoạn văn), giai_phap (đoạn văn),
 *         ket_qua (mảng {chi_so, mo_ta} — số liệu cụ thể), dich_vu_lien_quan (slug trong DATA_DICH_VU), noi_bat (boolean)
 * Dùng chung ở: Trang chủ (case study nổi bật), trang Dự án tiêu biểu (danh sách), trang Chi tiết dự án.
 */
const DATA_DU_AN = [
  {
    id: "da-1",
    slug: "he-thong-quan-ly-ban-hang-chuoi-cua-hang-thoi-trang-loomi",
    ten_du_an: "Hệ thống quản lý bán hàng đa chi nhánh cho chuỗi thời trang Loomi",
    khach_hang: "Loomi Fashion",
    nganh: "Bán lẻ thời trang",
    anh: "https://images.unsplash.com/photo-1742836531271-98fd8151d257?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Nhân viên bán hàng sử dụng máy tính bảng để quét mã sản phẩm tại quầy thu ngân",
    tom_tat: "Xây dựng hệ thống quản lý bán hàng và tồn kho đồng bộ theo thời gian thực cho 6 chi nhánh của Loomi Fashion.",
    thach_thuc: "Loomi Fashion vận hành 6 cửa hàng nhưng mỗi chi nhánh dùng 1 sổ sách/Excel riêng để theo dõi tồn kho, dẫn đến tình trạng chi nhánh này báo hết hàng trong khi chi nhánh khác còn tồn, và chủ doanh nghiệp phải tổng hợp báo cáo doanh thu thủ công vào cuối mỗi tuần.",
    giai_phap: "KTP xây dựng hệ thống quản lý bán hàng (POS) đồng bộ tồn kho theo thời gian thực giữa các chi nhánh, kèm dashboard tổng hợp doanh thu tự động cho chủ doanh nghiệp xem trên điện thoại. Đội ngũ KTP khảo sát trực tiếp quy trình bán hàng tại 2 chi nhánh trước khi thiết kế để đảm bảo giao diện quen thuộc với nhân viên bán hàng vốn không rành công nghệ.",
    ket_qua: [
      { chi_so: "70%", mo_ta: "giảm thời gian tổng hợp báo cáo doanh thu cuối ngày" },
      { chi_so: "6 chi nhánh", mo_ta: "đồng bộ tồn kho theo thời gian thực" },
      { chi_so: "2 tuần", mo_ta: "thời gian đào tạo nhân viên sử dụng thành thạo" }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: true
  },
  {
    id: "da-2",
    slug: "tu-van-lo-trinh-chuyen-doi-so-co-khi-chinh-xac-vietforge",
    ten_du_an: "Tư vấn lộ trình chuyển đổi số cho xưởng cơ khí chính xác VietForge",
    khach_hang: "VietForge Precision",
    nganh: "Sản xuất cơ khí",
    anh: "https://images.unsplash.com/photo-1758873269035-aae0e1fd3422?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Đội ngũ tư vấn và khách hàng thảo luận trước bảng whiteboard trong buổi làm việc",
    tom_tat: "Xây dựng lộ trình chuyển đổi số 12 tháng, ưu tiên đúng thứ tự hạng mục theo ngân sách thực tế của xưởng sản xuất quy mô 40 nhân sự.",
    thach_thuc: "VietForge muốn số hoá vận hành nhưng không biết bắt đầu từ đâu — giữa quản lý đơn hàng, theo dõi tiến độ sản xuất, hay quản lý kho vật tư — trong khi ngân sách năm đầu chỉ đủ triển khai 1-2 hạng mục.",
    giai_phap: "KTP tổ chức 3 buổi workshop với quản lý xưởng và tổ trưởng sản xuất để xác định điểm nghẽn thực sự gây thất thoát chi phí nhất, từ đó xây dựng lộ trình 12 tháng ưu tiên theo dõi tiến độ sản xuất trước (ảnh hưởng trực tiếp đến deadline giao hàng), quản lý kho vật tư sau, thay vì làm đồng loạt.",
    ket_qua: [
      { chi_so: "3 giai đoạn", mo_ta: "lộ trình triển khai rõ ràng theo ngân sách từng năm" },
      { chi_so: "15%", mo_ta: "giảm trễ deadline giao hàng sau giai đoạn 1" },
      { chi_so: "40 nhân sự", mo_ta: "quy mô xưởng được khảo sát trực tiếp trước khi tư vấn" }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: true
  },
  {
    id: "da-3",
    slug: "toi-uu-quy-trinh-van-hanh-noi-bo-greenspoon",
    ten_du_an: "Tối ưu quy trình vận hành nội bộ cho chuỗi F&B GreenSpoon",
    khach_hang: "GreenSpoon Kitchen",
    nganh: "F&B / Nhà hàng",
    anh: "https://images.unsplash.com/photo-1676277757211-ebd7fdeb3d5b?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Bảng whiteboard với nhiều giấy note dán kín thể hiện quy trình vận hành đang được rà soát",
    tom_tat: "Rà soát và số hoá quy trình đặt nguyên liệu — nhập kho — chế biến giữa 4 cửa hàng và 1 bếp trung tâm.",
    thach_thuc: "GreenSpoon vận hành mô hình bếp trung tâm cung cấp cho 4 cửa hàng, nhưng việc đặt nguyên liệu vẫn qua tin nhắn Zalo giữa các quản lý, dẫn đến sai sót số lượng và thất thoát nguyên liệu khó truy vết.",
    giai_phap: "KTP tổ chức workshop vẽ lại toàn bộ quy trình hiện tại trên whiteboard cùng đội vận hành, xác định đúng 3 điểm gây thất thoát nhiều nhất, rồi xây dựng công cụ đặt nguyên liệu nội bộ đơn giản thay thế quy trình nhắn tin thủ công, có log lịch sử đặt hàng để truy vết khi có sai lệch.",
    ket_qua: [
      { chi_so: "25%", mo_ta: "giảm thất thoát nguyên liệu do sai lệch số lượng đặt hàng" },
      { chi_so: "4 cửa hàng", mo_ta: "và 1 bếp trung tâm đồng bộ quy trình đặt hàng" },
      { chi_so: "100%", mo_ta: "lịch sử đặt hàng được lưu vết, truy xuất được khi cần" }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: false
  },
  {
    id: "da-4",
    slug: "dashboard-bao-cao-van-hanh-cleanpro-services",
    ten_du_an: "Dashboard báo cáo vận hành cho công ty dịch vụ vệ sinh CleanPro",
    khach_hang: "CleanPro Services",
    nganh: "Dịch vụ vệ sinh công nghiệp",
    anh: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Màn hình laptop hiển thị biểu đồ phân tích hiệu suất vận hành",
    tom_tat: "Xây dựng dashboard tổng hợp lịch làm việc, hiệu suất nhân viên và chi phí vận hành theo từng hợp đồng khách hàng.",
    thach_thuc: "CleanPro quản lý hơn 30 hợp đồng vệ sinh định kỳ cho các toà nhà văn phòng nhưng không có cách nào nhìn tổng quan hợp đồng nào đang có biên lợi nhuận thấp do chi phí nhân sự phát sinh ngoài kế hoạch.",
    giai_phap: "KTP xây dựng dashboard tổng hợp dữ liệu lịch làm việc và chi phí nhân sự theo từng hợp đồng, hiển thị trực quan hợp đồng nào đang lệch ngân sách để quản lý can thiệp kịp thời thay vì chỉ biết khi tổng kết quý.",
    ket_qua: [
      { chi_so: "30+ hợp đồng", mo_ta: "được theo dõi biên lợi nhuận theo thời gian thực" },
      { chi_so: "12%", mo_ta: "cải thiện biên lợi nhuận trung bình sau 6 tháng sử dụng" },
      { chi_so: "1 màn hình", mo_ta: "duy nhất thay thế 5 file Excel rời rạc trước đó" }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: false
  },
  {
    id: "da-5",
    slug: "mini-crm-quan-ly-khach-hang-anpha-trading",
    ten_du_an: "Mini-CRM quản lý khách hàng cho công ty thương mại An Phá",
    khach_hang: "An Phá Trading",
    nganh: "Thương mại / Phân phối",
    anh: "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Giao diện dashboard phân tích dữ liệu kinh doanh trên máy tính",
    tom_tat: "Xây dựng hệ thống mini-CRM giúp đội sales 8 người quản lý khách hàng tiềm năng và lịch chăm sóc thay cho Excel.",
    thach_thuc: "Đội sales 8 người của An Phá Trading quản lý khách hàng tiềm năng bằng file Excel dùng chung, thường xuyên bị ghi đè dữ liệu và không ai theo dõi được khách hàng nào đã lâu chưa được liên hệ lại.",
    giai_phap: "KTP xây dựng hệ thống mini-CRM đơn giản, dễ dùng cho đội sales không rành công nghệ: mỗi khách hàng tiềm năng có lịch sử liên hệ rõ ràng, tự động nhắc lịch chăm sóc lại sau X ngày không tương tác, và dashboard cho quản lý xem tổng quan hiệu suất từng sales.",
    ket_qua: [
      { chi_so: "8 sales", mo_ta: "chuyển từ Excel sang hệ thống quản lý tập trung" },
      { chi_so: "35%", mo_ta: "tăng tỷ lệ khách hàng tiềm năng được chăm sóc lại đúng hạn" },
      { chi_so: "0", mo_ta: "trường hợp ghi đè/mất dữ liệu khách hàng sau khi triển khai" }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: false
  }
];
