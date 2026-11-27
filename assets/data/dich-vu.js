/*
 * Entity: Dịch vụ
 * Trường: id (string), slug (string), ten (string), ten_en (tên tiếng Anh cho nút EN), icon (string — key SVG dùng ở service-card),
 *         mo_ta_ngan_en, loi_ich_en (bản tiếng Anh, cùng thứ tự với loi_ich — tab Dịch vụ ở Trang chủ, trang Dịch vụ),
 *         mo_ta_ngan (string, ~1 câu), mo_ta_dai (string, đoạn mở đầu trang chi tiết dịch vụ),
 *         loi_ich (string[] — 4-6 bullet lợi ích cụ thể), quy_trinh (string[] — các bước triển khai dịch vụ này),
 *         anh (URL ảnh minh hoạ thật, Unsplash License), anh_alt (mô tả ảnh),
 *         noi_bat (boolean — true = dịch vụ cốt lõi, hiển thị dạng khối lớn hơn trên Trang chủ)
 * Dùng chung ở: Trang chủ (section Dịch vụ), trang Dịch vụ (tổng quan), 5 trang chi tiết dịch vụ, Footer.
 * CR-01: dv-0 "Tư vấn ứng dụng công nghệ" là dịch vụ đứng đầu — trang chi tiết viết riêng
 *        (screens/dich-vu/tu-van-ung-dung-cong-nghe/), không dùng renderer chung detail.js.
 */
