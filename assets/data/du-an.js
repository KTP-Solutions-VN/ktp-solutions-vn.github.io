/*
 * Entity: Dự án (Case study/Portfolio) — chính là các prototype trong showcase/ (đã white-label)
 * Trường: id, slug, ten_du_an (tên theo từ khoá tìm kiếm), khach_hang (tên brand white-label, không phải tên khách thật), nganh,
 *         anh (ảnh bìa, đường dẫn tính từ gốc website), anh_alt, tom_tat (1-2 câu), thach_thuc (đoạn văn), giai_phap (đoạn văn),
 *         ket_qua (mảng 3 {chi_so, mo_ta} — giá trị kinh doanh nổi bật, câu ngắn; KHÔNG bịa số liệu %, doanh thu…),
 *         use_cases (mảng {ten, mo_ta} — use case nghiệp vụ của prototype, viết theo lợi ích kinh doanh, chỉ những gì prototype có thật),
 *         dich_vu_lien_quan (slug trong DATA_DICH_VU), noi_bat (boolean), playground (trang bấm thử bản mẫu screens/du-an/playground/?app=<id>, tính từ gốc website)
 * linh_vuc: slug lĩnh vực (hospitality / industrial / healthcare) để chọn icon badge (KTP.domainIcon trong global.js).
 * Trường portfolio (CR-02): mang (string[] — chip phân hệ / năng lực, tiếng Anh dùng chung 2 ngôn ngữ),
 *         anh_phu (mảng 2 {anh, anh_alt, anh_alt_en} — ảnh chụp màn hình prototype cho marquee, card, gallery chi tiết).
 * Trường case đồng hành (CR-01, tuỳ chọn): thi_truong / thi_truong_en (khác "Việt Nam" thì hiện badge thị trường),
 *         trang_thai ("dang-dong-hanh" → badge "Đang đồng hành"), an_ten_khach_hang (boolean — ghi chú ẩn tên theo NDA),
 *         pham_vi (mảng {giai_doan, hang_muc, mo_ta} + bản _en — các chặng triển khai, render thành hành trình ngang).
 *         Nội dung case thật cũng phải white-label: không nêu tên, quốc gia, dòng sản phẩm hay nền tảng cũ của khách.
 * Song ngữ: mọi trường chữ có bản tiếng Anh cùng tên + hậu tố _en (ten_du_an_en, chi_so_en, mo_ta_en, ten_en…);
 *           script hiển thị gắn vào thuộc tính data-en để nút VI/EN của header đổi được.
 * Dùng chung ở: Trang chủ (case study nổi bật), trang Dự án (portfolio), trang Chi tiết dự án, trang dịch vụ Tư vấn ứng dụng công nghệ.
 * Ảnh / link tương đối: trang hiển thị tự thêm tiền tố theo độ sâu (xem hàm rootUrl trong các script).
 */
