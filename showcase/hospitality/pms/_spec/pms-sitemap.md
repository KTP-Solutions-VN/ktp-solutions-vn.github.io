# Sitemap — Azura Manager PMS

Tài liệu liệt kê toàn bộ màn hình (bao gồm popup/modal) của hệ thống Azura Manager PMS, phục vụ dự án re-design UI/UX. Mỗi màn hình có mã riêng; mô tả chi tiết (field, loại dữ liệu...) nằm trong thư mục `output/screens/<mã>-*.md`.

## Tổng quan số lượng màn hình theo module

| # | Module | Prefix | Số màn hình/popup |
|---|---|---|---|
| 1 | Đăng nhập & Đội ngũ | LOG, USR | 28 |
| 2 | Thiết lập danh mục (Portfolio Setup) | PROP, COMP, BU, VCS | 117 |
| 3 | Cấu hình (Configuration) | CS, SET | 26 |
| 4 | Đặt chỗ (Reservations) | BOOK | 100 |
| 5 | Quan hệ chủ nhà (Admin) | OWN | 22 |
| 6 | Không gian chủ nhà (Owner Hub) | OWP | 31 |
| 7 | Không gian khách (Guest Hub) | GST | 11 |
| 8 | Chăm sóc tài sản (Property Care) | OPR, MNT, REN, TRN | 79 |
| 9 | Nhà đầu tư & Kho (Investors & Stock) | FUND, INV | 18 |
| 10 | Dịch vụ lưu trú (In-Stay Services) | VSV | 38 |
| 11 | Web & Truyền thông (Web & Media) | CMS, EMT, NOT, TXT, PHO, VID, OTA, PAGE | 68 |
| 12 | Tài chính & Hành chính (Finance & Admin) | ACC | 41 |
| | **Tổng cộng** | | **579** |

## Chú thích

- **Mã màn hình**: `<PREFIX>-<số thứ tự>` cho trang đầy đủ (vd `BOOK-001`), `<PREFIX>-<số>-P<n>` cho popup/modal con của trang đó (vd `BOOK-001-P1`).
- **Loại**: Trang đầy đủ (full page) hoặc Popup/Modal (nêu rõ mở từ màn hình cha).
- **Mở từ**: mã màn hình cha dẫn tới màn hình này (áp dụng chủ yếu cho popup).
- **Điều hướng đến**: các mã màn hình có thể điều hướng tới từ màn hình này (theo phân tích code, có thể chưa đầy đủ 100% với các luồng AJAX phức tạp — xem chi tiết trong file mô tả từng màn hình).

## 1. Đăng nhập & Đội ngũ

