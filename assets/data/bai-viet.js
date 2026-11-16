/*
 * Entity: Bài viết (Blog)
 * Trường: id, slug, tieu_de, tom_tat (2-3 câu, dùng ở card + meta description),
 *         tac_gia, ngay_dang (YYYY-MM-DD), thoi_gian_doc (phút), chu_de (tag hiển thị),
 *         anh (URL ảnh thật đã xác minh, Unsplash License), anh_alt,
 *         noi_dung (mảng block: {loai: "p"|"h2"|"blockquote", text})
 * Dùng chung ở: Trang chủ (blog mới nhất), trang Blog (danh sách), trang Chi tiết bài viết.
 */
const DATA_BAI_VIET = [
  {
    id: "bv-1",
    slug: "mot-doi-tac-duy-nhat-thay-vi-nhieu-vendor-roi-rac",
    tieu_de: "Vì sao SME nên chọn một đối tác duy nhất thay vì ghép nhiều vendor rời rạc",
    tom_tat: "Ghép 1 agency tư vấn, 1 vendor code và 1 agency marketing riêng lẻ khiến SME phải làm việc phối hợp giữa 3 bên không nói cùng ngôn ngữ. Bài viết phân tích chi phí ẩn của mô hình này và khi nào một đối tác trọn gói thực sự tiết kiệm hơn.",
    tac_gia: "Đội ngũ KTP Solutions",
    ngay_dang: "2026-08-12",
    thoi_gian_doc: 6,
    chu_de: "Chiến lược chuyển đổi số",
    anh: "https://images.unsplash.com/photo-1726064855857-46c37dc43c78?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Người đang ngồi làm việc với laptop trong không gian văn phòng nhỏ",
    noi_dung: [
      { loai: "p", text: "Chi phí thật của việc ghép nhiều vendor không nằm ở hóa đơn từng bên, mà nằm ở thời gian chủ doanh nghiệp phải đứng ra làm cầu nối giữa các bên không hiểu ý nhau. Đây là vấn đề phổ biến nhất mà KTP gặp khi tiếp nhận các dự án SME đã từng làm việc với 2-3 đơn vị riêng lẻ trước đó." },
      { loai: "h2", text: "Vấn đề không phải ở năng lực từng vendor" },
      { loai: "p", text: "Một agency tư vấn chiến lược giỏi vẫn có thể đưa ra đề xuất mà đội code không triển khai được đúng như hình dung, vì họ không trực tiếp làm việc với dữ liệu và ràng buộc kỹ thuật thật. Ngược lại, một vendor code giỏi kỹ thuật nhưng không tham gia từ bước tư vấn dễ xây đúng thứ được yêu cầu nhưng sai thứ doanh nghiệp thực sự cần." },
      { loai: "p", text: "Khi 2 bên này tách rời, người phải phát hiện ra độ lệch đó — thường là giữa buổi demo sản phẩm — chính là chủ doanh nghiệp, người ít chuyên môn kỹ thuật nhất trong phòng." },
      { loai: "h2", text: "Một đối tác trọn gói loại bỏ điểm nghẽn phối hợp" },
      { loai: "p", text: "Khi tư vấn chiến lược và phát triển phần mềm nằm trong cùng 1 đội ngũ, người phân tích quy trình nghiệp vụ chính là người biết rõ ràng buộc kỹ thuật khi đề xuất giải pháp — không có khoảng trống “dịch lại” yêu cầu giữa 2 bên. Với dự án tư vấn lộ trình chuyển đổi số cho VietForge Precision, chính vì cùng 1 đội ngũ trực tiếp khảo sát và triển khai mà lộ trình đề xuất khớp đúng ngân sách và năng lực vận hành thực tế của xưởng, không phải 1 bản kế hoạch đẹp trên giấy." },
      { loai: "blockquote", text: "Cái tôi thích ở KTP là họ không bán cho mình 1 gói giải pháp có sẵn. Họ ngồi với tổ trưởng sản xuất của tôi cả buổi để hiểu đúng chỗ nào đang mất tiền nhất trước khi đề xuất làm gì. — Trần Minh Khoa, Giám đốc vận hành VietForge Precision" },
      { loai: "h2", text: "Khi nào ghép nhiều vendor vẫn hợp lý" },
      { loai: "p", text: "Mô hình nhiều vendor vẫn hợp lý khi doanh nghiệp đã có đội IT nội bộ đủ mạnh để đóng vai trò “người dịch” giữa các bên, hoặc khi từng hạng mục (thiết kế thương hiệu, phát triển phần mềm) độc lập hoàn toàn, không cần phối hợp dữ liệu/quy trình chung. Với phần lớn SME chưa có đội IT nội bộ, một đối tác trọn gói thường tiết kiệm cả thời gian lẫn rủi ro hiểu sai yêu cầu hơn." }
    ]
  },
  {
    id: "bv-2",
    slug: "quy-trinh-outsourcing-phan-mem-tron-goi-tai-ktp",
    tieu_de: "Quy trình outsourcing phần mềm trọn gói tại KTP diễn ra như thế nào",
    tom_tat: "Từ khảo sát quy trình vận hành thật đến bàn giao kèm đào tạo sử dụng — bài viết mô tả từng bước cụ thể trong quy trình outsourcing phần mềm của KTP, áp dụng cho các dự án như hệ thống quản lý bán hàng của Loomi Fashion.",
    tac_gia: "Đội ngũ KTP Solutions",
    ngay_dang: "2026-07-28",
    thoi_gian_doc: 7,
    chu_de: "Outsourcing phần mềm",
    anh: "https://images.unsplash.com/photo-1579397256979-cc326aefe273?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Màn hình máy tính hiển thị các dòng code lập trình",
    noi_dung: [
      { loai: "p", text: "Một quy trình outsourcing tốt phải trả lời được câu hỏi: làm sao biết phần mềm sắp xây đúng là thứ doanh nghiệp cần, trước khi tốn thời gian phát triển? KTP giải quyết câu hỏi này bằng cách đặt bước khảo sát thực địa lên trước bước viết yêu cầu kỹ thuật, thay vì ngược lại." },
      { loai: "h2", text: "Bước 1: Khảo sát quy trình vận hành thực tế" },
      { loai: "p", text: "Trước khi bàn đến công nghệ, đội ngũ KTP dành thời gian quan sát trực tiếp cách nhân viên khách hàng đang làm việc — ví dụ với dự án Loomi Fashion, đội KTP đến trực tiếp 2 chi nhánh để xem quy trình bán hàng và kiểm kho thủ công đang vận hành ra sao trước khi đề xuất bất kỳ tính năng nào." },
      { loai: "h2", text: "Bước 2: Thiết kế giải pháp và chốt phạm vi" },
      { loai: "p", text: "Dựa trên khảo sát, KTP đề xuất giải pháp kỹ thuật cụ thể kèm phạm vi rõ ràng (tính năng nào có trong giai đoạn 1, tính năng nào để giai đoạn sau) — tránh tình trạng phạm vi phình to giữa chừng khiến chi phí và thời gian đội lên ngoài dự kiến." },
      { loai: "h2", text: "Bước 3: Phát triển theo từng đợt, demo định kỳ" },
      { loai: "p", text: "Thay vì biến mất 2-3 tháng rồi bàn giao 1 lần, đội KTP phát triển theo từng đợt ngắn và demo tiến độ định kỳ để khách hàng phản hồi sớm — sai lệch nhỏ được phát hiện và sửa ngay, không dồn đến cuối dự án mới lộ ra." },
      { loai: "h2", text: "Bước 4: Kiểm thử, đào tạo và bàn giao" },
      { loai: "p", text: "Giai đoạn bàn giao không dừng ở việc chuyển giao code — với các hệ thống có nhiều người dùng cuối như POS bán hàng, KTP tổ chức đào tạo trực tiếp cho nhân viên vận hành, vì phần mềm tốt nhưng không ai biết dùng đúng cũng không tạo ra giá trị thật." },
      { loai: "p", text: "Toàn bộ quy trình 4 bước này áp dụng nhất quán dù dự án lớn hay nhỏ — khác biệt chỉ nằm ở số lượng đợt phát triển và độ sâu khảo sát ban đầu." }
    ]
  },
  {
    id: "bv-3",
    slug: "5-nguyen-tac-thiet-ke-website-tang-ty-le-chuyen-doi",
    tieu_de: "5 nguyên tắc thiết kế website giúp SME tăng tỷ lệ chuyển đổi",
    tom_tat: "Một website đẹp chưa chắc ra đơn hàng. Bài viết tổng hợp 5 nguyên tắc thiết kế cụ thể — từ tốc độ tải đến vị trí đặt CTA — giúp website của SME chuyển đổi khách xem thành khách hàng thật.",
    tac_gia: "Đội ngũ KTP Solutions",
    ngay_dang: "2026-07-10",
    thoi_gian_doc: 6,
    chu_de: "Thiết kế Web",
    anh: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "MacBook hiển thị đoạn code trên bàn làm việc bận rộn",
    noi_dung: [
      { loai: "p", text: "Website chuyển đổi tốt và website đẹp là 2 mục tiêu có thể trùng nhau, nhưng không tự động đi cùng nhau. Dưới đây là 5 nguyên tắc cụ thể KTP áp dụng khi thiết kế website cho khách hàng SME, thay vì chỉ tập trung vào thẩm mỹ." },
      { loai: "h2", text: "1. Tốc độ tải quyết định trước khi nội dung được đọc" },
      { loai: "p", text: "Phần lớn khách truy cập rời trang trong 3 giây đầu nếu tải chậm — nghĩa là mọi nội dung, hình ảnh đẹp phía sau đều vô nghĩa nếu chưa kịp hiển thị. Tối ưu tốc độ tải cần được tính từ giai đoạn thiết kế (kích thước ảnh, số lượng script), không phải sửa vá sau khi đã hoàn thiện giao diện." },
      { loai: "h2", text: "2. Một CTA rõ ràng mỗi màn hình, không phải nhiều lựa chọn cùng lúc" },
      { loai: "p", text: "Khi trang có 3-4 nút hành động cùng mức độ nổi bật (Liên hệ, Tải brochure, Đăng ký, Xem thêm), khách truy cập thường không bấm nút nào cả. Mỗi section nên dẫn dắt đến đúng 1 hành động mong muốn." },
      { loai: "h2", text: "3. Nội dung trả lời đúng câu hỏi của khách trước khi họ phải tìm" },
      { loai: "p", text: "Heading mơ hồ kiểu “Giải pháp của chúng tôi” buộc khách phải đọc hết đoạn văn mới hiểu section nói gì. Heading cụ thể giúp khách quét nhanh và tìm đúng phần họ quan tâm." },
      { loai: "h2", text: "4. Responsive không phải là “co giãn được”" },
      { loai: "p", text: "Responsive đúng nghĩa là trải nghiệm trên mobile được thiết kế riêng — form ngắn gọn hơn, nút bấm đủ lớn cho ngón tay, không phải chỉ resize lại bố cục desktop cho vừa màn hình nhỏ." },
      { loai: "h2", text: "5. SEO kỹ thuật là nền tảng, không phải bước làm thêm" },
      { loai: "p", text: "Cấu trúc heading, thẻ meta, schema đánh dấu cần được dựng đúng ngay từ lúc code, vì sửa lại sau khi website đã chạy tốn công hơn nhiều so với làm đúng từ đầu — và ảnh hưởng trực tiếp đến việc khách hàng có tìm thấy website qua Google hay không." }
    ]
  },
  {
    id: "bv-4",
    slug: "truyen-thong-so-cho-sme-bat-dau-tu-dau-voi-ngan-sach-han-che",
    tieu_de: "Truyền thông số cho SME: bắt đầu từ đâu khi ngân sách hạn chế",
    tom_tat: "Không cần có mặt trên mọi nền tảng cùng lúc. Bài viết chia sẻ cách chọn đúng 1-2 kênh truyền thông số phù hợp ngân sách và tệp khách hàng, thay vì dàn trải nguồn lực.",
    tac_gia: "Đội ngũ KTP Solutions",
    ngay_dang: "2026-06-22",
    thoi_gian_doc: 5,
    chu_de: "Truyền thông số",
    anh: "https://images.unsplash.com/photo-1759215524472-1b0686fdbd87?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Hai bàn tay cầm điện thoại hiển thị bảng tin mạng xã hội",
    noi_dung: [
      { loai: "p", text: "Sai lầm phổ biến nhất của SME khi bắt đầu truyền thông số là cố xuất hiện đồng thời trên Facebook, TikTok, Instagram và Zalo OA — dẫn đến ngân sách và nhân lực bị chia nhỏ đến mức không kênh nào đủ đầu tư để ra hiệu quả thật." },
      { loai: "h2", text: "Chọn kênh theo hành vi khách hàng, không theo xu hướng" },
      { loai: "p", text: "Câu hỏi cần trả lời trước tiên không phải “kênh nào đang hot” mà là “khách hàng mục tiêu của mình thực sự dành thời gian ở đâu, và họ tìm kiếm sản phẩm/dịch vụ này theo cách nào”. Một doanh nghiệp B2B bán giải pháp cho nhà máy sẽ có hành vi khách hàng khác hoàn toàn một shop thời trang bán trực tiếp cho người tiêu dùng trẻ." },
      { loai: "h2", text: "Đo lường bằng số liệu, không phải cảm giác “có tương tác”" },
      { loai: "p", text: "Lượt thích và bình luận dễ khiến người làm marketing cảm thấy hiệu quả, nhưng chỉ số thực sự quan trọng với SME là chi phí trên mỗi khách hàng tiềm năng (lead) và tỷ lệ lead chuyển thành đơn hàng. Một bài đăng viral nhưng không ra lead nào có giá trị kinh doanh thấp hơn 1 bài đăng ít tương tác nhưng ra đúng 5 khách hàng tiềm năng chất lượng." },
      { loai: "h2", text: "Đồng bộ với bộ nhận diện thương hiệu đã có" },
      { loai: "p", text: "Nội dung truyền thông số hiệu quả nhất khi đồng bộ hình ảnh, giọng điệu với bộ nhận diện thương hiệu và website — khách hàng nhìn thấy quảng cáo trên Facebook rồi vào website mà cảm giác như 2 thương hiệu khác nhau sẽ làm giảm độ tin cậy ngay lập tức." },
      { loai: "p", text: "Với ngân sách hạn chế, lời khuyên thực tế là chọn đúng 1 kênh, đầu tư đủ sâu trong 2-3 tháng để có dữ liệu đánh giá, rồi mới cân nhắc mở rộng thêm kênh thứ hai." }
    ]
  },
  {
    id: "bv-5",
    slug: "xay-dung-bo-nhan-dien-thuong-hieu-bai-ban-cho-doanh-nghiep-nho",
    tieu_de: "Xây dựng bộ nhận diện thương hiệu bài bản cho doanh nghiệp nhỏ",
    tom_tat: "Logo đẹp chưa phải là bộ nhận diện thương hiệu. Bài viết giải thích những thành phần cần có trong 1 bộ nhận diện đầy đủ và vì sao tính nhất quán quan trọng hơn độ cầu kỳ.",
    tac_gia: "Đội ngũ KTP Solutions",
    ngay_dang: "2026-06-05",
    thoi_gian_doc: 5,
    chu_de: "Thương hiệu",
    anh: "https://images.unsplash.com/photo-1716471330463-f475b00f0506?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Bàn làm việc với bàn phím, bút chì và các mẫu màu sắc thiết kế",
    noi_dung: [
      { loai: "p", text: "Nhiều SME cho rằng có logo là đã có thương hiệu — nhưng logo chỉ là 1 trong nhiều thành phần. Thiếu các phần còn lại khiến thương hiệu trông thiếu nhất quán dù logo riêng lẻ có đẹp đến đâu." },
      { loai: "h2", text: "Bộ nhận diện đầy đủ gồm những gì" },
      { loai: "p", text: "Một bộ nhận diện thương hiệu bài bản cần có: logo và các biến thể (dùng trên nền sáng/tối, dạng icon rút gọn), bảng màu thương hiệu với mã màu cụ thể, bộ typography (font chữ cho heading và nội dung), và quy tắc sử dụng (khoảng cách tối thiểu quanh logo, cách phối màu đúng/sai)." },
      { loai: "h2", text: "Vì sao thiếu quy tắc sử dụng gây ra sự không nhất quán" },
      { loai: "p", text: "Không có tài liệu quy tắc, mỗi lần cần thiết kế ấn phẩm mới (banner, namecard, bài đăng mạng xã hội) người thực hiện lại tự diễn giải theo cảm tính riêng — dẫn đến logo bị kéo méo, màu sắc lệch tông theo thời gian mà không ai nhận ra cho đến khi đặt cạnh nhau mới thấy rõ sự khác biệt." },
      { loai: "h2", text: "Nhất quán quan trọng hơn cầu kỳ" },
      { loai: "p", text: "Một bộ nhận diện đơn giản nhưng được áp dụng nhất quán ở mọi điểm chạm — website, mạng xã hội, ấn phẩm in — tạo cảm giác chuyên nghiệp hơn nhiều so với một bộ nhận diện cầu kỳ nhưng mỗi nơi thể hiện một khác. Đây cũng là lý do bộ nhận diện nên được xây dựng kèm quy tắc sử dụng rõ ràng ngay từ đầu, thay vì chỉ bàn giao 1 file logo rời rạc." }
    ]
  },
  {
    id: "bv-6",
    slug: "bao-mat-du-lieu-khi-chuyen-doi-so-sme-can-luu-y-gi",
    tieu_de: "Bảo mật dữ liệu khi chuyển đổi số: SME cần lưu ý gì",
    tom_tat: "Chuyển đổi số đồng nghĩa dữ liệu khách hàng và vận hành được số hóa — kèm theo đó là rủi ro bảo mật SME thường bỏ qua vì cho rằng “công ty nhỏ không phải mục tiêu tấn công”. Bài viết chỉ ra các lưu ý thực tế, dễ áp dụng.",
    tac_gia: "Đội ngũ KTP Solutions",
    ngay_dang: "2026-05-18",
    thoi_gian_doc: 6,
    chu_de: "Bảo mật & Vận hành",
    anh: "https://images.unsplash.com/photo-1768839720936-87ce3adf2d08?auto=format&fit=crop&w=1200&q=80",
    anh_alt: "Ổ khóa số đặt trên bàn phím máy tính, biểu tượng cho bảo mật dữ liệu",
    noi_dung: [
      { loai: "p", text: "“Công ty nhỏ thì ai tấn công làm gì” là suy nghĩ khiến nhiều SME bỏ qua bảo mật cơ bản khi số hóa vận hành — trong khi thực tế, hệ thống thiếu bảo mật cơ bản dễ bị tấn công tự động hàng loạt không phân biệt quy mô doanh nghiệp." },
      { loai: "h2", text: "Phân quyền truy cập theo đúng vai trò" },
      { loai: "p", text: "Sai lầm phổ biến là cấp toàn quyền truy cập hệ thống cho mọi nhân viên vì “tiện hơn”. Một nhân viên bán hàng chỉ cần xem đơn hàng của mình, không cần quyền xem toàn bộ doanh thu công ty hay sửa giá sản phẩm — phân quyền đúng vai trò giới hạn thiệt hại nếu tài khoản bị lộ." },
      { loai: "h2", text: "Sao lưu dữ liệu định kỳ, kiểm tra khôi phục được thật" },
      { loai: "p", text: "Nhiều hệ thống có sao lưu tự động nhưng chưa từng được thử khôi phục thực tế — đến khi sự cố xảy ra mới phát hiện file sao lưu bị lỗi hoặc thiếu. Nên thử khôi phục thử định kỳ (vd mỗi quý) để đảm bảo bản sao lưu thực sự dùng được." },
      { loai: "h2", text: "Không dùng chung 1 mật khẩu cho nhiều hệ thống" },
      { loai: "p", text: "Khi 1 hệ thống ít quan trọng bị lộ mật khẩu, kẻ tấn công thường thử lại đúng mật khẩu đó trên các hệ thống quan trọng hơn. Dùng mật khẩu riêng biệt kèm xác thực 2 lớp cho các hệ thống chứa dữ liệu khách hàng là biện pháp đơn giản nhưng hiệu quả." },
      { loai: "h2", text: "Bảo mật nên được tính từ lúc thiết kế hệ thống" },
      { loai: "p", text: "Thêm bảo mật vào sau khi hệ thống đã xây xong luôn khó và tốn kém hơn tính đến ngay từ đầu — đây là lý do phân quyền và mã hóa dữ liệu nhạy cảm cần là một phần trong bước thiết kế giải pháp, không phải hạng mục “làm sau nếu còn ngân sách”." }
    ]
  }
];
