/*
 * Entity: Dự án (Case study/Portfolio) — chính là các prototype trong showcase/ (đã white-label)
 * Trường: id, slug, ten_du_an (tên theo từ khoá tìm kiếm), khach_hang (tên brand white-label, không phải tên khách thật), nganh,
 *         anh (ảnh bìa, đường dẫn tính từ gốc website), anh_alt, tom_tat (1-2 câu), thach_thuc (đoạn văn), giai_phap (đoạn văn),
 *         ket_qua (mảng 3 {chi_so, mo_ta} — giá trị kinh doanh nổi bật, câu ngắn; KHÔNG bịa số liệu %, doanh thu…),
 *         use_cases (mảng {ten, mo_ta} — use case nghiệp vụ của prototype, viết theo lợi ích kinh doanh, chỉ những gì prototype có thật),
 *         dich_vu_lien_quan (slug trong DATA_DICH_VU), noi_bat (boolean), playground (trang bấm thử bản mẫu screens/du-an/playground/?app=<id>, tính từ gốc website)
 * linh_vuc: slug lĩnh vực (hospitality / industrial / healthcare) để chọn icon badge (KTP.domainIcon trong global.js).
 * Song ngữ: mọi trường chữ có bản tiếng Anh cùng tên + hậu tố _en (ten_du_an_en, chi_so_en, mo_ta_en, ten_en…);
 *           script hiển thị gắn vào thuộc tính data-en để nút VI/EN của header đổi được.
 * Dùng chung ở: Trang chủ (case study nổi bật), trang Dự án tiêu biểu (danh sách), trang Chi tiết dự án.
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
    playground: "screens/du-an/playground/?app=pms"
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
    tom_tat: "Channel Manager đồng bộ giá phòng, phòng trống và đặt phòng lên các OTA, kèm hộp thư khách chung và báo cáo doanh thu cho từng vendor.",
    tom_tat_en: "A channel manager that syncs rates, availability and reservations to the OTAs, with a unified guest inbox and revenue reports per vendor.",
    thach_thuc: "Mỗi villa, khách sạn bán phòng trên nhiều kênh OTA (Booking.com, Agoda, Airbnb, Expedia). Cập nhật giá và phòng trống thủ công trên từng kênh dễ dẫn tới bán trùng phòng, tin nhắn khách nằm rải rác ở nhiều nơi, và chủ đơn vị không biết kênh nào mang lại doanh thu.",
    thach_thuc_en: "Every villa and hotel sells rooms on several OTAs (Booking.com, Agoda, Airbnb, Expedia). Updating rates and availability by hand on each channel led to double bookings, guest messages were scattered across platforms, and owners could not tell which channel actually brought in revenue.",
    giai_phap: "KTP thiết kế Channel Manager kết nối OTA qua Channex / Beds24: lịch giá và phòng trống chung cho nhiều cơ sở, đặt phòng từ mọi kênh đổ về một nơi, hộp thư khách hợp nhất, báo cáo công suất (AOR, ADR) và nguồn booking, quản lý vendor cho mô hình nhiều chủ cơ sở.",
    giai_phap_en: "KTP designed a channel manager connected to the OTAs through Channex / Beds24: one rate and availability calendar for many properties, reservations from every channel in one place, a unified guest inbox, occupancy (AOR, ADR) and booking source reports, and vendor management for multi-owner operations.",
    ket_qua: [
      { chi_so: "Không trùng phòng", chi_so_en: "No double bookings", mo_ta: "giá và phòng trống đồng bộ mọi OTA", mo_ta_en: "rates and availability synced to every OTA" },
      { chi_so: "Một lịch giá", chi_so_en: "One rate calendar", mo_ta: "cho mọi cơ sở và mọi kênh bán", mo_ta_en: "for every property and every sales channel" },
      { chi_so: "Rõ kênh sinh lời", chi_so_en: "Know what pays", mo_ta: "công suất, ADR và nguồn booking", mo_ta_en: "occupancy, ADR and booking sources" }
    ],
    use_cases: [
      { ten: "Chấm dứt bán trùng phòng", ten_en: "End double bookings", mo_ta: "Phòng trống cập nhật đồng thời lên Booking.com, Agoda, Airbnb, Expedia ngay khi có đặt phòng mới.", mo_ta_en: "Availability updates on Booking.com, Agoda, Airbnb and Expedia at the same time as soon as a new booking comes in." },
      { ten: "Đổi giá theo mùa trong vài phút", ten_en: "Seasonal pricing in minutes", mo_ta: "Lịch giá chung cho nhiều cơ sở, chỉnh giá và quy tắc lưu trú một lần, áp cho mọi kênh.", mo_ta_en: "One rate calendar for many properties: change rates and stay rules once and apply them to every channel." },
      { ten: "Mọi đặt phòng về một nơi", ten_en: "Every booking in one place", mo_ta: "Đặt phòng từ các OTA và đặt trực tiếp đổ về cùng một danh sách, lễ tân không phải mở từng kênh.", mo_ta_en: "Bookings from the OTAs and direct bookings land in the same list, so the front desk does not open each channel." },
      { ten: "Trả lời khách nhanh hơn", ten_en: "Reply to guests faster", mo_ta: "Hộp thư hợp nhất gom tin nhắn khách từ mọi kênh, không bỏ sót yêu cầu trước ngày đến.", mo_ta_en: "A unified inbox collects guest messages from every channel, so no request before arrival is missed." },
      { ten: "Biết kênh nào mang lại tiền", ten_en: "Know which channel makes money", mo_ta: "Báo cáo công suất, ADR và tỷ trọng nguồn booking để quyết định đầu tư kênh bán.", mo_ta_en: "Occupancy, ADR and booking source mix reports to decide where to invest in distribution." },
      { ten: "Mở rộng mô hình nhiều chủ cơ sở", ten_en: "Scale to many property owners", mo_ta: "Quản lý vendor và phân quyền, mỗi chủ cơ sở chỉ thấy dữ liệu của mình.", mo_ta_en: "Vendor management and permissions: each owner only sees their own data." }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: false,
    playground: "screens/du-an/playground/?app=cms"
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
    anh: "showcase/assets/covers/crm.jpg",
    anh_alt: "Trang chủ CRM: doanh thu, pipeline bán hàng, phiếu sửa chữa và việc chờ duyệt",
    anh_alt_en: "CRM home: revenue, sales pipeline, service jobs and pending approvals",
    tom_tat: "CRM đa pháp nhân thay thế hệ thống CRM cũ: bán hàng, báo giá, đơn hàng, dịch vụ hậu mãi, lắp đặt, mua hàng và phê duyệt theo hạn mức (DoA).",
    tom_tat_en: "A multi-entity CRM replacing a legacy CRM: sales, quotations, orders, after-sales service, installation, purchasing and delegation-of-authority (DoA) approvals.",
    thach_thuc: "Tập đoàn phân phối thiết bị công nghiệp có nhiều pháp nhân, mỗi pháp nhân một quy trình bán hàng và hậu mãi. CRM cũ cấu hình chắp vá, phê duyệt báo giá và mua hàng đi qua email, phiếu sửa chữa và lịch kiểm định thiết bị theo dõi bằng bảng tính, ban lãnh đạo không xem được số liệu hợp nhất.",
    thach_thuc_en: "The industrial equipment distributor runs several legal entities, each with its own sales and after-sales process. The legacy CRM was patched together, quotation and purchase approvals went through email, service jobs and inspection schedules lived in spreadsheets, and leadership had no consolidated figures.",
    giai_phap: "KTP thiết kế CRM đa pháp nhân với Group View hợp nhất: từ lead, cơ hội bán hàng, báo giá đến đơn hàng và hoá đơn; phiếu sửa chữa, thiết bị, dự án lắp đặt, phiếu xuất phụ tùng và lịch kiểm định; luồng phê duyệt theo hạn mức (DoA), bảng Kanban theo trạng thái, phân quyền theo hồ sơ người dùng và tích hợp phần mềm kế toán.",
    giai_phap_en: "KTP designed a multi-entity CRM with a consolidated Group View: from leads, deals and quotations to orders and invoices; service jobs, equipment, installation projects, parts requisitions and inspection schedules; DoA approval flows, status Kanban boards, profile-based permissions and accounting integration.",
    ket_qua: [
      { chi_so: "Lead → hoá đơn", chi_so_en: "Lead → invoice", mo_ta: "một luồng bán hàng xuyên suốt", mo_ta_en: "one end-to-end sales flow" },
      { chi_so: "Duyệt đúng hạn mức", chi_so_en: "Right approval limits", mo_ta: "báo giá và mua hàng theo DoA", mo_ta_en: "quotations and purchasing by DoA" },
      { chi_so: "Toàn tập đoàn", chi_so_en: "Whole group", mo_ta: "số liệu hợp nhất mọi pháp nhân", mo_ta_en: "consolidated figures across every entity" }
    ],
    use_cases: [
      { ten: "Pipeline bán hàng rõ ràng", ten_en: "A clear sales pipeline", mo_ta: "Từ lead, cơ hội, báo giá đến đơn hàng và hoá đơn trên Kanban theo giai đoạn, quản lý biết deal nào cần đẩy.", mo_ta_en: "Leads, deals, quotations, orders and invoices on stage-based Kanban boards, so managers know which deals to push." },
      { ten: "Báo giá duyệt đúng thẩm quyền", ten_en: "Quotes approved by the right person", mo_ta: "Luồng phê duyệt theo hạn mức (DoA) cho báo giá, chiết khấu và mua hàng, thay cho chuỗi email.", mo_ta_en: "Delegation-of-authority (DoA) approval flows for quotations, discounts and purchasing instead of email chains." },
      { ten: "Hậu mãi tạo doanh thu lặp lại", ten_en: "After-sales that brings repeat revenue", mo_ta: "Phiếu sửa chữa, hồ sơ thiết bị và lịch kiểm định được nhắc hạn, biến dịch vụ sau bán thành nguồn doanh thu.", mo_ta_en: "Service jobs, equipment records and inspection schedules with due-date reminders turn after-sales into a revenue stream." },
      { ten: "Lắp đặt đúng tiến độ", ten_en: "Installations on schedule", mo_ta: "Dự án lắp đặt, phiếu xuất và yêu cầu phụ tùng theo dõi trên cùng hệ thống với đơn hàng.", mo_ta_en: "Installation projects, parts issues and requisitions tracked in the same system as the orders." },
      { ten: "Mua hàng có kiểm soát", ten_en: "Controlled purchasing", mo_ta: "Đề nghị mua, nhà cung cấp và phê duyệt minh bạch theo từng pháp nhân.", mo_ta_en: "Purchase requisitions, vendors and approvals kept transparent per legal entity." },
      { ten: "Lãnh đạo nhìn toàn tập đoàn", ten_en: "Leadership sees the whole group", mo_ta: "Group View hợp nhất số liệu các pháp nhân, báo cáo và dự báo doanh số cho ban điều hành.", mo_ta_en: "Group View consolidates figures across entities, with reports and sales forecasts for management." }
    ],
    dich_vu_lien_quan: "phat-trien-phan-mem",
    noi_bat: true,
    playground: "screens/du-an/playground/?app=crm"
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
    playground: "screens/du-an/playground/?app=admin"
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
    playground: "screens/du-an/playground/?app=store-front"
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
    playground: "screens/du-an/playground/?app=pos"
  }
];