const DATA_DU_AN = [
  {
    id: "da-1",
    slug: "phan-mem-quan-ly-khach-san-resort-villa-pms",
    ten_du_an: "Phần mềm quản lý khách sạn, resort, villa (PMS)",
    ten_du_an_en: "Hotel, resort & villa property management system (PMS)",
    khach_hang: "Azura Manager (tên đã thay để bảo mật)",
    khach_hang_en: "Azura Manager (name changed for confidentiality)",
    nganh: "Khách sạn & Resort",
    nganh_en: "Hospitality",
    linh_vuc: "hospitality",
    anh: "showcase/assets/covers/pms.jpg",
    anh_alt: "Dashboard phần mềm quản lý khách sạn, resort, villa: booking, doanh thu, công suất phòng",
    anh_alt_en: "Hotel, resort and villa management dashboard: bookings, revenue, occupancy",
    tom_tat: "Hệ thống quản lý vận hành (PMS) cho chuỗi villa, resort: đặt phòng, check-in/check-out, chủ sở hữu, dịch vụ khách, bảo trì, kế toán và nhân sự trên một nền tảng.",
    tom_tat_en: "An operations platform (PMS) for a villa and resort group: reservations, check-in/out, owners, guest services, maintenance, accounting and HR in one place.",
    thach_thuc: "Chuỗi villa, resort vận hành ở nhiều điểm đến, mỗi bộ phận (đặt phòng, lễ tân, buồng phòng, bảo trì, kế toán, quan hệ chủ sở hữu) dùng công cụ riêng. Dữ liệu booking, tình trạng villa và chi phí không khớp nhau, chủ sở hữu villa khó theo dõi doanh thu, còn ban điều hành không có bức tranh chung theo từng đơn vị kinh doanh.",
    thach_thuc_en: "The group runs villas and resorts across several destinations, and every team (reservations, front office, housekeeping, maintenance, accounting, owner relations) used its own tools. Bookings, villa status and costs never matched, villa owners struggled to follow their revenue, and management had no single view per business unit.",
    giai_phap: "KTP thiết kế PMS gom toàn bộ vận hành vào một hệ thống: lịch check-in/check-out và danh sách booking đa kênh, kiểm soát check-in/check-out theo từng villa, cổng chủ sở hữu và cổng khách, điều phối dịch vụ villa, bảo trì, hồ bơi và sân vườn, quản lý nội dung website, kế toán, chấm công và tính lương. Prototype bấm thử được đến từng màn trước khi phát triển thật.",
    giai_phap_en: "KTP designed a PMS that brings all operations into one system: a check-in/out calendar and multi-channel booking list, check-in/out control per villa, owner and guest portals, villa services, maintenance, pool and garden operations, website content management, accounting, timesheets and payroll. The prototype is clickable down to every screen before real development starts.",
    ket_qua: [
      { chi_so: "Một nền tảng", chi_so_en: "One platform", mo_ta: "thay cho nhiều công cụ rời rạc ở mọi điểm đến", mo_ta_en: "replacing scattered tools across every destination" },
      { chi_so: "Minh bạch", chi_so_en: "Transparency", mo_ta: "doanh thu và chi phí với chủ sở hữu villa", mo_ta_en: "revenue and costs shared with villa owners" },
      { chi_so: "Bán thêm", chi_so_en: "Upselling", mo_ta: "dịch vụ villa trên mỗi booking", mo_ta_en: "villa services on every booking" }
    ],
    use_cases: [
      { ten: "Lấp đầy lịch phòng", ten_en: "Fill the room calendar", mo_ta: "Lịch check-in/check-out và booking từ mọi kênh trên cùng một màn, phát hiện ngày trống và villa thiếu giá để không bỏ lỡ doanh thu.", mo_ta_en: "Check-in/out calendar and bookings from every channel on one screen, spotting empty dates and villas missing rates so no revenue is left on the table." },
      { ten: "Đón và trả khách đồng đều", ten_en: "Consistent arrivals and departures", mo_ta: "Checklist kiểm soát check-in/check-out theo từng villa, mỗi điểm đến vận hành theo cùng một chuẩn dịch vụ.", mo_ta_en: "Check-in/out control checklists per villa keep every destination on the same service standard." },
      { ten: "Giữ chân chủ sở hữu villa", ten_en: "Keep villa owners on board", mo_ta: "Cổng chủ sở hữu xem booking, doanh thu, chi phí và báo cáo hằng tháng, giảm thời gian đối soát và tăng niềm tin của chủ đầu tư.", mo_ta_en: "An owner portal with bookings, revenue, costs and monthly reports cuts reconciliation time and builds investor trust." },
      { ten: "Tăng doanh thu trên mỗi booking", ten_en: "More revenue per booking", mo_ta: "Danh mục dịch vụ villa, trải nghiệm và yêu cầu của khách được bán và điều phối ngay trên hệ thống.", mo_ta_en: "Villa services, experiences and guest requests are sold and coordinated right in the system." },
      { ten: "Villa luôn sẵn sàng để bán", ten_en: "Villas always ready to sell", mo_ta: "Bảo trì, hồ bơi, sân vườn, buồng phòng và cải tạo được lên lịch và theo dõi, hạn chế villa bị khoá vì sự cố.", mo_ta_en: "Maintenance, pool, garden, housekeeping and renovation are scheduled and tracked, so fewer villas are blocked by issues." },
      { ten: "Khép sổ nhanh theo đơn vị", ten_en: "Faster closing per business unit", mo_ta: "Đối soát OTA, chi phí định kỳ, chấm công, tính lương và báo cáo theo từng đơn vị kinh doanh.", mo_ta_en: "OTA reconciliation, recurring expenses, timesheets, payroll and reports per business unit." }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: true,
    playground: "screens/du-an/playground/?app=pms",
    mang: ["PMS", "Reservations", "Owner portal", "Housekeeping", "Accounting & HR"],
    anh_phu: [
      { anh: "showcase/assets/covers/pms-1.jpg", anh_alt: "Lịch đặt phòng và tình trạng villa theo ngày", anh_alt_en: "Reservation calendar and villa status by day" },
      { anh: "showcase/assets/covers/pms-2.jpg", anh_alt: "Cổng chủ sở hữu: doanh thu và báo cáo hằng tháng", anh_alt_en: "Owner portal: revenue and monthly reports" }
    ]
  },
  {
    id: "da-2",
    slug: "channel-manager-khach-san-dong-bo-ota",
    ten_du_an: "Channel Manager khách sạn: đồng bộ OTA Booking.com, Agoda, Airbnb",
    ten_du_an_en: "Hotel channel manager: OTA sync for Booking.com, Agoda, Airbnb",
    khach_hang: "Azura Stays (tên đã thay để bảo mật)",
    khach_hang_en: "Azura Stays (name changed for confidentiality)",
    nganh: "Khách sạn & Resort",
    nganh_en: "Hospitality",
    linh_vuc: "hospitality",
    anh: "showcase/assets/covers/cms.jpg",
    anh_alt: "Dashboard Channel Manager: khách đến, khách đi, công suất phòng và nguồn booking theo OTA",
    anh_alt_en: "Channel manager dashboard: arrivals, departures, occupancy and booking sources by OTA",
    tom_tat: "Channel Manager đồng bộ giá phòng, phòng trống và đặt phòng lên các OTA, kèm tin nhắn khách gom về một nơi và báo cáo doanh thu theo từng đơn vị vận hành.",
    tom_tat_en: "A channel manager that syncs rates, availability and reservations to the OTAs, with every guest message in one place and revenue reports per operator.",
    thach_thuc: "Mỗi villa, khách sạn bán phòng trên nhiều kênh OTA (Booking.com, Agoda, Airbnb, Expedia). Cập nhật giá và phòng trống thủ công trên từng kênh dễ dẫn tới bán trùng phòng, tin nhắn khách nằm rải rác ở nhiều nơi, và chủ đơn vị không biết kênh nào mang lại doanh thu.",
    thach_thuc_en: "Every villa and hotel sells rooms on several OTAs (Booking.com, Agoda, Airbnb, Expedia). Updating rates and availability by hand on each channel led to double bookings, guest messages were scattered across platforms, and owners could not tell which channel actually brought in revenue.",
    giai_phap: "KTP thiết kế Channel Manager kết nối OTA qua Channex / Beds24: lịch giá và phòng trống chung cho nhiều cơ sở, đặt phòng từ mọi kênh đổ về một nơi, tin nhắn khách từ mọi kênh về một nơi, báo cáo công suất (AOR, ADR) và nguồn booking, quản lý đơn vị vận hành (operator) cho mô hình nhiều chủ cơ sở.",
    giai_phap_en: "KTP designed a channel manager connected to the OTAs through Channex / Beds24: one rate and availability calendar for many properties, reservations from every channel in one place, guest messages from every channel in one place, occupancy (AOR, ADR) and booking source reports, and operator management for multi-owner operations.",
    ket_qua: [
      { chi_so: "Không trùng phòng", chi_so_en: "No double bookings", mo_ta: "giá và phòng trống đồng bộ mọi OTA", mo_ta_en: "rates and availability synced to every OTA" },
      { chi_so: "Một lịch giá", chi_so_en: "One rate calendar", mo_ta: "cho mọi cơ sở và mọi kênh bán", mo_ta_en: "for every property and every sales channel" },
      { chi_so: "Rõ kênh sinh lời", chi_so_en: "Know what pays", mo_ta: "công suất, ADR và nguồn booking", mo_ta_en: "occupancy, ADR and booking sources" }
    ],
    use_cases: [
      { ten: "Chấm dứt bán trùng phòng", ten_en: "End double bookings", mo_ta: "Phòng trống cập nhật đồng thời lên Booking.com, Agoda, Airbnb, Expedia ngay khi có đặt phòng mới.", mo_ta_en: "Availability updates on Booking.com, Agoda, Airbnb and Expedia at the same time as soon as a new booking comes in." },
      { ten: "Đổi giá theo mùa trong vài phút", ten_en: "Seasonal pricing in minutes", mo_ta: "Lịch giá chung cho nhiều cơ sở, chỉnh giá và quy tắc lưu trú một lần, áp cho mọi kênh.", mo_ta_en: "One rate calendar for many properties: change rates and stay rules once and apply them to every channel." },
      { ten: "Mọi đặt phòng về một nơi", ten_en: "Every booking in one place", mo_ta: "Đặt phòng từ các OTA và đặt trực tiếp đổ về cùng một danh sách, lễ tân không phải mở từng kênh.", mo_ta_en: "Bookings from the OTAs and direct bookings land in the same list, so the front desk does not open each channel." },
      { ten: "Trả lời khách nhanh hơn", ten_en: "Reply to guests faster", mo_ta: "Tin nhắn khách từ mọi kênh gom về một màn, không bỏ sót yêu cầu trước ngày đến.", mo_ta_en: "Guest messages from every channel land on one screen, so no request before arrival is missed." },
      { ten: "Biết kênh nào mang lại tiền", ten_en: "Know which channel makes money", mo_ta: "Báo cáo công suất, ADR và tỷ trọng nguồn booking để quyết định đầu tư kênh bán.", mo_ta_en: "Occupancy, ADR and booking source mix reports to decide where to invest in distribution." },
      { ten: "Mở rộng mô hình nhiều chủ cơ sở", ten_en: "Scale to many property owners", mo_ta: "Quản lý đơn vị vận hành và phân quyền, mỗi chủ cơ sở chỉ thấy dữ liệu của mình.", mo_ta_en: "Operator management and permissions: each owner only sees their own data." }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: false,
    playground: "screens/du-an/playground/?app=cms",
    mang: ["Channel manager", "OTA sync", "Rate management", "Guest messaging", "Reports"],
    anh_phu: [
      { anh: "showcase/assets/covers/cms-1.jpg", anh_alt: "Lịch giá và phòng trống đồng bộ lên các OTA", anh_alt_en: "Rate and availability calendar synced to the OTAs" },
      { anh: "showcase/assets/covers/cms-2.jpg", anh_alt: "Kết nối OTA và trạng thái đồng bộ", anh_alt_en: "OTA connections and sync status" }
    ]
  },
  {
    id: "da-3",
    slug: "phan-mem-crm-doanh-nghiep-b2b-cong-nghiep",
    ten_du_an: "Phần mềm CRM doanh nghiệp B2B cho tập đoàn thiết bị công nghiệp",
    ten_du_an_en: "B2B CRM software for an industrial equipment group",
    khach_hang: "Apex Industrial (tên đã thay để bảo mật)",
    khach_hang_en: "Apex Industrial (name changed for confidentiality)",
    nganh: "Công nghiệp / B2B",
    nganh_en: "Industrial / B2B",
    linh_vuc: "industrial",
    thi_truong: "Đông Nam Á",
    thi_truong_en: "Southeast Asia",
    trang_thai: "dang-dong-hanh",
    an_ten_khach_hang: true,
    pham_vi: [
      { giai_doan: "Đã triển khai", giai_doan_en: "Live", hang_muc: "E-commerce", hang_muc_en: "E-commerce", mo_ta: "Bán thiết bị, cấu hình theo yêu cầu, dịch vụ bảo dưỡng và sửa chữa", mo_ta_en: "Equipment sales, made-to-order configurations, maintenance and repair services" },
      { giai_doan: "Đang triển khai", giai_doan_en: "In progress", hang_muc: "CRM", hang_muc_en: "CRM", mo_ta: "Khách hàng, cơ hội bán hàng, hậu mãi và phê duyệt trên nhiều pháp nhân", mo_ta_en: "Customers, deals, after-sales and approvals across several entities" },
      { giai_doan: "Chuẩn bị bắt đầu", giai_doan_en: "Up next", hang_muc: "Kế toán", hang_muc_en: "Accounting", mo_ta: "Kế toán cho bán hàng và dịch vụ, hỗ trợ nhiều công ty", mo_ta_en: "Accounting for sales and services, supporting multiple companies" }
    ],
    anh: "showcase/assets/covers/crm.jpg",
    anh_alt: "Tổng quan CRM: doanh thu, pipeline kinh doanh, lệnh dịch vụ và việc chờ phê duyệt",
    anh_alt_en: "CRM overview: revenue, pipeline, service orders and pending approvals",
    tom_tat: "Thay nền tảng SaaS cũ bằng hệ thống riêng, triển khai lần lượt E-commerce → CRM → Kế toán. CRM đa pháp nhân: bán hàng, báo giá, đơn hàng, dịch vụ hậu mãi, lắp đặt, mua hàng và phê duyệt theo hạn mức (DoA).",
    tom_tat_en: "Replacing a SaaS platform with a system the business owns, rolled out E-commerce → CRM → Accounting. The multi-entity CRM covers sales, quotations, orders, after-sales service, installation, purchasing and delegation-of-authority (DoA) approvals.",
    thach_thuc: "Tập đoàn kinh doanh thiết bị công nghiệp kèm dịch vụ bảo dưỡng, sửa chữa, có nhiều pháp nhân, đang vận hành trên một nền tảng SaaS: chi phí license cao, không hỗ trợ quản lý nhiều công ty, mỗi thay đổi theo nhu cầu riêng đều khó thực hiện. Phê duyệt báo giá và mua hàng đi qua email, phiếu sửa chữa và lịch kiểm định theo dõi bằng bảng tính, ban lãnh đạo không có số liệu hợp nhất. Yêu cầu đặt ra: một hệ thống doanh nghiệp kiểm soát hoàn toàn, và chuyển được toàn bộ dữ liệu hiện có sang mà không gián đoạn vận hành.",
    thach_thuc_en: "The industrial equipment group, which also provides maintenance and repair services across several legal entities, was running on a SaaS platform: licence costs were high, multiple companies were not supported and every change to fit its own needs was hard to make. Quotation and purchase approvals went through email, service jobs and inspection schedules lived in spreadsheets, and leadership had no consolidated figures. The brief: a system the business fully controls, with all existing data migrated across without disrupting operations.",
    giai_phap: "Thay vì tiếp tục xoay xở trên nền tảng cũ, KTP xây mới toàn bộ hệ thống và triển khai lần lượt từng mảng: E-commerce (bán thiết bị, cấu hình theo yêu cầu, dịch vụ bảo dưỡng và sửa chữa) đã đưa vào vận hành; CRM đang triển khai; Kế toán chuẩn bị bắt đầu. CRM đa pháp nhân có Group View hợp nhất: từ lead, cơ hội bán hàng, báo giá đến đơn hàng và hoá đơn; lệnh dịch vụ, hồ sơ thiết bị, dự án đóng mới, vật tư và lịch kiểm định; hạn mức phê duyệt (DoA), Kanban theo trạng thái, phân quyền theo hồ sơ người dùng và tích hợp kế toán. Mọi giai đoạn đều chuyển toàn bộ dữ liệu từ nền tảng cũ sang hệ thống mới.",
    giai_phap_en: "Instead of working around the old platform, KTP is rebuilding the whole system one area at a time: E-commerce (equipment sales, made-to-order configurations, maintenance and repair services) is live; the CRM is being rolled out; Accounting is next. The multi-entity CRM has a consolidated Group View: from leads, deals and quotations to orders and invoices; service orders, installed base, fit-out projects, materials and inspection schedules; DoA approval limits, status Kanban boards, profile-based permissions and accounting integration. Every phase migrates all data from the old platform to the new system.",
    ket_qua: [
      { chi_so: "Toàn quyền kiểm soát", chi_so_en: "Full ownership", mo_ta: "hệ thống riêng thay nền tảng SaaS trả phí license", mo_ta_en: "a system of its own instead of a licensed SaaS platform" },
      { chi_so: "Đa pháp nhân", chi_so_en: "Multi-entity", mo_ta: "nhiều công ty, số liệu hợp nhất trên một hệ thống", mo_ta_en: "many companies, consolidated figures in one system" },
      { chi_so: "Lead → hoá đơn", chi_so_en: "Lead → invoice", mo_ta: "bán hàng và hậu mãi trên một luồng xuyên suốt", mo_ta_en: "sales and after-sales in one end-to-end flow" }
    ],
    use_cases: [
      { ten: "Pipeline bán hàng rõ ràng", ten_en: "A clear sales pipeline", mo_ta: "Từ khách hàng tiềm năng, cơ hội, chào giá đến đơn hàng và hoá đơn trên Kanban theo giai đoạn, quản lý biết cơ hội nào cần đẩy.", mo_ta_en: "Prospects, opportunities, proposals, orders and invoices on stage-based Kanban boards, so managers know which opportunities to push." },
      { ten: "Chào giá duyệt đúng thẩm quyền", ten_en: "Proposals approved by the right person", mo_ta: "Hạn mức phê duyệt (DoA) cho chào giá, chiết khấu và mua sắm, thay cho chuỗi email.", mo_ta_en: "Delegation-of-authority (DoA) approval limits for proposals, discounts and procurement instead of email chains." },
      { ten: "Hậu mãi tạo doanh thu lặp lại", ten_en: "After-sales that brings repeat revenue", mo_ta: "Lệnh dịch vụ, hồ sơ thiết bị và lịch kiểm định được nhắc hạn, biến dịch vụ sau bán thành nguồn doanh thu.", mo_ta_en: "Service orders, installed-base records and inspection schedules with due-date reminders turn after-sales into a revenue stream." },
      { ten: "Dự án đóng mới đúng tiến độ", ten_en: "Fit-out projects on schedule", mo_ta: "Dự án đóng mới, phiếu xuất kho và yêu cầu vật tư theo dõi trên cùng hệ thống với đơn hàng.", mo_ta_en: "Fit-out projects, goods issues and material requests tracked in the same system as the orders." },
      { ten: "Thu mua có kiểm soát", ten_en: "Controlled procurement", mo_ta: "Yêu cầu mua sắm, đối tác cung ứng và phê duyệt minh bạch theo từng pháp nhân.", mo_ta_en: "Purchase requests, suppliers and approvals kept transparent per legal entity." },
      { ten: "Lãnh đạo nhìn toàn tập đoàn", ten_en: "Leadership sees the whole group", mo_ta: "Group View hợp nhất số liệu các pháp nhân, báo cáo và dự báo doanh số cho ban điều hành.", mo_ta_en: "Group View consolidates figures across entities, with reports and sales forecasts for management." }
    ],
    dich_vu_lien_quan: "tu-van-ung-dung-cong-nghe",
    noi_bat: true,
    playground: "screens/du-an/playground/?app=crm",
    mang: ["E-commerce", "CRM", "After-sales", "Accounting", "Data migration"],
    anh_phu: [
      { anh: "showcase/assets/covers/crm-1.jpg", anh_alt: "Bảng Kanban theo trạng thái cho lệnh dịch vụ", anh_alt_en: "Status Kanban board for service orders" },
      { anh: "showcase/assets/covers/crm-2.jpg", anh_alt: "Phê duyệt của tôi: hàng chờ theo hạn mức (DoA)", anh_alt_en: "My approvals: delegation-of-authority queue" }
    ]
  },
  {
    id: "da-4",
    slug: "phan-mem-quan-tri-ban-hang-y-te-benh-vien",
    ten_du_an: "Phần mềm quản trị bán hàng y tế cho bệnh viện, phòng khám",
    ten_du_an_en: "Healthcare e-commerce admin for hospitals & clinics",
    khach_hang: "CareJourney (tên đã thay để bảo mật)",
    khach_hang_en: "CareJourney (name changed for confidentiality)",
    nganh: "Y tế",
    nganh_en: "Healthcare",
    linh_vuc: "healthcare",
    anh: "showcase/assets/covers/admin.jpg",
    anh_alt: "Dashboard quản trị bán hàng y tế: doanh thu, đơn hàng theo kênh và việc cần duyệt",
    anh_alt_en: "Healthcare sales admin dashboard: revenue, orders by channel and pending tasks",
    tom_tat: "Trang quản trị cho hệ thống bán hàng y tế đa kênh: đơn hàng, hoàn tiền, danh mục sản phẩm và dịch vụ, khuyến mãi, nội dung, báo cáo.",
    tom_tat_en: "The back-office of a multi-channel healthcare sales system: orders, refunds, product and service catalogue, promotions, content and reports.",
    thach_thuc: "Tập đoàn y tế, thai sản bán sản phẩm và gói dịch vụ qua nhiều kênh (online, tham quan bệnh viện, sự kiện) nhưng mỗi kênh một quy trình. Đơn hàng, hoàn tiền, khuyến mãi và nội dung quản lý rời rạc, báo cáo theo kênh phải tổng hợp thủ công.",
    thach_thuc_en: "The healthcare and maternity group sells products and service packages through several channels (online, hospital tours, events), each with its own process. Orders, refunds, promotions and content were managed separately and channel reports were compiled by hand.",
    giai_phap: "KTP thiết kế back-office thống nhất: quản lý đơn hàng và hoàn tiền theo kênh, danh mục sản phẩm, gói dịch vụ, combo và lịch dịch vụ, khuyến mãi và quà tặng, nội dung và banner, khách hàng và phân quyền quản trị, bộ báo cáo bán hàng, khách hàng, giới thiệu, đặt lịch.",
    giai_phap_en: "KTP designed a unified back-office: orders and refunds by channel, a catalogue of products, service packages, bundles and service schedules, promotions and gifts, content and banners, customers and admin permissions, plus reports on sales, customers, referrals and bookings.",
    ket_qua: [
      { chi_so: "Đa kênh", chi_so_en: "Multi-channel", mo_ta: "online, tham quan bệnh viện, sự kiện trên một hệ thống", mo_ta_en: "online, hospital tours and events in one system" },
      { chi_so: "Khuyến mãi đo được", chi_so_en: "Measurable promotions", mo_ta: "mã giảm giá, quà tặng, báo cáo hiệu quả", mo_ta_en: "vouchers, gifts and performance reports" },
      { chi_so: "Hành trình khách", chi_so_en: "Customer journey", mo_ta: "từ quan tâm đến mua và quay lại", mo_ta_en: "from interest to purchase and return" }
    ],
    use_cases: [
      { ten: "Bán đa kênh trên một hệ thống", ten_en: "Sell on every channel from one system", mo_ta: "Đơn online, tại buổi tham quan bệnh viện và tại sự kiện quản lý chung, đúng phương thức giao nhận từng kênh.", mo_ta_en: "Online, hospital tour and event orders are managed together, each with the right fulfilment method." },
      { ten: "Hoàn tiền có kiểm soát", ten_en: "Controlled refunds", mo_ta: "Yêu cầu hoàn tiền đi qua luồng duyệt rõ ràng, giảm sai sót và rủi ro thất thoát.", mo_ta_en: "Refund requests follow a clear approval flow, reducing errors and leakage." },
      { ten: "Tung gói dịch vụ nhanh", ten_en: "Launch service packages fast", mo_ta: "Danh mục sản phẩm, gói dịch vụ, combo và lịch dịch vụ do đội kinh doanh tự cấu hình.", mo_ta_en: "The sales team configures products, service packages, bundles and schedules themselves." },
      { ten: "Khuyến mãi đo được hiệu quả", ten_en: "Promotions you can measure", mo_ta: "Mã giảm giá, quà tặng kèm, ưu đãi mua kèm và báo cáo hiệu quả từng chương trình.", mo_ta_en: "Vouchers, gifts with purchase, purchase-with-purchase offers and performance reports per campaign." },
      { ten: "Hiểu hành trình khách hàng", ten_en: "Understand the customer journey", mo_ta: "Phân khúc khách hàng, báo cáo giới thiệu, hành trình và chuyển đổi để chăm sóc đúng thời điểm.", mo_ta_en: "Customer segments plus referral, journey and conversion reports to follow up at the right time." },
      { ten: "Nội dung không cần IT", ten_en: "Content without IT", mo_ta: "Trang nội dung, banner và email do đội marketing tự cập nhật.", mo_ta_en: "The marketing team updates content pages, banners and emails on its own." }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: false,
    playground: "screens/du-an/playground/?app=admin",
    mang: ["E-commerce admin", "Orders & refunds", "Promotions", "Content", "Reports"],
    anh_phu: [
      { anh: "showcase/assets/covers/admin-1.jpg", anh_alt: "Danh sách đơn hàng theo kênh bán", anh_alt_en: "Order list by sales channel" },
      { anh: "showcase/assets/covers/admin-2.jpg", anh_alt: "Báo cáo bán hàng theo kênh và thời gian", anh_alt_en: "Sales report by channel and period" }
    ]
  },
  {
    id: "da-5",
    slug: "website-ban-hang-y-te-dat-lich-dich-vu-benh-vien",
    ten_du_an: "Website bán hàng y tế, đặt lịch dịch vụ bệnh viện",
    ten_du_an_en: "Healthcare e-commerce website & hospital service booking",
    khach_hang: "CareJourney (tên đã thay để bảo mật)",
    khach_hang_en: "CareJourney (name changed for confidentiality)",
    nganh: "Y tế",
    nganh_en: "Healthcare",
    linh_vuc: "healthcare",
    anh: "showcase/assets/covers/store-front.jpg",
    anh_alt: "Trang chủ website bán hàng y tế: gói thai sản, tham quan bệnh viện, đặt lịch",
    anh_alt_en: "Healthcare e-commerce homepage: maternity packages, hospital tours, booking",
    tom_tat: "Website thương mại điện tử y tế cho khách hàng: sản phẩm và gói dịch vụ, đặt lịch, giỏ hàng theo kênh, hội viên và điểm thưởng.",
    tom_tat_en: "A healthcare e-commerce website for customers: products and service packages, booking, a channel-aware cart, membership and loyalty points.",
    thach_thuc: "Khách hàng mua sản phẩm, gói dịch vụ y tế và đăng ký tham quan bệnh viện ở các nơi khác nhau, không có tài khoản chung để theo dõi đơn hàng, lịch hẹn và quyền lợi hội viên.",
    thach_thuc_en: "Customers bought products and healthcare packages and signed up for hospital tours in different places, with no single account to follow orders and membership benefits.",
    giai_phap: "KTP thiết kế website bán hàng y tế với giỏ hàng tự nhóm theo kênh mua (online, tham quan bệnh viện, sự kiện), chọn ngày giờ theo sức chứa thực tế, thanh toán có giới thiệu và điểm thưởng, tài khoản theo dõi đơn hàng và lịch sử, đăng ký chương trình hội viên.",
    giai_phap_en: "KTP designed a healthcare e-commerce website with a cart that groups items by purchase channel (online, hospital tour, event), date and time slots based on real capacity, checkout with referrals and loyalty points, an account to follow orders and history, and membership sign-up.",
    ket_qua: [
      { chi_so: "Một giỏ hàng", chi_so_en: "One cart", mo_ta: "cho online, tham quan bệnh viện, sự kiện", mo_ta_en: "for online, hospital tours and events" },
      { chi_so: "Đặt lịch tức thì", chi_so_en: "Instant booking", mo_ta: "theo sức chứa thực tế", mo_ta_en: "based on real capacity" },
      { chi_so: "Giữ chân khách", chi_so_en: "Customer loyalty", mo_ta: "hội viên và điểm thưởng", mo_ta_en: "membership and reward points" }
    ],
    use_cases: [
      { ten: "Mua gói dịch vụ y tế online", ten_en: "Buy healthcare packages online", mo_ta: "Danh sách và trang chi tiết sản phẩm, gói dịch vụ, combo với giá ưu đãi rõ ràng.", mo_ta_en: "Listings and detail pages for products, service packages and bundles with clear special prices." },
      { ten: "Đặt lịch theo sức chứa thật", ten_en: "Book by real capacity", mo_ta: "Khách chọn ngày giờ còn chỗ, bệnh viện không bị quá tải buổi tư vấn, tham quan.", mo_ta_en: "Customers pick available dates and times, so consultations and tours are never overbooked." },
      { ten: "Một giỏ hàng cho mọi kênh", ten_en: "One cart for every channel", mo_ta: "Giỏ hàng tự nhóm theo kênh mua, mỗi kênh đúng phương thức nhận hàng và thanh toán.", mo_ta_en: "The cart groups items by purchase channel, each with the right pickup and payment method." },
      { ten: "Giữ chân khách bằng hội viên", ten_en: "Retain customers with membership", mo_ta: "Chương trình hội viên và điểm thưởng khuyến khích khách quay lại cho các lần sinh tiếp theo.", mo_ta_en: "Membership and reward points bring families back for their next birth." },
      { ten: "Khách tự phục vụ sau mua", ten_en: "Self-service after purchase", mo_ta: "Theo dõi trạng thái đơn hàng và lịch sử mua trong tài khoản, giảm cuộc gọi hỏi tổng đài.", mo_ta_en: "Order status and purchase history in the account, fewer calls to the hotline." },
      { ten: "Tuân thủ dữ liệu cá nhân", ten_en: "Personal data compliance", mo_ta: "Tuỳ chọn liên hệ và yêu cầu xoá dữ liệu ngay trong tài khoản.", mo_ta_en: "Contact preferences and data deletion requests right in the account." }
    ],
    dich_vu_lien_quan: "thiet-ke-phat-trien-web",
    noi_bat: false,
    playground: "screens/du-an/playground/?app=store-front",
    mang: ["E-commerce", "Booking", "Membership", "Loyalty points"],
    anh_phu: [
      { anh: "showcase/assets/covers/store-front-1.jpg", anh_alt: "Trang gói dịch vụ y tế và đặt lịch", anh_alt_en: "Healthcare package page with booking" },
      { anh: "showcase/assets/covers/store-front-2.jpg", anh_alt: "Giỏ hàng nhóm theo kênh mua", anh_alt_en: "Cart grouped by purchase channel" }
    ]
  },
  {
    id: "da-6",
    slug: "phan-mem-pos-nha-thuoc-benh-vien",
    ten_du_an: "Phần mềm POS nhà thuốc, quầy thuốc bệnh viện",
    ten_du_an_en: "Pharmacy POS software for hospital pharmacies",
    khach_hang: "CareJourney (tên đã thay để bảo mật)",
    khach_hang_en: "CareJourney (name changed for confidentiality)",
    nganh: "Y tế",
    nganh_en: "Healthcare",
    linh_vuc: "healthcare",
    anh: "showcase/assets/covers/pos.jpg",
    anh_alt: "Màn hình bán hàng POS nhà thuốc: danh sách sản phẩm, giỏ hàng, thanh toán",
    anh_alt_en: "Pharmacy POS sales screen: product list, cart, payment",
    tom_tat: "Phần mềm POS bán hàng tại quầy thuốc bệnh viện: bán hàng, ghi nhận đơn thuốc, tư vấn, can thiệp dược và chốt ca.",
    tom_tat_en: "Point-of-sale software for hospital pharmacy counters: sales, prescription recording, counselling, pharmacist interventions and shift close.",
    thach_thuc: "Dược sĩ tại quầy vừa bán hàng vừa phải ghi nhận đơn thuốc, thông tin bệnh nhân và nội dung tư vấn trên nhiều công cụ, dễ sai sót và mất thời gian khi đông khách.",
    thach_thuc_en: "Pharmacists at the counter had to sell while recording prescriptions, patient information and counselling notes across several tools, which caused errors and delays at busy times.",
    giai_phap: "KTP thiết kế POS tập trung cho quầy thuốc: bán hàng nhanh, ghi nhận đơn thuốc và thông tin lâm sàng của bệnh nhân, ghi chú tư vấn và can thiệp dược, chốt ca và đối soát cuối ngày.",
    giai_phap_en: "KTP designed a focused POS for the pharmacy counter: fast checkout, prescription and clinical patient details, counselling and intervention notes, shift close and end-of-day reconciliation.",
    ket_qua: [
      { chi_so: "Bán nhanh", chi_so_en: "Fast checkout", mo_ta: "giờ cao điểm tại quầy thuốc", mo_ta_en: "at busy pharmacy counters" },
      { chi_so: "Đơn thuốc chuẩn", chi_so_en: "Clean prescriptions", mo_ta: "ghi nhận ngay khi bán", mo_ta_en: "recorded at the point of sale" },
      { chi_so: "Chốt ca gọn", chi_so_en: "Simple shift close", mo_ta: "đối soát cuối ngày trên POS", mo_ta_en: "end-of-day reconciliation on the POS" }
    ],
    use_cases: [
      { ten: "Bán nhanh giờ cao điểm", ten_en: "Fast checkout at peak hours", mo_ta: "Tìm sản phẩm, quét mã và thanh toán trên một màn, giảm thời gian chờ của khách.", mo_ta_en: "Search, scan and pay on one screen, cutting customer waiting time." },
      { ten: "Ghi nhận đơn thuốc tại quầy", ten_en: "Record prescriptions at the counter", mo_ta: "Đơn thuốc lưu cùng giao dịch, dễ tra cứu và kiểm tra lại.", mo_ta_en: "Prescriptions are stored with the transaction for easy lookup and review." },
      { ten: "Tư vấn có hồ sơ", ten_en: "Documented counselling", mo_ta: "Nội dung tư vấn và can thiệp dược được ghi lại, nâng chất lượng chăm sóc.", mo_ta_en: "Counselling and pharmacist interventions are recorded, raising the quality of care." },
      { ten: "Thông tin lâm sàng bệnh nhân", ten_en: "Patient clinical information", mo_ta: "Nhân khẩu học và thông tin lâm sàng nhập ngay khi bán, phục vụ chăm sóc liên tục.", mo_ta_en: "Demographics and clinical details captured at the sale for continuous care." },
      { ten: "Chốt ca và đối soát gọn", ten_en: "Simple shift close and reconciliation", mo_ta: "Tổng kết ca, đối soát tiền và giao dịch cuối ngày ngay trên POS.", mo_ta_en: "Shift summary, cash and transaction reconciliation at the end of the day on the POS." }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: false,
    playground: "screens/du-an/playground/?app=pos",
    mang: ["POS", "Pharmacy", "Prescriptions", "Shift close"],
    anh_phu: [
      { anh: "showcase/assets/covers/pos-1.jpg", anh_alt: "Ghi nhận đơn thuốc ngay tại quầy", anh_alt_en: "Prescription recording at the counter" },
      { anh: "showcase/assets/covers/pos-2.jpg", anh_alt: "Chốt ca và đối soát cuối ngày", anh_alt_en: "Shift close and end-of-day reconciliation" }
    ]
  },
  {
    id: "da-7",
    slug: "kiosk-tu-phuc-vu-benh-vien-phong-kham",
    ten_du_an: "Kiosk tự phục vụ cho bệnh viện, phòng khám",
    ten_du_an_en: "Self-service kiosk for hospitals & clinics",
    khach_hang: "CareJourney (tên đã thay để bảo mật)",
    khach_hang_en: "CareJourney (name changed for confidentiality)",
    nganh: "Y tế",
    nganh_en: "Healthcare",
    linh_vuc: "healthcare",
    anh: "showcase/assets/covers/kiosk.jpg",
    anh_alt: "Màn hình chào của kiosk tự phục vụ bệnh viện: sản phẩm, đặt lịch tham quan, gói thai sản, lớp học, hội viên",
    anh_alt_en: "Hospital self-service kiosk welcome screen: products, ward tours, maternity packages, classes, membership",
    tom_tat: "Kiosk cảm ứng tự phục vụ tại sự kiện và sảnh bệnh viện: khách tự xem sản phẩm, đặt lịch tham quan, đăng ký gói thai sản, lớp học và hội viên mà không cần tài khoản.",
    tom_tat_en: "A touch-screen self-service kiosk for events and hospital lobbies: visitors browse products, book tours and sign up for maternity packages, classes and membership without an account.",
    thach_thuc: "Tại sự kiện và quầy tiếp đón, khách phải xếp hàng chờ nhân viên chỉ để hỏi giá, đặt lịch tham quan hay đăng ký chương trình; thông tin liên hệ ghi tay dễ thất lạc, đội ngũ khó theo dõi và gọi lại đúng người.",
    thach_thuc_en: "At events and reception desks, visitors queued for a staff member just to check prices, book a tour or join a programme; contact details were taken by hand and often lost, and the team struggled to follow up with the right people.",
    giai_phap: "KTP thiết kế kiosk cảm ứng tự phục vụ: màn hình chào với các dịch vụ chính, danh mục sản phẩm và combo để đặt trước rồi thanh toán tại quầy hoặc hẹn gọi lại, đặt lịch tham quan khoa sản theo số chỗ còn trống, đăng ký gói thai sản, lớp học tiền sản và chăm sóc bé, đăng ký hội viên nhận mã ngay tại chỗ. Mỗi bước kiểm tra dữ liệu, cấp mã tham chiếu và gợi ý dịch vụ liên quan; nút trợ giúp luôn sẵn và phiên tự làm mới cho khách tiếp theo. Prototype bấm thử được đến từng màn trước khi phát triển thật.",
    giai_phap_en: "KTP designed a touch-screen self-service kiosk: a welcome screen with the main services, a product and bundle catalog to reserve and then pay at the counter or request a call-back, maternity ward tour booking by available places, sign-up for maternity packages, birth and parenting classes, and on-the-spot membership with a member number. Every step validates input, issues a reference code and suggests a related service; a help button is always available and the session resets itself for the next visitor. The prototype is clickable down to every screen before real development starts.",
    ket_qua: [
      { chi_so: "Không xếp hàng", chi_so_en: "No queueing", mo_ta: "khách tự đặt lịch, đăng ký ngay tại kiosk", mo_ta_en: "visitors book and sign up at the kiosk themselves" },
      { chi_so: "Thu lead tại chỗ", chi_so_en: "On-the-spot leads", mo_ta: "liên hệ và nhu cầu ghi nhận ngay, kèm mã tham chiếu", mo_ta_en: "contact details and needs captured with a reference code" },
      { chi_so: "Bán chéo", chi_so_en: "Cross-selling", mo_ta: "gợi ý gói thai sản, hội viên sau mỗi lượt đăng ký", mo_ta_en: "maternity packages and membership suggested after each sign-up" }
    ],
    use_cases: [
      { ten: "Giảm hàng chờ tại sự kiện", ten_en: "Shorter queues at events", mo_ta: "Khách tự xem sản phẩm, combo ưu đãi sự kiện và đặt trước; nhân viên chỉ cần thu tiền tại quầy.", mo_ta_en: "Visitors browse products and event-only bundles and reserve them; staff only take payment at the counter." },
      { ten: "Không bỏ lỡ khách chưa quyết định", ten_en: "Keep undecided visitors", mo_ta: "Khách chưa sẵn sàng mua để lại số điện thoại hoặc email để đội ngũ gọi lại tư vấn.", mo_ta_en: "Visitors not ready to buy leave a phone number or email so the team can follow up." },
      { ten: "Lịch tham quan không quá tải", ten_en: "Ward tours never overbooked", mo_ta: "Khách chọn khung giờ còn chỗ, khung đã kín hiển thị rõ, mỗi lượt đặt có mã xác nhận.", mo_ta_en: "Visitors pick a slot with places left, full slots are clearly marked and every booking gets a confirmation code." },
      { ten: "Tư vấn đúng gói thai sản", ten_en: "The right maternity package first time", mo_ta: "Thu thập thông tin thai kỳ, bác sĩ mong muốn và loại phòng sinh để đội ngũ tư vấn đúng gói ngay lần liên hệ đầu.", mo_ta_en: "Pregnancy details, preferred doctor and room type are collected up front, so the team offers the right package on the first call." },
      { ten: "Lớp học kín chỗ, chuẩn bị chủ động", ten_en: "Full classes, planned ahead", mo_ta: "Khách chọn lớp tiền sản, chăm sóc bé và buổi học còn chỗ; trung tâm biết trước sĩ số để chuẩn bị.", mo_ta_en: "Visitors choose birth and newborn-care classes and a session with seats left; the centre knows numbers in advance." },
      { ten: "Hội viên ngay tại chỗ", ten_en: "Instant membership", mo_ta: "Đăng ký chương trình hội viên và nhận mã ngay tại kiosk, không cần xếp hàng ở quầy dịch vụ.", mo_ta_en: "Visitors join the member programme and get a member number at the kiosk, with no queue at the service desk." }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: false,
    playground: "screens/du-an/playground/?app=kiosk",
    mang: ["Self-service kiosk", "Booking", "Lead capture", "Membership"],
    anh_phu: [
      { anh: "showcase/assets/covers/kiosk-1.jpg", anh_alt: "Danh mục sản phẩm và combo, chọn để đặt trước", anh_alt_en: "Product and bundle catalog, pick items to reserve" },
      { anh: "showcase/assets/covers/kiosk-2.jpg", anh_alt: "Đặt lịch tham quan khoa sản theo số chỗ còn trống", anh_alt_en: "Maternity ward tour booking by available places" }
    ]
  }
];