### LOG — Đăng nhập (4 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| LOG-001 | Đăng nhập (Sign In) | Trang đầy đủ | `LoginController::index()` — mặc định `login/index`; route đẹp: `/` (trang gốc của hệ t... |  | LOG-001-P1, USR-001 |
| LOG-001-P1 | Khôi phục mật khẩu (Password Recovery) | Popup | `LoginController::forgotPassword()` — mặc định `login/forgotPassword`; route đẹp: `/for... | LOG-001 | LOG-001, LOG-002 |
| LOG-002 | Đặt mật khẩu mới (Set New Password) | Trang đầy đủ | `LoginController::resetPassword($token)` — mặc định `login/resetPassword/:token`; route... |  | LOG-001, LOG-001-P1 |
| LOG-003 | Cài đặt website & SEO (Site & SEO Settings) | Trang đầy đủ | `LoginController::settings()` — mặc định `login/settings` |  | USR-003 |

### USR — Thành viên đội ngũ (24 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| USR-001 | Tổng quan (Overview) | Trang đầy đủ | `UserController::dashboard()` — mặc định `user/dashboard`; route đẹp: `/user/dashboard` |  | LOG-001 |
| USR-002 | Bảng điểm doanh thu (Revenue Scorecard) | Trang đầy đủ | `UserController::indicators()` — mặc định `user/indicators` |  |  |
| USR-003 | Cài đặt website & SEO (Site & SEO Settings) | Trang đầy đủ | `UserController` kế thừa `LoginController::settings()` — mặc định `user/settings` (khôn... |  |  |
| USR-004 | Danh bạ đội ngũ (Team Directory) | Trang đầy đủ | `UserController::list($tab)` — mặc định `user/list/:tab` |  | USR-005, USR-006, USR-007 |
| USR-005 | Thêm thành viên đội ngũ (New Team Member) | Trang đầy đủ | `UserController::add($tab)` — mặc định `user/add/:tab` |  | USR-004, USR-006 |
| USR-006 | Sửa thành viên đội ngũ (Edit Team Member) | Trang đầy đủ | `UserController::edit($tab, $id, $show_page, $bank_account_id)` — mặc định `user/edit/:... |  | USR-004, USR-005 |
| USR-007 | Hồ sơ thành viên (Team Member Profile) | Trang đầy đủ | `UserController::viewDetails($id, $tab)` — mặc định `user/viewDetails/:id/:tab` |  | USR-004, USR-006 |
| USR-008 | Tài khoản của tôi (My Account) | Trang đầy đủ | `UserController::profile()` — mặc định `user/profile` |  | LOG-001, USR-008-P1 |
| USR-008-P1 | Cập nhật mật khẩu (Update Password) | Popup | `UserController::changePassword()` — mặc định `user/changePassword` | USR-008 | LOG-001, USR-008 |
| USR-009 | Ngày nghỉ hằng tuần (Weekly Rest Days) | Trang đầy đủ | `UserController::weeklyOff()` — mặc định `user/weeklyOff` |  | USR-004 |
| USR-010 | Lịch sử nghỉ phép (Leave History) | Trang đầy đủ | `UserController::grantedLeaves()` — mặc định `user/grantedLeaves` |  | USR-004, USR-011 |
| USR-011 | Cấp ngày nghỉ (Grant Time Off) | Trang đầy đủ | `UserController::assignLeaves($id, $role)` — mặc định `user/assignLeaves/:id/:role` |  | USR-010 |
| USR-012 | Đại lý bán hàng (Sales Agents) | Trang đầy đủ | `UserController::agents()` — mặc định `user/agents` |  | USR-013, USR-014 |
| USR-013 | Thêm đại lý bán hàng (New Sales Agent) | Trang đầy đủ | `UserController::addAgents()` — mặc định `user/addAgents` |  | USR-012 |
| USR-014 | Sửa đại lý bán hàng (Edit Sales Agent) | Trang đầy đủ | `UserController::editAgents($id)` — mặc định `user/editAgents/:id` |  | USR-012 |
| USR-015 | Phân tích đặt chỗ (Reservation Analytics) | Trang đầy đủ | `UserController::statistics()` — mặc định `user/statistics` |  |  |
| USR-016 | Nhà thầu dịch vụ (Contractors) | Trang đầy đủ | `UserController::providers($tab)` — mặc định `user/providers` |  | USR-017, USR-018, USR-019 |
| USR-017 | Thêm nhà thầu (New Contractor) | Trang đầy đủ | `UserController::addProviders()` — mặc định `user/addProviders` |  | USR-016 |
| USR-018 | Sửa nhà thầu (Edit Contractor) | Trang đầy đủ | `UserController::editProvider($id)` — mặc định `user/editProvider/:id` (id được base64 ... |  | USR-016 |
| USR-019 | Hồ sơ nhà thầu (Contractor Profile) | Trang đầy đủ | `UserController::viewProviderDetails($id)` — mặc định `user/viewProviderDetails/:id` |  | USR-016 |
| USR-020 | Quy tắc tính công (Wage Rules) | Trang đầy đủ | `UserController::payrollRules()` — mặc định `user/payrollRules` |  | USR-021 |
| USR-021 | Thêm quy tắc tính công (New Wage Rule) | Trang đầy đủ | `UserController::addPayrollRules()` — mặc định `user/addPayrollRules` |  | USR-020 |
| USR-022 | Đồng hồ chấm công (Time Clock) | Trang đầy đủ | `UserController::clockIn()` — mặc định `user/clockIn` |  | LOG-001 |
| USR-023 | Avatar phòng ban (Department Avatars) | Trang đầy đủ | `UserController::virtualUsers()` — mặc định `user/virtualUsers` |  |  |

## 2. Thiết lập danh mục (Portfolio Setup)

### PROP — Hồ sơ tài sản (47 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| PROP-001 | Tạo yêu cầu tiếp nhận (New Intake Request) | Trang đầy đủ | property/add-onboarding (tham số tùy chọn `$id` – id bản ghi Villa Onboarding hiện có) |  |  |
| PROP-002 | Hệ số giá theo kênh (Channel Rate Multiplier) | Trang đầy đủ | property/beds24-coefficient |  |  |
| PROP-017 | Mã phòng chưa ánh xạ (Unmapped Room Codes) | Trang đầy đủ | property/missing-roomids/:id (route mặc định dạng dashed, tham số `$id` truyền qua URL ... |  | PROP-030 |
| PROP-018 | Bản tin chủ nhà (Owner Bulletins) | Trang đầy đủ | property/monthly-report |  | PROP-030 |
| PROP-019 | Lên lịch buổi chụp (Schedule a Shoot) | Trang đầy đủ | property/new-shooting |  | PROP-026 |
| PROP-020 | Tiếp nhận tài sản (Property Intake) | Trang đầy đủ | property/on-boardings |  | PROP-017 |
| PROP-021 | Điểm chặn trước khi mở bán (Go-Live Blockers) | Trang đầy đủ | property/onboarding |  | PROP-017 |
| PROP-022 | Thông tin ngân hàng của tài sản (Property Bank Details) | Trang đầy đủ | property/payment-record/:villa_id (villa_id truyền dạng base64) |  |  |
| PROP-023 | Sửa bút toán phí dịch vụ (Edit Service Fee Entry) | Trang đầy đủ | property/payment-record-edit/:villa_id/:payment_id (cả 2 tham số truyền dạng base64) |  |  |
| PROP-024 | Báo cáo chi trả chủ nhà (Owner Payout Reports) | Trang đầy đủ | property/payment-report |  |  |
| PROP-025 | Xếp hạng nhiếp ảnh gia (Photographer Ratings) | Trang đầy đủ | property/photography/photographer-evaluation (route đẹp cấu hình riêng trong Routes.php... |  | PROP-026, PROP-028 |
| PROP-026 | Bộ lập lịch chụp ảnh (Shoot Scheduler) | Trang đầy đủ | property/photography/:shootId/:guidelineId (route mặc định dạng dashed; `$shootId` cũng... |  | PROP-019, PROP-025, PROP-027, PROP-028 |
| PROP-027 | Thiếu hụt ảnh (Photo Coverage Gaps) | Trang đầy đủ | property/photography/missing-photos (route đẹp cấu hình riêng trong Routes.php, ứng với... |  | PROP-026 |
| PROP-028 | Đánh giá chất lượng ảnh (Image Quality Review) | Trang đầy đủ | property/photography/scores (route đẹp cấu hình riêng trong Routes.php, ứng với action ... |  | PROP-025, PROP-026 |
| PROP-029 | Báo cáo hợp đồng (Contract Reports) | Trang đầy đủ | property/property-reports/:tab/:villa_id |  |  |
| PROP-031 | Yêu cầu làm mới listing (Listing Refresh Request) | Trang đầy đủ | property/redo/:villa_id/:chanel_id |  | PROP-030 |
| PROP-032 | Sức khỏe danh mục (Portfolio Health) | Trang đầy đủ | property/dashboard (dashed mặc định CakePHP DashedRoute: `/property/dashboard`) |  |  |
| PROP-033 | Sổ đăng ký tài sản (Property Register) | Trang đầy đủ | property/list/:id (dashed mặc định CakePHP DashedRoute: `/property/list`, tham số `id` ... |  | PROP-029, PROP-034, PROP-035 |
| PROP-035 | Hồ sơ tài sản (Property Profile) | Trang đầy đủ | property/view-details/:villa_id (dashed mặc định CakePHP DashedRoute: `/property/view-d... |  | PROP-033 |
| PROP-036 | Thư xác nhận (Confirmation Letter) | Trang đầy đủ | property/confirmation/:villa_id (villa_id truyền dạng base64), mở từ PROP-021 (icon "Vi... |  | PROP-021 |
| PROP-037 | Thông tin liên hệ & chat (Contact & Chat Details) | Trang đầy đủ | property/communication/:villa_id (villa_id truyền dạng base64), mở từ PROP-021 (icon "V... |  | PROP-021 |
| PROP-038 | Chính sách nội quy (House Policies) | Popup | property/villa-rules/:villa_id (villa_id truyền dạng base64) | PROP-021 | PROP-021 |
| PROP-039 | Dịch vụ thêm cho khách (Guest Extras) | Trang đầy đủ | property/villa-extras/:villa_id (villa_id truyền dạng base64), mở từ PROP-021 (icon "Vi... |  | PROP-021 |
| PROP-040 | Chất lượng listing (Listing Quality) | Trang đầy đủ | property/quality |  | PROP-031 |
| PROP-041 | Sổ phí dịch vụ (Service Fee Ledger) | Trang đầy đủ | property/service-fee/:villa_id (villa_id truyền dạng base64) |  | PROP-022, PROP-023, PROP-035 |
| PROP-042 | Cài đặt đặt ngay (Instant Book Settings) | Trang đầy đủ | property/booking-restriction |  |  |
| PROP-043 | Phạm vi phụ trách concierge (Concierge Coverage) | Trang đầy đủ | property/territories/:id |  |  |
| PROP-044 | Vật tư tại chỗ (On-site Stock) | Trang đầy đủ | property/inventories/:villa_id |  | PROP-035, PROP-045 |
| PROP-045 | Yêu cầu vật tư (Stock Requests) | Trang đầy đủ | property/inventory-request/:villa_id |  | PROP-044 |
| PROP-046 | Khu căn hộ & dự án (Residences & Projects) | Trang đầy đủ | property/residence-enquiry |  | PROP-047 |
| PROP-047 | Hồ sơ khu căn hộ (Residence Profile) | Trang đầy đủ | property/view-residence-enquiry/:residence_id/:business_unit_id |  | PROP-046 |
| PROP-048 | Nhập dịch vụ hàng loạt (Bulk Service Import) | Trang đầy đủ | property/services/:tab (dashed mặc định, hỗ trợ thêm query `?tab=`, `?electricity_tab=`) |  | PROP-051 |
| PROP-049 | Thiết lập tiện ích (Utilities Setup) | Trang đầy đủ | property/service-setting/:tab/:villa_id (villa_id truyền dạng base64), cũng được nhúng ... |  | PROP-041, PROP-050 |
| PROP-050 | Trình chỉnh sửa tài sản (Property Editor) | Trang đầy đủ | property/villa/:tab/:villa_id (dashed mặc định; `$villa_id` rỗng khi thêm mới) |  | PROP-017, PROP-032, PROP-033, PROP-042, PROP-046, PROP-049, PROP-051 |
| PROP-051 | Mức sẵn sàng hợp đồng (Contract Readiness) | Trang đầy đủ | property/guest-contract-bu-recap |  | PROP-048, PROP-050, PROP-052 |
| PROP-052 | In hợp đồng khách (Print Guest Contracts) | Trang đầy đủ | property/guest-contract-assignment-pdf?villa_id=...&general_version_id=...&language_cod... |  | PROP-050, PROP-051 |
| PROP-053 | Báo cáo chủ nhà theo đơn vị (Owner Reports by Unit) | Trang đầy đủ | property/bu-reports |  | PROP-018 |
| PROP-054 | Trạng thái gửi báo cáo (Report Dispatch Status) | Trang đầy đủ | property/report-status |  | PROP-018, PROP-053 |
| PROP-055 | Báo cáo sẵn sàng tạo (Reports Ready to Run) | Trang đầy đủ | property/report-ready?business_unit=... |  | PROP-018, PROP-053, PROP-054 |
| PROP-056 | Lịch sử buổi chụp (Shoot History) | Trang đầy đủ | property/logs |  | PROP-026, PROP-027, PROP-028 |
| PROP-057 | Lịch sử làm mới listing (Listing Refresh History) | Popup | property/redo-log/:villa_id/:channel_id | PROP-040 | PROP-040, PROP-058 |
| PROP-058 | Hàng đợi làm mới listing (Listing Refresh Queue) | Trang đầy đủ | property/listing-redone |  | PROP-057 |
| PROP-059 | Buổi chụp sắp tới (Upcoming Shoots) | Trang đầy đủ | property/shootings |  | PROP-019, PROP-060 |
| PROP-060 | Sửa lịch chụp (Edit Shoot Schedule) | Trang đầy đủ | property/edit-shooting/:req_id (req_id truyền dạng base64), mở từ PROP-059 (icon Edit) |  | PROP-059 |
| PROP-061 | Thêm báo cáo tháng (Add Monthly Report) | Trang đầy đủ | property/upload-report |  | PROP-018, PROP-053 |
| PROP-062 | Xác thực lại hồ sơ tiếp nhận (Intake Revalidation) | Trang đầy đủ | property/edit-on-boarding/:id, mở từ PROP-020 (Tiếp nhận tài sản) |  | PROP-020 |
| PROP-063 | Hồ sơ tiếp nhận (Intake Record) | Trang đầy đủ | property/view-onboarding/:id, mở từ PROP-020 (Tiếp nhận tài sản) |  | PROP-020, PROP-062 |

### COMP — Pháp nhân (2 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| COMP-001 | Cơ cấu công ty (Company Structure) | Trang đầy đủ | company/list (route CakePHP mặc định dạng dashed: `/company/list`, có tham số phụ `:tab... |  | COMP-001-P1 |
| COMP-001-P1 | Form công ty / pháp nhân chi nhánh (Company / Branch Entity Form) | Popup | Không có route riêng — dùng chung form POST về `company/list` (action ẩn `add`/`edit`/`... | COMP-001 | COMP-001 |

### BU — Đơn vị vận hành (45 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| BU-001 | Đơn vị vận hành (Operating Units) | Trang đầy đủ | `BusinessUnitController::list()` — mặc định `/business-unit/list` |  | BU-001-P1, BU-002, BU-003, BU-004 |
| BU-001-P1 | Xác nhận xóa đơn vị (Confirm Unit Deletion) | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `list.ctp`; xác nhận sẽ điều hướng trình d... | BU-001 | BU-001 |
| BU-002 | Thêm đơn vị vận hành (New Operating Unit) | Trang đầy đủ | `BusinessUnitController::add()` — mặc định `/business-unit/add` |  | BU-001 |
| BU-003 | Sửa đơn vị vận hành (Edit Operating Unit) | Trang đầy đủ | `BusinessUnitController::edit($id)` — mặc định `/business-unit/edit/{id_base64}` |  | BU-001 |
| BU-004 | Hồ sơ đơn vị vận hành (Operating Unit Profile) | Trang đầy đủ | `BusinessUnitController::viewDetails($id)` — mặc định `/business-unit/view-details/{id}` |  | BU-001 |
| BU-005 | Kênh bán hàng (Sales Channels) | Trang đầy đủ | `BusinessUnitController::chanels()` — mặc định `/business-unit/chanels` |  | BU-005-P1, BU-005-P2 |
| BU-005-P1 | Form kênh bán hàng (Sales Channel Form) | Popup | Modal Bootstrap (`#chanelModal`) tĩnh trong `chanels.ctp`; submit POST cùng action `Bus... | BU-005 | BU-005 |
| BU-005-P2 | Xác nhận xóa kênh (Confirm Channel Deletion) | Popup | Modal Bootstrap (`#deleteModal`) tĩnh trong `chanels.ctp`; submit POST cùng action `Bus... | BU-005 | BU-005 |
| BU-006 | Liên kết listing theo kênh (Channel Listing Links) | Trang đầy đủ | `BusinessUnitController::channelVilla($channel_id)` — mặc định `/business-unit/channel-... |  | BU-005, BU-007 |
| BU-007 | Thiết lập tiền tệ (Currency Setup) | Trang đầy đủ | `BusinessUnitController::currency()` — mặc định `/business-unit/currency` |  | BU-007-P1, BU-007-P2, BU-008 |
| BU-007-P1 | Form tiền tệ (Currency Form) | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `currency.ctp`; submit POST cùng action `B... | BU-007 | BU-007 |
| BU-007-P2 | Xác nhận xóa tiền tệ (Confirm Currency Deletion) | Popup | Modal Bootstrap (`#exampleModal`, chế độ ẩn phần form) tĩnh trong `currency.ctp`; submi... | BU-007 | BU-007 |
| BU-008 | Tỷ giá ngoại tệ (FX Rates) | Trang đầy đủ | `BusinessUnitController::rates()` — mặc định `/business-unit/rates` |  | BU-007, BU-008-P1 |
| BU-008-P1 | Nhập tỷ giá (FX Rate Entry) | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `rates.ctp`; submit POST cùng action `Busi... | BU-008 | BU-008 |
| BU-009 | Ứng dụng nhắn tin (Messaging Apps) | Trang đầy đủ | `BusinessUnitController::chatPlatform()` — mặc định `/business-unit/chat-platform` |  | BU-009-P1, BU-009-P2 |
| BU-009-P1 | Form ứng dụng nhắn tin (Messaging App Form) | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `chat_platform.ctp`; submit POST cùng acti... | BU-009 | BU-009 |
| BU-009-P2 | Xác nhận xóa ứng dụng (Confirm App Deletion) | Popup | Modal Bootstrap (`#exampleModal`, chế độ ẩn phần form) tĩnh trong `chat_platform.ctp`; ... | BU-009 | BU-009 |
| BU-010 | Thiết lập thanh toán (Payment Setup) | Trang đầy đủ | `BusinessUnitController::paymentMethod($tab, $page_action, $id)` — mặc định `/business-... |  | BU-010-P1, BU-010-P2, BU-010-P3, BU-010-P4, BU-010-P5, BU-011 |
| BU-010-P1 | Form phương thức thanh toán (Payment Method Form) | Popup | Modal Bootstrap (`#exampleModal`) trong element `business-unit/main_list.ctp`; submit A... | BU-010 | BU-010 |
| BU-010-P2 | Xác nhận xóa phương thức (Confirm Method Deletion) | Popup | Modal Bootstrap (`#exampleModalDeletePM`) trong element `business-unit/main_list.ctp`; ... | BU-010 | BU-010 |
| BU-010-P3 | Form tài khoản ngân hàng (Bank Account Form) | Trang con (mở từ BU- | `BusinessUnitController::paymentMethod('accounts', 'add')` hoặc `paymentMethod('account... | BU-010 | BU-010 |
| BU-010-P4 | Xác nhận xóa tài khoản (Confirm Account Deletion) | Popup | Modal Bootstrap (`#exampleModalDelete`) trong element `business-unit/accounts.ctp`; sub... | BU-010 | BU-010 |
| BU-010-P5 | Mở sổ tài khoản (Open Account Ledger) | Popup | Modal Bootstrap (`#openStatementModal`) trong element `business-unit/accounts.ctp`; sub... | BU-010 | BU-010 |
| BU-011 | Phương thức thanh toán theo đơn vị (Payment Methods per Unit) | Trang đầy đủ | `BusinessUnitController::businessUnitPaymentMethod()` — mặc định `/business-unit/busine... |  | BU-010, BU-011-P1 |
| BU-011-P1 | Bật/tắt phương thức theo đơn vị (Payment Methods per Unit Toggle) | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `business_unit_payment_method.ctp`; toggle... | BU-011 | BU-011 |
| BU-012 | Vùng báo cáo (Reporting Zones) | Trang đầy đủ | `BusinessUnitController::zoning()` — mặc định `/business-unit/zoning` |  | BU-012-P1, BU-013, BU-014 |
| BU-012-P1 | Xác nhận xóa vùng (Confirm Zone Deletion) | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `zoning.ctp`; xác nhận điều hướng tới `Bus... | BU-012 | BU-012 |
| BU-013 | Thêm vùng báo cáo (New Reporting Zone) | Trang đầy đủ | `BusinessUnitController::addZoning()` — mặc định `/business-unit/add-zoning` |  | BU-012 |
| BU-014 | Sửa vùng báo cáo (Edit Reporting Zone) | Trang đầy đủ | `BusinessUnitController::editZoning($id)` — mặc định `/business-unit/edit-zoning/{id}` ... |  | BU-012 |
| BU-015 | Địa điểm văn phòng (Office Locations) | Trang đầy đủ | `BusinessUnitController::offices()` — mặc định `/business-unit/offices` |  | BU-015-P1, BU-016, BU-017, BU-018 |
| BU-015-P1 | Xác nhận xóa văn phòng (Confirm Office Deletion) | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `offices.ctp`; xác nhận điều hướng tới `Bu... | BU-015 | BU-015 |
| BU-016 | Thêm địa điểm văn phòng (New Office Location) | Trang đầy đủ | `BusinessUnitController::addOffice()` — mặc định `/business-unit/add-office` |  | BU-015 |
| BU-017 | Sửa địa điểm văn phòng (Edit Office Location) | Trang đầy đủ | `BusinessUnitController::editOffice($id)` — mặc định `/business-unit/edit-office/{id}` ... |  | BU-015 |
| BU-018 | Hồ sơ văn phòng (Office Profile) | Trang đầy đủ | `BusinessUnitController::viewOffice($id)` — mặc định `/business-unit/view-office/{id}` ... |  | BU-015 |
| BU-019 | Danh bạ ngân hàng (Bank Directory) | Trang đầy đủ | `BusinessUnitController::banks()` — mặc định `/business-unit/banks` |  | BU-019-P1, BU-020, BU-021 |
| BU-019-P1 | Xác nhận xóa ngân hàng (Confirm Bank Deletion) | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `banks.ctp`; xác nhận điều hướng tới `Busi... | BU-019 | BU-019 |
| BU-020 | Thêm ngân hàng (New Bank) | Trang đầy đủ | `BusinessUnitController::addBank()` — mặc định `/business-unit/add-bank` |  | BU-019 |
| BU-021 | Sửa hồ sơ ngân hàng (Edit Bank Record) | Trang đầy đủ | `BusinessUnitController::editBank($id)` — mặc định `/business-unit/edit-bank/{id}` (id ... |  | BU-019 |
| BU-022 | Nền tảng đặt chỗ (Booking Platforms) | Trang đầy đủ | `BusinessUnitController::channels($tab)` — mặc định `/business-unit/channels/{tab}` (ta... |  | BU-006, BU-022-P1 |
| BU-022-P1 | Form nền tảng đặt chỗ (Booking Platform Form) | Popup | Modal Bootstrap (`#platformModal`) tĩnh trong `channels.ctp`; submit POST tới `Business... | BU-022 | BU-022 |
| BU-022-P2 | Xác nhận xóa nền tảng (Confirm Platform Deletion) | Popup | Modal Bootstrap (`#deletePlatformModal`) tĩnh trong `channels.ctp`; submit POST tới `Bu... | BU-022 | BU-022 |
| BU-022-P3 | Form tài khoản kênh (Channel Account Form) | Popup | Modal Bootstrap (`#chanelModal`) tĩnh trong `channels.ctp`; submit POST tới `BusinessUn... | BU-022 | BU-022 |
| BU-022-P4 | Xác nhận xóa tài khoản kênh (Confirm Channel Account Deletion) | Popup | Modal Bootstrap (`#deleteModal`) tĩnh trong `channels.ctp`; submit POST tới `BusinessUn... | BU-022 | BU-022 |
| BU-022-P5 | Form thành phần listing (Listing Element Form) | Popup | Modal Bootstrap (`#ota-element-modal`) trong element `channel/content_elements.ctp`; su... | BU-022 | BU-022 |
| BU-022-P6 | Xác nhận lưu trữ thành phần (Confirm Element Archiving) | Popup | Modal Bootstrap (`#ota-archive-modal`) trong element `channel/content_elements.ctp`; su... | BU-022 | BU-022 |

### VCS — Thuộc tính tài sản (23 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| VCS-001 | Danh mục tiện nghi (Amenity Catalog) | Trang đầy đủ | villa-common-setting/items (dashed mặc định CakePHP DashedRoute: `/villa-common-setting... |  | VCS-001-P1 |
| VCS-001-P1 | Form tiện nghi (Amenity Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/items` (hidden `ac... | VCS-001 | VCS-001 |
| VCS-002 | Bậc giá (Rate Tiers) | Trang đầy đủ | villa-common-setting/price-categories (dashed mặc định: `/villa-common-setting/price-ca... |  | VCS-002-P1 |
| VCS-002-P1 | Form bậc giá (Rate Tier Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/price-categories` ... | VCS-002 | VCS-002 |
| VCS-003 | Loại hình lưu trú (Accommodation Types) | Trang đầy đủ | villa-common-setting/villa-types (dashed mặc định: `/villa-common-setting/villa-types`) |  | VCS-003-P1 |
| VCS-003-P1 | Form loại hình lưu trú (Accommodation Type Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-types` (hidd... | VCS-003 | VCS-003 |
| VCS-004 | Danh mục dịch vụ (Service Catalog) | Trang đầy đủ | villa-common-setting/services (dashed mặc định: `/villa-common-setting/services`) |  | VCS-004-P1 |
| VCS-004-P1 | Form dịch vụ trong danh mục (Catalog Service Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/services` (hidden ... | VCS-004 | VCS-004 |
| VCS-005 | Gói dịch vụ (Service Bundles) | Trang đầy đủ | villa-common-setting/contract-service-types (dashed mặc định: `/villa-common-setting/co... |  | VCS-005-P1 |
| VCS-005-P1 | Form gói dịch vụ (Service Bundle Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/contract-service-t... | VCS-005 | VCS-005 |
| VCS-006 | Nhà cung cấp được duyệt (Approved Vendors) | Trang đầy đủ | villa-common-setting/service-providers/:tab (dashed mặc định CakePHP DashedRoute: `/vil... |  | VCS-006-P1, VCS-006-P2 |
| VCS-006-P1 | Form nhà cung cấp được duyệt (Approved Vendor Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/service-providers`... | VCS-006 | VCS-006 |
| VCS-006-P2 | Form loại dịch vụ của nhà cung cấp (Vendor Service Type Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/service-providers`... | VCS-006 | VCS-006, VCS-006-P1 |
| VCS-007 | Loại hình sử dụng (Usage Types) | Trang đầy đủ | villa-common-setting/villa-usage (dashed mặc định CakePHP DashedRoute: `/villa-common-s... |  | VCS-007-P1 |
| VCS-007-P1 | Form loại hình sử dụng (Usage Type Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-usage` (hidd... | VCS-007 | VCS-007 |
| VCS-008 | Hoạt động cho khách (Guest Activities) | Trang đầy đủ | villa-common-setting/villa-activity (dashed mặc định CakePHP DashedRoute: `/villa-commo... |  | VCS-008-P1 |
| VCS-008-P1 | Form hoạt động cho khách (Guest Activity Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-activity` (h... | VCS-008 | VCS-008 |
| VCS-009 | Đặc điểm tiếp cận (Access Features) | Trang đầy đủ | villa-common-setting/villa-accessible (dashed mặc định CakePHP DashedRoute: `/villa-com... |  | VCS-009-P1 |
| VCS-009-P1 | Form đặc điểm tiếp cận (Access Feature Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-accessible` ... | VCS-009 | VCS-009 |
| VCS-010 | Phương án di chuyển (Transport Options) | Trang đầy đủ | villa-common-setting/villa-transport (dashed mặc định CakePHP DashedRoute: `/villa-comm... |  | VCS-010-P1 |
| VCS-010-P1 | Form phương án di chuyển (Transport Option Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-transport` (... | VCS-010 | VCS-010 |
| VCS-011 | Nhắc việc cho nhân viên (Staff Reminders) | Trang đầy đủ | villa-common-setting/reminders (dashed mặc định CakePHP DashedRoute: `/villa-common-set... |  | VCS-011-P1 |
| VCS-011-P1 | Form nhắc việc (Staff Reminder Form) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/reminders` (hidden... | VCS-011 | VCS-011 |

## 3. Cấu hình (Configuration)

### CS — Dữ liệu tham chiếu (16 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| CS-001 | Thiết lập quốc gia (Country Setup) | Trang đầy đủ | `CommonSettingController::countries()` — mặc định `/common-setting/countries` (không có... |  | CS-001-P1 |
| CS-001-P1 | Form quốc gia (Country Form) | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `countries.ctp`; submit POST cùng action `... | CS-001 | CS-001 |
| CS-002 | Thiết lập ngôn ngữ (Language Setup) | Trang đầy đủ | `CommonSettingController::languages()` — mặc định `/common-setting/languages` |  | CS-002-P1 |
| CS-002-P1 | Form ngôn ngữ (Language Form) | Popup | Modal Bootstrap (`#exampleModal`) trong `languages.ctp`; submit cùng action `CommonSett... | CS-002 | CS-002 |
| CS-003 | Thiết lập vùng (Region Setup) | Trang đầy đủ | `CommonSettingController::regions()` — mặc định `/common-setting/regions` |  | CS-003-P1 |
| CS-003-P1 | Form vùng (Region Form) | Popup | Modal Bootstrap (`#exampleModal`) trong `regions.ctp`; submit cùng action `CommonSettin... | CS-003 | CS-003 |
| CS-004 | Thiết lập khu vực (Area Setup) | Trang đầy đủ | `CommonSettingController::areas()` — mặc định `/common-setting/areas` |  | CS-004-P1 |
| CS-004-P1 | Form khu vực (Area Form) | Popup | Modal Bootstrap (`#exampleModal`) trong `areas.ctp`; submit cùng action `CommonSettingC... | CS-004 | CS-004 |
| CS-005 | Thiết lập quận/huyện (District Setup) | Trang đầy đủ | `CommonSettingController::districts()` — mặc định `/common-setting/districts` |  | CS-005-P1 |
| CS-005-P1 | Form quận/huyện (District Form) | Popup | Modal Bootstrap (`#exampleModal`) trong `districts.ctp`; submit cùng action `CommonSett... | CS-005 | CS-005 |
| CS-006 | Thiết lập khu căn hộ (Residence Setup) | Trang đầy đủ | `CommonSettingController::residences()` — mặc định `/common-setting/residences` |  | CS-006-P1, CS-008 |
| CS-006-P1 | Form khu căn hộ (Residence Form) | Popup | Modal Bootstrap (`#exampleModal`, form `multipart/form-data`) trong `residences.ctp`; s... | CS-006 | CS-006 |
| CS-007 | Thẻ vị trí (Location Tags) | Trang đầy đủ | `CommonSettingController::locationTypes()` — mặc định `/common-setting/location-types` |  | CS-007-P1 |
| CS-007-P1 | Form thẻ vị trí (Location Tag Form) | Popup | Modal Bootstrap (`#exampleModal`) trong `location_types.ctp`; submit cùng action `Commo... | CS-007 | CS-007 |
| CS-008 | Thiết lập căn (Unit Setup) | Trang đầy đủ | `CommonSettingController::units()` — mặc định `/common-setting/units` |  | CS-008-P1 |
| CS-008-P1 | Form căn (Unit Form) | Popup | Modal Bootstrap (`#exampleModal`) trong `units.ctp`; submit cùng action `CommonSettingC... | CS-008 | CS-008 |

### SET — Cài đặt nền tảng (10 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| SET-001 | Cài đặt nền tảng (Platform Settings) | Trang đầy đủ | `SettingController::dashboard()` — route đẹp `/setting` (khai báo tại `config/Routes.ph... |  | SET-002, SET-003, SET-004 |
| SET-002 | Tùy chọn cốt lõi (Core Preferences) | Trang đầy đủ | `SettingController::generalSettings($tab = null)` — mặc định `/setting/general-settings... |  | SET-001, SET-002-P1, SET-002-P2, SET-002-P3 |
| SET-002-P1 | Thêm URL Owner Hub (New Owner Hub URL) | Popup | Modal Bootstrap `#addUrlModal` trong element `technical-settings/owner_portal_url.ctp`;... | SET-002 | SET-002 |
| SET-002-P2 | Sửa URL Owner Hub (Edit Owner Hub URL) | Popup | Modal Bootstrap `#editModal` trong element `technical-settings/owner_portal_url.ctp`; l... | SET-002 | SET-002 |
| SET-002-P3 | Xóa URL Owner Hub (Delete Owner Hub URL) | Popup | Modal Bootstrap `#exampleModal` trong element `technical-settings/owner_portal_url.ctp`... | SET-002 | SET-002 |
| SET-003 | Máy chủ gửi thư (Outgoing Mail Server) | Trang đầy đủ | `SettingController::smtpSettings()` — mặc định `/setting/smtp-settings` (không có route... |  | SET-001 |
| SET-004 | Ánh xạ tài khoản kênh (Channel Account Mapping) | Trang đầy đủ | `SettingController::hostexSetup()` — mặc định `/setting/hostex-setup`; dữ liệu tải qua ... |  | SET-001, SET-004-P1, SET-004-P2, SET-004-P3 |
| SET-004-P1 | Form ánh xạ tài khoản kênh (Channel Account Mapping Form) | Popup | Render động trong `SettingController::hostexSetup()` (`hostex_setup.ctp`); submit AJAX ... | SET-004 | SET-004 |
| SET-004-P2 | Gỡ tài khoản đã ánh xạ (Remove Mapped Account) | Popup | Modal Bootstrap `#exampleModal` trong `hostex_setup.ctp`; xác nhận gửi AJAX POST tới `d... | SET-004 | SET-004 |
| SET-004-P3 | Cảnh báo tài khoản đang được dùng (Mapped Account In-Use Warning) | Popup | Modal Bootstrap `#warnModal` trong `hostex_setup.ctp`; xử lý hoàn toàn phía client (Jav... | SET-004 | SET-004, SET-004-P2 |

## 4. Đặt chỗ (Reservations)

### BOOK — Đặt chỗ (100 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| BOOK-001 | Khách đến & đi (Arrivals & Departures) | Trang đầy đủ | Booking/list (mặc định: `/booking/list`) |  | BOOK-009, BOOK-013 |
| BOOK-002 | Tất cả đặt chỗ (All Reservations) | Trang đầy đủ | Booking/bookingList (mặc định: `/booking/booking-list`) |  | BOOK-002-P1, BOOK-010 |
| BOOK-002-P1 | Xem nhanh đặt chỗ (Reservation Preview) | Trang đầy đủ | Booking/viewBooking/:id (mặc định: `/booking/view-booking/:id`, id được base64_encode) |  | BOOK-002, BOOK-004 |
| BOOK-003 | Danh bạ khách (Guest Directory) | Trang đầy đủ | Booking/customerList (mặc định: `/booking/customer-list`) |  |  |
| BOOK-026 | Số đêm tối thiểu (Minimum Nights) | Trang đầy đủ | booking/minimum (base path `/VM` xuất hiện trong các lời gọi AJAX của ứng dụng) |  |  |
| BOOK-027 | Tài sản chưa có giá (Unpriced Properties) | Trang đầy đủ | booking/missingRates (query `?id=<business_unit_id>`) |  | BOOK-023, BOOK-027-P1, BOOK-028, BOOK-030 |
| BOOK-028 | Hồ sơ đặt chỗ (Reservation Record) | Trang đầy đủ | Booking/viewDetails/:id (mặc định: `/booking/view-details/:id`, id được base64_encode) |  | BOOK-001, BOOK-002 |
| BOOK-029 | Kiểm tra khi khách đến (Arrival Audit) | Trang đầy đủ | Booking/checkInControl (mặc định: `/booking/check-in-control`) |  | BOOK-029-P1 |
| BOOK-029-P1 | Chi tiết điểm kiểm tra khi đến (Arrival Checkpoint Details) | Popup | Booking/viewCheckinDetail/:id/:booking_id | BOOK-029 | BOOK-029 |
| BOOK-030 | Kiểm tra khi khách đi (Departure Audit) | Trang đầy đủ | Booking/checkOutControl (mặc định: `/booking/check-out-control`) |  | BOOK-030-P1 |
| BOOK-030-P1 | Chi tiết điểm kiểm tra khi đi (Departure Checkpoint Details) | Popup | Booking/viewCheckOutDetail/:id/:check_out_date/:booking_id | BOOK-030 | BOOK-030 |
| BOOK-031 | Điểm kiểm tra (Audit Checkpoints) | Trang đầy đủ | Booking/checkControlPoint (mặc định: `/booking/check-control-point`) |  |  |
| BOOK-032 | Nhận phòng tại chỗ (On-site Check-in) | Trang đầy đủ | Booking/checkIn (mặc định: `/booking/check-in`) |  | BOOK-033 |
| BOOK-033 | Theo dõi nhận phòng (Check-in Tracker) | Trang đầy đủ | Booking/checkinProgress/:id/:date/:villa_id (mặc định: `/booking/checkin-progress/:id/:... | BOOK-032 | BOOK-029, BOOK-029-P1, BOOK-032 |
| BOOK-034 | Xác minh nhận phòng (Check-in Verification) | Trang đầy đủ | Booking/qualityControl/:checkin_detail_id/:date/:villa_id (mặc định: `/booking/quality-... | BOOK-029 | BOOK-029, BOOK-029-P1 |
| BOOK-035 | Trả phòng tại chỗ (On-site Check-out) | Trang đầy đủ | Booking/checkOut (mặc định: `/booking/check-out`) |  | BOOK-035-P2 |
| BOOK-035-P2 | Trả phòng tại chỗ · Bước 2: Kiểm tra hư hỏng (On-site Check-out · Step 2: Damage Check) | Popup | Booking/checkOutStep2/:check_out_id (mặc định: `/booking/check-out-step2/:check_out_id`) | BOOK-035 | BOOK-035, BOOK-035-P3 |
| BOOK-035-P3 | Trả phòng tại chỗ · Bước 3: Đánh giá của khách (On-site Check-out · Step 3: Guest Rating) | Popup | Booking/checkOutStep3/:check_out_id (mặc định: `/booking/check-out-step3/:check_out_id`) | BOOK-035-P2 | BOOK-035-P2, BOOK-035-P4 |
| BOOK-035-P4 | Trả phòng tại chỗ · Bước 4: Hoàn tất (On-site Check-out · Step 4: Wrap-up) | Popup | Booking/checkOutStep4/:check_out_id (mặc định: `/booking/check-out-step4/:check_out_id`) | BOOK-035-P3 | BOOK-030, BOOK-030-P1, BOOK-035-P3 |
| BOOK-036 | Tạo đặt chỗ mới (New Reservation) | Trang đầy đủ | Booking/addBooking/:id? (mặc định: `/booking/add-booking`, có id thì là sửa booking thủ... |  | BOOK-036-P1 |
| BOOK-036-P1 | Đặt chỗ ngoại tuyến (Offline Reservations) | Trang đầy đủ | Booking/addBookingList (mặc định: `/booking/add-booking-list`) | BOOK-036 | BOOK-036 |
| BOOK-037 | Điều chỉnh đặt chỗ (Modify Reservation) | Trang đầy đủ | Booking/edit/:id (mặc định: `/booking/edit/:id`) |  | BOOK-002, BOOK-028 |
| BOOK-038 | Tra cứu đặt chỗ (Reservation Lookup) | Trang đầy đủ | Booking/retrieveBooking (mặc định: `/booking/retrieve-booking`) |  | BOOK-028 |
| BOOK-039 | Lịch bàn giao (Handover Schedule) | Trang đầy đủ | Booking/planningList (mặc định: `/booking/planning-list`) |  | BOOK-040 |
| BOOK-040 | Lịch bàn giao dạng lịch (Handover Calendar) | Trang đầy đủ | Booking/planning/:date? (mặc định: `/booking/planning`) |  | BOOK-039, BOOK-041 |
| BOOK-041 | Lịch trực concierge (Concierge Duty Roster) | Trang đầy đủ | Booking/team (mặc định: `/booking/team`) |  | BOOK-028, BOOK-040 |
| BOOK-042 | Yêu cầu lưu trú trực tiếp (Direct Stay Requests) | Trang đầy đủ | Booking/directBookingList (mặc định: `/booking/direct-booking-list`) |  | BOOK-043, BOOK-044, BOOK-045, BOOK-046 |
| BOOK-043 | Tạo yêu cầu lưu trú (New Stay Request) | Popup | Booking/addDirectBooking/:id? (mặc định: `/booking/add-direct-booking`) | BOOK-042 | BOOK-042 |
| BOOK-044 | Sửa yêu cầu lưu trú (Edit Stay Request) | Popup | Booking/editDirectBooking/:id (mặc định: `/booking/edit-direct-booking/:id`) | BOOK-042 | BOOK-042 |
| BOOK-045 | Chi tiết yêu cầu lưu trú (Stay Request Details) | Popup | Booking/viewDirectBooking/:id (mặc định: `/booking/view-direct-booking/:id`) | BOOK-042 | BOOK-042 |
| BOOK-046 | Yêu cầu lưu trú đã hủy (Cancelled Stay Requests) | Trang đầy đủ | Booking/cancelDirectBookingList (mặc định: `/booking/cancel-direct-booking-list`) |  | BOOK-042, BOOK-045 |
| BOOK-047 | Lưới phòng trống (Availability Grid) | Trang đầy đủ | Booking/availability (mặc định: `/booking/availability`, hỗ trợ query `referer` hoặc `b... |  | BOOK-036 |
| BOOK-048 | Công suất theo tài sản (Occupancy by Property) | Trang đầy đủ | Booking/occupancy/:string? (mặc định: `/booking/occupancy`) |  |  |
| BOOK-049 | Khoản chi trả đến hạn (Payouts Due) | Trang đầy đủ | Booking/dueNow (mặc định: `/booking/due-now`) | BOOK-052 | BOOK-051, BOOK-052 |
| BOOK-050 | Khoản chi trả sắp tới (Upcoming Payouts) | Trang đầy đủ | Booking/dueLater (mặc định: `/booking/due-later`) | BOOK-052 | BOOK-049, BOOK-052 |
| BOOK-051 | Khoản chi trả đã tất toán (Settled Payouts) | Trang đầy đủ | Booking/paid (mặc định: `/booking/paid`) | BOOK-052 | BOOK-049, BOOK-052 |
| BOOK-052 | Chi trả đối tác (Partner Payouts) | Trang đầy đủ | Booking/partnerPayments (mặc định: `/booking/partner-payments`) |  | BOOK-049, BOOK-050, BOOK-051 |
| BOOK-053 | Đặt chỗ của đối tác (Partner Reservations) | Trang đầy đủ | Booking/partnerBookings (mặc định: `/booking/partner-bookings`) |  | BOOK-052 |
| BOOK-054 | Bộ công cụ kênh (Channel Toolkit) | Trang đầy đủ | Booking/ota (mặc định: `/booking/ota`) |  | BOOK-055, BOOK-056 |
| BOOK-055 | Kiểm tra đồng bộ listing (Listing Sync Check) | Trang đầy đủ | Booking/otaListing (mặc định: `/booking/ota-listing`) | BOOK-054 | BOOK-054 |
| BOOK-056 | Rà soát hoa hồng (Commission Review) | Trang đầy đủ | Booking/otaShare (mặc định: `/booking/ota-share`) | BOOK-054 | BOOK-054 |
| BOOK-057 | Mẫu thư xác nhận (Confirmation Layouts) | Trang đầy đủ | Booking/confirmationTemplate (mặc định: `/booking/confirmation-template`) |  | BOOK-058, BOOK-059, BOOK-060, BOOK-061 |
| BOOK-058 | Thêm mẫu thư xác nhận (New Confirmation Layout) | Popup | Booking/addConfirmationTemplate | BOOK-057 | BOOK-057 |
| BOOK-059 | Sửa mẫu thư xác nhận (Edit Confirmation Layout) | Popup | Booking/editConfirmationTemplate/:id (id được base64_encode) | BOOK-057 | BOOK-057 |
| BOOK-060 | Xem trước mẫu thư xác nhận (Confirmation Layout Preview) | Popup | Booking/viewConfirmationTemplate/:id (id được base64_encode) | BOOK-057 | BOOK-057 |
| BOOK-061 | Bản dịch mẫu thư (Layout Translations) | Trang đầy đủ | Booking/transalateConfirmationTemplate | BOOK-057 | BOOK-057 |
| BOOK-062 | Loại trừ khỏi báo cáo (Report Exclusions) | Trang đầy đủ | Booking/exception/:tab? (mặc định: `/booking/exception`) |  |  |
| BOOK-063 | Đặt chỗ chưa đồng bộ (Unsynced Reservations) | Trang đầy đủ | Booking/unlinkedBookings (mặc định: `/booking/unlinked-bookings`) |  |  |
| BOOK-064 | Ngưỡng cảnh báo chưa có giá (Unpriced Alert Threshold) | Popup | Booking/missingRateSetting (mặc định: `/booking/missing-rate-setting`) | BOOK-027 | BOOK-027 |
| BOOK-065 | Đặt chỗ gần đây (Recent Reservations) | Trang đầy đủ | Booking/latestBookings (mặc định: `/booking/latest-bookings`) |  | BOOK-028 |
| BOOK-066 | Trung tâm giá (Pricing Hub) | Trang đầy đủ | Booking/rates (mặc định: `/booking/rates`) |  | BOOK-067, BOOK-070, BOOK-073, BOOK-074 |
| BOOK-067 | Trạng thái gói giá (Rate Plan Status) | Trang đầy đủ | Booking/ratesStatus (mặc định: `/booking/rates-status`) |  | BOOK-066, BOOK-069, BOOK-075, BOOK-076 |
| BOOK-068 | Thêm trạng thái gói giá (New Rate Plan Status) | Trang đầy đủ | Booking/ratesStatusAdd (mặc định: `/booking/rates-status-add`) | BOOK-067 | BOOK-067 |
| BOOK-069 | Xử lý tiền thuê tháng (Monthly Rent Action) | Trang đầy đủ | Booking/ratesStatusEdit/:business_unit_id/:villa_id/:action (action = `payment` hoặc `f... | BOOK-067 | BOOK-067 |
| BOOK-070 | Ghi chú thay đổi giá (Price Change Notes) | Trang đầy đủ | Booking/ratesLogs (mặc định: `/booking/rates-logs`) |  | BOOK-066 |
| BOOK-071 | Thêm ghi chú giá (New Price Note) | Trang đầy đủ | Booking/ratesLogAdd (mặc định: `/booking/rates-log-add`) |  | BOOK-070 |
| BOOK-072 | Sửa ghi chú giá (Edit Price Note) | Trang đầy đủ | Booking/ratesLogEdit/:id |  | BOOK-070 |
| BOOK-073 | Lịch mùa (Season Calendar) | Trang đầy đủ | Booking/seasons (mặc định: `/booking/seasons`) |  | BOOK-066 |
| BOOK-074 | Đối chiếu giá theo mùa (Season Price Audit) | Trang đầy đủ | Booking/seasonPriceLogs (mặc định: `/booking/season-price-logs`) |  | BOOK-066 |
| BOOK-075 | Đổi cách tính giá (Switch Rate Basis) | Trang đầy đủ | Booking/changeVillaRates/:business_unit_id/:villa_id/:action (action = `monthly` hoặc `... | BOOK-067 | BOOK-067 |
| BOOK-076 | Điều khoản thuê tháng (Monthly Rent Terms) | Trang đầy đủ | Booking/rentalMonthView/:business_unit_id/:villa_id | BOOK-067 | BOOK-067 |
| BOOK-077 | Bảng khách đến (Arrivals Board) | Trang đầy đủ | Booking/guestArrival |  |  |
| BOOK-078 | Khách VIP sắp đến (VIP Arrivals) | Trang đầy đủ | Booking/vipGuests/:id |  | BOOK-079 |
| BOOK-079 | Chuẩn bị đón khách VIP (VIP Arrival Prep) | Trang đầy đủ | Booking/preparationWork/:button/:booking_id | BOOK-078 | BOOK-078 |
| BOOK-080 | Ngưỡng công suất (Occupancy Thresholds) | Trang đầy đủ | Booking/criteria |  | BOOK-081, BOOK-082, BOOK-083 |
| BOOK-081 | Thêm ngưỡng công suất (New Occupancy Threshold) | Popup | Booking/addCriteria | BOOK-080 | BOOK-080 |
| BOOK-082 | Sửa ngưỡng công suất (Edit Occupancy Threshold) | Popup | Booking/editCriteria/:id | BOOK-080 | BOOK-080 |
| BOOK-083 | Tín hiệu điều chỉnh giá (Pricing Signals) | Trang đầy đủ | Booking/recommendations |  | BOOK-080, BOOK-084 |
| BOOK-084 | Chạy kiểm tra giá (Run Pricing Check) | Trang đầy đủ | Booking/recommendationCheck |  | BOOK-083 |
| BOOK-085 | Yêu cầu lưu trú (form công khai) (Stay Enquiry) | Trang đầy đủ | Booking/bookingEnquiry/:id |  | BOOK-086 |
| BOOK-086 | Đã nhận yêu cầu (Enquiry Received) | Trang con (mở từ BOO | Booking/requestSuccess/:array | BOOK-085 | BOOK-085 |
| BOOK-087 | Phản hồi của khách (Guest Feedback) | Trang đầy đủ | Booking/satisfaction |  |  |
| BOOK-088 | Lượt lưu trú cần theo dõi (Monitored Stays) | Trang đầy đủ | Booking/watchList |  |  |
| BOOK-089 | Hội thoại với khách (Guest Conversations) | Trang đầy đủ | Booking/villaChats (mặc định: `/booking/villa-chats`) |  | BOOK-038, BOOK-089-P1, BOOK-090, BOOK-091 |
| BOOK-089-P1 | Mở luồng chat khách (Open Guest Thread) | Trang đầy đủ | Booking/activateChat/:booking_id (id được base64_encode) | BOOK-089 | BOOK-089 |
| BOOK-090 | Gộp hội thoại (Merge Conversation) | Trang đầy đủ | Booking/linkChat/:booking_id (id được base64_encode) | BOOK-089 | BOOK-089, BOOK-091 |
| BOOK-091 | Hội thoại đã gộp (Merged Conversation) | Trang đầy đủ | Booking/viewLinkedChat/:booking_id (id được base64_encode) | BOOK-089 | BOOK-089 |
| BOOK-092 | Mẫu lời chào (Greeting Templates) | Trang đầy đủ | Booking/messageSettings (mặc định: `/booking/message-settings`) |  | BOOK-089-P1 |
| BOOK-093 | Luồng chat khách – bản cổ điển (Guest Thread (Classic)) | Trang đầy đủ | Booking/chat/:booking_id (id được base64_encode) |  | BOOK-094-P1, BOOK-095-P1 |
| BOOK-094 | Hộp thư chat – bản cổ điển (Chat Inbox (Classic)) | Trang đầy đủ | Booking/whatsAppManager (mặc định: `/booking/whats-app-manager`) |  | BOOK-094-P1, BOOK-095 |
| BOOK-094-P1 | Luồng chat – bản cổ điển (Chat Thread (Classic)) | Trang đầy đủ | Booking/whatsappChat/:booking_id (id được base64_encode) | BOOK-094 | BOOK-094 |
| BOOK-095 | Hộp thư chat (Chat Inbox) | Trang đầy đủ | Booking/whatsAppManagerNew/:tab? (mặc định: `/booking/whats-app-manager-new`) |  | BOOK-094, BOOK-095-P1, BOOK-096 |
| BOOK-095-P1 | Luồng chat (Chat Thread) | Trang đầy đủ | Booking/whatsappChatNew/:booking_id (id được base64_encode) | BOOK-095 | BOOK-095 |
| BOOK-096 | Tình trạng dịch vụ chat (Chat Service Health) | Trang đầy đủ | Booking/whatsAppHelp (mặc định: `/booking/whats-app-help`) |  | BOOK-095 |
| BOOK-097 | Chủ đề tri thức (Knowledge Topics) | Trang đầy đủ | Booking/faqCategory (mặc định: `/booking/faq-category`) |  | BOOK-098, BOOK-099 |
| BOOK-098 | Bài viết tri thức (Knowledge Articles) | Trang đầy đủ | Booking/faqQuestion (mặc định: `/booking/faq-question`) |  | BOOK-097, BOOK-099, BOOK-100 |
| BOOK-099 | Thêm bài viết tri thức (New Knowledge Article) | Trang đầy đủ | Booking/faq/:id? (mặc định: `/booking/faq` khi thêm mới, `/booking/faq/:id` khi sửa) | BOOK-098 | BOOK-098 |
| BOOK-100 | Chi tiết bài viết tri thức (Knowledge Article) | Trang đầy đủ | Booking/viewFaq/:id | BOOK-098 | BOOK-098 |
| BOOK-101 | Bảng trạng thái trực tiếp (Live Status Board) | Trang đầy đủ | Booking/propertyStatus (mặc định: `/booking/property-status`) |  | BOOK-101-P1 |
| BOOK-101-P1 | Chi tiết nhân viên trực (On-duty Staff Detail) | Popup | Booking/staffDetail (mặc định: `/booking/staff-detail?booking_id=...&clean_id=...&makeu... | BOOK-101 | BOOK-101 |
| BOOK-101-P2 | Điều chỉnh trạng thái (Adjust Live Status) | Popup | Booking/adjustDetail (mặc định: `/booking/adjust-detail?param=<booking_id>_<clean_id>_<... | BOOK-101 | BOOK-101 |
| BOOK-102 | Chấm công hiện trường (Field Attendance) | Trang đầy đủ | Booking/timesheet (mặc định: `/booking/timesheet`) |  |  |
| BOOK-103 | Điều chỉnh giá (Pricing Adjustments) | Trang đầy đủ | Booking/action (mặc định: `/booking/action`) |  | BOOK-104, BOOK-105 |
| BOOK-104 | Tạo điều chỉnh giá (New Pricing Adjustment) | Trang đầy đủ | Booking/addAction (mặc định: `/booking/add-action`) | BOOK-103 | BOOK-103 |
| BOOK-105 | Theo dõi điều chỉnh (Adjustment Follow-up) | Trang đầy đủ | Booking/followUpAction/:id (id được base64_encode) | BOOK-103 | BOOK-103 |
| BOOK-106 | Nguồn gốc khách (Guest Origins) | Trang đầy đủ | Booking/nationalities (mặc định: `/booking/nationalities`) |  |  |
| BOOK-107 | Giờ lưu trú mặc định (Default Stay Times) | Trang đầy đủ | Booking/standardTime (mặc định: `/booking/standard-time`) |  | BOOK-106, BOOK-108 |
| BOOK-108 | Hạn chót trước khi đến (Pre-arrival Deadlines) | Trang đầy đủ | Booking/onlineCheckinDeadlineSettings |  | BOOK-002, BOOK-106, BOOK-107 |
| BOOK-109 | Phân tích doanh thu (Revenue Breakdown) | Trang đầy đủ | Booking/revenueReport (mặc định: `/booking/revenue-report`) |  |  |
| BOOK-110 | Chứng nhận sức khỏe (Health Certification) | Trang đầy đủ | Booking/shaPlusEdit/:booking_id |  |  |

## 5. Quan hệ chủ nhà (Admin)

### OWN — Quan hệ chủ nhà (Admin) (22 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| OWN-001 | Tài khoản chủ nhà (Owner Accounts) | Trang đầy đủ | `/Owner/list` (controller `Owner`, action `list()`) |  | OWN-001-P1, OWN-002, OWN-003, OWN-014 |
| OWN-001-P1 | Tóm tắt tài khoản chủ nhà (Owner Account Snapshot) | Popup | `/Owner/viewDetails/{id}` (controller `Owner`, action `viewDetails($id)`) | OWN-001 | OWN-001 |
| OWN-002 | Thêm tài khoản chủ nhà (New Owner Account) | Trang đầy đủ | `/Owner/add` (controller `Owner`, action `add($tab = null)`) |  | OWN-001, OWN-003 |
| OWN-003 | Sửa tài khoản chủ nhà (Edit Owner Account) | Trang đầy đủ | `/Owner/edit/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `e... |  | OWN-001, OWN-002 |
| OWN-004 | Trạng thái tài sản của chủ nhà (Owner Property Status) | Trang đầy đủ | `/Owner/status/{tab}` (controller `Owner`, action `status($tab)`) |  | OWN-004-P1, OWN-004-P2 |
| OWN-004-P1 | Chi tiết lượt chăm vườn (Garden Visit Detail) | Popup | `/Owner/gardenView/{id}` (controller `Owner`, action `gardenView($id)`) | OWN-004 | OWN-004 |
| OWN-004-P2 | Chi tiết chi phí chủ nhà (Owner Expense Detail) | Popup | `/Owner/viewClaim/{claim_id}` (controller `Owner`, action `viewClaim($claim_id)`) | OWN-004 | OWN-004 |
| OWN-005 | Lịch công suất của chủ nhà (Owner Occupancy Calendar) | Trang đầy đủ | `/Owner/calendar` (controller `Owner`, action `calendar()`) |  |  |
| OWN-006 | Hiệu quả tài sản (Property Performance) | Trang đầy đủ | `/Owner/performance` (controller `Owner`, action `performance()`) |  |  |
| OWN-007 | Trình tạo sao kê chủ nhà (Owner Statement Builder) | Trang đầy đủ | `/Owner/generateReports` (controller `Owner`, action `generateReports()`) |  |  |
| OWN-008 | Tài khoản nhận tiền của chủ nhà (Owner Payout Accounts) | Trang đầy đủ | `/Owner/payment/{owner_id}` (controller `Owner`, action `payment($owner_id)`) |  | OWN-003, OWN-008-P1, OWN-008-P2 |
| OWN-008-P1 | Thêm tài khoản nhận tiền (New Owner Payout Account) | Popup | `/Owner/addPaymentDetail/{owner_id}` (controller `Owner`, action `addPaymentDetail($own... | OWN-008 | OWN-008 |
| OWN-008-P2 | Sửa tài khoản nhận tiền (Edit Owner Payout Account) | Popup | `/Owner/editPaymentDetail/{id}` (controller `Owner`, action `editPaymentDetail($id)`) | OWN-008 | OWN-008 |
| OWN-009 | Đại lý đối tác (Partner Agencies) | Trang đầy đủ | `/Owner/agencyList` (controller `Owner`, action `agencyList()`) |  | OWN-010, OWN-011, OWN-012 |
| OWN-010 | Thêm đại lý đối tác (New Partner Agency) | Trang đầy đủ | `/Owner/agency` (controller `Owner`, action `agency($tab = null, $agency_id = null, $sh... |  | OWN-009, OWN-011 |
| OWN-011 | Sửa đại lý đối tác (Edit Partner Agency) | Trang đầy đủ | `/Owner/editAgency/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, act... |  | OWN-009 |
| OWN-012 | Hồ sơ đại lý đối tác (Partner Agency Profile) | Popup | `/Owner/viewAgencyDetails/{id}` (controller `Owner`, action `viewAgencyDetails($id)`) | OWN-009 | OWN-009 |
| OWN-013 | Người dùng của đại lý (Agency Users) | Trang đầy đủ | `/Owner/agencyStaff` (controller `Owner`, action `agencyStaff()`) |  | OWN-014, OWN-015 |
| OWN-014 | Thêm người dùng đại lý (New Agency User) | Trang đầy đủ | `/Owner/addAgencyStaff` (controller `Owner`, action `addAgencyStaff()`) |  | OWN-013 |
| OWN-015 | Sửa người dùng đại lý (Edit Agency User) | Trang đầy đủ | `/Owner/editAgencyStaff/{id}` (controller `Owner`, action `editAgencyStaff($id)`) |  | OWN-013 |
| OWN-016 | Lịch sử truy cập của chủ nhà (Owner Access History) | Trang đầy đủ | `/Owner/loginLog` (controller `Owner`, action `loginLog()`) |  | OWN-001 |
| OWN-017 | Email thông báo cho chủ nhà (Owner Email Alerts) | Trang đầy đủ | `/Owner/emailAccessTemplate/{tab}/{selected_lang}` (controller `Owner`, action `emailAc... |  |  |

## 6. Không gian chủ nhà (Owner Hub)

### OWP — Không gian chủ nhà (Owner Hub) (31 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| OWP-001 | Đăng nhập Owner Hub (Owner Hub Login) | Trang đầy đủ | `ExternalUserController::index()` — route đẹp: `/Owner`, `/Owners` (config/Routes.php d... |  | OWP-001-P1, OWP-003, OWP-005 |
| OWP-001-P1 | Khôi phục mật khẩu (Password Recovery) | Popup | `ExternalUserController::forgotPassword()` — không có route đẹp riêng, không có view ri... | OWP-001 | OWP-001, OWP-003 |
| OWP-002 | Tổng quan (Overview) | Trang đầy đủ | `ExternalUserController::dashboard()` — không có route đẹp riêng (truy cập qua `/extern... |  |  |
| OWP-003 | Mật khẩu mới (New Password) | Trang đầy đủ | `ExternalUserController::resetPassword($token)` — không có route đẹp riêng; truy cập qu... |  | OWP-001, OWP-001-P1 |
| OWP-004 | Tài khoản của tôi (My Account) | Trang đầy đủ | `ExternalUserController::profile()` — không có route đẹp riêng (mặc định `/external-use... |  | OWP-004-P1 |
| OWP-004-P1 | Cập nhật mật khẩu (Update Password) | Popup | `ExternalUserController::changePassword()` — không có route đẹp riêng, không có view ri... | OWP-004 | OWP-004 |
| OWP-005 | Danh mục của tôi (My Portfolio) | Trang đầy đủ | `ExternalUserController::list()` — route đẹp: `/external-user/property/list` (config/Ro... |  | OWP-001, OWP-006 |
| OWP-006 | Tóm tắt tài sản (Property Snapshot) | Trang đầy đủ | `ExternalUserController::viewDetails($villa_id)` — không có route đẹp riêng, truy cập t... |  | OWP-005 |
| OWP-007 | Theo dõi hoạt động (Activity Tracker) | Trang đầy đủ | `ExternalUserController::status($tab, $villa_id)` — không có route đẹp riêng, mở từ OWP... |  | OWP-005 |
| OWP-007-P1 | Chi tiết lượt dọn phòng (Housekeeping Visit Detail) | Popup | `ExternalUserController::planningTeamsDetail($id, $location)` — route dạng `.../plannin... | OWP-007 | OWP-007 |
| OWP-007-P2 | Chi tiết lượt chăm vườn (Garden Visit Detail) | Popup | `ExternalUserController::gardenView($id)` — không có route đẹp riêng, mở từ OWP-007 (ta... | OWP-007 | OWP-007 |
| OWP-008 | Lịch công suất (Occupancy Calendar) | Trang đầy đủ | `ExternalUserController::calendar($villa_id)` — không có route đẹp riêng, mở từ OWP-005... |  | OWP-005, OWP-010-P1 |
| OWP-009 | Lịch sử sửa chữa (Repair History) | Trang đầy đủ | `ExternalUserController::maintenanceLog($id)` — route đẹp: `/external-user/property/log... |  | OWP-005, OWP-006 |
| OWP-010 | Đặt chỗ (Reservations) | Trang đầy đủ | `ExternalUserController::bookingList()` — không có route đẹp riêng (mặc định `/external... |  | OWP-010-P1 |
| OWP-010-P1 | Chi tiết đặt chỗ (Reservation Detail) | Popup | `ExternalUserController::bookingDetails($id)` — không có route đẹp riêng (mặc định `/ex... | OWP-010 | OWP-008, OWP-010 |
| OWP-011 | Khóa ngày (Block Dates) | Trang đầy đủ | `ExternalUserController::addBooking()` — không có route đẹp riêng, không có link điều h... |  |  |
| OWP-012 | Khách sắp đến (Upcoming Arrivals) | Trang đầy đủ | `ExternalUserController::checkIn()` — không có route đẹp riêng (mặc định `/external-use... |  |  |
| OWP-013 | Khách sắp đi (Upcoming Departures) | Trang đầy đủ | `ExternalUserController::checkOut()` — không có route đẹp riêng (mặc định `/external-us... |  |  |
| OWP-014 | Sao kê thu nhập (Earnings Statement) | Trang đầy đủ | `ExternalUserController::generateReports()` — không có route đẹp riêng (mặc định `/exte... |  |  |
| OWP-015 | Xu hướng hiệu quả (Performance Trends) | Trang đầy đủ | `ExternalUserController::performance()` — không có route đẹp riêng (mặc định `/external... |  |  |
| OWP-016 | Tổng hợp chi trả hằng tháng (Monthly Payout Summary) | Trang đầy đủ | `ExternalUserController::paymentReport($villa_id)` — không có route đẹp riêng, mở từ OW... |  | OWP-005 |
| OWP-017 | Yêu cầu lưu trú (Stay Requests) | Trang đầy đủ | `ExternalUserController::directBookingList()` — không có route đẹp riêng (mặc định `/ex... |  | OWP-017-P1, OWP-017-P2, OWP-017-P3 |
| OWP-017-P1 | Tạo yêu cầu lưu trú (New Stay Request) | Popup | `ExternalUserController::addDirectBooking($id = null)` — không có route đẹp riêng, mở t... | OWP-017 | OWP-017 |
| OWP-017-P2 | Sửa yêu cầu lưu trú (Edit Stay Request) | Popup | `ExternalUserController::editDirectBooking($id)` — không có route đẹp riêng, mở từ icon... | OWP-017 | OWP-017 |
| OWP-017-P3 | Chi tiết yêu cầu lưu trú (Stay Request Details) | Popup | `ExternalUserController::viewDirectBooking($id)` — không có route đẹp riêng, mở từ icon... | OWP-017 | OWP-017 |
| OWP-018 | Tài khoản nhận tiền (Payout Accounts) | Trang đầy đủ | `ExternalUserController::paymentDetails()` — không có route đẹp riêng (mặc định `/exter... |  | OWP-018-P1, OWP-018-P2 |
| OWP-018-P1 | Thêm tài khoản nhận tiền (New Payout Account) | Popup | `ExternalUserController::addPaymentDetail()` — không có route đẹp riêng, mở từ nút "+" ... | OWP-018 | OWP-018 |
| OWP-018-P2 | Sửa tài khoản nhận tiền (Edit Payout Account) | Popup | `ExternalUserController::editPaymentDetail($id)` — không có route đẹp riêng, mở từ icon... | OWP-018 | OWP-018 |
| OWP-019 | Yêu cầu lưu trú đã hủy (Cancelled Stay Requests) | Trang đầy đủ | `ExternalUserController::cancelDirectBookingList()` — không có route đẹp riêng (mặc địn... |  | OWP-017 |
| OWP-020 | Kho sao kê (Statement Archive) | Trang đầy đủ | `ExternalUserController::ReportHistory($villa_id)` — không có route đẹp riêng (mặc định... |  | OWP-005 |
| OWP-021 | Bản tin chủ nhà (Owner Bulletin) | Trang đầy đủ | `ExternalUserController::MonthlyNewsletter()` — không có route đẹp riêng (mặc định `/ex... |  |  |

## 7. Không gian khách (Guest Hub)

### GST — Không gian khách (Guest Hub) (11 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| GST-001 | Đăng nhập Guest Hub (Guest Hub Login) | Trang đầy đủ | `Guest::index()` — mặc định `/guest/index`; route đẹp: `/Welcome`, `/Welcome/:id` (đều ... |  | GST-002, GST-003 |
| GST-002 | Đặt chỗ của tôi (My Reservations) | Trang đầy đủ | `Guest::bookings()` — mặc định `/guest/bookings`; route đẹp (fallback DashedRoute): `/g... |  | GST-001, GST-003, GST-004 |
| GST-003 | Chi tiết chuyến đi (Trip Details) | Trang đầy đủ | `Guest::yourBooking($booking_id = null)` — mặc định `/guest/your-booking/:booking_id`; ... |  | GST-001, GST-002, GST-004 |
| GST-004 | Lối tắt (Quick Links) | Trang đầy đủ | `Guest::accessPortal($booking_id = null)` — mặc định `/guest/access-portal/:booking_id`... |  | GST-001, GST-002, GST-008, GST-010, GST-011 |
| GST-005 | Hướng dẫn về chỗ ở (Property Guide) | Trang đầy đủ | `Guest::property()` — mặc định `/guest/property`; route đẹp (fallback DashedRoute): `/g... |  |  |
| GST-006 | Ngày lễ địa phương (Local Holidays) | Trang đầy đủ | `Guest::yourHolidays()` — mặc định `/guest/your-holidays`; route đẹp (fallback DashedRo... |  |  |
| GST-007 | Chính sách lưu trú (Stay Policies) | Trang đầy đủ | `Guest::rules()` — mặc định `/guest/rules`; route đẹp (fallback DashedRoute): `/guest/r... |  |  |
| GST-008 | Ăn uống quanh đây (Dining Nearby) | Trang đầy đủ | `Guest::restaurants($villa_id = null)` — mặc định `/guest/restaurants/:villa_id`; route... |  | GST-001, GST-009 |
| GST-009 | Thông tin nhà hàng (Restaurant Profile) | Trang đầy đủ | `Guest::restaurant($restaurant_id = null)` — mặc định `/guest/restaurant/:restaurant_id... |  | GST-002, GST-004, GST-008 |
| GST-010 | Điểm tham quan quanh đây (Sights Nearby) | Trang đầy đủ | `Guest::landmark($booking_id = null)` — mặc định `/guest/landmark/:booking_id`; route đ... |  | GST-001, GST-002 |
| GST-011 | Hoạt động quanh đây (Things to Do Nearby) | Trang đầy đủ | `Guest::activities($booking_id = null)` — mặc định `/guest/activities/:booking_id`; rou... |  | GST-002 |

## 8. Chăm sóc tài sản (Property Care)

### OPR — Công việc bảo dưỡng (22 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| OPR-001 | Công việc sân vườn & hồ bơi (Grounds & Pool Jobs) | Trang đầy đủ | operator/gardenJobStatus (query `?id=`) + route đẹp dạng dashed: operator/garden-job-st... |  | OPR-002 |
| OPR-002 | Lượt chăm vườn (Garden Rounds) | Trang đầy đủ | operator/gardenJobList/:tab? + route đẹp dạng dashed: operator/garden-job-list |  | OPR-001, OPR-016 |
| OPR-003 | Lượt chăm hồ bơi (Pool Rounds) | Trang đầy đủ | operator/pools/:tab? + route đẹp dạng dashed: operator/pools |  | OPR-004 |
| OPR-004 | Hồ sơ lượt hồ bơi (Pool Round Record) | Trang đầy đủ | operator/poolView/:id + route đẹp dạng dashed: operator/pool-view/:id |  | OPR-003 |
| OPR-005 | Hoàn tất lượt hồ bơi (Close Pool Round) | Trang đầy đủ | operator/poolJob/:id + route đẹp dạng dashed: operator/pool-job/:id |  | OPR-003 |
| OPR-006 | Ghi nhận sự cố hồ bơi (Log Pool Issue) | Trang đầy đủ | operator/poolReport/:id + route đẹp dạng dashed: operator/pool-report/:id |  | OPR-005 |
| OPR-007 | Lượt dọn phòng (Housekeeping Rounds) | Trang đầy đủ | operator/cleaning + route đẹp dạng dashed: operator/cleaning |  | OPR-008 |
| OPR-008 | Danh mục kiểm dọn phòng (Housekeeping Checklist) | Trang đầy đủ | operator/cleaningDetails?id=&last_id= + route đẹp dạng dashed: operator/cleaning-details |  | OPR-007 |
| OPR-009 | Bảng điều phối dọn phòng (Housekeeping Console) | Trang đầy đủ | operator/cleaningOperator + route đẹp dạng dashed: operator/cleaning-operator |  |  |
| OPR-010 | Kiểm tra tình trạng (Condition Checks) | Trang đầy đủ | operator/inspection + route đẹp dạng dashed: operator/inspection |  | OPR-011, OPR-012, OPR-013 |
| OPR-011 | Thực hiện kiểm tra tình trạng (Run Condition Check) | Trang đầy đủ | operator/inspectionDetails?id=&last_id= + route đẹp dạng dashed: operator/inspection-de... |  | OPR-010 |
| OPR-012 | Kết quả kiểm tra tình trạng (Condition Check Results) | Trang đầy đủ | operator/inspectionView?id= + route đẹp dạng dashed: operator/inspection-view |  | OPR-010 |
| OPR-013 | Tiếp tục kiểm tra tình trạng (Resume Condition Check) | Trang đầy đủ | operator/inspectionTaskView?id= + route đẹp dạng dashed: operator/inspection-task-view |  | OPR-010, OPR-011 |
| OPR-014 | Lượt chuẩn bị cuối (Final Prep Rounds) | Trang đầy đủ | operator/makeUp + route đẹp dạng dashed: operator/make-up |  | OPR-015 |
| OPR-015 | Danh mục chuẩn bị cuối (Final Prep Checklist) | Trang đầy đủ | operator/makeupDetails?id=&last_id= + route đẹp dạng dashed: operator/makeup-details |  | OPR-014 |
| OPR-016 | Hồ sơ lượt chăm vườn (Garden Round Record) | Trang đầy đủ | operator/gardenView/:id + route đẹp dạng dashed: operator/garden-view/:id |  | OPR-002 |
| OPR-017 | Lập lịch lượt chăm vườn (Garden Round Planner) | Trang đầy đủ | villa-services/gardenPlanning/:tab? + route đẹp dạng dashed: villa-services/garden-plan... |  | OPR-002 |
| OPR-018 | Thiết lập tổ chăm vườn (Garden Crew Setup) | Trang đầy đủ | villa-services/gardenTeams + route đẹp dạng dashed: villa-services/garden-teams |  | OPR-017 |
| OPR-019 | Phân công của tôi (My Assignments) | Trang đầy đủ | operator/roster + route đẹp dạng dashed: operator/roster |  |  |
| OPR-020 | Báo cáo sửa chữa hiện trường (Field Repair Reports) | Trang đầy đủ | operator/maintenance + route đẹp dạng dashed: operator/maintenance |  | OPR-021, OPR-022 |
| OPR-021 | Báo sửa chữa hiện trường (Report Field Repair) | Trang đầy đủ | operator/addMaintenanceTicket + route đẹp dạng dashed: operator/add-maintenance-ticket |  | OPR-020 |
| OPR-022 | Quản lý sửa chữa hiện trường (Manage Field Repair) | Trang đầy đủ | operator/editMaintenanceTicket/:id + route đẹp dạng dashed: operator/edit-maintenance-t... |  | OPR-020 |

### MNT — Điều phối sửa chữa (29 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| MNT-001 | Yêu cầu sửa chữa (Repair Requests) | Trang đầy đủ | maintenance/list |  | MNT-002, MNT-003, MNT-004, MNT-005 |
| MNT-002 | Tạo yêu cầu sửa chữa (New Repair Request) | Trang đầy đủ | maintenance/add |  | MNT-001 |
| MNT-003 | Phân loại yêu cầu sửa chữa (Repair Triage) | Trang đầy đủ | maintenance/accept/:id (id base64) |  | MNT-001 |
| MNT-004 | Cập nhật tiến độ sửa chữa (Repair Progress Update) | Trang đầy đủ | maintenance/edit/:id (id base64) |  | MNT-001 |
| MNT-005 | Hồ sơ yêu cầu sửa chữa (Repair Request Record) | Trang đầy đủ | maintenance/view/:id |  | MNT-001, MNT-004, MNT-006 |
| MNT-006 | Chi phí sửa chữa (Repair Expenses) | Trang đầy đủ | maintenance/cost/:id (id base64) |  | MNT-001, MNT-005 |
| MNT-007 | Nhóm sự cố (Issue Categories) | Trang đầy đủ | maintenance/categories |  |  |
| MNT-008 | Mức độ khẩn (Urgency Levels) | Trang đầy đủ | maintenance/priorities |  |  |
| MNT-009 | Loại dịch vụ vườn (Garden Service Types) | Trang đầy đủ | maintenance/gardenServices |  | MNT-009-P1, MNT-009-P2 |
| MNT-009-P1 | Thêm loại dịch vụ vườn (New Garden Service Type) | Popup | maintenance/addGardenService | MNT-009 | MNT-009 |
| MNT-009-P2 | Sửa loại dịch vụ vườn (Edit Garden Service Type) | Popup | maintenance/editGardenService/:id | MNT-009 | MNT-009 |
| MNT-010 | Loại dịch vụ hồ bơi (Pool Service Types) | Trang đầy đủ | maintenance/poolServices |  | MNT-010-P1, MNT-010-P2 |
| MNT-010-P1 | Thêm loại dịch vụ hồ bơi (New Pool Service Type) | Popup | maintenance/addPoolServices | MNT-010 | MNT-010 |
| MNT-010-P2 | Sửa loại dịch vụ hồ bơi (Edit Pool Service Type) | Popup | maintenance/editPoolService/:id | MNT-010 | MNT-010 |
| MNT-011 | Loại sửa chữa hồ bơi (Pool Repair Types) | Trang đầy đủ | maintenance/poolRepair |  | MNT-011-P1, MNT-011-P2 |
| MNT-011-P1 | Thêm loại sửa chữa hồ bơi (New Pool Repair Type) | Popup | maintenance/addPoolRepair | MNT-011 | MNT-011 |
| MNT-011-P2 | Sửa loại sửa chữa hồ bơi (Edit Pool Repair Type) | Popup | maintenance/editPoolRepair/:id | MNT-011 | MNT-011 |
| MNT-012 | Phân loại sự cố (Issue Classification) | Trang đầy đủ | maintenance/maintenanceServices (+ ajax `maintenance/maintenanceMatrix` phân trang/tìm ... |  |  |
| MNT-013 | Loại hạng mục nâng cấp (Refurbishment Types) | Trang đầy đủ | maintenance/renovationServices |  | MNT-013-P1, MNT-013-P2 |
| MNT-013-P1 | Thêm loại nâng cấp (New Refurbishment Type) | Popup | maintenance/addRenovationService | MNT-013 | MNT-013 |
| MNT-013-P2 | Sửa loại nâng cấp (Edit Refurbishment Type) | Popup | maintenance/editRenovationServices/:id | MNT-013 | MNT-013 |
| MNT-014 | Tiêu chuẩn dọn phòng (Housekeeping Standards) | Trang đầy đủ | maintenance/cleaningServices (ajax GET cùng route trả JSON tìm kiếm; `maintenance/getCl... |  | MNT-014-P1 |
| MNT-014-P1 | Thêm dịch vụ dọn phòng (New Housekeeping Service) | Trang đầy đủ | maintenance/addCleaningService | MNT-014 | MNT-014 |
| MNT-015 | Loại dịch vụ hành chính (Admin Service Types) | Trang đầy đủ | maintenance/backOfficeServices |  | MNT-015-P1, MNT-015-P2 |
| MNT-015-P1 | Thêm loại dịch vụ hành chính (New Admin Service Type) | Popup | maintenance/addBackOfficeService | MNT-015 | MNT-015 |
| MNT-015-P2 | Sửa loại dịch vụ hành chính (Edit Admin Service Type) | Popup | maintenance/editBackOfficeServices/:id | MNT-015 | MNT-015 |
| MNT-016 | SLA kiểm tra (Inspection SLAs) | Trang đầy đủ | maintenance/inspection |  | MNT-016-P1, MNT-016-P2 |
| MNT-016-P1 | Sửa SLA kiểm tra (Edit Inspection SLA) | Popup | maintenance/editInspection/:id (id base64) | MNT-016 | MNT-016 |
| MNT-016-P2 | Chi tiết SLA kiểm tra (Inspection SLA Details) | Popup | maintenance/viewInspection/:id (id base64) | MNT-016 | MNT-016, MNT-016-P1 |

### REN — Nâng cấp tài sản (12 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| REN-001 | Tạo dự án nâng cấp (New Refurbishment Project) | Trang đầy đủ | renovation/new-project |  | REN-002, REN-003 |
| REN-002 | Theo dõi nâng cấp (Refurbishment Tracker) | Trang đầy đủ | renovation/followUp + route đẹp dạng dashed: renovation/follow-up |  | REN-001, REN-003, REN-004 |
| REN-003 | Tiến trình dự án (Project Timeline) | Trang đầy đủ | renovation/projectFollowUp/:id + route đẹp dạng dashed: renovation/project-follow-up/:i... |  | REN-001, REN-002, REN-005, REN-007, REN-008, REN-009, REN-010, REN-011 |
| REN-004 | Sửa dự án nâng cấp (Edit Refurbishment Project) | Trang đầy đủ | renovation/edit/:renovation_id + route đẹp dạng dashed: renovation/edit/:renovation_id ... |  | REN-002 |
| REN-005 | Sổ chi tiêu dự án (Project Spend Ledger) | Trang đầy đủ | renovation/paymentList/:renovation_id + route đẹp dạng dashed: renovation/payment-list/... |  | REN-003, REN-006 |
| REN-006 | Ghi nhận thanh toán dự án (Record Project Payment) | Trang đầy đủ | renovation/addPayment/:renovation_id + route đẹp dạng dashed: renovation/add-payment/:r... |  | REN-005 |
| REN-007 | Thêm hóa đơn hoặc biên nhận (Add Invoice or Receipt) | Trang đầy đủ | renovation/addNewReceipt/:renovation_id + route đẹp dạng dashed: renovation/add-new-rec... |  | REN-003 |
| REN-008 | Sửa hóa đơn hoặc biên nhận (Edit Invoice or Receipt) | Trang đầy đủ | renovation/editRenovationReceipt/:id + route đẹp dạng dashed: renovation/edit-renovatio... |  | REN-003 |
| REN-009 | Tải ảnh tiến độ (Upload Progress Photo) | Trang đầy đủ | renovation/addPhoto/:renovation_id + route đẹp dạng dashed: renovation/add-photo/:renov... |  | REN-003 |
| REN-010 | Sửa ảnh tiến độ (Edit Progress Photo) | Trang đầy đủ | renovation/editPhoto/:id + route đẹp dạng dashed: renovation/edit-photo/:id (id truyền ... |  | REN-003 |
| REN-011 | Ngân sách so với tiến độ (Budget vs. Progress) | Trang đầy đủ | renovation/report/:id + route đẹp dạng dashed: renovation/report/:id (id truyền base64) |  | REN-003 |
| REN-012 | Popup giữ chỗ chưa dùng (Unused Placeholder Popup) | Popup | renovation/startPopup + route đẹp dạng dashed: renovation/start-popup |  |  |

### TRN — Học viện nhân viên (16 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| TRN-001 | Học viện nhân viên (Staff Academy) | Trang đầy đủ | `TrainingController::index()` — `/training/index` (mặc định, DashedRoute) |  | TRN-002, TRN-007, TRN-008, TRN-010, TRN-011 |
| TRN-002 | Trình tạo bài học (Lesson Builder) | Trang đầy đủ | `TrainingController::createTutorial()` — `/training/create-tutorial` |  | TRN-002-P1, TRN-003, TRN-004, TRN-005 |
| TRN-002-P1 | Xác nhận xóa bài học (Confirm Lesson Deletion) | Popup | Modal Bootstrap trong `create_tutorial.ctp`; hành động xóa gọi `TrainingController::del... | TRN-002 | TRN-002 |
| TRN-003 | Tạo bài học (New Lesson) | Trang đầy đủ | `TrainingController::addTutorial($tutorial_id = null, $slide_id = null)` — `/training/a... |  | TRN-002, TRN-005 |
| TRN-004 | Tổng quan bài học (Lesson Overview) | Trang đầy đủ | `TrainingController::viewTutorial($id)` — `/training/view-tutorial/{id}` |  | TRN-002, TRN-005 |
| TRN-005 | Sửa bài học (Edit Lesson) | Trang đầy đủ | `TrainingController::editTutorial($id)` — `/training/edit-tutorial/{id}` |  | TRN-002, TRN-003, TRN-004, TRN-005-P1, TRN-006 |
| TRN-005-P1 | Xác nhận xóa slide (Confirm Slide Deletion) | Popup | Modal Bootstrap trong `edit_tutorial.ctp`; hành động xóa gọi `TrainingController::delet... | TRN-005 | TRN-005 |
| TRN-006 | Sửa slide bài học (Edit Lesson Slide) | Trang đầy đủ | `TrainingController::editSlide($id)` — `/training/edit-slide/{id}` |  | TRN-005 |
| TRN-007 | Danh mục bài học (Lesson Catalog) | Trang đầy đủ | `TrainingController::library()` — `/training/library` |  | TRN-009 |
| TRN-008 | Tiến độ học của tôi (My Learning Progress) | Trang đầy đủ | `TrainingController::myRecord()` — `/training/my-record` |  | TRN-009 |
| TRN-009 | Trình đọc bài học (Lesson Reader) | Trang đầy đủ | `TrainingController::readTutorial($tutorial_id, $reading_id = null)` — `/training/read-... |  | TRN-007, TRN-008 |
| TRN-010 | Tiến độ học của đội (Team Learning Progress) | Trang đầy đủ | `TrainingController::myTeamRecord()` — `/training/my-team-record` |  |  |
| TRN-011 | Cài đặt học viện (Academy Settings) | Trang đầy đủ | `TrainingController::setting()` — `/training/setting` |  |  |
| TRN-012 | Demo bài học giới thiệu (Intro Lesson Demo) | Trang đầy đủ | `TrainingController::page()` — `/training/page` |  |  |
| TRN-013 | Demo kiểm tra kiến thức (Knowledge Check Demo) | Trang đầy đủ | `TrainingController::quizQuestion()` — `/training/quiz-question` |  |  |
| TRN-014 | Demo slide bài học (Lesson Slide Demo) | Trang đầy đủ | `TrainingController::slide2()` — `/training/slide2` |  |  |

## 9. Nhà đầu tư & Kho (Investors & Stock)

### FUND — Vốn nhà đầu tư (9 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| FUND-001 | Tài khoản nhà đầu tư (Investor Accounts) | Trang đầy đủ | `FundController::investors()` — `/fund/investors` (GET, lọc qua query string `id`, `sho... |  | FUND-001-P1, FUND-002, FUND-007 |
| FUND-001-P1 | Gắn nhà đầu tư vào dự án (Link Investor to Project) | Popup | Submit POST tới `FundController::investors()` (`/fund/investors`, field ẩn `action = pr... | FUND-001 | FUND-001 |
| FUND-002 | Sổ giao dịch nhà đầu tư (Investor Ledger) | Trang đầy đủ | `FundController::statements($in_id = null)` — `/fund/statements` hoặc `/fund/statements... |  | FUND-001, FUND-002-P1 |
| FUND-002-P1 | Giao dịch nhà đầu tư: Đầu tư / Rút / Chi trả / Vốn hóa (Investor Transaction: Invest / Withdraw / Payout / Capitalize) | Popup | Submit POST tới `FundController::statements()` (`/fund/statements`, field `action` = `i... | FUND-002 | FUND-002 |
| FUND-003 | Dự án được tài trợ (Funded Projects) | Trang đầy đủ | `FundController::projects()` — `/fund/projects` |  | FUND-004, FUND-005, FUND-006 |
| FUND-004 | Thêm dự án được tài trợ (New Funded Project) | Trang đầy đủ | `FundController::addProject()` — `/fund/add-project` (POST) |  | FUND-003 |
| FUND-005 | Sửa dự án được tài trợ (Edit Funded Project) | Trang đầy đủ | `FundController::updateProject($id)` — `/fund/update-project/:id` (POST) |  | FUND-003, FUND-006 |
| FUND-006 | Hồ sơ dự án được tài trợ (Funded Project Profile) | Trang đầy đủ | `FundController::viewProject($id)` — `/fund/view-project/:id` |  | FUND-003, FUND-005 |
| FUND-007 | Lợi suất nhà đầu tư (Investor Yield Rates) | Trang đầy đủ | `FundController::rates($owner_id)` — `/fund/rates/:owner_id` (GET hiển thị, POST lưu to... |  | FUND-001 |

### INV — Kiểm soát kho (9 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| INV-001 | Mức tồn kho (Stock Levels) | Trang đầy đủ | `InventoryController::list()` — `/inventory/list` |  | INV-001-P1, INV-002 |
| INV-001-P1 | Điều chỉnh hoặc gỡ tồn kho (Adjust or Remove Stock) | Popup | Submit POST tới `InventoryController::list()` (`/inventory/list`, field `action` = `add... | INV-001 | INV-001 |
| INV-002 | Thêm mặt hàng (New Stock Item) | Trang đầy đủ | `InventoryController::add()` — `/inventory/add` (POST) |  | INV-001 |
| INV-003 | Điều chỉnh tồn kho (Adjust Stock) | Trang đầy đủ | `InventoryController::edit($id)` — `/inventory/edit/:id` (`id` được mã hóa base64 trên ... |  | INV-001 |
| INV-004 | Yêu cầu nhập hàng (Incoming Stock Requests) | Trang đầy đủ | `InventoryController::itemRequest()` — `/inventory/item-request` |  | INV-004-P1 |
| INV-004-P1 | Duyệt nhập hàng (Approve Incoming Stock) | Popup | Submit POST tới `InventoryController::itemRequest()` (`/inventory/item-request`) | INV-004 | INV-004 |
| INV-005 | Yêu cầu xóa sổ hàng (Write-off Requests) | Trang đầy đủ | `InventoryController::discard()` — `/inventory/discard` |  | INV-005-P1 |
| INV-005-P1 | Duyệt xóa sổ hàng (Approve Write-off) | Popup | Submit POST tới `InventoryController::discard()` (`/inventory/discard`) | INV-005 | INV-005 |
| INV-006 | Biến động kho (Stock Movements) | Trang đầy đủ | `InventoryController::logs()` — `/inventory/logs` |  |  |

## 10. Dịch vụ lưu trú (In-Stay Services)

### VSV — Dịch vụ lưu trú (38 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| VSV-001 | Tổng quan dịch vụ (Service Overview) | Trang đầy đủ | `VillaServicesController::list()` — mặc định `/villa-services/list` |  | VSV-002, VSV-011, VSV-012 |
| VSV-002 | Thiết lập đo điện (Metering Setup) | Trang đầy đủ | `VillaServicesController::propertySetup($tab = null)` — mặc định `/villa-services/prope... |  | VSV-001 |
| VSV-003 | Chỉ số điện khi đến (Arrival Meter Reading) | Trang đầy đủ | `VillaServicesController::checkIn()` — mặc định `/villa-services/check-in` |  | VSV-003-P1, VSV-004-P1 |
| VSV-003-P1 | Ghi chỉ số khi đến (Record Arrival Reading) | Popup | Xem `VillaServicesController::startMeter($booking_id)` — `/villa-services/start-meter/<... | VSV-003 | VSV-003 |
| VSV-004 | Chỉ số điện khi đi (Departure Meter Reading) | Trang đầy đủ | `VillaServicesController::checkOut()` — mặc định `/villa-services/check-out` |  | VSV-004-P1 |
| VSV-004-P1 | Ghi chỉ số khi đi (Record Departure Reading) | Popup | `VillaServicesController::endMeter($booking_id)` — `/villa-services/end-meter/<booking_... | VSV-004 | VSV-004 |
| VSV-005 | Đo điện lưu trú dài ngày (Extended-Stay Metering) | Trang đầy đủ | `VillaServicesController::partial()` — mặc định `/villa-services/partial`; các bộ lọc đ... |  | VSV-005-P1 |
| VSV-005-P1 | Ghi chỉ số lưu trú dài ngày (Record Extended-Stay Reading) | Popup | `VillaServicesController::addLongStayMeter($booking_id)` — `/villa-services/add-long-st... | VSV-005 | VSV-005 |
| VSV-006 | Tất toán hóa đơn điện (Power Bill Settlement) | Trang đầy đủ | `VillaServicesController::reconcile()` — mặc định `/villa-services/reconcile` |  | VSV-004-P1, VSV-005-P1 |
| VSV-007 | Hóa đơn tiện ích (Utility Invoices) | Trang đầy đủ | `VillaServicesController::monthlyBill()` — mặc định `/villa-services/monthly-bill` (POS... |  |  |
| VSV-008 | Thu hồi chi phí điện (Power Cost Recovery) | Trang đầy đủ | `VillaServicesController::monthlyBalance()` — mặc định `/villa-services/monthly-balance... |  |  |
| VSV-009 | Hạng mục tính phí (Billable Items) | Trang đầy đủ | `VillaServicesController::item()` — mặc định `/villa-services/item` |  |  |
| VSV-010 | Đưa đón khách (Guest Transfers) | Trang đầy đủ | `VillaServicesController::transfer()` — mặc định `/villa-services/transfer` |  |  |
| VSV-011 | Kiểm tra chỉ số khi đến (Arrival Reading Audit) | Trang đầy đủ | `VillaServicesController::electricityCheckInControl()` — mặc định `/villa-services/elec... |  | VSV-001, VSV-011-P1 |
| VSV-011-P1 | Chi tiết chỉ số khi đến (Arrival Reading Detail) | Popup | `VillaServicesController::viewCheckinControl($id)` — `/villa-services/view-checkin-cont... | VSV-011 | VSV-011 |
| VSV-012 | Kiểm tra chỉ số khi đi (Departure Reading Audit) | Trang đầy đủ | `VillaServicesController::electricityCheckOutControl()` — mặc định `/villa-services/ele... |  | VSV-001, VSV-012-P1 |
| VSV-012-P1 | Chi tiết chỉ số khi đi (Departure Reading Detail) | Popup | `VillaServicesController::viewCheckOutControl($id)` — `/villa-services/view-checkout-co... | VSV-012 | VSV-012 |
| VSV-013 | Ăn uống tại chỗ (In-Villa Dining) | Trang đầy đủ | `VillaServicesController::food()` — mặc định `/villa-services/food` |  |  |
| VSV-014 | Tổng quan dọn phòng (Housekeeping Overview) | Trang đầy đủ | `VillaServicesController::cleaning()` — mặc định `/villa-services/cleaning` |  | VSV-016 |
| VSV-015 | Phí điện của khách (Guest Power Charges) | Trang đầy đủ | `VillaServicesController::checkStay()` — mặc định `/villa-services/check-stay`; dữ liệu... |  |  |
| VSV-016 | Tổ dọn phòng (Housekeeping Crews) | Trang đầy đủ | `VillaServicesController::cleaningTeams()` — mặc định `/villa-services/cleaning-teams`;... |  |  |
| VSV-017 | Trung tâm chăm vườn (Garden Care Hub) | Trang đầy đủ | `VillaServicesController::garden($tab, $sub_tab)` — mặc định `/villa-services/garden/<t... |  | VSV-017-P1 |
| VSV-017-P1 | Chi tiết lượt chăm vườn (trung tâm) (Garden Care Visit Detail) | Popup | `VillaServicesController::gardenView($id)` — `/villa-services/garden-view/<garden_job_id>` | VSV-017 | VSV-017 |
| VSV-018 | Tổ chăm vườn (Garden Crews) | Trang đầy đủ | `VillaServicesController::gardenTeams()` — mặc định `/villa-services/garden-teams`; lưu... |  | VSV-017 |
| VSV-019 | Lập lịch chăm vườn (Garden Visit Planner) | Trang đầy đủ | `VillaServicesController::gardenPlanning($tab)` — mặc định `/villa-services/garden-plan... |  | VSV-017 |
| VSV-020 | Việc chăm vườn hôm nay (Today's Garden Jobs) | Trang đầy đủ | `VillaServicesController::gardenJobList()` — mặc định `/villa-services/garden-job-list` |  | VSV-020-P1 |
| VSV-020-P1 | Tiến độ việc chăm vườn (Garden Job Progress) | Popup | `VillaServicesController::gardenJobStatus()` — `/villa-services/garden-job-status` | VSV-020 | VSV-020 |
| VSV-021 | Báo cáo kiểm tra (Inspection Reports) | Trang đầy đủ | `VillaServicesController::inspection()` — mặc định `/villa-services/inspection`; dữ liệ... |  | VSV-021-P1, VSV-022, VSV-022-P1 |
| VSV-021-P1 | Chi tiết báo cáo kiểm tra (Inspection Report Detail) | Popup | `VillaServicesController::inspectionView()` — `/villa-services/inspectionView?id=<inspe... | VSV-021 | VSV-021 |
| VSV-022 | Phân loại kết quả kiểm tra (Inspection Triage) | Popup | `VillaServicesController::inspectionEdit()` — `/villa-services/inspectionEdit?id=<inspe... | VSV-021 | VSV-021, VSV-022-P1 |
| VSV-022-P1 | Xử lý hạng mục kiểm tra (Resolve Inspection Items) | Popup | `VillaServicesController::inspectionEditDetails()` — `/villa-services/inspectionEditDet... | VSV-021 | VSV-021, VSV-022 |
| VSV-023 | Lượt chăm sóc hồ bơi (Pool Care Visits) | Trang đầy đủ | `VillaServicesController::pool()` — mặc định `/villa-services/pool`; upload/duyệt báo g... |  |  |
| VSV-024 | Tổng quan làm mới phòng (Room Refresh Overview) | Trang đầy đủ | `VillaServicesController::makeUp()` — mặc định `/villa-services/make-up` |  | VSV-025 |
| VSV-025 | Lịch làm mới phòng hằng ngày (Daily Refresh Rota) | Trang đầy đủ | `VillaServicesController::makeupTeams()` — mặc định `/villa-services/makeup-teams`; dan... |  | VSV-025-P1 |
| VSV-025-P1 | Chi tiết tiến độ làm mới (Refresh Progress Detail) | Popup | `VillaServicesController::makeupTeamsDetail($id, $location)` — `/villa-services/makeup-... | VSV-025 | VSV-025 |
| VSV-026 | Lịch dọn phòng chuyển khách (Turnover Cleaning Rota) | Trang đầy đủ | `VillaServicesController::planningTeams()` — mặc định `/villa-services/planning-teams`;... |  | VSV-016, VSV-026-P1 |
| VSV-026-P1 | Chi tiết tiến độ dọn chuyển khách (Turnover Progress Detail) | Popup | `VillaServicesController::planningTeamsDetail($id, $location)` — `/villa-services/plann... | VSV-026 | VSV-026 |
| VSV-027 | Kiểm tra chỉ số – bản cổ điển (Meter Audit (Classic)) | Trang đầy đủ | `VillaServicesController::control()` — mặc định `/villa-services/control`; dữ liệu điều... |  | VSV-011, VSV-012 |

## 11. Web & Truyền thông (Web & Media)

### CMS — Xuất bản web (34 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| CMS-001 | Trang web tài sản (Property Web Pages) | Trang đầy đủ | `CmsController::list($id)` — mặc định `/cms/list/:id` |  | CMS-002 |
| CMS-002 | Trang web của tài sản (Property Web Page) | Trang đầy đủ | `CmsController::cms($tab, $villa_id, $lang1)` — mặc định `/cms/cms/:tab/:villa_id/:lang... |  | CMS-001, CMS-003 |
| CMS-003 | Trưng bày dịch vụ (Service Showcase) | Trang đầy đủ | `CmsController::cmsServicesList($action, $id)` — mặc định `/cms/cms-services-list/:acti... |  | CMS-004, CMS-005 |
| CMS-004 | Trình sửa dịch vụ trưng bày (Showcase Service Editor) | Trang đầy đủ | `CmsController::cmsServices($id)` — mặc định `/cms/cms-services/:id` |  | CMS-003 |
| CMS-005 | Khối nội dung dùng chung (Shared Content Blocks) | Trang đầy đủ | `CmsController::commonText()` — mặc định `/cms/common-text` |  | CMS-003, CMS-006, CMS-009, CMS-012, CMS-014, CMS-016 |
| CMS-006 | Lợi ích đặt trực tiếp (Book-Direct Benefits) | Trang đầy đủ | `CmsController::whyUs($action, $id)` — mặc định `/cms/why-us/:action/:id` |  | CMS-005, CMS-007, CMS-008 |
| CMS-007 | Thêm lợi ích đặt trực tiếp (New Book-Direct Benefit) | Trang đầy đủ | `CmsController::whyUsAdd()` — mặc định `/cms/why-us-add` |  | CMS-006 |
| CMS-008 | Sửa lợi ích đặt trực tiếp (Edit Book-Direct Benefit) | Trang đầy đủ | `CmsController::whyUsEdit($id)` — mặc định `/cms/why-us-edit/:id` |  | CMS-006 |
| CMS-009 | Huy hiệu báo chí & đối tác (Press & Partner Badges) | Trang đầy đủ | `CmsController::logos($action, $id)` — mặc định `/cms/logos/:action/:id` |  | CMS-005, CMS-010, CMS-011 |
| CMS-010 | Thêm huy hiệu đối tác (New Partner Badge) | Trang đầy đủ | `CmsController::logoAdd()` — mặc định `/cms/logo-add` |  | CMS-009 |
| CMS-011 | Sửa huy hiệu đối tác (Edit Partner Badge) | Trang đầy đủ | `CmsController::logoEdit($id)` — mặc định `/cms/logo-edit/:id` |  | CMS-009 |
| CMS-012 | Cẩm nang điểm đến (Destination Guides) | Trang đầy đủ | `CmsController::destination($action, $id)` — mặc định `/cms/destination/:action/:id` |  | CMS-005, CMS-013 |
| CMS-013 | Trình sửa cẩm nang điểm đến (Destination Guide Editor) | Trang đầy đủ | `CmsController::destinationEdit($district_id)` — mặc định `/cms/destination-edit/:distr... |  | CMS-012 |
| CMS-014 | Điểm đến trang tổng hợp (Aggregator Destinations) | Trang đầy đủ | `CmsController::destinationGlobal()` — mặc định `/cms/destination-global` |  | CMS-005, CMS-015 |
| CMS-015 | Trình sửa điểm đến tổng hợp (Aggregator Destination Editor) | Trang đầy đủ | `CmsController::destinationGlobalEdit($district_id)` — mặc định `/cms/destination-globa... |  | CMS-014 |
| CMS-016 | Biểu mẫu liên hệ (Enquiry Forms) | Trang đầy đủ | `CmsController::contactForm($action, $id)` — mặc định `/cms/contact-form/:action/:id` |  | CMS-005, CMS-017 |
| CMS-017 | Trình sửa biểu mẫu liên hệ (Enquiry Form Editor) | Trang đầy đủ | `CmsController::editContactForm($id)` — mặc định `/cms/edit-contact-form/:id` |  | CMS-016 |
| CMS-018 | Trưng bày concierge (Concierge Showcase) | Trang đầy đủ | `CmsController::concierges($action, $id)` — mặc định `/cms/concierges/:action/:id` |  | CMS-005, CMS-019 |
| CMS-019 | Trình sửa dịch vụ concierge (Concierge Service Editor) | Trang đầy đủ | `CmsController::editConcierges($id)` — mặc định `/cms/edit-concierges/:id` |  | CMS-018 |
| CMS-020 | Bản dịch giao diện (Interface Translations) | Trang đầy đủ | `CmsController::cmsTranslation($tab)` — mặc định `/cms/cms-translation/:tab` |  |  |
| CMS-021 | Trang chủ đề (Themed Sites) | Trang đầy đủ | `CmsController::collectionWebsites($action, $id)` — mặc định `/cms/collection-websites/... |  | CMS-022, CMS-023 |
| CMS-022 | Trình sửa trang chủ đề (Themed Site Editor) | Trang đầy đủ | `CmsController::collectionWebsiteEdit($id)` — mặc định `/cms/collection-website-edit/:id` |  | CMS-021 |
| CMS-023 | Nội dung trang chủ đề (Themed Site Content) | Trang đầy đủ | `CmsController::collectionTabs($tab, $id)` — mặc định `/cms/collection-tabs/:tab/:id` |  | CMS-021, CMS-022, CMS-024, CMS-025, CMS-026, CMS-027, CMS-028, CMS-029 |
| CMS-024 | Đoạn văn trang chủ đề (Themed Site Snippets) | Trang đầy đủ | `CmsController::collectionCommonText($action, $id)` — mặc định `/cms/collection-common-... |  | CMS-023, CMS-025 |
| CMS-025 | Trình sửa đoạn văn trang chủ đề (Themed Site Snippet Editor) | Trang đầy đủ | `CmsController::editCollectionCommonText($id)` — mặc định `/cms/edit-collection-common-... |  | CMS-023, CMS-024 |
| CMS-026 | Nhật ký du lịch (Travel Journal) | Trang đầy đủ | `CmsController::insights($action, $id)` — mặc định `/cms/insights/:action/:id` |  | CMS-023, CMS-027 |
| CMS-027 | Trình sửa bài nhật ký (Journal Article Editor) | Trang đầy đủ | `CmsController::insightsEdit($id)` — mặc định `/cms/insights-edit/:id` |  | CMS-023, CMS-026 |
| CMS-028 | Danh sách trải nghiệm mong muốn (Experience Wishlist) | Trang đầy đủ | `CmsController::iWish($action, $id)` — mặc định `/cms/i-wish/:action/:id` |  | CMS-023, CMS-029 |
| CMS-029 | Trình sửa mục mong muốn (Wishlist Item Editor) | Trang đầy đủ | `CmsController::iWishEdit($id)` — mặc định `/cms/i-wish-edit/:id` |  | CMS-023, CMS-028 |
| CMS-030 | Hướng dẫn đường đến (Getting-There Guides) | Trang đầy đủ | `CmsController::arrival($action, $id)` — mặc định `/cms/arrival` (danh sách); xoá dùng ... |  | CMS-031 |
| CMS-031 | Trình sửa hướng dẫn đường đến (Getting-There Guide Editor) | Trang đầy đủ | `CmsController::cmsArrival($id)` — mặc định `/cms/cms-arrival/:id` |  | CMS-030 |
| CMS-032 | Gợi ý ăn uống (Dining Picks) | Trang đầy đủ | `CmsController::guestPortal()` — mặc định `/cms/guest-portal` |  | CMS-033 |
| CMS-033 | Trình sửa gợi ý ăn uống (Dining Pick Editor) | Trang đầy đủ | `CmsController::restaurants($tab, $restaurant_id)` — mặc định `/cms/restaurants/:tab/:r... |  | CMS-032 |
| CMS-034 | Mẫu thỏa thuận (Agreement Templates) | Trang đầy đủ | `CmsController::contracts()` — mặc định `/cms/contracts` (GET có thể kèm query `country... |  |  |

### EMT — Thư viện email (4 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| EMT-001 | Thư viện email (Email Library) | Trang đầy đủ | `EmailTemplateController::list()` — mặc định `/email-template/list` |  | EMT-001-P1, EMT-002, EMT-003 |
| EMT-001-P1 | Xác nhận xóa mẫu (Confirm Template Deletion) | Popup | Modal tĩnh trong `list.ctp`; xác nhận điều hướng tới `EmailTemplateController::delete($... | EMT-001 | EMT-001 |
| EMT-002 | Thêm mẫu email (New Email Template) | Trang đầy đủ | `EmailTemplateController::add()` — mặc định `/email-template/add` |  | EMT-001 |
| EMT-003 | Trình sửa mẫu email (Email Template Editor) | Trang đầy đủ | `EmailTemplateController::edit($id)` — mặc định `/email-template/edit/:id` (id mã hóa b... |  | EMT-001 |

### NOT — Thông báo nội bộ (9 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| NOT-001 | Tạo thông báo (New Announcement) | Trang đầy đủ | `NoticeController::noticeBoard()` — mặc định `/notice/notice-board` (route đẹp không đư... |  | NOT-002 |
| NOT-002 | Thông báo & công việc (Announcements & Tasks) | Trang đầy đủ | `NoticeController::noticeList($tab, $sub_tab)` — mặc định `/notice/notice-list/:tab/:su... |  | NOT-001, NOT-003, NOT-004, NOT-005 |
| NOT-002-P1 | Xác nhận xóa thông báo (Confirm Announcement Deletion) | Popup | Modal tĩnh trong `notice_list.ctp`; hành động xóa gọi `NoticeController::delete($id)` q... | NOT-002 | NOT-002 |
| NOT-003 | Xem thông báo (Announcement View) | Trang đầy đủ | `NoticeController::viewDetail($id)` — mặc định `/notice/view-detail/:id` |  | NOT-002, NOT-003-P1 |
| NOT-003-P1 | Xóa thông báo từ trang chi tiết (Delete Announcement from Detail) | Popup | Modal tĩnh trong `view_detail.ctp`; xác nhận gọi `NoticeController::delete($id)` qua `G... | NOT-003 | NOT-003 |
| NOT-004 | Làm thay đồng nghiệp (Cover for Colleague) | Trang đầy đủ | `NoticeController::helpOtheruser($id)` — mặc định `/notice/help-otheruser/:id` |  | NOT-002, NOT-003 |
| NOT-005 | Bản tin nội bộ (Newsroom) | Trang đầy đủ | `NoticeController::companyNews()` — mặc định `/notice/company-news` |  | NOT-002, NOT-005-P1, NOT-006 |
| NOT-005-P1 | Xác nhận xóa bài đăng (Confirm Post Deletion) | Popup | Modal tĩnh trong `company_news.ctp`; xác nhận gọi `NoticeController::deleteCompanyNews(... | NOT-005 | NOT-005 |
| NOT-006 | Thêm bài bản tin (New Newsroom Post) | Trang đầy đủ | `NoticeController::addCompanyNews()` — mặc định `/notice/add-company-news` |  | NOT-005 |

### TXT — Kho mô tả (4 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| TXT-001 | Kho mô tả (Description Bank) | Trang đầy đủ | `TextsController::index()` — mặc định `/texts` |  | TXT-001-P1, TXT-001-P2, TXT-001-P3 |
| TXT-001-P1 | Trình sửa mô tả (Description Editor) | Popup | Modal tĩnh trong `index.ctp` (`#texts-editor-modal`); lưu qua AJAX `TextsController::sa... | TXT-001 | TXT-001 |
| TXT-001-P2 | Thêm ngôn ngữ mô tả (Add Description Languages) | Popup | Modal tĩnh trong `index.ctp` (`#texts-language-modal`); lưu qua AJAX `TextsController::... | TXT-001 | TXT-001 |
| TXT-001-P3 | Xác nhận xóa mô tả (Confirm Description Deletion) | Popup | Modal tĩnh dùng chung trong `index.ctp` (`#texts-delete-modal`); xác nhận gọi AJAX `Tex... | TXT-001 | TXT-001 |

### PHO — Thư viện ảnh (8 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| PHO-001 | Điều phối buổi chụp (Shoot Coordination) | Trang đầy đủ | `PhotosController::planning($shootId)` — mặc định `/photos/planning/:shootId` |  |  |
| PHO-002 | Album ảnh (Photo Albums) | Trang đầy đủ | `PhotosController::index()` — mặc định `/photos/index` (hoặc `/photos/`) |  | PHO-006, PHO-007 |
| PHO-003 | Album khu vực chung (Shared Space Albums) | Trang đầy đủ | `PhotosController::commonAreas()` — route đẹp `/photos/common-areas` (khai báo tường mi... |  | PHO-002, PHO-004, PHO-005, PHO-008 |
| PHO-004 | Khu vực chung theo khu căn hộ (Residence Shared Spaces) | Trang đầy đủ | `PhotosController::residence($residenceId)` — route đẹp `/photos/residence/:id` (khai b... |  | PHO-003, PHO-005 |
| PHO-005 | Chi tiết album khu vực chung (Shared Space Album) | Trang đầy đủ | `PhotosController::residenceDetail($residenceId, $setType = 'ota')` — route đẹp `/photo... |  | PHO-003, PHO-004 |
| PHO-006 | Thư viện ảnh tài sản (Property Gallery) | Trang đầy đủ | `PhotosController::property($villaId)` — route mặc định `/photos/property/:id` (không k... |  | PHO-002, PHO-003, PHO-004, PHO-005, PHO-007, PHO-008 |
| PHO-007 | Album ảnh tài sản (Property Album) | Trang đầy đủ | `PhotosController::detail($villaId, $setType = 'ota')` — route mặc định `/photos/detail... |  | PHO-002, PHO-004, PHO-006 |
| PHO-008 | Yêu cầu ảnh (Photo Requirements) | Trang đầy đủ | `PhotosController::settings()` — route mặc định `/photos/settings` |  | PHO-002, PHO-003, PHO-004, PHO-006, PHO-007 |

### VID — Video hướng dẫn (5 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| VID-001 | Video hướng dẫn (Video Guides) | Trang đầy đủ | `VideosController::index()` — mặc định `/videos` |  | VID-001-P1, VID-001-P2, VID-001-P3, VID-001-P4 |
| VID-001-P1 | Thêm video hướng dẫn (New Video Guide) | Popup | Modal tĩnh trong `index.ctp` (`#video-add-modal`); lưu qua `VideosController::add()` — ... | VID-001 | VID-001 |
| VID-001-P2 | Sửa video hướng dẫn (Edit Video Guide) | Popup | Modal tĩnh trong `index.ctp` (`#video-edit-modal`); lưu qua `VideosController::edit($id... | VID-001 | VID-001 |
| VID-001-P3 | Trình phát video (Video Guide Player) | Popup | Modal tĩnh trong `index.ctp` (`#video-player-modal`); nội dung phát qua `VideosControll... | VID-001 | VID-001 |
| VID-001-P4 | Xác nhận xóa video (Confirm Video Deletion) | Popup | Modal tĩnh trong `index.ctp` (`#video-confirm-modal`); xác nhận gọi AJAX `VideosControl... | VID-001 | VID-001 |

### OTA — Nội dung kênh (3 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| OTA-001 | Nội dung listing theo kênh (Channel Listing Copy) | Trang đầy đủ | `OtaContentController::listing($platformId)` — mặc định `/ota-content/listing/:platformId` |  | OTA-001-P1, OTA-001-P2 |
| OTA-001-P1 | Chọn thành phần listing (Pick Listing Elements) | Popup | Modal tĩnh trong `listing.ctp`; lưu lựa chọn qua AJAX `OtaContentController::assignElem... | OTA-001 | OTA-001 |
| OTA-001-P2 | Xác nhận gỡ thành phần (Confirm Element Removal) | Popup | Modal tĩnh trong `listing.ctp`; xác nhận gọi AJAX `OtaContentController::removeAssignme... | OTA-001 | OTA-001 |

### PAGE — Trang tiện ích (1 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| PAGE-001 | Kiểm tra tình trạng nền tảng (Platform Health Check) | Trang đầy đủ | `PagesController::display(...$path)` — mặc định `/pages/*` (route được comment tắt tron... |  |  |

## 12. Tài chính & Hành chính (Finance & Admin)

### ACC — Tài chính & Hành chính (41 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| ACC-007 | Sổ cái tài khoản (Account Ledger) | Trang đầy đủ | `AccountController::statements($account_id)` — mặc định `/account/statements/<account_i... |  | ACC-007-P1, ACC-007-P2 |
| ACC-007-P1 | Thêm bút toán (New Ledger Entry) | Popup | `AccountController::addStatement($account_id)` — mặc định `/account/add-statement/<acco... | ACC-007 | ACC-007 |
| ACC-007-P2 | Sửa bút toán (Edit Ledger Entry) | Popup | `AccountController::editStatement($id)` — mặc định `/account/edit-statement/<id>` (`id`... | ACC-007 | ACC-007 |
| ACC-008 | Nhóm bút toán (Entry Categories) | Trang đầy đủ | `AccountController::accountingCategories()` — mặc định `/account/accounting-categories` |  |  |
| ACC-009 | Khớp số dư ngân hàng (Bank Matching) | Trang đầy đủ | `AccountController::statementReconcile()` — mặc định `/account/statement-reconcile` |  |  |
| ACC-023 | Cấu trúc tài khoản (Account Structure) | Trang đầy đủ | `AccountController::chartAccounts()` — mặc định `/account/chart-accounts` |  | ACC-023-P1, ACC-023-P2 |
| ACC-023-P1 | Chi tiết cấu trúc tài khoản (Account Structure Details) | Popup | `AccountController::viewChartAccount($id)` — mặc định `/account/view-chart-account/<id>... | ACC-023 | ACC-023 |
| ACC-023-P2 | Sửa cấu trúc tài khoản (Edit Account Structure) | Popup | `AccountController::editChartAccount($id)` — mặc định `/account/edit-chart-account/<id>... | ACC-023 | ACC-023 |
| ACC-028 | Khớp số dư – bản cổ điển (Bank Matching (Classic)) | Trang đầy đủ | `AccountController::reconcile()` — mặc định `/account/reconcile` |  | ACC-009 |
| ACC-029 | Tóm tắt tài chính (Finance Summary) | Trang đầy đủ | `AccountController::index()` — mặc định `/account/index` (không có tham số) |  | ACC-007, ACC-030, ACC-031, ACC-032 |
| ACC-030 | Khớp chi trả theo kênh (Channel Payout Matching) | Trang đầy đủ |  |  | ACC-007 |
| ACC-031 | Tùy chọn tài chính (Finance Preferences) | Trang đầy đủ | `AccountController::setting()` — mặc định `/account/setting` (không có tham số) |  | ACC-032 |
| ACC-032 | Đội xe công ty (Company Fleet) | Trang đầy đủ |  |  |  |
| ACC-033 | Nhật ký chuyên cần (Attendance Log) | Trang đầy đủ | `AccountController::timesheet()` — mặc định `/account/timesheet` |  |  |
| ACC-034 | Kỳ trả lương (Pay Runs) | Trang đầy đủ | `AccountController::payroll()` — mặc định `/account/payroll` |  |  |
| ACC-038 | Thiết bị di động (Mobile Devices) | Trang đầy đủ | `AccountController::phones()` — mặc định `/account/phones` |  |  |
| ACC-039 | Thiết bị CNTT (IT Equipment) | Trang đầy đủ | `AccountController::computers()` — mặc định `/account/computers` |  |  |
| ACC-040 | Thuê bao di động (Mobile Lines) | Trang đầy đủ | `AccountController::simCards()` — mặc định `/account/sim-cards` |  |  |
| ACC-041 | Chu kỳ lương (Pay Periods) | Trang đầy đủ | `AccountController::wagePeriods()` — mặc định `/account/wage-periods` |  |  |
| ACC-042 | Thu nhập theo ngày (Daily Earnings) | Trang đầy đủ | `AccountController::dailyWages()` — mặc định `/account/daily-wages` |  |  |
| ACC-053 | Lịch ngày lễ (Holiday Calendar) | Trang đầy đủ | `AccountController::publicHolidays()` — mặc định `/account/public-holidays` |  | ACC-053-P1, ACC-053-P2 |
| ACC-053-P1 | Thêm ngày lễ (New Holiday) | Popup | `AccountController::addPublicHoliday()` — mặc định `/account/add-public-holiday` | ACC-053 | ACC-053 |
| ACC-053-P2 | Sửa ngày lễ (Edit Holiday) | Popup | `AccountController::editPublicHoliday($id)` — mặc định `/account/edit-public-holiday/<i... | ACC-053 | ACC-053 |
| ACC-054 | Chi phí theo lịch (Scheduled Costs) | Trang đầy đủ | `AccountController::recurring()` — mặc định `/account/recurring` |  |  |
| ACC-055 | Nhóm chi phí (Cost Categories) | Trang đầy đủ | `AccountController::expenseType()` — mặc định `/account/expense-type` |  |  |
| ACC-056 | Khoản tính lại cho chủ nhà (Owner Recharges) | Trang đầy đủ | `AccountController::rebill()` — mặc định `/account/rebill` |  | ACC-056-P1, ACC-056-P2 |
| ACC-056-P1 | Thêm khoản tính lại (New Owner Recharge) | Popup | `AccountController::addRebill()` — mặc định `/account/add-rebill` | ACC-056 | ACC-056 |
| ACC-056-P2 | Sửa khoản tính lại (Edit Owner Recharge) | Popup | `AccountController::editRebill($id)` — mặc định `/account/edit-rebill/<id>` | ACC-056 | ACC-056 |
| ACC-057 | Đơn vị cung ứng hàng hóa (Goods Vendors) | Trang đầy đủ | `AccountController::suppliers()` — mặc định `/account/suppliers` |  | ACC-057-P1, ACC-058 |
| ACC-057-P1 | Form đơn vị cung ứng hàng hóa (Goods Vendor Form) | Popup | `AccountController::addSupplier($tab, $id, $show_page, $payment_detail_id)` — mặc định ... | ACC-057 | ACC-057 |
| ACC-058 | Danh mục hàng hóa (Goods Catalog) | Trang đầy đủ | `AccountController::products($tab)` — mặc định `/account/products/<tab>` |  | ACC-058-P1 |
| ACC-058-P1 | Form mặt hàng (Goods Item Form) | Popup | `AccountController::addProduct($id)` — mặc định `/account/add-product/<id>` | ACC-058 | ACC-058 |
| ACC-059 | Đơn vị cung ứng dịch vụ (Service Vendors) | Trang đầy đủ | `AccountController::servicesSupplier()` — mặc định `/account/services-supplier` |  | ACC-059-P1, ACC-060 |
| ACC-059-P1 | Form đơn vị cung ứng dịch vụ (Service Vendor Form) | Popup | `AccountController::addServicesSupplier($tab, $id, $show_page, $payment_detail_id)` — m... | ACC-059 | ACC-059 |
| ACC-060 | Dịch vụ tính phí (Billable Services) | Trang đầy đủ | `AccountController::services($tab)` — mặc định `/account/services/<tab>` |  |  |
| ACC-061 | Hạn mức chi tiêu (Spending Limits) | Trang đầy đủ | `AccountController::approvalMatrix()` — mặc định `/account/approval-matrix` |  |  |
| ACC-062 | Tạm ứng tiền mặt (Cash Advances) | Trang đầy đủ | `AccountController::pettyCash($tab, $sub_tab)` — mặc định `/account/petty-cash/<tab>/<s... |  | ACC-063 |
| ACC-063 | Quyết toán chi phí (Expense Settlements) | Trang đầy đủ | `AccountController::expensePayment($tab)` — mặc định `/account/expense-payment/<tab>` |  | ACC-007, ACC-062 |
| ACC-064 | Phê duyệt thanh toán (Payment Approvals) | Trang đầy đủ | `AccountController::paymentRequestList()` — mặc định `/account/payment-request-list` |  | ACC-062, ACC-063, ACC-064-P1, ACC-064-P2 |
| ACC-064-P1 | Lập yêu cầu thanh toán (New Payment Request) | Popup | `AccountController::paymentRequest()` (hiển thị form) + `AccountController::addPaymentR... | ACC-064 | ACC-064 |
| ACC-064-P2 | Sửa yêu cầu thanh toán (Edit Payment Request) | Popup | `AccountController::editPaymentRequest($id)` (hiển thị form) + `AccountController::upda... | ACC-064 | ACC-064 |