const DATA_DICH_VU = [
  {
    id: "dv-0",
    slug: "tu-van-ung-dung-cong-nghe",
    ten: "Tư vấn ứng dụng công nghệ",
    ten_en: "Technology adoption consulting",
    icon: "compass",
    // CR-03: giữ tên, thêm lớp AI vào từng bước (nghiên cứu · xây phần mềm · vận hành · AI Agent)
    mo_ta_ngan: "Cùng doanh nghiệp chọn đúng bài toán, giải bằng công nghệ và AI đến khi đo được kết quả — rồi đồng hành tiếp ở bài toán sau, kể cả xây AI Agent cho chính doanh nghiệp.",
    mo_ta_dai: "Doanh nghiệp không cần một kế hoạch chuyển đổi số đồ sộ để bắt đầu. KTP phỏng vấn lãnh đạo và người trực tiếp làm, dùng AI để hiểu nhanh business và đối thủ cùng ngành, cùng bạn chọn một bài toán đáng giải nhất, xây giải pháp với sự hỗ trợ của AI dưới sự kiểm soát của kỹ sư, vận hành thông minh hơn nhờ AI — rồi tiếp tục đồng hành ở bài toán tiếp theo, thường là một AI Agent cho chính doanh nghiệp bạn.",
    mo_ta_ngan_en: "Together we pick the right problem, solve it with technology and AI until the results are measurable, then stay with you for the next one, including building an AI Agent for your own business.",
    loi_ich: [
      "AI phân tích business và đối thủ cùng ngành — buổi phỏng vấn đi thẳng vào trọng tâm",
      "Xây phần mềm với AI hỗ trợ, kỹ sư KTP review mọi thay đổi — bản chạy thật trong 4–8 tuần",
      "Vận hành cùng AI: giám sát, cảnh báo, báo cáo tự động; xây AI Agent cho chính doanh nghiệp",
      "Dữ liệu an toàn: không dùng để huấn luyện AI, triển khai riêng khi cần, con người duyệt quyết định quan trọng",
    ],
    loi_ich_en: [
      "AI analyses your business and industry competitors, so interviews go straight to the point",
      "Software built with AI assistance and every change reviewed by KTP engineers: a working release in 4–8 weeks",
      "Run smarter with AI: monitoring, alerts and automated reports; an AI Agent built for your own business",
      "Your data stays safe: never used to train AI, private deployment when needed, humans approve key decisions",
    ],
    quy_trinh: [
      "Phỏng vấn & cùng chọn bài toán — AI tổng hợp dữ liệu và so sánh đối thủ",
      "Khảo sát & viết đề bài — AI phân tích dữ liệu lịch sử, gợi ý chỉ số đo",
      "Triển khai thử nghiệm — AI hỗ trợ prototype, test, tài liệu; kỹ sư review",
      "Đo & mở rộng — AI giám sát, báo cáo; bài toán tiếp theo thường là một AI Agent",
    ],
    quy_trinh_en: [
      "Interview & pick the problem — AI aggregates data and compares competitors",
      "Survey & write the brief — AI analyses historical data and suggests metrics",
      "Pilot deployment — AI assists with prototype, testing and docs; engineer review",
      "Measure & scale — AI monitors and reports; the next problem is often an AI Agent",
    ],
    anh: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Buổi workshop: một người dán giấy note lên tường trong khi cả nhóm cùng trao đổi quanh bàn làm việc",
    anh_alt_en: "Workshop: someone puts sticky notes on a wall while the team discusses at the work table",
    noi_bat: true
  },
  {
    id: "dv-1",
    slug: "phat-trien-phan-mem",
    ten: "Phát triển phần mềm",
    ten_en: "Software development",
    icon: "code",
    mo_ta_ngan: "Xây dựng ứng dụng web, mobile và hệ thống quản lý tùy chỉnh theo đúng bài toán vận hành của doanh nghiệp bạn.",
    mo_ta_dai: "SME thường gặp 1 trong 2 tình huống: phần mềm đóng gói có sẵn không khớp quy trình thật, hoặc thuê ngoài code nhưng không ai tư vấn xem giải pháp có đúng bài toán không. KTP giải quyết cả hai bằng cách để cùng 1 đội ngũ vừa phân tích nghiệp vụ vừa trực tiếp phát triển — từ ứng dụng web nội bộ, app di động cho khách hàng/nhân viên, đến hệ thống quản lý (kho, bán hàng, nhân sự) đặt riêng theo quy trình thật của bạn, không phải ép quy trình của bạn theo 1 phần mềm đóng gói.",
    mo_ta_ngan_en: "Custom web apps, mobile apps and management systems built around how your business actually operates.",
    mo_ta_dai_en: "SMEs typically face one of two problems: packaged software doesn't fit their real workflow, or they outsource code without anyone advising on whether the solution fits the problem. KTP solves both by keeping one team that both analyses the business and codes directly — from internal web apps, mobile apps for customers or staff, to management systems (inventory, sales, HR) tailored to your real workflow, instead of forcing your workflow into packaged software.",
    loi_ich: [
      "Phân tích quy trình thật trước khi viết dòng code đầu tiên — không đoán yêu cầu",
      "Kiến trúc phù hợp quy mô SME: đủ chắc để chạy thật, không thừa phức tạp gây tốn chi phí vận hành",
      "Bàn giao kèm tài liệu kỹ thuật và hướng dẫn sử dụng, không phụ thuộc mãi vào 1 đội ngũ",
      "Hỗ trợ vận hành/bảo trì sau bàn giao, không giao xong là hết trách nhiệm",
    ],
    loi_ich_en: [
      "We analyse your real process before writing the first line of code, not guess the requirements",
      "Architecture sized for SMEs: solid enough for production without complexity that inflates running costs",
      "Handover with technical documentation and user guides, so you are never locked in to one team",
      "Operations and maintenance support after handover; our responsibility doesn't end at delivery",
    ],
    quy_trinh: [
      "Khảo sát quy trình vận hành thực tế và điểm nghẽn hiện tại",
      "Thiết kế giải pháp kỹ thuật và xác nhận phạm vi cùng khách hàng",
      "Phát triển theo từng đợt (sprint), demo tiến độ định kỳ",
      "Kiểm thử, đào tạo sử dụng và bàn giao kèm tài liệu",
    ],
    quy_trinh_en: [
      "Survey your real process and current bottlenecks",
      "Design the technical solution and confirm scope with you",
      "Develop in sprints with regular progress demos",
      "Test, train users and hand over with documentation",
    ],
    anh: "https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Đội ngũ lập trình viên cùng thảo luận trước màn hình máy tính trong văn phòng",
    anh_alt_en: "Development team discussing in front of a computer screen in the office",
    noi_bat: false
  },
  {
    id: "dv-2",
    slug: "thiet-ke-phat-trien-web",
    ten: "Thiết kế & phát triển Web",
    ten_en: "Web design & development",
    icon: "layout",
    mo_ta_ngan: "Website tối ưu tốc độ tải, chuẩn SEO và responsive trên mọi thiết bị — không chỉ đẹp mà còn ra chuyển đổi.",
    mo_ta_dai: "Một website đẹp nhưng tải chậm hoặc không lên được Google tìm kiếm gần như vô nghĩa với SME đang cần khách hàng mới. KTP thiết kế website với 3 tiêu chí song song ngay từ đầu: tốc độ tải (Core Web Vitals), cấu trúc chuẩn SEO kỹ thuật, và trải nghiệm chuyển đổi (CTA rõ ràng, form dễ điền) — thay vì chỉ tập trung hình ảnh rồi tối ưu sau.",
    mo_ta_ngan_en: "Fast-loading, SEO-ready websites that work on every device: built to convert, not just to look good.",
    mo_ta_dai_en: "A beautiful but slow website or one that doesn't rank on Google is almost pointless for an SME looking for new customers. KTP designs websites with 3 criteria in parallel from day one: load speed (Core Web Vitals), technical SEO structure, and conversion experience (clear CTAs, easy forms) — instead of focusing on visuals and optimizing later.",
    loi_ich: [
      "Tối ưu tốc độ tải và Core Web Vitals ngay từ giai đoạn thiết kế, không phải sửa vá sau",
      "Chuẩn SEO kỹ thuật (thẻ meta, schema, sitemap) để dễ được tìm thấy trên Google",
      "Responsive đầy đủ từ mobile đến desktop — đa số khách SME tiếp cận qua điện thoại trước",
      "Có thể tự cập nhật nội dung sau bàn giao, không phụ thuộc lập trình viên cho từng thay đổi nhỏ",
    ],
    loi_ich_en: [
      "Load speed and Core Web Vitals optimised from the design stage, not patched afterwards",
      "Technical SEO (meta tags, schema, sitemap) so you are easy to find on Google",
      "Fully responsive from mobile to desktop, since most SME customers arrive on their phones first",
      "Update your own content after handover without calling a developer for every small change",
    ],
    quy_trinh: [
      "Xác định mục tiêu chuyển đổi chính của website (bán hàng/thu lead/giới thiệu)",
      "Thiết kế giao diện theo bộ nhận diện thương hiệu",
      "Phát triển và tối ưu hiệu năng/SEO kỹ thuật",
      "Bàn giao kèm hướng dẫn quản trị nội dung",
    ],
    quy_trinh_en: [
      "Define the main conversion goal (sales/lead generation/branding)",
      "Design the interface to match your brand identity",
      "Develop and optimise performance and technical SEO",
      "Hand over with content management guidance",
    ],
    anh: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Người dùng bút cảm ứng phác thảo wireframe website trên máy tính bảng",
    anh_alt_en: "Person using stylus to sketch website wireframes on a tablet",
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
    mo_ta_ngan_en: "Digital marketing, social media management and content production that put your brand where your customers are.",
    mo_ta_dai_en: "Most SME marketing budgets can't be spread across every channel. KTP helps you first identify the 1-2 channels with the best conversion rates for your exact customers, then produces content and runs those channels methodically — instead of posting regularly without measuring what works.",
    loi_ich: [
      "Xác định kênh trọng tâm phù hợp ngân sách và tệp khách hàng thay vì dàn trải mọi nền tảng",
      "Lịch nội dung rõ ràng, gắn với mục tiêu kinh doanh cụ thể theo từng tháng",
      "Báo cáo hiệu quả theo số liệu (tương tác, lead, chi phí/khách hàng tiềm năng)",
      "Đồng bộ thông điệp với bộ nhận diện thương hiệu đã xây dựng",
    ],
    loi_ich_en: [
      "Focus on the channels that fit your budget and audience instead of spreading across every platform",
      "A clear content calendar tied to concrete business goals month by month",
      "Performance reports backed by data (engagement, leads, cost per lead)",
      "Messaging aligned with the brand identity we have built",
    ],
    quy_trinh: [
      "Phân tích tệp khách hàng và chọn kênh trọng tâm",
      "Lên kế hoạch nội dung theo tháng, gắn mục tiêu cụ thể",
      "Sản xuất và đăng tải nội dung, quản lý tương tác",
      "Đo lường hiệu quả và điều chỉnh chiến thuật hàng tháng",
    ],
    quy_trinh_en: [
      "Analyse your audience and pick the focus channels",
      "Plan content monthly, tied to concrete goals",
      "Create, publish and manage engagement",
      "Measure performance and adjust tactics monthly",
    ],
    anh: "https://images.unsplash.com/photo-1769596722541-40dedee6789d?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Lịch nội dung mạng xã hội đặt trên bàn làm việc",
    anh_alt_en: "A social media content calendar sits on the work desk",
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
    mo_ta_ngan_en: "Logo, brand identity and design collateral that are consistent and professional enough to compete with bigger players.",
    mo_ta_dai_en: "Many growing SMEs have brand identity that still stops at a DIY logo, with gaps between website, social media and print. KTP builds a complete identity (logo, colors, typography, usage rules) so your brand looks professional and consistent at every customer touchpoint.",
    loi_ich: [
      "Bộ nhận diện đầy đủ: logo, bảng màu, typography, quy tắc sử dụng — không chỉ 1 file logo rời rạc",
      "Áp dụng nhất quán từ website, mạng xã hội đến ấn phẩm in/namecard",
      "Phù hợp định vị và tệp khách hàng mục tiêu, không chạy theo xu hướng nhất thời",
      "Bàn giao file nguồn đầy đủ, chủ động sử dụng lâu dài không phụ thuộc 1 đơn vị thiết kế",
    ],
    loi_ich_en: [
      "A complete identity: logo, colour palette, typography and usage rules, not just a stand-alone logo file",
      "Applied consistently from website and social media to print and business cards",
      "Fitted to your positioning and target audience, not to passing trends",
      "Full source files handed over, so you can use them long term without depending on one design agency",
    ],
    quy_trinh: [
      "Tìm hiểu định vị thương hiệu và đối tượng khách hàng mục tiêu",
      "Phác thảo hướng thiết kế và xin phản hồi",
      "Hoàn thiện bộ nhận diện và quy tắc sử dụng (brand guideline)",
      "Bàn giao file nguồn và hỗ trợ áp dụng lên các kênh",
    ],
    quy_trinh_en: [
      "Understand your brand positioning and target audience",
      "Sketch design directions and gather feedback",
      "Finalize the identity and brand guidelines",
      "Hand over source files and help roll out across channels",
    ],
    anh: "https://images.unsplash.com/photo-1716471330463-f475b00f0506?auto=format&fit=crop&w=900&q=80",
    anh_alt: "Bàn làm việc với bàn phím, bút chì và các mẫu màu sắc thiết kế thương hiệu",
    anh_alt_en: "Workspace with keyboard, pencils and brand design colour swatches",
    noi_bat: false
  }
];
