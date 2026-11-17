# Sitemap — Azura Manager PMS

Tài liệu liệt kê toàn bộ màn hình (bao gồm popup/modal) của hệ thống Azura Manager PMS, phục vụ dự án re-design UI/UX. Mỗi màn hình có mã riêng; mô tả chi tiết (field, loại dữ liệu...) nằm trong thư mục `output/screens/<mã>-*.md`.

## Tổng quan số lượng màn hình theo module

| # | Module | Prefix | Số màn hình/popup |
|---|---|---|---|
| 1 | Đăng nhập & Người dùng hệ thống | LOG, USR | 28 |
| 2 | Dữ liệu chủ (Master Data) | PROP, COMP, BU, VCS | 117 |
| 3 | Cấu hình hệ thống | CS, SET | 26 |
| 4 | Đặt phòng (Booking) | BOOK | 100 |
| 5 | Quản lý chủ sở hữu (Admin) | OWN | 22 |
| 6 | Cổng thông tin Chủ sở hữu (Owner Portal) | OWP | 31 |
| 7 | Cổng thông tin Khách (Guest Portal) | GST | 11 |
| 8 | Vận hành hiện trường (Field Operations) | OPR, MNT, REN, TRN | 79 |
| 9 | Tài chính | FUND, INV | 18 |
| 10 | Dịch vụ villa | VSV | 38 |
| 11 | Quản trị nội dung (CMS) | CMS, EMT, NOT, TXT, PHO, VID, OTA, PAGE | 68 |
| 12 | Tài khoản & Nhân sự | ACC | 41 |
| | **Tổng cộng** | | **579** |

## Chú thích

- **Mã màn hình**: `<PREFIX>-<số thứ tự>` cho trang đầy đủ (vd `BOOK-001`), `<PREFIX>-<số>-P<n>` cho popup/modal con của trang đó (vd `BOOK-001-P1`).
- **Loại**: Trang đầy đủ (full page) hoặc Popup/Modal (nêu rõ mở từ màn hình cha).
- **Mở từ**: mã màn hình cha dẫn tới màn hình này (áp dụng chủ yếu cho popup).
- **Điều hướng đến**: các mã màn hình có thể điều hướng tới từ màn hình này (theo phân tích code, có thể chưa đầy đủ 100% với các luồng AJAX phức tạp — xem chi tiết trong file mô tả từng màn hình).

## 1. Đăng nhập & Người dùng hệ thống

### LOG — Đăng nhập (4 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| LOG-001 | Đăng nhập (Login) | Trang đầy đủ | `LoginController::index()` — mặc định `login/index`; route đẹp: `/` (trang gốc của hệ t... |  | LOG-001-P1, USR-001 |
| LOG-001-P1 | Quên mật khẩu (Forgot Password) | Popup | `LoginController::forgotPassword()` — mặc định `login/forgotPassword`; route đẹp: `/for... | LOG-001 | LOG-001, LOG-002 |
| LOG-002 | Đặt lại mật khẩu (Reset Password) | Trang đầy đủ | `LoginController::resetPassword($token)` — mặc định `login/resetPassword/:token`; route... |  | LOG-001, LOG-001-P1 |
| LOG-003 | Cài đặt hệ thống (Settings) | Trang đầy đủ | `LoginController::settings()` — mặc định `login/settings` |  | USR-003 |

### USR — Người dùng hệ thống (24 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| USR-001 | Trang tổng quan (Dashboard) | Trang đầy đủ | `UserController::dashboard()` — mặc định `user/dashboard`; route đẹp: `/user/dashboard` |  | LOG-001 |
| USR-002 | Chỉ số kinh doanh (Indicators) | Trang đầy đủ | `UserController::indicators()` — mặc định `user/indicators` |  |  |
| USR-003 | Cài đặt hệ thống (Settings) | Trang đầy đủ | `UserController` kế thừa `LoginController::settings()` — mặc định `user/settings` (khôn... |  |  |
| USR-004 | Danh sách người dùng (nhân viên nội bộ) | Trang đầy đủ | `UserController::list($tab)` — mặc định `user/list/:tab` |  | USR-005, USR-006, USR-007 |
| USR-005 | Thêm người dùng (nhân viên nội bộ) | Trang đầy đủ | `UserController::add($tab)` — mặc định `user/add/:tab` |  | USR-004, USR-006 |
| USR-006 | Sửa người dùng (nhân viên nội bộ) | Trang đầy đủ | `UserController::edit($tab, $id, $show_page, $bank_account_id)` — mặc định `user/edit/:... |  | USR-004, USR-005 |
| USR-007 | Xem chi tiết người dùng | Trang đầy đủ | `UserController::viewDetails($id, $tab)` — mặc định `user/viewDetails/:id/:tab` |  | USR-004, USR-006 |
| USR-008 | Hồ sơ cá nhân (My Profile) | Trang đầy đủ | `UserController::profile()` — mặc định `user/profile` |  | LOG-001, USR-008-P1 |
| USR-008-P1 | Đổi mật khẩu (Change Password) | Popup | `UserController::changePassword()` — mặc định `user/changePassword` | USR-008 | LOG-001, USR-008 |
| USR-009 | Ngày nghỉ cố định hàng tuần (Weekly Off) | Trang đầy đủ | `UserController::weeklyOff()` — mặc định `user/weeklyOff` |  | USR-004 |
| USR-010 | Số ngày phép được cấp (Granted Leaves) | Trang đầy đủ | `UserController::grantedLeaves()` — mặc định `user/grantedLeaves` |  | USR-004, USR-011 |
| USR-011 | Gán ngày nghỉ phép cho nhân viên (Assign Leaves) | Trang đầy đủ | `UserController::assignLeaves($id, $role)` — mặc định `user/assignLeaves/:id/:role` |  | USR-010 |
| USR-012 | Danh sách Cộng tác viên/Đại lý bán hàng (Agents) | Trang đầy đủ | `UserController::agents()` — mặc định `user/agents` |  | USR-013, USR-014 |
| USR-013 | Thêm Cộng tác viên (Add Agent) | Trang đầy đủ | `UserController::addAgents()` — mặc định `user/addAgents` |  | USR-012 |
| USR-014 | Sửa Cộng tác viên (Edit Agent) | Trang đầy đủ | `UserController::editAgents($id)` — mặc định `user/editAgents/:id` |  | USR-012 |
| USR-015 | Thống kê đặt phòng (Statistics) | Trang đầy đủ | `UserController::statistics()` — mặc định `user/statistics` |  |  |
| USR-016 | Danh sách Nhà cung cấp dịch vụ (Providers) | Trang đầy đủ | `UserController::providers($tab)` — mặc định `user/providers` |  | USR-017, USR-018, USR-019 |
| USR-017 | Thêm Nhà cung cấp dịch vụ (Add Provider) | Trang đầy đủ | `UserController::addProviders()` — mặc định `user/addProviders` |  | USR-016 |
| USR-018 | Sửa Nhà cung cấp dịch vụ (Edit Provider) | Trang đầy đủ | `UserController::editProvider($id)` — mặc định `user/editProvider/:id` (id được base64 ... |  | USR-016 |
| USR-019 | Xem chi tiết Nhà cung cấp dịch vụ (View Provider Details) | Trang đầy đủ | `UserController::viewProviderDetails($id)` — mặc định `user/viewProviderDetails/:id` |  | USR-016 |
| USR-020 | Danh sách Quy tắc lương (Payroll Rules) | Trang đầy đủ | `UserController::payrollRules()` — mặc định `user/payrollRules` |  | USR-021 |
| USR-021 | Thêm Quy tắc lương (Add Payroll Rule) | Trang đầy đủ | `UserController::addPayrollRules()` — mặc định `user/addPayrollRules` |  | USR-020 |
| USR-022 | Chấm công (Clock In / Clock Out) | Trang đầy đủ | `UserController::clockIn()` — mặc định `user/clockIn` |  | LOG-001 |
| USR-023 | Quản lý Nhân vật ảo (Virtual Users) | Trang đầy đủ | `UserController::virtualUsers()` — mặc định `user/virtualUsers` |  |  |

## 2. Dữ liệu chủ (Master Data)

### PROP — Bất động sản (47 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| PROP-001 | Thêm yêu cầu xác nhận Onboarding bất động sản | Trang đầy đủ | property/add-onboarding (tham số tùy chọn `$id` – id bản ghi Villa Onboarding hiện có) |  |  |
| PROP-002 | Hệ số giá Beds24 theo kênh OTA | Trang đầy đủ | property/beds24-coefficient |  |  |
| PROP-017 | Danh sách Property thiếu Room ID | Trang đầy đủ | property/missing-roomids/:id (route mặc định dạng dashed, tham số `$id` truyền qua URL ... |  | PROP-030 |
| PROP-018 | Bản tin hàng tháng cho chủ nhà (Monthly Newsletter) | Trang đầy đủ | property/monthly-report |  | PROP-030 |
| PROP-019 | Thêm lịch chụp ảnh mới (New Photo Shoot) | Trang đầy đủ | property/new-shooting |  | PROP-026 |
| PROP-020 | Danh sách Onboarding (Wizard nhập liệu Property mới) | Trang đầy đủ | property/on-boardings |  | PROP-017 |
| PROP-021 | Danh sách Property cần Onboarding thao tác (Confirmation/Communication/Rules/Extras) | Trang đầy đủ | property/onboarding |  | PROP-017 |
| PROP-022 | Thêm Tài khoản ngân hàng của Property (Bank Account) | Trang đầy đủ | property/payment-record/:villa_id (villa_id truyền dạng base64) |  |  |
| PROP-023 | Sửa bản ghi thanh toán dịch vụ Property (Payment Record Edit) | Trang đầy đủ | property/payment-record-edit/:villa_id/:payment_id (cả 2 tham số truyền dạng base64) |  |  |
| PROP-024 | Báo cáo thanh toán hàng tháng cho Chủ nhà (Payment/Owner Report) | Trang đầy đủ | property/payment-report |  |  |
| PROP-025 | Đánh giá Nhiếp ảnh gia (Photographer Evaluation) | Trang đầy đủ | property/photography/photographer-evaluation (route đẹp cấu hình riêng trong Routes.php... |  | PROP-026, PROP-028 |
| PROP-026 | Kế hoạch chụp ảnh (Photography Planning) | Trang đầy đủ | property/photography/:shootId/:guidelineId (route mặc định dạng dashed; `$shootId` cũng... |  | PROP-019, PROP-025, PROP-027, PROP-028 |
| PROP-027 | Danh sách Property thiếu ảnh (Properties Missing Photos) | Trang đầy đủ | property/photography/missing-photos (route đẹp cấu hình riêng trong Routes.php, ứng với... |  | PROP-026 |
| PROP-028 | Điểm chấm chất lượng ảnh (Photography Scores) | Trang đầy đủ | property/photography/scores (route đẹp cấu hình riêng trong Routes.php, ứng với action ... |  | PROP-025, PROP-026 |
| PROP-029 | Báo cáo Property (Property Reports) | Trang đầy đủ | property/property-reports/:tab/:villa_id |  |  |
| PROP-031 | Yêu cầu làm lại Listing OTA (Redo) | Trang đầy đủ | property/redo/:villa_id/:chanel_id |  | PROP-030 |
| PROP-032 | Bảng điều khiển Property (Property Dashboard) | Trang đầy đủ | property/dashboard (dashed mặc định CakePHP DashedRoute: `/property/dashboard`) |  |  |
| PROP-033 | Danh sách Property | Trang đầy đủ | property/list/:id (dashed mặc định CakePHP DashedRoute: `/property/list`, tham số `id` ... |  | PROP-029, PROP-034, PROP-035 |
| PROP-035 | Xem chi tiết Property (View Details) | Trang đầy đủ | property/view-details/:villa_id (dashed mặc định CakePHP DashedRoute: `/property/view-d... |  | PROP-033 |
| PROP-036 | Thông tin xác nhận Property (Villa Confirmation) | Trang đầy đủ | property/confirmation/:villa_id (villa_id truyền dạng base64), mở từ PROP-021 (icon "Vi... |  | PROP-021 |
| PROP-037 | Thông tin giao tiếp Property (Villa Communication) | Trang đầy đủ | property/communication/:villa_id (villa_id truyền dạng base64), mở từ PROP-021 (icon "V... |  | PROP-021 |
| PROP-038 | Quy định Property (Villa Rules) | Popup | property/villa-rules/:villa_id (villa_id truyền dạng base64) | PROP-021 | PROP-021 |
| PROP-039 | Dịch vụ tiện ích bổ sung Property (Villa Extra) | Trang đầy đủ | property/villa-extras/:villa_id (villa_id truyền dạng base64), mở từ PROP-021 (icon "Vi... |  | PROP-021 |
| PROP-040 | Chất lượng Property (Quality) | Trang đầy đủ | property/quality |  | PROP-031 |
| PROP-041 | Danh sách thanh toán dịch vụ/phí Property (Service Fee) | Trang đầy đủ | property/service-fee/:villa_id (villa_id truyền dạng base64) |  | PROP-022, PROP-023, PROP-035 |
| PROP-042 | Hạn chế đặt phòng Property (Booking Restriction) | Trang đầy đủ | property/booking-restriction |  |  |
| PROP-043 | Lãnh thổ phụ trách Concierge (Territories) | Trang đầy đủ | property/territories/:id |  |  |
| PROP-044 | Quản lý vật dụng (Inventory) của Property | Trang đầy đủ | property/inventories/:villa_id |  | PROP-035, PROP-045 |
| PROP-045 | Yêu cầu vật dụng (Inventory Request) của Property | Trang đầy đủ | property/inventory-request/:villa_id |  | PROP-044 |
| PROP-046 | Danh sách Dự án/Chung cư (Residence Enquiry) | Trang đầy đủ | property/residence-enquiry |  | PROP-047 |
| PROP-047 | Xem chi tiết Dự án/Chung cư (View Residence Enquiry) | Trang đầy đủ | property/view-residence-enquiry/:residence_id/:business_unit_id |  | PROP-046 |
| PROP-048 | Quản lý dịch vụ hàng loạt qua Business Unit (Services) | Trang đầy đủ | property/services/:tab (dashed mặc định, hỗ trợ thêm query `?tab=`, `?electricity_tab=`) |  | PROP-051 |
| PROP-049 | Cài đặt Dịch vụ & Tiện ích Property (Service Setting) | Trang đầy đủ | property/service-setting/:tab/:villa_id (villa_id truyền dạng base64), cũng được nhúng ... |  | PROP-041, PROP-050 |
| PROP-050 | Thêm/Sửa chi tiết Property (Villa Detail) | Trang đầy đủ | property/villa/:tab/:villa_id (dashed mặc định; `$villa_id` rỗng khi thêm mới) |  | PROP-017, PROP-032, PROP-033, PROP-042, PROP-046, PROP-049, PROP-051 |
| PROP-051 | Tổng hợp gán Hợp đồng khách (Guest Contract) theo Business Unit | Trang đầy đủ | property/guest-contract-bu-recap |  | PROP-048, PROP-050, PROP-052 |
| PROP-052 | Xuất PDF Hợp đồng khách (Guest Contract Assignment PDF) | Trang đầy đủ | property/guest-contract-assignment-pdf?villa_id=...&general_version_id=...&language_cod... |  | PROP-050, PROP-051 |
| PROP-053 | Báo cáo hàng tháng theo Business Unit (BU Reports) | Trang đầy đủ | property/bu-reports |  | PROP-018 |
| PROP-054 | Trạng thái Báo cáo hàng tháng (Report Status) | Trang đầy đủ | property/report-status |  | PROP-018, PROP-053 |
| PROP-055 | Danh sách Property sẵn sàng tạo Báo cáo (Report Ready) | Trang đầy đủ | property/report-ready?business_unit=... |  | PROP-018, PROP-053, PROP-054 |
| PROP-056 | Nhật ký hoạt động Chụp ảnh (Photography Logs) | Trang đầy đủ | property/logs |  | PROP-026, PROP-027, PROP-028 |
| PROP-057 | Lịch sử yêu cầu làm lại Listing (Redo Log) | Popup | property/redo-log/:villa_id/:channel_id | PROP-040 | PROP-040, PROP-058 |
| PROP-058 | Danh sách Listing cần làm lại (Listing To Be Redone) | Trang đầy đủ | property/listing-redone |  | PROP-057 |
| PROP-059 | Danh sách Lịch chụp ảnh (Shootings) | Trang đầy đủ | property/shootings |  | PROP-019, PROP-060 |
| PROP-060 | Sửa lịch chụp ảnh (Edit Shooting) | Trang đầy đủ | property/edit-shooting/:req_id (req_id truyền dạng base64), mở từ PROP-059 (icon Edit) |  | PROP-059 |
| PROP-061 | Tải lên Báo cáo Property (Upload Report) | Trang đầy đủ | property/upload-report |  | PROP-018, PROP-053 |
| PROP-062 | Yêu cầu xác thực lại Onboarding Property (Edit On Boarding) | Trang đầy đủ | property/edit-on-boarding/:id, mở từ PROP-020 (Danh sách Onboarding) |  | PROP-020 |
| PROP-063 | Xem chi tiết Onboarding Property (View Onboarding) | Trang đầy đủ | property/view-onboarding/:id, mở từ PROP-020 (Danh sách Onboarding) |  | PROP-020, PROP-062 |

### COMP — Công ty (2 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| COMP-001 | Danh sách Công ty & Đơn vị pháp nhân (Subsidiaries) | Trang đầy đủ | company/list (route CakePHP mặc định dạng dashed: `/company/list`, có tham số phụ `:tab... |  | COMP-001-P1 |
| COMP-001-P1 | Popup Thêm/Sửa/Xóa Công ty hoặc Đơn vị pháp nhân | Popup | Không có route riêng — dùng chung form POST về `company/list` (action ẩn `add`/`edit`/`... | COMP-001 | COMP-001 |

### BU — Đơn vị kinh doanh (45 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| BU-001 | Danh sách đơn vị kinh doanh | Trang đầy đủ | `BusinessUnitController::list()` — mặc định `/business-unit/list` |  | BU-001-P1, BU-002, BU-003, BU-004 |
| BU-001-P1 | Popup xác nhận xóa đơn vị kinh doanh | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `list.ctp`; xác nhận sẽ điều hướng trình d... | BU-001 | BU-001 |
| BU-002 | Thêm đơn vị kinh doanh | Trang đầy đủ | `BusinessUnitController::add()` — mặc định `/business-unit/add` |  | BU-001 |
| BU-003 | Sửa đơn vị kinh doanh | Trang đầy đủ | `BusinessUnitController::edit($id)` — mặc định `/business-unit/edit/{id_base64}` |  | BU-001 |
| BU-004 | Xem chi tiết đơn vị kinh doanh | Trang đầy đủ | `BusinessUnitController::viewDetails($id)` — mặc định `/business-unit/view-details/{id}` |  | BU-001 |
| BU-005 | Danh sách kênh (Chanels) | Trang đầy đủ | `BusinessUnitController::chanels()` — mặc định `/business-unit/chanels` |  | BU-005-P1, BU-005-P2 |
| BU-005-P1 | Popup Thêm/Sửa kênh | Popup | Modal Bootstrap (`#chanelModal`) tĩnh trong `chanels.ctp`; submit POST cùng action `Bus... | BU-005 | BU-005 |
| BU-005-P2 | Popup xác nhận xóa kênh | Popup | Modal Bootstrap (`#deleteModal`) tĩnh trong `chanels.ctp`; submit POST cùng action `Bus... | BU-005 | BU-005 |
| BU-006 | Liên kết Villa theo kênh | Trang đầy đủ | `BusinessUnitController::channelVilla($channel_id)` — mặc định `/business-unit/channel-... |  | BU-005, BU-007 |
| BU-007 | Danh sách tiền tệ (Currency) | Trang đầy đủ | `BusinessUnitController::currency()` — mặc định `/business-unit/currency` |  | BU-007-P1, BU-007-P2, BU-008 |
| BU-007-P1 | Popup Thêm/Sửa tiền tệ | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `currency.ctp`; submit POST cùng action `B... | BU-007 | BU-007 |
| BU-007-P2 | Popup Xác nhận xóa tiền tệ | Popup | Modal Bootstrap (`#exampleModal`, chế độ ẩn phần form) tĩnh trong `currency.ctp`; submi... | BU-007 | BU-007 |
| BU-008 | Tỷ giá quy đổi (Rates) | Trang đầy đủ | `BusinessUnitController::rates()` — mặc định `/business-unit/rates` |  | BU-007, BU-008-P1 |
| BU-008-P1 | Popup Nhập/Cập nhật tỷ giá | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `rates.ctp`; submit POST cùng action `Busi... | BU-008 | BU-008 |
| BU-009 | Nền tảng chat (Chat Platforms) | Trang đầy đủ | `BusinessUnitController::chatPlatform()` — mặc định `/business-unit/chat-platform` |  | BU-009-P1, BU-009-P2 |
| BU-009-P1 | Popup Thêm/Sửa nền tảng chat | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `chat_platform.ctp`; submit POST cùng acti... | BU-009 | BU-009 |
| BU-009-P2 | Popup Xác nhận xóa nền tảng chat | Popup | Modal Bootstrap (`#exampleModal`, chế độ ẩn phần form) tĩnh trong `chat_platform.ctp`; ... | BU-009 | BU-009 |
| BU-010 | Thanh toán & Tài khoản (Payment & Accounts) | Trang đầy đủ | `BusinessUnitController::paymentMethod($tab, $page_action, $id)` — mặc định `/business-... |  | BU-010-P1, BU-010-P2, BU-010-P3, BU-010-P4, BU-010-P5, BU-011 |
| BU-010-P1 | Popup Thêm/Sửa phương thức thanh toán | Popup | Modal Bootstrap (`#exampleModal`) trong element `business-unit/main_list.ctp`; submit A... | BU-010 | BU-010 |
| BU-010-P2 | Popup Xác nhận xóa phương thức thanh toán | Popup | Modal Bootstrap (`#exampleModalDeletePM`) trong element `business-unit/main_list.ctp`; ... | BU-010 | BU-010 |
| BU-010-P3 | Thêm/Sửa tài khoản | Trang con (mở từ BU- | `BusinessUnitController::paymentMethod('accounts', 'add')` hoặc `paymentMethod('account... | BU-010 | BU-010 |
| BU-010-P4 | Popup Xác nhận xóa tài khoản | Popup | Modal Bootstrap (`#exampleModalDelete`) trong element `business-unit/accounts.ctp`; sub... | BU-010 | BU-010 |
| BU-010-P5 | Popup Mở sổ quỹ tài khoản (Open Statement) | Popup | Modal Bootstrap (`#openStatementModal`) trong element `business-unit/accounts.ctp`; sub... | BU-010 | BU-010 |
| BU-011 | Phương thức thanh toán theo Đơn vị kinh doanh | Trang đầy đủ | `BusinessUnitController::businessUnitPaymentMethod()` — mặc định `/business-unit/busine... |  | BU-010, BU-011-P1 |
| BU-011-P1 | Popup Bật/tắt phương thức thanh toán theo Đơn vị kinh doanh | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `business_unit_payment_method.ctp`; toggle... | BU-011 | BU-011 |
| BU-012 | Vùng kinh doanh (Zoning) | Trang đầy đủ | `BusinessUnitController::zoning()` — mặc định `/business-unit/zoning` |  | BU-012-P1, BU-013, BU-014 |
| BU-012-P1 | Popup Xác nhận xóa vùng kinh doanh | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `zoning.ctp`; xác nhận điều hướng tới `Bus... | BU-012 | BU-012 |
| BU-013 | Thêm vùng kinh doanh | Trang đầy đủ | `BusinessUnitController::addZoning()` — mặc định `/business-unit/add-zoning` |  | BU-012 |
| BU-014 | Sửa vùng kinh doanh | Trang đầy đủ | `BusinessUnitController::editZoning($id)` — mặc định `/business-unit/edit-zoning/{id}` ... |  | BU-012 |
| BU-015 | Danh sách văn phòng (Offices) | Trang đầy đủ | `BusinessUnitController::offices()` — mặc định `/business-unit/offices` |  | BU-015-P1, BU-016, BU-017, BU-018 |
| BU-015-P1 | Popup Xác nhận xóa văn phòng | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `offices.ctp`; xác nhận điều hướng tới `Bu... | BU-015 | BU-015 |
| BU-016 | Thêm văn phòng | Trang đầy đủ | `BusinessUnitController::addOffice()` — mặc định `/business-unit/add-office` |  | BU-015 |
| BU-017 | Sửa văn phòng | Trang đầy đủ | `BusinessUnitController::editOffice($id)` — mặc định `/business-unit/edit-office/{id}` ... |  | BU-015 |
| BU-018 | Xem chi tiết văn phòng | Trang đầy đủ | `BusinessUnitController::viewOffice($id)` — mặc định `/business-unit/view-office/{id}` ... |  | BU-015 |
| BU-019 | Danh sách ngân hàng (Banks) | Trang đầy đủ | `BusinessUnitController::banks()` — mặc định `/business-unit/banks` |  | BU-019-P1, BU-020, BU-021 |
| BU-019-P1 | Popup Xác nhận xóa ngân hàng | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `banks.ctp`; xác nhận điều hướng tới `Busi... | BU-019 | BU-019 |
| BU-020 | Thêm ngân hàng | Trang đầy đủ | `BusinessUnitController::addBank()` — mặc định `/business-unit/add-bank` |  | BU-019 |
| BU-021 | Sửa ngân hàng | Trang đầy đủ | `BusinessUnitController::editBank($id)` — mặc định `/business-unit/edit-bank/{id}` (id ... |  | BU-019 |
| BU-022 | Kênh (Channels — quản lý nền tảng, tài khoản kênh & yếu tố nội dung) | Trang đầy đủ | `BusinessUnitController::channels($tab)` — mặc định `/business-unit/channels/{tab}` (ta... |  | BU-006, BU-022-P1 |
| BU-022-P1 | Popup Thêm/Sửa nền tảng đặt phòng | Popup | Modal Bootstrap (`#platformModal`) tĩnh trong `channels.ctp`; submit POST tới `Business... | BU-022 | BU-022 |
| BU-022-P2 | Popup Xác nhận xóa nền tảng đặt phòng | Popup | Modal Bootstrap (`#deletePlatformModal`) tĩnh trong `channels.ctp`; submit POST tới `Bu... | BU-022 | BU-022 |
| BU-022-P3 | Popup Thêm/Sửa tài khoản kênh | Popup | Modal Bootstrap (`#chanelModal`) tĩnh trong `channels.ctp`; submit POST tới `BusinessUn... | BU-022 | BU-022 |
| BU-022-P4 | Popup Xác nhận xóa tài khoản kênh | Popup | Modal Bootstrap (`#deleteModal`) tĩnh trong `channels.ctp`; submit POST tới `BusinessUn... | BU-022 | BU-022 |
| BU-022-P5 | Popup Thêm/Sửa yếu tố nội dung | Popup | Modal Bootstrap (`#ota-element-modal`) trong element `channel/content_elements.ctp`; su... | BU-022 | BU-022 |
| BU-022-P6 | Popup Xác nhận xóa (lưu trữ) yếu tố nội dung | Popup | Modal Bootstrap (`#ota-archive-modal`) trong element `channel/content_elements.ctp`; su... | BU-022 | BU-022 |

### VCS — Cấu hình chung villa (23 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| VCS-001 | Danh sách Vật dụng (Item) | Trang đầy đủ | villa-common-setting/items (dashed mặc định CakePHP DashedRoute: `/villa-common-setting... |  | VCS-001-P1 |
| VCS-001-P1 | Popup Thêm/Sửa/Xóa Vật dụng | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/items` (hidden `ac... | VCS-001 | VCS-001 |
| VCS-002 | Danh sách Hạng mục giá (Price Category) | Trang đầy đủ | villa-common-setting/price-categories (dashed mặc định: `/villa-common-setting/price-ca... |  | VCS-002-P1 |
| VCS-002-P1 | Popup Thêm/Sửa/Xóa Hạng mục giá | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/price-categories` ... | VCS-002 | VCS-002 |
| VCS-003 | Danh sách Loại hình bất động sản (Property/Villa Type) | Trang đầy đủ | villa-common-setting/villa-types (dashed mặc định: `/villa-common-setting/villa-types`) |  | VCS-003-P1 |
| VCS-003-P1 | Popup Thêm/Sửa/Xóa Loại hình bất động sản | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-types` (hidd... | VCS-003 | VCS-003 |
| VCS-004 | Danh sách Dịch vụ (Service) | Trang đầy đủ | villa-common-setting/services (dashed mặc định: `/villa-common-setting/services`) |  | VCS-004-P1 |
| VCS-004-P1 | Popup Thêm/Sửa/Xóa Dịch vụ | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/services` (hidden ... | VCS-004 | VCS-004 |
| VCS-005 | Danh sách Loại dịch vụ hợp đồng (Contract Service Type) | Trang đầy đủ | villa-common-setting/contract-service-types (dashed mặc định: `/villa-common-setting/co... |  | VCS-005-P1 |
| VCS-005-P1 | Popup Thêm/Sửa/Xóa Loại dịch vụ hợp đồng | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/contract-service-t... | VCS-005 | VCS-005 |
| VCS-006 | Danh sách Nhà cung cấp dịch vụ (Service Providers) | Trang đầy đủ | villa-common-setting/service-providers/:tab (dashed mặc định CakePHP DashedRoute: `/vil... |  | VCS-006-P1, VCS-006-P2 |
| VCS-006-P1 | Popup Thêm/Sửa/Xóa Nhà cung cấp dịch vụ | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/service-providers`... | VCS-006 | VCS-006 |
| VCS-006-P2 | Popup Thêm Loại dịch vụ (Villa Service) | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/service-providers`... | VCS-006 | VCS-006, VCS-006-P1 |
| VCS-007 | Danh sách Công năng sử dụng Villa (Property Usage) | Trang đầy đủ | villa-common-setting/villa-usage (dashed mặc định CakePHP DashedRoute: `/villa-common-s... |  | VCS-007-P1 |
| VCS-007-P1 | Popup Thêm/Sửa/Xóa Công năng sử dụng | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-usage` (hidd... | VCS-007 | VCS-007 |
| VCS-008 | Danh sách Hoạt động Villa (Property Activities) | Trang đầy đủ | villa-common-setting/villa-activity (dashed mặc định CakePHP DashedRoute: `/villa-commo... |  | VCS-008-P1 |
| VCS-008-P1 | Popup Thêm/Sửa/Xóa Hoạt động villa | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-activity` (h... | VCS-008 | VCS-008 |
| VCS-009 | Danh sách Khả năng tiếp cận (Accessible) | Trang đầy đủ | villa-common-setting/villa-accessible (dashed mặc định CakePHP DashedRoute: `/villa-com... |  | VCS-009-P1 |
| VCS-009-P1 | Popup Thêm/Sửa/Xóa Khả năng tiếp cận | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-accessible` ... | VCS-009 | VCS-009 |
| VCS-010 | Danh sách Phương tiện di chuyển (Transport) | Trang đầy đủ | villa-common-setting/villa-transport (dashed mặc định CakePHP DashedRoute: `/villa-comm... |  | VCS-010-P1 |
| VCS-010-P1 | Popup Thêm/Sửa/Xóa Phương tiện di chuyển | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/villa-transport` (... | VCS-010 | VCS-010 |
| VCS-011 | Danh sách Nhắc nhở (Reminders) | Trang đầy đủ | villa-common-setting/reminders (dashed mặc định CakePHP DashedRoute: `/villa-common-set... |  | VCS-011-P1 |
| VCS-011-P1 | Popup Thêm/Sửa/Xóa Nhắc nhở | Popup | Không có route riêng — dùng chung form POST về `villa-common-setting/reminders` (hidden... | VCS-011 | VCS-011 |

## 3. Cấu hình hệ thống

### CS — Danh mục dùng chung (16 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| CS-001 | Quốc gia (Countries) | Trang đầy đủ | `CommonSettingController::countries()` — mặc định `/common-setting/countries` (không có... |  | CS-001-P1 |
| CS-001-P1 | Popup Thêm/Sửa/Xóa Quốc gia | Popup | Modal Bootstrap (`#exampleModal`) tĩnh trong `countries.ctp`; submit POST cùng action `... | CS-001 | CS-001 |
| CS-002 | Ngôn ngữ (Languages) | Trang đầy đủ | `CommonSettingController::languages()` — mặc định `/common-setting/languages` |  | CS-002-P1 |
| CS-002-P1 | Popup Thêm/Sửa/Xóa Ngôn ngữ | Popup | Modal Bootstrap (`#exampleModal`) trong `languages.ctp`; submit cùng action `CommonSett... | CS-002 | CS-002 |
| CS-003 | Vùng (Regions) | Trang đầy đủ | `CommonSettingController::regions()` — mặc định `/common-setting/regions` |  | CS-003-P1 |
| CS-003-P1 | Popup Thêm/Sửa/Xóa Vùng | Popup | Modal Bootstrap (`#exampleModal`) trong `regions.ctp`; submit cùng action `CommonSettin... | CS-003 | CS-003 |
| CS-004 | Khu vực (Areas) | Trang đầy đủ | `CommonSettingController::areas()` — mặc định `/common-setting/areas` |  | CS-004-P1 |
| CS-004-P1 | Popup Thêm/Sửa/Xóa Khu vực | Popup | Modal Bootstrap (`#exampleModal`) trong `areas.ctp`; submit cùng action `CommonSettingC... | CS-004 | CS-004 |
| CS-005 | Quận/Huyện (Districts) | Trang đầy đủ | `CommonSettingController::districts()` — mặc định `/common-setting/districts` |  | CS-005-P1 |
| CS-005-P1 | Popup Thêm/Sửa/Xóa Quận/Huyện | Popup | Modal Bootstrap (`#exampleModal`) trong `districts.ctp`; submit cùng action `CommonSett... | CS-005 | CS-005 |
| CS-006 | Residence (Khu residence) | Trang đầy đủ | `CommonSettingController::residences()` — mặc định `/common-setting/residences` |  | CS-006-P1, CS-008 |
| CS-006-P1 | Popup Thêm/Sửa/Xóa Residence | Popup | Modal Bootstrap (`#exampleModal`, form `multipart/form-data`) trong `residences.ctp`; s... | CS-006 | CS-006 |
| CS-007 | Loại địa điểm (Location Types) | Trang đầy đủ | `CommonSettingController::locationTypes()` — mặc định `/common-setting/location-types` |  | CS-007-P1 |
| CS-007-P1 | Popup Thêm/Sửa/Xóa Loại địa điểm | Popup | Modal Bootstrap (`#exampleModal`) trong `location_types.ctp`; submit cùng action `Commo... | CS-007 | CS-007 |
| CS-008 | Đơn vị (Units) | Trang đầy đủ | `CommonSettingController::units()` — mặc định `/common-setting/units` |  | CS-008-P1 |
| CS-008-P1 | Popup Thêm/Sửa/Xóa Unit | Popup | Modal Bootstrap (`#exampleModal`) trong `units.ctp`; submit cùng action `CommonSettingC... | CS-008 | CS-008 |

### SET — Cài đặt hệ thống (10 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| SET-001 | Trang chủ Cài đặt hệ thống (Setting Dashboard) | Trang đầy đủ | `SettingController::dashboard()` — route đẹp `/setting` (khai báo tại `config/Routes.ph... |  | SET-002, SET-003, SET-004 |
| SET-002 | Cài đặt chung (General Settings) | Trang đầy đủ | `SettingController::generalSettings($tab = null)` — mặc định `/setting/general-settings... |  | SET-001, SET-002-P1, SET-002-P2, SET-002-P3 |
| SET-002-P1 | Popup Thêm Owner Portal URL | Popup | Modal Bootstrap `#addUrlModal` trong element `technical-settings/owner_portal_url.ctp`;... | SET-002 | SET-002 |
| SET-002-P2 | Popup Sửa Owner Portal URL | Popup | Modal Bootstrap `#editModal` trong element `technical-settings/owner_portal_url.ctp`; l... | SET-002 | SET-002 |
| SET-002-P3 | Popup Xóa Owner Portal URL | Popup | Modal Bootstrap `#exampleModal` trong element `technical-settings/owner_portal_url.ctp`... | SET-002 | SET-002 |
| SET-003 | Cài đặt SMTP (SMTP Settings) | Trang đầy đủ | `SettingController::smtpSettings()` — mặc định `/setting/smtp-settings` (không có route... |  | SET-001 |
| SET-004 | Thiết lập Hostex (Hostex Set-up) | Trang đầy đủ | `SettingController::hostexSetup()` — mặc định `/setting/hostex-setup`; dữ liệu tải qua ... |  | SET-001, SET-004-P1, SET-004-P2, SET-004-P3 |
| SET-004-P1 | Form thêm/sửa tài khoản Hostex | Popup | Render động trong `SettingController::hostexSetup()` (`hostex_setup.ctp`); submit AJAX ... | SET-004 | SET-004 |
| SET-004-P2 | Popup Xóa tài khoản Hostex | Popup | Modal Bootstrap `#exampleModal` trong `hostex_setup.ctp`; xác nhận gửi AJAX POST tới `d... | SET-004 | SET-004 |
| SET-004-P3 | Popup cảnh báo không thể xóa tài khoản Hostex | Popup | Modal Bootstrap `#warnModal` trong `hostex_setup.ctp`; xử lý hoàn toàn phía client (Jav... | SET-004 | SET-004, SET-004-P2 |

## 4. Đặt phòng (Booking)

### BOOK — Đặt phòng (100 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| BOOK-001 | Lịch check-in / check-out | Trang đầy đủ | Booking/list (mặc định: `/booking/list`) |  | BOOK-009, BOOK-013 |
| BOOK-002 | Danh sách đặt phòng | Trang đầy đủ | Booking/bookingList (mặc định: `/booking/booking-list`) |  | BOOK-002-P1, BOOK-010 |
| BOOK-002-P1 | Xem nhanh đặt phòng | Trang đầy đủ | Booking/viewBooking/:id (mặc định: `/booking/view-booking/:id`, id được base64_encode) |  | BOOK-002, BOOK-004 |
| BOOK-003 | Danh sách khách hàng | Trang đầy đủ | Booking/customerList (mặc định: `/booking/customer-list`) |  |  |
| BOOK-026 | Số đêm lưu trú tối thiểu | Trang đầy đủ | booking/minimum (base path `/VM` xuất hiện trong các lời gọi AJAX của ứng dụng) |  |  |
| BOOK-027 | Villa thiếu giá thuê | Trang đầy đủ | booking/missingRates (query `?id=<business_unit_id>`) |  | BOOK-023, BOOK-027-P1, BOOK-028, BOOK-030 |
| BOOK-028 | Chi tiết đặt phòng (đầy đủ) | Trang đầy đủ | Booking/viewDetails/:id (mặc định: `/booking/view-details/:id`, id được base64_encode) |  | BOOK-001, BOOK-002 |
| BOOK-029 | Kiểm soát nhận phòng (Check-in Control) | Trang đầy đủ | Booking/checkInControl (mặc định: `/booking/check-in-control`) |  | BOOK-029-P1 |
| BOOK-029-P1 | Chi tiết điểm kiểm soát nhận phòng | Popup | Booking/viewCheckinDetail/:id/:booking_id | BOOK-029 | BOOK-029 |
| BOOK-030 | Kiểm soát trả phòng (Check-out Control) | Trang đầy đủ | Booking/checkOutControl (mặc định: `/booking/check-out-control`) |  | BOOK-030-P1 |
| BOOK-030-P1 | Chi tiết điểm kiểm soát trả phòng | Popup | Booking/viewCheckOutDetail/:id/:check_out_date/:booking_id | BOOK-030 | BOOK-030 |
| BOOK-031 | Điểm kiểm soát villa | Trang đầy đủ | Booking/checkControlPoint (mặc định: `/booking/check-control-point`) |  |  |
| BOOK-032 | Nhận phòng (Check-in) | Trang đầy đủ | Booking/checkIn (mặc định: `/booking/check-in`) |  | BOOK-033 |
| BOOK-033 | Tiến trình nhận phòng | Trang đầy đủ | Booking/checkinProgress/:id/:date/:villa_id (mặc định: `/booking/checkin-progress/:id/:... | BOOK-032 | BOOK-029, BOOK-029-P1, BOOK-032 |
| BOOK-034 | Kiểm soát chất lượng nhận phòng | Trang đầy đủ | Booking/qualityControl/:checkin_detail_id/:date/:villa_id (mặc định: `/booking/quality-... | BOOK-029 | BOOK-029, BOOK-029-P1 |
| BOOK-035 | Trả phòng (Check-out) — Bước 1: Chọn villa | Trang đầy đủ | Booking/checkOut (mặc định: `/booking/check-out`) |  | BOOK-035-P2 |
| BOOK-035-P2 | Trả phòng — Bước 2: Kiểm tra điểm kiểm soát/hư hỏng | Popup | Booking/checkOutStep2/:check_out_id (mặc định: `/booking/check-out-step2/:check_out_id`) | BOOK-035 | BOOK-035, BOOK-035-P3 |
| BOOK-035-P3 | Trả phòng — Bước 3: Đánh giá hài lòng | Popup | Booking/checkOutStep3/:check_out_id (mặc định: `/booking/check-out-step3/:check_out_id`) | BOOK-035-P2 | BOOK-035-P2, BOOK-035-P4 |
| BOOK-035-P4 | Trả phòng — Bước 4: Xác nhận hoàn tất | Popup | Booking/checkOutStep4/:check_out_id (mặc định: `/booking/check-out-step4/:check_out_id`) | BOOK-035-P3 | BOOK-030, BOOK-030-P1, BOOK-035-P3 |
| BOOK-036 | Thêm đặt phòng mới | Trang đầy đủ | Booking/addBooking/:id? (mặc định: `/booking/add-booking`, có id thì là sửa booking thủ... |  | BOOK-036-P1 |
| BOOK-036-P1 | Danh sách đặt phòng thủ công | Trang đầy đủ | Booking/addBookingList (mặc định: `/booking/add-booking-list`) | BOOK-036 | BOOK-036 |
| BOOK-037 | Chỉnh sửa đặt phòng | Trang đầy đủ | Booking/edit/:id (mặc định: `/booking/edit/:id`) |  | BOOK-002, BOOK-028 |
| BOOK-038 | Khôi phục/Tra cứu đặt phòng (Retrieve Booking) | Trang đầy đủ | Booking/retrieveBooking (mặc định: `/booking/retrieve-booking`) |  | BOOK-028 |
| BOOK-039 | Danh sách kế hoạch (Planning List) | Trang đầy đủ | Booking/planningList (mặc định: `/booking/planning-list`) |  | BOOK-040 |
| BOOK-040 | Kế hoạch villa theo lịch (Planning Calendar) | Trang đầy đủ | Booking/planning/:date? (mặc định: `/booking/planning`) |  | BOOK-039, BOOK-041 |
| BOOK-041 | Team (Lịch làm việc đội ngũ) | Trang đầy đủ | Booking/team (mặc định: `/booking/team`) |  | BOOK-028, BOOK-040 |
| BOOK-042 | Danh sách đặt phòng trực tiếp (Direct Booking) | Trang đầy đủ | Booking/directBookingList (mặc định: `/booking/direct-booking-list`) |  | BOOK-043, BOOK-044, BOOK-045, BOOK-046 |
| BOOK-043 | Thêm đặt phòng trực tiếp | Popup | Booking/addDirectBooking/:id? (mặc định: `/booking/add-direct-booking`) | BOOK-042 | BOOK-042 |
| BOOK-044 | Sửa đặt phòng trực tiếp | Popup | Booking/editDirectBooking/:id (mặc định: `/booking/edit-direct-booking/:id`) | BOOK-042 | BOOK-042 |
| BOOK-045 | Xem đặt phòng trực tiếp | Popup | Booking/viewDirectBooking/:id (mặc định: `/booking/view-direct-booking/:id`) | BOOK-042 | BOOK-042 |
| BOOK-046 | Danh sách đặt phòng trực tiếp đã huỷ | Trang đầy đủ | Booking/cancelDirectBookingList (mặc định: `/booking/cancel-direct-booking-list`) |  | BOOK-042, BOOK-045 |
| BOOK-047 | Bảng trống lịch villa (Availability) | Trang đầy đủ | Booking/availability (mặc định: `/booking/availability`, hỗ trợ query `referer` hoặc `b... |  | BOOK-036 |
| BOOK-048 | Tỷ lệ lấp đầy villa (Occupancy) | Trang đầy đủ | Booking/occupancy/:string? (mặc định: `/booking/occupancy`) |  |  |
| BOOK-049 | Thanh toán đến hạn (Due Now) | Trang đầy đủ | Booking/dueNow (mặc định: `/booking/due-now`) | BOOK-052 | BOOK-051, BOOK-052 |
| BOOK-050 | Thanh toán sắp đến hạn (Due Later) | Trang đầy đủ | Booking/dueLater (mặc định: `/booking/due-later`) | BOOK-052 | BOOK-049, BOOK-052 |
| BOOK-051 | Đã thanh toán (Paid) | Trang đầy đủ | Booking/paid (mặc định: `/booking/paid`) | BOOK-052 | BOOK-049, BOOK-052 |
| BOOK-052 | Thanh toán đối tác (Partner Payments) | Trang đầy đủ | Booking/partnerPayments (mặc định: `/booking/partner-payments`) |  | BOOK-049, BOOK-050, BOOK-051 |
| BOOK-053 | Đối soát đặt phòng đối tác (Partner Bookings) | Trang đầy đủ | Booking/partnerBookings (mặc định: `/booking/partner-bookings`) |  | BOOK-052 |
| BOOK-054 | OTA (Trang tổng quan kênh OTA) | Trang đầy đủ | Booking/ota (mặc định: `/booking/ota`) |  | BOOK-055, BOOK-056 |
| BOOK-055 | Danh sách villa theo kênh OTA (OTA Listing) | Trang đầy đủ | Booking/otaListing (mặc định: `/booking/ota-listing`) | BOOK-054 | BOOK-054 |
| BOOK-056 | Đối soát doanh thu/hoa hồng OTA (OTA Share) | Trang đầy đủ | Booking/otaShare (mặc định: `/booking/ota-share`) | BOOK-054 | BOOK-054 |
| BOOK-057 | Danh sách mẫu xác nhận đặt phòng (Confirmation Template) | Trang đầy đủ | Booking/confirmationTemplate (mặc định: `/booking/confirmation-template`) |  | BOOK-058, BOOK-059, BOOK-060, BOOK-061 |
| BOOK-058 | Thêm mẫu xác nhận đặt phòng | Popup | Booking/addConfirmationTemplate | BOOK-057 | BOOK-057 |
| BOOK-059 | Sửa mẫu xác nhận đặt phòng | Popup | Booking/editConfirmationTemplate/:id (id được base64_encode) | BOOK-057 | BOOK-057 |
| BOOK-060 | Xem mẫu xác nhận đặt phòng | Popup | Booking/viewConfirmationTemplate/:id (id được base64_encode) | BOOK-057 | BOOK-057 |
| BOOK-061 | Bản dịch mẫu xác nhận đặt phòng (Translations) | Trang đầy đủ | Booking/transalateConfirmationTemplate | BOOK-057 | BOOK-057 |
| BOOK-062 | Loại trừ đặt phòng (Booking Exclusions) | Trang đầy đủ | Booking/exception/:tab? (mặc định: `/booking/exception`) |  |  |
| BOOK-063 | Đặt phòng chưa liên kết (Unlinked Bookings) | Trang đầy đủ | Booking/unlinkedBookings (mặc định: `/booking/unlinked-bookings`) |  |  |
| BOOK-064 | Cài đặt ngày kiểm tra giá thiếu (Missing Rate Setting) | Popup | Booking/missingRateSetting (mặc định: `/booking/missing-rate-setting`) | BOOK-027 | BOOK-027 |
| BOOK-065 | Đặt phòng mới nhất (Latest Bookings) | Trang đầy đủ | Booking/latestBookings (mặc định: `/booking/latest-bookings`) |  | BOOK-028 |
| BOOK-066 | Quản lý giá thuê villa (trang tổng quan) | Trang đầy đủ | Booking/rates (mặc định: `/booking/rates`) |  | BOOK-067, BOOK-070, BOOK-073, BOOK-074 |
| BOOK-067 | Trạng thái cập nhật giá villa | Trang đầy đủ | Booking/ratesStatus (mặc định: `/booking/rates-status`) |  | BOOK-066, BOOK-069, BOOK-075, BOOK-076 |
| BOOK-068 | Thêm trạng thái giá villa | Trang đầy đủ | Booking/ratesStatusAdd (mặc định: `/booking/rates-status-add`) | BOOK-067 | BOOK-067 |
| BOOK-069 | Xử lý trạng thái giá villa (Thanh toán/Kết thúc) | Trang đầy đủ | Booking/ratesStatusEdit/:business_unit_id/:villa_id/:action (action = `payment` hoặc `f... | BOOK-067 | BOOK-067 |
| BOOK-070 | Nhật ký thay đổi giá | Trang đầy đủ | Booking/ratesLogs (mặc định: `/booking/rates-logs`) |  | BOOK-066 |
| BOOK-071 | Thêm nhật ký giá (trang riêng) | Trang đầy đủ | Booking/ratesLogAdd (mặc định: `/booking/rates-log-add`) |  | BOOK-070 |
| BOOK-072 | Sửa nhật ký giá (trang riêng) | Trang đầy đủ | Booking/ratesLogEdit/:id |  | BOOK-070 |
| BOOK-073 | Quản lý mùa giá | Trang đầy đủ | Booking/seasons (mặc định: `/booking/seasons`) |  | BOOK-066 |
| BOOK-074 | Nhật ký giá theo mùa | Trang đầy đủ | Booking/seasonPriceLogs (mặc định: `/booking/season-price-logs`) |  | BOOK-066 |
| BOOK-075 | Đổi giá thuê villa (Monthly/Daily) | Trang đầy đủ | Booking/changeVillaRates/:business_unit_id/:villa_id/:action (action = `monthly` hoặc `... | BOOK-067 | BOOK-067 |
| BOOK-076 | Xem giá thuê theo tháng | Trang đầy đủ | Booking/rentalMonthView/:business_unit_id/:villa_id | BOOK-067 | BOOK-067 |
| BOOK-077 | Quản lý khách đến (Guest Arrival) | Trang đầy đủ | Booking/guestArrival |  |  |
| BOOK-078 | Danh sách khách VIP (VIP Guests) | Trang đầy đủ | Booking/vipGuests/:id |  | BOOK-079 |
| BOOK-079 | Công việc chuẩn bị đón khách (Preparation Work) | Trang đầy đủ | Booking/preparationWork/:button/:booking_id | BOOK-078 | BOOK-078 |
| BOOK-080 | Tiêu chí đề xuất villa (Criteria) | Trang đầy đủ | Booking/criteria |  | BOOK-081, BOOK-082, BOOK-083 |
| BOOK-081 | Thêm tiêu chí đề xuất villa (Add Criteria) | Popup | Booking/addCriteria | BOOK-080 | BOOK-080 |
| BOOK-082 | Sửa tiêu chí đề xuất villa (Edit Criteria) | Popup | Booking/editCriteria/:id | BOOK-080 | BOOK-080 |
| BOOK-083 | Danh sách đề xuất villa (Recommendations) | Trang đầy đủ | Booking/recommendations |  | BOOK-080, BOOK-084 |
| BOOK-084 | Kiểm tra đề xuất villa (Recommendation Check) | Trang đầy đủ | Booking/recommendationCheck |  | BOOK-083 |
| BOOK-085 | Form yêu cầu đặt phòng (Booking Enquiry) | Trang đầy đủ | Booking/bookingEnquiry/:id |  | BOOK-086 |
| BOOK-086 | Xác nhận gửi yêu cầu đặt phòng thành công (Request Success) | Trang con (mở từ BOO | Booking/requestSuccess/:array | BOOK-085 | BOOK-085 |
| BOOK-087 | Khảo sát mức độ hài lòng (Satisfaction) | Trang đầy đủ | Booking/satisfaction |  |  |
| BOOK-088 | Danh sách theo dõi (Watch List) | Trang đầy đủ | Booking/watchList |  |  |
| BOOK-089 | Danh sách chat villa (Villa Chat) | Trang đầy đủ | Booking/villaChats (mặc định: `/booking/villa-chats`) |  | BOOK-038, BOOK-089-P1, BOOK-090, BOOK-091 |
| BOOK-089-P1 | Kích hoạt / Sửa chat khách | Trang đầy đủ | Booking/activateChat/:booking_id (id được base64_encode) | BOOK-089 | BOOK-089 |
| BOOK-090 | Liên kết chat với booking khác | Trang đầy đủ | Booking/linkChat/:booking_id (id được base64_encode) | BOOK-089 | BOOK-089, BOOK-091 |
| BOOK-091 | Xem chat đã liên kết | Trang đầy đủ | Booking/viewLinkedChat/:booking_id (id được base64_encode) | BOOK-089 | BOOK-089 |
| BOOK-092 | Cài đặt tin nhắn chào mừng | Trang đầy đủ | Booking/messageSettings (mặc định: `/booking/message-settings`) |  | BOOK-089-P1 |
| BOOK-093 | Khung chat khách (bản cũ) | Trang đầy đủ | Booking/chat/:booking_id (id được base64_encode) |  | BOOK-094-P1, BOOK-095-P1 |
| BOOK-094 | WhatsApp Manager (bản cũ) | Trang đầy đủ | Booking/whatsAppManager (mặc định: `/booking/whats-app-manager`) |  | BOOK-094-P1, BOOK-095 |
| BOOK-094-P1 | Chat WhatsApp | Trang đầy đủ | Booking/whatsappChat/:booking_id (id được base64_encode) | BOOK-094 | BOOK-094 |
| BOOK-095 | WhatsApp Manager (bản mới) | Trang đầy đủ | Booking/whatsAppManagerNew/:tab? (mặc định: `/booking/whats-app-manager-new`) |  | BOOK-094, BOOK-095-P1, BOOK-096 |
| BOOK-095-P1 | Chat WhatsApp (bản mới) | Trang đầy đủ | Booking/whatsappChatNew/:booking_id (id được base64_encode) | BOOK-095 | BOOK-095 |
| BOOK-096 | Trợ giúp / Trạng thái hệ thống WhatsApp | Trang đầy đủ | Booking/whatsAppHelp (mặc định: `/booking/whats-app-help`) |  | BOOK-095 |
| BOOK-097 | Danh mục FAQ (Wiki) | Trang đầy đủ | Booking/faqCategory (mặc định: `/booking/faq-category`) |  | BOOK-098, BOOK-099 |
| BOOK-098 | Danh sách câu hỏi FAQ (Wiki) | Trang đầy đủ | Booking/faqQuestion (mặc định: `/booking/faq-question`) |  | BOOK-097, BOOK-099, BOOK-100 |
| BOOK-099 | Thêm / Sửa câu hỏi FAQ | Trang đầy đủ | Booking/faq/:id? (mặc định: `/booking/faq` khi thêm mới, `/booking/faq/:id` khi sửa) | BOOK-098 | BOOK-098 |
| BOOK-100 | Xem chi tiết câu hỏi FAQ | Trang đầy đủ | Booking/viewFaq/:id | BOOK-098 | BOOK-098 |
| BOOK-101 | Trạng thái villa (Property Status) | Trang đầy đủ | Booking/propertyStatus (mặc định: `/booking/property-status`) |  | BOOK-101-P1 |
| BOOK-101-P1 | Chi tiết nhân viên villa (Staff Detail) | Popup | Booking/staffDetail (mặc định: `/booking/staff-detail?booking_id=...&clean_id=...&makeu... | BOOK-101 | BOOK-101 |
| BOOK-101-P2 | Điều chỉnh trạng thái villa (Adjust Detail) | Popup | Booking/adjustDetail (mặc định: `/booking/adjust-detail?param=<booking_id>_<clean_id>_<... | BOOK-101 | BOOK-101 |
| BOOK-102 | Bảng chấm công (Timesheet) | Trang đầy đủ | Booking/timesheet (mặc định: `/booking/timesheet`) |  |  |
| BOOK-103 | Danh sách hành động theo tỷ lệ lấp đầy (Action) | Trang đầy đủ | Booking/action (mặc định: `/booking/action`) |  | BOOK-104, BOOK-105 |
| BOOK-104 | Thêm hành động theo tỷ lệ lấp đầy (Add Action) | Trang đầy đủ | Booking/addAction (mặc định: `/booking/add-action`) | BOOK-103 | BOOK-103 |
| BOOK-105 | Theo dõi hành động (Follow Up Action) | Trang đầy đủ | Booking/followUpAction/:id (id được base64_encode) | BOOK-103 | BOOK-103 |
| BOOK-106 | Nhóm quốc tịch (Nationalities) | Trang đầy đủ | Booking/nationalities (mặc định: `/booking/nationalities`) |  |  |
| BOOK-107 | Giờ chuẩn nhận/trả phòng (Standard Time) | Trang đầy đủ | Booking/standardTime (mặc định: `/booking/standard-time`) |  | BOOK-106, BOOK-108 |
| BOOK-108 | Cài đặt hạn chót check-in online (Online Checkin Deadline Settings) | Trang đầy đủ | Booking/onlineCheckinDeadlineSettings |  | BOOK-002, BOOK-106, BOOK-107 |
| BOOK-109 | Báo cáo doanh thu (Revenue Report) | Trang đầy đủ | Booking/revenueReport (mặc định: `/booking/revenue-report`) |  |  |
| BOOK-110 | Chi tiết SHA Plus (SHA Plus Edit) | Trang đầy đủ | Booking/shaPlusEdit/:booking_id |  |  |

## 5. Quản lý chủ sở hữu (Admin)

### OWN — Quản lý chủ sở hữu — Admin (22 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| OWN-001 | Danh sách chủ sở hữu | Trang đầy đủ | `/Owner/list` (controller `Owner`, action `list()`) |  | OWN-001-P1, OWN-002, OWN-003, OWN-014 |
| OWN-001-P1 | Xem chi tiết chủ sở hữu | Popup | `/Owner/viewDetails/{id}` (controller `Owner`, action `viewDetails($id)`) | OWN-001 | OWN-001 |
| OWN-002 | Thêm mới chủ sở hữu | Trang đầy đủ | `/Owner/add` (controller `Owner`, action `add($tab = null)`) |  | OWN-001, OWN-003 |
| OWN-003 | Chỉnh sửa chủ sở hữu | Trang đầy đủ | `/Owner/edit/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `e... |  | OWN-001, OWN-002 |
| OWN-004 | Trạng thái villa theo chủ sở hữu | Trang đầy đủ | `/Owner/status/{tab}` (controller `Owner`, action `status($tab)`) |  | OWN-004-P1, OWN-004-P2 |
| OWN-004-P1 | Xem chi tiết dịch vụ vườn | Popup | `/Owner/gardenView/{id}` (controller `Owner`, action `gardenView($id)`) | OWN-004 | OWN-004 |
| OWN-004-P2 | Xem chi tiết yêu cầu chi phí (Claim) | Popup | `/Owner/viewClaim/{claim_id}` (controller `Owner`, action `viewClaim($claim_id)`) | OWN-004 | OWN-004 |
| OWN-005 | Lịch đặt phòng chủ sở hữu | Trang đầy đủ | `/Owner/calendar` (controller `Owner`, action `calendar()`) |  |  |
| OWN-006 | Hiệu suất villa chủ sở hữu | Trang đầy đủ | `/Owner/performance` (controller `Owner`, action `performance()`) |  |  |
| OWN-007 | Tạo báo cáo chủ sở hữu | Trang đầy đủ | `/Owner/generateReports` (controller `Owner`, action `generateReports()`) |  |  |
| OWN-008 | Danh sách chi tiết thanh toán của chủ sở hữu | Trang đầy đủ | `/Owner/payment/{owner_id}` (controller `Owner`, action `payment($owner_id)`) |  | OWN-003, OWN-008-P1, OWN-008-P2 |
| OWN-008-P1 | Thêm chi tiết thanh toán chủ sở hữu | Popup | `/Owner/addPaymentDetail/{owner_id}` (controller `Owner`, action `addPaymentDetail($own... | OWN-008 | OWN-008 |
| OWN-008-P2 | Chỉnh sửa chi tiết thanh toán chủ sở hữu | Popup | `/Owner/editPaymentDetail/{id}` (controller `Owner`, action `editPaymentDetail($id)`) | OWN-008 | OWN-008 |
| OWN-009 | Danh sách Agency | Trang đầy đủ | `/Owner/agencyList` (controller `Owner`, action `agencyList()`) |  | OWN-010, OWN-011, OWN-012 |
| OWN-010 | Thêm mới Agency | Trang đầy đủ | `/Owner/agency` (controller `Owner`, action `agency($tab = null, $agency_id = null, $sh... |  | OWN-009, OWN-011 |
| OWN-011 | Chỉnh sửa Agency | Trang đầy đủ | `/Owner/editAgency/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, act... |  | OWN-009 |
| OWN-012 | Xem chi tiết Agency | Popup | `/Owner/viewAgencyDetails/{id}` (controller `Owner`, action `viewAgencyDetails($id)`) | OWN-009 | OWN-009 |
| OWN-013 | Danh sách nhân viên Agency | Trang đầy đủ | `/Owner/agencyStaff` (controller `Owner`, action `agencyStaff()`) |  | OWN-014, OWN-015 |
| OWN-014 | Thêm mới nhân viên Agency | Trang đầy đủ | `/Owner/addAgencyStaff` (controller `Owner`, action `addAgencyStaff()`) |  | OWN-013 |
| OWN-015 | Chỉnh sửa nhân viên Agency | Trang đầy đủ | `/Owner/editAgencyStaff/{id}` (controller `Owner`, action `editAgencyStaff($id)`) |  | OWN-013 |
| OWN-016 | Nhật ký đăng nhập chủ sở hữu | Trang đầy đủ | `/Owner/loginLog` (controller `Owner`, action `loginLog()`) |  | OWN-001 |
| OWN-017 | Mẫu email thông báo cho chủ sở hữu | Trang đầy đủ | `/Owner/emailAccessTemplate/{tab}/{selected_lang}` (controller `Owner`, action `emailAc... |  |  |

## 6. Cổng thông tin Chủ sở hữu (Owner Portal)

### OWP — Cổng thông tin Chủ sở hữu (31 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| OWP-001 | Đăng nhập | Trang đầy đủ | `ExternalUserController::index()` — route đẹp: `/Owner`, `/Owners` (config/Routes.php d... |  | OWP-001-P1, OWP-003, OWP-005 |
| OWP-001-P1 | Popup Quên mật khẩu | Popup | `ExternalUserController::forgotPassword()` — không có route đẹp riêng, không có view ri... | OWP-001 | OWP-001, OWP-003 |
| OWP-002 | Trang tổng quan (Dashboard) | Trang đầy đủ | `ExternalUserController::dashboard()` — không có route đẹp riêng (truy cập qua `/extern... |  |  |
| OWP-003 | Đặt lại mật khẩu | Trang đầy đủ | `ExternalUserController::resetPassword($token)` — không có route đẹp riêng; truy cập qu... |  | OWP-001, OWP-001-P1 |
| OWP-004 | Hồ sơ cá nhân | Trang đầy đủ | `ExternalUserController::profile()` — không có route đẹp riêng (mặc định `/external-use... |  | OWP-004-P1 |
| OWP-004-P1 | Popup Đổi mật khẩu | Popup | `ExternalUserController::changePassword()` — không có route đẹp riêng, không có view ri... | OWP-004 | OWP-004 |
| OWP-005 | Danh sách biệt thự (Property List) | Trang đầy đủ | `ExternalUserController::list()` — route đẹp: `/external-user/property/list` (config/Ro... |  | OWP-001, OWP-006 |
| OWP-006 | Chi tiết biệt thự (Property ID Card) | Trang đầy đủ | `ExternalUserController::viewDetails($villa_id)` — không có route đẹp riêng, truy cập t... |  | OWP-005 |
| OWP-007 | Trạng thái hoạt động biệt thự | Trang đầy đủ | `ExternalUserController::status($tab, $villa_id)` — không có route đẹp riêng, mở từ OWP... |  | OWP-005 |
| OWP-007-P1 | Popup Chi tiết công việc dọn dẹp | Popup | `ExternalUserController::planningTeamsDetail($id, $location)` — route dạng `.../plannin... | OWP-007 | OWP-007 |
| OWP-007-P2 | Popup Chi tiết công việc làm vườn | Popup | `ExternalUserController::gardenView($id)` — không có route đẹp riêng, mở từ OWP-007 (ta... | OWP-007 | OWP-007 |
| OWP-008 | Lịch đặt phòng theo biệt thự | Trang đầy đủ | `ExternalUserController::calendar($villa_id)` — không có route đẹp riêng, mở từ OWP-005... |  | OWP-005, OWP-010-P1 |
| OWP-009 | Nhật ký bảo trì | Trang đầy đủ | `ExternalUserController::maintenanceLog($id)` — route đẹp: `/external-user/property/log... |  | OWP-005, OWP-006 |
| OWP-010 | Danh sách đặt phòng (Booking List) | Trang đầy đủ | `ExternalUserController::bookingList()` — không có route đẹp riêng (mặc định `/external... |  | OWP-010-P1 |
| OWP-010-P1 | Popup Chi tiết đặt phòng | Popup | `ExternalUserController::bookingDetails($id)` — không có route đẹp riêng (mặc định `/ex... | OWP-010 | OWP-008, OWP-010 |
| OWP-011 | Thêm đặt phòng | Trang đầy đủ | `ExternalUserController::addBooking()` — không có route đẹp riêng, không có link điều h... |  |  |
| OWP-012 | Danh sách Check-in | Trang đầy đủ | `ExternalUserController::checkIn()` — không có route đẹp riêng (mặc định `/external-use... |  |  |
| OWP-013 | Danh sách Check-out | Trang đầy đủ | `ExternalUserController::checkOut()` — không có route đẹp riêng (mặc định `/external-us... |  |  |
| OWP-014 | Tạo báo cáo tài chính (Owner Statement) | Trang đầy đủ | `ExternalUserController::generateReports()` — không có route đẹp riêng (mặc định `/exte... |  |  |
| OWP-015 | Hiệu suất kinh doanh biệt thự (Performance) | Trang đầy đủ | `ExternalUserController::performance()` — không có route đẹp riêng (mặc định `/external... |  |  |
| OWP-016 | Báo cáo thanh toán hàng tháng cho Chủ sở hữu | Trang đầy đủ | `ExternalUserController::paymentReport($villa_id)` — không có route đẹp riêng, mở từ OW... |  | OWP-005 |
| OWP-017 | Danh sách đặt phòng trực tiếp (Direct Booking Request) | Trang đầy đủ | `ExternalUserController::directBookingList()` — không có route đẹp riêng (mặc định `/ex... |  | OWP-017-P1, OWP-017-P2, OWP-017-P3 |
| OWP-017-P1 | Popup Thêm yêu cầu đặt phòng trực tiếp | Popup | `ExternalUserController::addDirectBooking($id = null)` — không có route đẹp riêng, mở t... | OWP-017 | OWP-017 |
| OWP-017-P2 | Popup Sửa đặt phòng trực tiếp | Popup | `ExternalUserController::editDirectBooking($id)` — không có route đẹp riêng, mở từ icon... | OWP-017 | OWP-017 |
| OWP-017-P3 | Popup Xem chi tiết đặt phòng trực tiếp | Popup | `ExternalUserController::viewDirectBooking($id)` — không có route đẹp riêng, mở từ icon... | OWP-017 | OWP-017 |
| OWP-018 | Danh sách thông tin thanh toán | Trang đầy đủ | `ExternalUserController::paymentDetails()` — không có route đẹp riêng (mặc định `/exter... |  | OWP-018-P1, OWP-018-P2 |
| OWP-018-P1 | Popup Thêm thông tin thanh toán | Popup | `ExternalUserController::addPaymentDetail()` — không có route đẹp riêng, mở từ nút "+" ... | OWP-018 | OWP-018 |
| OWP-018-P2 | Popup Sửa thông tin thanh toán | Popup | `ExternalUserController::editPaymentDetail($id)` — không có route đẹp riêng, mở từ icon... | OWP-018 | OWP-018 |
| OWP-019 | Danh sách hủy đặt phòng trực tiếp | Trang đầy đủ | `ExternalUserController::cancelDirectBookingList()` — không có route đẹp riêng (mặc địn... |  | OWP-017 |
| OWP-020 | Lịch sử báo cáo | Trang đầy đủ | `ExternalUserController::ReportHistory($villa_id)` — không có route đẹp riêng (mặc định... |  | OWP-005 |
| OWP-021 | Bản tin hàng tháng | Trang đầy đủ | `ExternalUserController::MonthlyNewsletter()` — không có route đẹp riêng (mặc định `/ex... |  |  |

## 7. Cổng thông tin Khách (Guest Portal)

### GST — Cổng thông tin Khách (11 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| GST-001 | Đăng nhập Cổng thông tin Khách | Trang đầy đủ | `Guest::index()` — mặc định `/guest/index`; route đẹp: `/Welcome`, `/Welcome/:id` (đều ... |  | GST-002, GST-003 |
| GST-002 | Danh sách đặt phòng của khách | Trang đầy đủ | `Guest::bookings()` — mặc định `/guest/bookings`; route đẹp (fallback DashedRoute): `/g... |  | GST-001, GST-003, GST-004 |
| GST-003 | Chi tiết đặt phòng của tôi | Trang đầy đủ | `Guest::yourBooking($booking_id = null)` — mặc định `/guest/your-booking/:booking_id`; ... |  | GST-001, GST-002, GST-004 |
| GST-004 | Cổng truy cập tiện ích | Trang đầy đủ | `Guest::accessPortal($booking_id = null)` — mặc định `/guest/access-portal/:booking_id`... |  | GST-001, GST-002, GST-008, GST-010, GST-011 |
| GST-005 | Thông tin biệt thự | Trang đầy đủ | `Guest::property()` — mặc định `/guest/property`; route đẹp (fallback DashedRoute): `/g... |  |  |
| GST-006 | Kỳ nghỉ của bạn | Trang đầy đủ | `Guest::yourHolidays()` — mặc định `/guest/your-holidays`; route đẹp (fallback DashedRo... |  |  |
| GST-007 | Nội quy | Trang đầy đủ | `Guest::rules()` — mặc định `/guest/rules`; route đẹp (fallback DashedRoute): `/guest/r... |  |  |
| GST-008 | Danh sách nhà hàng gần biệt thự | Trang đầy đủ | `Guest::restaurants($villa_id = null)` — mặc định `/guest/restaurants/:villa_id`; route... |  | GST-001, GST-009 |
| GST-009 | Chi tiết nhà hàng | Trang đầy đủ | `Guest::restaurant($restaurant_id = null)` — mặc định `/guest/restaurant/:restaurant_id... |  | GST-002, GST-004, GST-008 |
| GST-010 | Địa danh nổi bật quanh biệt thự | Trang đầy đủ | `Guest::landmark($booking_id = null)` — mặc định `/guest/landmark/:booking_id`; route đ... |  | GST-001, GST-002 |
| GST-011 | Hoạt động vui chơi quanh biệt thự | Trang đầy đủ | `Guest::activities($booking_id = null)` — mặc định `/guest/activities/:booking_id`; rou... |  | GST-002 |

## 8. Vận hành hiện trường (Field Operations)

### OPR — Vận hành vườn/hồ bơi (22 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| OPR-001 | Cập nhật hoàn thành công việc vườn | Trang đầy đủ | operator/gardenJobStatus (query `?id=`) + route đẹp dạng dashed: operator/garden-job-st... |  | OPR-002 |
| OPR-002 | Danh sách công việc vườn | Trang đầy đủ | operator/gardenJobList/:tab? + route đẹp dạng dashed: operator/garden-job-list |  | OPR-001, OPR-016 |
| OPR-003 | Danh sách công việc hồ bơi | Trang đầy đủ | operator/pools/:tab? + route đẹp dạng dashed: operator/pools |  | OPR-004 |
| OPR-004 | Xem chi tiết công việc hồ bơi | Trang đầy đủ | operator/poolView/:id + route đẹp dạng dashed: operator/pool-view/:id |  | OPR-003 |
| OPR-005 | Cập nhật hoàn thành công việc hồ bơi | Trang đầy đủ | operator/poolJob/:id + route đẹp dạng dashed: operator/pool-job/:id |  | OPR-003 |
| OPR-006 | Báo cáo sự cố hồ bơi | Trang đầy đủ | operator/poolReport/:id + route đẹp dạng dashed: operator/pool-report/:id |  | OPR-005 |
| OPR-007 | Danh sách dọn dẹp (Cleaning) | Trang đầy đủ | operator/cleaning + route đẹp dạng dashed: operator/cleaning |  | OPR-008 |
| OPR-008 | Thực hiện dọn dẹp theo điểm kiểm tra | Trang đầy đủ | operator/cleaningDetails?id=&last_id= + route đẹp dạng dashed: operator/cleaning-details |  | OPR-007 |
| OPR-009 | Bảng điều khiển vận hành dọn dẹp (Cleaning Operator) | Trang đầy đủ | operator/cleaningOperator + route đẹp dạng dashed: operator/cleaning-operator |  |  |
| OPR-010 | Danh sách kiểm tra villa (Inspection) | Trang đầy đủ | operator/inspection + route đẹp dạng dashed: operator/inspection |  | OPR-011, OPR-012, OPR-013 |
| OPR-011 | Thực hiện kiểm tra villa theo điểm | Trang đầy đủ | operator/inspectionDetails?id=&last_id= + route đẹp dạng dashed: operator/inspection-de... |  | OPR-010 |
| OPR-012 | Xem kết quả kiểm tra đã hoàn thành | Trang đầy đủ | operator/inspectionView?id= + route đẹp dạng dashed: operator/inspection-view |  | OPR-010 |
| OPR-013 | Quản lý kiểm tra đang thực hiện | Trang đầy đủ | operator/inspectionTaskView?id= + route đẹp dạng dashed: operator/inspection-task-view |  | OPR-010, OPR-011 |
| OPR-014 | Danh sách Make Up | Trang đầy đủ | operator/makeUp + route đẹp dạng dashed: operator/make-up |  | OPR-015 |
| OPR-015 | Thực hiện Make Up theo điểm | Trang đầy đủ | operator/makeupDetails?id=&last_id= + route đẹp dạng dashed: operator/makeup-details |  | OPR-014 |
| OPR-016 | Xem chi tiết công việc vườn | Trang đầy đủ | operator/gardenView/:id + route đẹp dạng dashed: operator/garden-view/:id |  | OPR-002 |
| OPR-017 | Lập kế hoạch phân công công việc vườn (Garden Planning) | Trang đầy đủ | villa-services/gardenPlanning/:tab? + route đẹp dạng dashed: villa-services/garden-plan... |  | OPR-002 |
| OPR-018 | Cấu hình đội nhóm làm vườn (Garden Teams) | Trang đầy đủ | villa-services/gardenTeams + route đẹp dạng dashed: villa-services/garden-teams |  | OPR-017 |
| OPR-019 | Lịch phân công cá nhân (Roster) | Trang đầy đủ | operator/roster + route đẹp dạng dashed: operator/roster |  |  |
| OPR-020 | Danh sách phiếu bảo trì (Maintenance) | Trang đầy đủ | operator/maintenance + route đẹp dạng dashed: operator/maintenance |  | OPR-021, OPR-022 |
| OPR-021 | Tạo phiếu bảo trì mới | Trang đầy đủ | operator/addMaintenanceTicket + route đẹp dạng dashed: operator/add-maintenance-ticket |  | OPR-020 |
| OPR-022 | Sửa/quản lý phiếu bảo trì | Trang đầy đủ | operator/editMaintenanceTicket/:id + route đẹp dạng dashed: operator/edit-maintenance-t... |  | OPR-020 |

### MNT — Bảo trì (29 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| MNT-001 | Danh sách nhật ký bảo trì | Trang đầy đủ | maintenance/list |  | MNT-002, MNT-003, MNT-004, MNT-005 |
| MNT-002 | Thêm nhật ký bảo trì mới | Trang đầy đủ | maintenance/add |  | MNT-001 |
| MNT-003 | Nhận/Từ chối công việc bảo trì | Trang đầy đủ | maintenance/accept/:id (id base64) |  | MNT-001 |
| MNT-004 | Cập nhật xử lý nhật ký bảo trì | Trang đầy đủ | maintenance/edit/:id (id base64) |  | MNT-001 |
| MNT-005 | Xem chi tiết nhật ký bảo trì | Trang đầy đủ | maintenance/view/:id |  | MNT-001, MNT-004, MNT-006 |
| MNT-006 | Chi phí bảo trì | Trang đầy đủ | maintenance/cost/:id (id base64) |  | MNT-001, MNT-005 |
| MNT-007 | Danh mục bảo trì (Categories) | Trang đầy đủ | maintenance/categories |  |  |
| MNT-008 | Mức độ ưu tiên bảo trì (Priorities) | Trang đầy đủ | maintenance/priorities |  |  |
| MNT-009 | Dịch vụ vườn (Garden Services) | Trang đầy đủ | maintenance/gardenServices |  | MNT-009-P1, MNT-009-P2 |
| MNT-009-P1 | Thêm dịch vụ vườn | Popup | maintenance/addGardenService | MNT-009 | MNT-009 |
| MNT-009-P2 | Sửa dịch vụ vườn | Popup | maintenance/editGardenService/:id | MNT-009 | MNT-009 |
| MNT-010 | Dịch vụ hồ bơi (Pool Services) | Trang đầy đủ | maintenance/poolServices |  | MNT-010-P1, MNT-010-P2 |
| MNT-010-P1 | Thêm dịch vụ hồ bơi | Popup | maintenance/addPoolServices | MNT-010 | MNT-010 |
| MNT-010-P2 | Sửa dịch vụ hồ bơi | Popup | maintenance/editPoolService/:id | MNT-010 | MNT-010 |
| MNT-011 | Sửa chữa hồ bơi (Pool Repair) | Trang đầy đủ | maintenance/poolRepair |  | MNT-011-P1, MNT-011-P2 |
| MNT-011-P1 | Thêm dịch vụ sửa chữa hồ bơi | Popup | maintenance/addPoolRepair | MNT-011 | MNT-011 |
| MNT-011-P2 | Sửa dịch vụ sửa chữa hồ bơi | Popup | maintenance/editPoolRepair/:id | MNT-011 | MNT-011 |
| MNT-012 | Ma trận dịch vụ bảo trì (Danh mục / Hạng mục / Vấn đề) | Trang đầy đủ | maintenance/maintenanceServices (+ ajax `maintenance/maintenanceMatrix` phân trang/tìm ... |  |  |
| MNT-013 | Dịch vụ cải tạo (Renovation Services) | Trang đầy đủ | maintenance/renovationServices |  | MNT-013-P1, MNT-013-P2 |
| MNT-013-P1 | Thêm dịch vụ cải tạo | Popup | maintenance/addRenovationService | MNT-013 | MNT-013 |
| MNT-013-P2 | Sửa dịch vụ cải tạo | Popup | maintenance/editRenovationServices/:id | MNT-013 | MNT-013 |
| MNT-014 | Dịch vụ dọn dẹp (Cleaning Services) | Trang đầy đủ | maintenance/cleaningServices (ajax GET cùng route trả JSON tìm kiếm; `maintenance/getCl... |  | MNT-014-P1 |
| MNT-014-P1 | Thêm dịch vụ dọn dẹp | Trang đầy đủ | maintenance/addCleaningService | MNT-014 | MNT-014 |
| MNT-015 | Dịch vụ Back Office | Trang đầy đủ | maintenance/backOfficeServices |  | MNT-015-P1, MNT-015-P2 |
| MNT-015-P1 | Thêm dịch vụ Back Office | Popup | maintenance/addBackOfficeService | MNT-015 | MNT-015 |
| MNT-015-P2 | Sửa dịch vụ Back Office | Popup | maintenance/editBackOfficeServices/:id | MNT-015 | MNT-015 |
| MNT-016 | Quy tắc thời gian kiểm tra (Inspection Time Rules) | Trang đầy đủ | maintenance/inspection |  | MNT-016-P1, MNT-016-P2 |
| MNT-016-P1 | Sửa quy tắc thời gian kiểm tra | Popup | maintenance/editInspection/:id (id base64) | MNT-016 | MNT-016 |
| MNT-016-P2 | Xem quy tắc thời gian kiểm tra | Popup | maintenance/viewInspection/:id (id base64) | MNT-016 | MNT-016, MNT-016-P1 |

### REN — Cải tạo (12 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| REN-001 | Tạo dự án cải tạo mới | Trang đầy đủ | renovation/new-project |  | REN-002, REN-003 |
| REN-002 | Theo dõi cải tạo | Trang đầy đủ | renovation/followUp + route đẹp dạng dashed: renovation/follow-up |  | REN-001, REN-003, REN-004 |
| REN-003 | Theo dõi dự án cải tạo | Trang đầy đủ | renovation/projectFollowUp/:id + route đẹp dạng dashed: renovation/project-follow-up/:i... |  | REN-001, REN-002, REN-005, REN-007, REN-008, REN-009, REN-010, REN-011 |
| REN-004 | Sửa dự án cải tạo | Trang đầy đủ | renovation/edit/:renovation_id + route đẹp dạng dashed: renovation/edit/:renovation_id ... |  | REN-002 |
| REN-005 | Sổ quỹ thanh toán dự án cải tạo | Trang đầy đủ | renovation/paymentList/:renovation_id + route đẹp dạng dashed: renovation/payment-list/... |  | REN-003, REN-006 |
| REN-006 | Thêm khoản thanh toán | Trang đầy đủ | renovation/addPayment/:renovation_id + route đẹp dạng dashed: renovation/add-payment/:r... |  | REN-005 |
| REN-007 | Thêm hóa đơn/phiếu chi | Trang đầy đủ | renovation/addNewReceipt/:renovation_id + route đẹp dạng dashed: renovation/add-new-rec... |  | REN-003 |
| REN-008 | Sửa hóa đơn/phiếu chi | Trang đầy đủ | renovation/editRenovationReceipt/:id + route đẹp dạng dashed: renovation/edit-renovatio... |  | REN-003 |
| REN-009 | Thêm ảnh dự án | Trang đầy đủ | renovation/addPhoto/:renovation_id + route đẹp dạng dashed: renovation/add-photo/:renov... |  | REN-003 |
| REN-010 | Sửa ảnh dự án | Trang đầy đủ | renovation/editPhoto/:id + route đẹp dạng dashed: renovation/edit-photo/:id (id truyền ... |  | REN-003 |
| REN-011 | Báo cáo tiến độ & chi phí dự án | Trang đầy đủ | renovation/report/:id + route đẹp dạng dashed: renovation/report/:id (id truyền base64) |  | REN-003 |
| REN-012 | Popup mẫu (scaffold, chưa xác định điểm sử dụng) | Popup | renovation/startPopup + route đẹp dạng dashed: renovation/start-popup |  |  |

### TRN — Đào tạo (16 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| TRN-001 | Trang chủ Đào tạo | Trang đầy đủ | `TrainingController::index()` — `/training/index` (mặc định, DashedRoute) |  | TRN-002, TRN-007, TRN-008, TRN-010, TRN-011 |
| TRN-002 | Danh sách Tutorial (Quản trị) | Trang đầy đủ | `TrainingController::createTutorial()` — `/training/create-tutorial` |  | TRN-002-P1, TRN-003, TRN-004, TRN-005 |
| TRN-002-P1 | Popup xác nhận xóa Tutorial | Popup | Modal Bootstrap trong `create_tutorial.ctp`; hành động xóa gọi `TrainingController::del... | TRN-002 | TRN-002 |
| TRN-003 | Thêm mới Tutorial và Slide | Trang đầy đủ | `TrainingController::addTutorial($tutorial_id = null, $slide_id = null)` — `/training/a... |  | TRN-002, TRN-005 |
| TRN-004 | Xem chi tiết Tutorial | Trang đầy đủ | `TrainingController::viewTutorial($id)` — `/training/view-tutorial/{id}` |  | TRN-002, TRN-005 |
| TRN-005 | Sửa Tutorial | Trang đầy đủ | `TrainingController::editTutorial($id)` — `/training/edit-tutorial/{id}` |  | TRN-002, TRN-003, TRN-004, TRN-005-P1, TRN-006 |
| TRN-005-P1 | Popup xác nhận xóa Slide | Popup | Modal Bootstrap trong `edit_tutorial.ctp`; hành động xóa gọi `TrainingController::delet... | TRN-005 | TRN-005 |
| TRN-006 | Sửa Slide Tutorial | Trang đầy đủ | `TrainingController::editSlide($id)` — `/training/edit-slide/{id}` |  | TRN-005 |
| TRN-007 | Thư viện Tutorial | Trang đầy đủ | `TrainingController::library()` — `/training/library` |  | TRN-009 |
| TRN-008 | Lịch sử đào tạo của tôi | Trang đầy đủ | `TrainingController::myRecord()` — `/training/my-record` |  | TRN-009 |
| TRN-009 | Đọc Tutorial | Trang đầy đủ | `TrainingController::readTutorial($tutorial_id, $reading_id = null)` — `/training/read-... |  | TRN-007, TRN-008 |
| TRN-010 | Lịch sử đào tạo của đội nhóm | Trang đầy đủ | `TrainingController::myTeamRecord()` — `/training/my-team-record` |  |  |
| TRN-011 | Cài đặt Đào tạo | Trang đầy đủ | `TrainingController::setting()` — `/training/setting` |  |  |
| TRN-012 | Trang giới thiệu Villa Management (demo) | Trang đầy đủ | `TrainingController::page()` — `/training/page` |  |  |
| TRN-013 | Demo câu hỏi trắc nghiệm | Trang đầy đủ | `TrainingController::quizQuestion()` — `/training/quiz-question` |  |  |
| TRN-014 | Demo slide "Missing Room IDs" | Trang đầy đủ | `TrainingController::slide2()` — `/training/slide2` |  |  |

## 9. Tài chính

### FUND — Quỹ đầu tư (9 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| FUND-001 | Danh sách nhà đầu tư | Trang đầy đủ | `FundController::investors()` — `/fund/investors` (GET, lọc qua query string `id`, `sho... |  | FUND-001-P1, FUND-002, FUND-007 |
| FUND-001-P1 | Gán dự án cho nhà đầu tư | Popup | Submit POST tới `FundController::investors()` (`/fund/investors`, field ẩn `action = pr... | FUND-001 | FUND-001 |
| FUND-002 | Sao kê giao dịch nhà đầu tư | Trang đầy đủ | `FundController::statements($in_id = null)` — `/fund/statements` hoặc `/fund/statements... |  | FUND-001, FUND-002-P1 |
| FUND-002-P1 | Giao dịch quỹ đầu tư (Đầu tư / Rút vốn / Chi trả lãi / Vốn hóa lãi) | Popup | Submit POST tới `FundController::statements()` (`/fund/statements`, field `action` = `i... | FUND-002 | FUND-002 |
| FUND-003 | Danh sách dự án quỹ | Trang đầy đủ | `FundController::projects()` — `/fund/projects` |  | FUND-004, FUND-005, FUND-006 |
| FUND-004 | Thêm dự án quỹ | Trang đầy đủ | `FundController::addProject()` — `/fund/add-project` (POST) |  | FUND-003 |
| FUND-005 | Cập nhật dự án quỹ | Trang đầy đủ | `FundController::updateProject($id)` — `/fund/update-project/:id` (POST) |  | FUND-003, FUND-006 |
| FUND-006 | Chi tiết dự án quỹ | Trang đầy đủ | `FundController::viewProject($id)` — `/fund/view-project/:id` |  | FUND-003, FUND-005 |
| FUND-007 | Cấu hình lãi suất nhà đầu tư | Trang đầy đủ | `FundController::rates($owner_id)` — `/fund/rates/:owner_id` (GET hiển thị, POST lưu to... |  | FUND-001 |

### INV — Kho vật tư (9 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| INV-001 | Danh sách kho vật tư | Trang đầy đủ | `InventoryController::list()` — `/inventory/list` |  | INV-001-P1, INV-002 |
| INV-001-P1 | Điều chỉnh / xóa tồn kho | Popup | Submit POST tới `InventoryController::list()` (`/inventory/list`, field `action` = `add... | INV-001 | INV-001 |
| INV-002 | Thêm vật tư vào kho | Trang đầy đủ | `InventoryController::add()` — `/inventory/add` (POST) |  | INV-001 |
| INV-003 | Cập nhật kho vật tư | Trang đầy đủ | `InventoryController::edit($id)` — `/inventory/edit/:id` (`id` được mã hóa base64 trên ... |  | INV-001 |
| INV-004 | Yêu cầu nhận vật tư | Trang đầy đủ | `InventoryController::itemRequest()` — `/inventory/item-request` |  | INV-004-P1 |
| INV-004-P1 | Duyệt yêu cầu nhận vật tư | Popup | Submit POST tới `InventoryController::itemRequest()` (`/inventory/item-request`) | INV-004 | INV-004 |
| INV-005 | Yêu cầu hủy vật tư | Trang đầy đủ | `InventoryController::discard()` — `/inventory/discard` |  | INV-005-P1 |
| INV-005-P1 | Duyệt yêu cầu hủy vật tư | Popup | Submit POST tới `InventoryController::discard()` (`/inventory/discard`) | INV-005 | INV-005 |
| INV-006 | Nhật ký kho vật tư | Trang đầy đủ | `InventoryController::logs()` — `/inventory/logs` |  |  |

## 10. Dịch vụ villa

### VSV — Dịch vụ villa (38 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| VSV-001 | Điện: Trang tổng quan (Hub) | Trang đầy đủ | `VillaServicesController::list()` — mặc định `/villa-services/list` |  | VSV-002, VSV-011, VSV-012 |
| VSV-002 | Thiết lập điện villa (Electricity Set-up) | Trang đầy đủ | `VillaServicesController::propertySetup($tab = null)` — mặc định `/villa-services/prope... |  | VSV-001 |
| VSV-003 | Check-in điện (danh sách) | Trang đầy đủ | `VillaServicesController::checkIn()` — mặc định `/villa-services/check-in` |  | VSV-003-P1, VSV-004-P1 |
| VSV-003-P1 | Nhập chỉ số đồng hồ điện đầu kỳ (Start Meter) | Popup | Xem `VillaServicesController::startMeter($booking_id)` — `/villa-services/start-meter/<... | VSV-003 | VSV-003 |
| VSV-004 | Check-out điện (danh sách) | Trang đầy đủ | `VillaServicesController::checkOut()` — mặc định `/villa-services/check-out` |  | VSV-004-P1 |
| VSV-004-P1 | Nhập chỉ số đồng hồ điện cuối kỳ (End Meter) | Popup | `VillaServicesController::endMeter($booking_id)` — `/villa-services/end-meter/<booking_... | VSV-004 | VSV-004 |
| VSV-005 | Đồng hồ điện lưu trú dài hạn (Long Stay) | Trang đầy đủ | `VillaServicesController::partial()` — mặc định `/villa-services/partial`; các bộ lọc đ... |  | VSV-005-P1 |
| VSV-005-P1 | Nhập đồng hồ điện lưu trú dài hạn (Long Stay Meter) | Popup | `VillaServicesController::addLongStayMeter($booking_id)` — `/villa-services/add-long-st... | VSV-005 | VSV-005 |
| VSV-006 | Đối soát điện (Reconcile) | Trang đầy đủ | `VillaServicesController::reconcile()` — mặc định `/villa-services/reconcile` |  | VSV-004-P1, VSV-005-P1 |
| VSV-007 | Hóa đơn điện hàng tháng (Monthly Bill) | Trang đầy đủ | `VillaServicesController::monthlyBill()` — mặc định `/villa-services/monthly-bill` (POS... |  |  |
| VSV-008 | Cân đối thu/chi điện (Monthly Balance) | Trang đầy đủ | `VillaServicesController::monthlyBalance()` — mặc định `/villa-services/monthly-balance... |  |  |
| VSV-009 | Hạng mục (Item) | Trang đầy đủ | `VillaServicesController::item()` — mặc định `/villa-services/item` |  |  |
| VSV-010 | Chuyển khoản (Transfer) | Trang đầy đủ | `VillaServicesController::transfer()` — mặc định `/villa-services/transfer` |  |  |
| VSV-011 | Kiểm soát check-in điện (Electricity Check-in Control) | Trang đầy đủ | `VillaServicesController::electricityCheckInControl()` — mặc định `/villa-services/elec... |  | VSV-001, VSV-011-P1 |
| VSV-011-P1 | Xem chi tiết kiểm soát check-in điện | Popup | `VillaServicesController::viewCheckinControl($id)` — `/villa-services/view-checkin-cont... | VSV-011 | VSV-011 |
| VSV-012 | Kiểm soát check-out điện (Electricity Check-out Control) | Trang đầy đủ | `VillaServicesController::electricityCheckOutControl()` — mặc định `/villa-services/ele... |  | VSV-001, VSV-012-P1 |
| VSV-012-P1 | Xem chi tiết kiểm soát check-out điện | Popup | `VillaServicesController::viewCheckOutControl($id)` — `/villa-services/view-checkout-co... | VSV-012 | VSV-012 |
| VSV-013 | Dịch vụ ăn uống (Food) | Trang đầy đủ | `VillaServicesController::food()` — mặc định `/villa-services/food` |  |  |
| VSV-014 | Dọn dẹp (Cleaning) | Trang đầy đủ | `VillaServicesController::cleaning()` — mặc định `/villa-services/cleaning` |  | VSV-016 |
| VSV-015 | Tra cứu hóa đơn điện của khách (Check Stay) | Trang đầy đủ | `VillaServicesController::checkStay()` — mặc định `/villa-services/check-stay`; dữ liệu... |  |  |
| VSV-016 | Đội dọn dẹp (Cleaning Teams) | Trang đầy đủ | `VillaServicesController::cleaningTeams()` — mặc định `/villa-services/cleaning-teams`;... |  |  |
| VSV-017 | Vườn (Garden) — Trang tổng hợp | Trang đầy đủ | `VillaServicesController::garden($tab, $sub_tab)` — mặc định `/villa-services/garden/<t... |  | VSV-017-P1 |
| VSV-017-P1 | Xem chi tiết lượt làm vườn (Garden Job View) | Popup | `VillaServicesController::gardenView($id)` — `/villa-services/garden-view/<garden_job_id>` | VSV-017 | VSV-017 |
| VSV-018 | Đội làm vườn (Garden Teams) | Trang đầy đủ | `VillaServicesController::gardenTeams()` — mặc định `/villa-services/garden-teams`; lưu... |  | VSV-017 |
| VSV-019 | Lịch làm vườn (Garden Planning) | Trang đầy đủ | `VillaServicesController::gardenPlanning($tab)` — mặc định `/villa-services/garden-plan... |  | VSV-017 |
| VSV-020 | Danh sách công việc vận hành (Garden Job List) | Trang đầy đủ | `VillaServicesController::gardenJobList()` — mặc định `/villa-services/garden-job-list` |  | VSV-020-P1 |
| VSV-020-P1 | Trạng thái công việc (Garden Job Status) | Popup | `VillaServicesController::gardenJobStatus()` — `/villa-services/garden-job-status` | VSV-020 | VSV-020 |
| VSV-021 | Danh sách kiểm tra villa (Inspection) | Trang đầy đủ | `VillaServicesController::inspection()` — mặc định `/villa-services/inspection`; dữ liệ... |  | VSV-021-P1, VSV-022, VSV-022-P1 |
| VSV-021-P1 | Xem chi tiết báo cáo kiểm tra (Inspection View) | Popup | `VillaServicesController::inspectionView()` — `/villa-services/inspectionView?id=<inspe... | VSV-021 | VSV-021 |
| VSV-022 | Thiết lập xử lý báo cáo kiểm tra (Inspection Edit) | Popup | `VillaServicesController::inspectionEdit()` — `/villa-services/inspectionEdit?id=<inspe... | VSV-021 | VSV-021, VSV-022-P1 |
| VSV-022-P1 | Xử lý chi tiết từng hạng mục kiểm tra (Inspection Edit Details) | Popup | `VillaServicesController::inspectionEditDetails()` — `/villa-services/inspectionEditDet... | VSV-021 | VSV-021, VSV-022 |
| VSV-023 | Hồ bơi (Pool) | Trang đầy đủ | `VillaServicesController::pool()` — mặc định `/villa-services/pool`; upload/duyệt báo g... |  |  |
| VSV-024 | Làm mới phòng (Make-up) | Trang đầy đủ | `VillaServicesController::makeUp()` — mặc định `/villa-services/make-up` |  | VSV-025 |
| VSV-025 | Lịch làm mới phòng hằng ngày (Makeup Teams) | Trang đầy đủ | `VillaServicesController::makeupTeams()` — mặc định `/villa-services/makeup-teams`; dan... |  | VSV-025-P1 |
| VSV-025-P1 | Chi tiết tiến trình làm mới phòng (Makeup Detail View) | Popup | `VillaServicesController::makeupTeamsDetail($id, $location)` — `/villa-services/makeup-... | VSV-025 | VSV-025 |
| VSV-026 | Lịch phân công dọn dẹp hằng ngày (Planning Teams) | Trang đầy đủ | `VillaServicesController::planningTeams()` — mặc định `/villa-services/planning-teams`;... |  | VSV-016, VSV-026-P1 |
| VSV-026-P1 | Chi tiết tiến trình dọn dẹp villa (Planning Detail View) | Popup | `VillaServicesController::planningTeamsDetail($id, $location)` — `/villa-services/plann... | VSV-026 | VSV-026 |
| VSV-027 | Kiểm soát điện check-in/check-out (bản cũ — Control) | Trang đầy đủ | `VillaServicesController::control()` — mặc định `/villa-services/control`; dữ liệu điều... |  | VSV-011, VSV-012 |

## 11. Quản trị nội dung (CMS)

### CMS — Nội dung trang chủ (34 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| CMS-001 | Danh sách villa quản lý nội dung trang chủ (CMS Property List) | Trang đầy đủ | `CmsController::list($id)` — mặc định `/cms/list/:id` |  | CMS-002 |
| CMS-002 | Trang CMS chính theo villa (nội dung website villa) | Trang đầy đủ | `CmsController::cms($tab, $villa_id, $lang1)` — mặc định `/cms/cms/:tab/:villa_id/:lang... |  | CMS-001, CMS-003 |
| CMS-003 | Danh sách dịch vụ villa (CMS Services List) | Trang đầy đủ | `CmsController::cmsServicesList($action, $id)` — mặc định `/cms/cms-services-list/:acti... |  | CMS-004, CMS-005 |
| CMS-004 | Thêm/Sửa dịch vụ villa (CMS Services) | Trang đầy đủ | `CmsController::cmsServices($id)` — mặc định `/cms/cms-services/:id` |  | CMS-003 |
| CMS-005 | Trang Common Text (menu điều hướng nội dung CMS chung) | Trang đầy đủ | `CmsController::commonText()` — mặc định `/cms/common-text` |  | CMS-003, CMS-006, CMS-009, CMS-012, CMS-014, CMS-016 |
| CMS-006 | Danh sách "Why Us" (lý do chọn chúng tôi) | Trang đầy đủ | `CmsController::whyUs($action, $id)` — mặc định `/cms/why-us/:action/:id` |  | CMS-005, CMS-007, CMS-008 |
| CMS-007 | Thêm "Why Us" | Trang đầy đủ | `CmsController::whyUsAdd()` — mặc định `/cms/why-us-add` |  | CMS-006 |
| CMS-008 | Sửa "Why Us" | Trang đầy đủ | `CmsController::whyUsEdit($id)` — mặc định `/cms/why-us-edit/:id` |  | CMS-006 |
| CMS-009 | Danh sách Logo đối tác | Trang đầy đủ | `CmsController::logos($action, $id)` — mặc định `/cms/logos/:action/:id` |  | CMS-005, CMS-010, CMS-011 |
| CMS-010 | Thêm Logo đối tác | Trang đầy đủ | `CmsController::logoAdd()` — mặc định `/cms/logo-add` |  | CMS-009 |
| CMS-011 | Sửa Logo đối tác | Trang đầy đủ | `CmsController::logoEdit($id)` — mặc định `/cms/logo-edit/:id` |  | CMS-009 |
| CMS-012 | Danh sách điểm đến (Destination) | Trang đầy đủ | `CmsController::destination($action, $id)` — mặc định `/cms/destination/:action/:id` |  | CMS-005, CMS-013 |
| CMS-013 | Sửa nội dung điểm đến (Destination Edit) | Trang đầy đủ | `CmsController::destinationEdit($district_id)` — mặc định `/cms/destination-edit/:distr... |  | CMS-012 |
| CMS-014 | Danh sách Destination Global | Trang đầy đủ | `CmsController::destinationGlobal()` — mặc định `/cms/destination-global` |  | CMS-005, CMS-015 |
| CMS-015 | Sửa nội dung Destination Global | Trang đầy đủ | `CmsController::destinationGlobalEdit($district_id)` — mặc định `/cms/destination-globa... |  | CMS-014 |
| CMS-016 | Danh sách Contact Form | Trang đầy đủ | `CmsController::contactForm($action, $id)` — mặc định `/cms/contact-form/:action/:id` |  | CMS-005, CMS-017 |
| CMS-017 | Thêm/Sửa Contact Form | Trang đầy đủ | `CmsController::editContactForm($id)` — mặc định `/cms/edit-contact-form/:id` |  | CMS-016 |
| CMS-018 | Danh sách Concierge | Trang đầy đủ | `CmsController::concierges($action, $id)` — mặc định `/cms/concierges/:action/:id` |  | CMS-005, CMS-019 |
| CMS-019 | Thêm/Sửa dịch vụ Concierge | Trang đầy đủ | `CmsController::editConcierges($id)` — mặc định `/cms/edit-concierges/:id` |  | CMS-018 |
| CMS-020 | Quản lý dịch đa ngôn ngữ (CMS Translation) | Trang đầy đủ | `CmsController::cmsTranslation($tab)` — mặc định `/cms/cms-translation/:tab` |  |  |
| CMS-021 | Danh sách Collection Website | Trang đầy đủ | `CmsController::collectionWebsites($action, $id)` — mặc định `/cms/collection-websites/... |  | CMS-022, CMS-023 |
| CMS-022 | Thêm/Sửa Collection Website | Trang đầy đủ | `CmsController::collectionWebsiteEdit($id)` — mặc định `/cms/collection-website-edit/:id` |  | CMS-021 |
| CMS-023 | Quản lý nội dung Collection Website (5 tab con) | Trang đầy đủ | `CmsController::collectionTabs($tab, $id)` — mặc định `/cms/collection-tabs/:tab/:id` |  | CMS-021, CMS-022, CMS-024, CMS-025, CMS-026, CMS-027, CMS-028, CMS-029 |
| CMS-024 | Danh sách text chung Collection Website | Trang đầy đủ | `CmsController::collectionCommonText($action, $id)` — mặc định `/cms/collection-common-... |  | CMS-023, CMS-025 |
| CMS-025 | Thêm/Sửa text chung Collection Website | Trang đầy đủ | `CmsController::editCollectionCommonText($id)` — mặc định `/cms/edit-collection-common-... |  | CMS-023, CMS-024 |
| CMS-026 | Danh sách bài viết Insights | Trang đầy đủ | `CmsController::insights($action, $id)` — mặc định `/cms/insights/:action/:id` |  | CMS-023, CMS-027 |
| CMS-027 | Thêm/sửa bài viết Insight | Trang đầy đủ | `CmsController::insightsEdit($id)` — mặc định `/cms/insights-edit/:id` |  | CMS-023, CMS-026 |
| CMS-028 | Danh sách I Wish | Trang đầy đủ | `CmsController::iWish($action, $id)` — mặc định `/cms/i-wish/:action/:id` |  | CMS-023, CMS-029 |
| CMS-029 | Thêm/sửa mục I Wish | Trang đầy đủ | `CmsController::iWishEdit($id)` — mặc định `/cms/i-wish-edit/:id` |  | CMS-023, CMS-028 |
| CMS-030 | Danh sách nội dung Arrival (hướng dẫn khách đến villa) | Trang đầy đủ | `CmsController::arrival($action, $id)` — mặc định `/cms/arrival` (danh sách); xoá dùng ... |  | CMS-031 |
| CMS-031 | Thêm/Sửa nội dung Arrival | Trang đầy đủ | `CmsController::cmsArrival($id)` — mặc định `/cms/cms-arrival/:id` |  | CMS-030 |
| CMS-032 | Danh sách nhà hàng Guest Portal | Trang đầy đủ | `CmsController::guestPortal()` — mặc định `/cms/guest-portal` |  | CMS-033 |
| CMS-033 | Thêm/Sửa nhà hàng (Guest Portal) | Trang đầy đủ | `CmsController::restaurants($tab, $restaurant_id)` — mặc định `/cms/restaurants/:tab/:r... |  | CMS-032 |
| CMS-034 | Trình soạn thảo nội dung hợp đồng khách (Guest Contract Editor) | Trang đầy đủ | `CmsController::contracts()` — mặc định `/cms/contracts` (GET có thể kèm query `country... |  |  |

### EMT — Mẫu email (4 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| EMT-001 | Danh sách mẫu email (Email Template List) | Trang đầy đủ | `EmailTemplateController::list()` — mặc định `/email-template/list` |  | EMT-001-P1, EMT-002, EMT-003 |
| EMT-001-P1 | Xác nhận xóa mẫu email | Popup | Modal tĩnh trong `list.ctp`; xác nhận điều hướng tới `EmailTemplateController::delete($... | EMT-001 | EMT-001 |
| EMT-002 | Thêm mẫu email (Add Email Template) | Trang đầy đủ | `EmailTemplateController::add()` — mặc định `/email-template/add` |  | EMT-001 |
| EMT-003 | Sửa mẫu email (Edit Email Template) | Trang đầy đủ | `EmailTemplateController::edit($id)` — mặc định `/email-template/edit/:id` (id mã hóa b... |  | EMT-001 |

### NOT — Thông báo (9 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| NOT-001 | Gửi thông báo/công việc (Notice Board) | Trang đầy đủ | `NoticeController::noticeBoard()` — mặc định `/notice/notice-board` (route đẹp không đư... |  | NOT-002 |
| NOT-002 | Danh sách thông báo/công việc (Notice List) | Trang đầy đủ | `NoticeController::noticeList($tab, $sub_tab)` — mặc định `/notice/notice-list/:tab/:su... |  | NOT-001, NOT-003, NOT-004, NOT-005 |
| NOT-002-P1 | Xác nhận xóa thông báo | Popup | Modal tĩnh trong `notice_list.ctp`; hành động xóa gọi `NoticeController::delete($id)` q... | NOT-002 | NOT-002 |
| NOT-003 | Chi tiết thông báo (View Detail) | Trang đầy đủ | `NoticeController::viewDetail($id)` — mặc định `/notice/view-detail/:id` |  | NOT-002, NOT-003-P1 |
| NOT-003-P1 | Xác nhận xóa thông báo (từ trang chi tiết) | Popup | Modal tĩnh trong `view_detail.ctp`; xác nhận gọi `NoticeController::delete($id)` qua `G... | NOT-003 | NOT-003 |
| NOT-004 | Nhờ người khác hỗ trợ (Help Other User) | Trang đầy đủ | `NoticeController::helpOtheruser($id)` — mặc định `/notice/help-otheruser/:id` |  | NOT-002, NOT-003 |
| NOT-005 | Tin tức công ty (Company News) | Trang đầy đủ | `NoticeController::companyNews()` — mặc định `/notice/company-news` |  | NOT-002, NOT-005-P1, NOT-006 |
| NOT-005-P1 | Xác nhận xóa tin tức công ty | Popup | Modal tĩnh trong `company_news.ctp`; xác nhận gọi `NoticeController::deleteCompanyNews(... | NOT-005 | NOT-005 |
| NOT-006 | Thêm tin tức công ty (Add Company News) | Trang đầy đủ | `NoticeController::addCompanyNews()` — mặc định `/notice/add-company-news` |  | NOT-005 |

### TXT — Văn bản (4 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| TXT-001 | Thư viện văn bản (Text Library) | Trang đầy đủ | `TextsController::index()` — mặc định `/texts` |  | TXT-001-P1, TXT-001-P2, TXT-001-P3 |
| TXT-001-P1 | Thêm/Sửa văn bản | Popup | Modal tĩnh trong `index.ctp` (`#texts-editor-modal`); lưu qua AJAX `TextsController::sa... | TXT-001 | TXT-001 |
| TXT-001-P2 | Thêm ngôn ngữ văn bản (Add Text Languages) | Popup | Modal tĩnh trong `index.ctp` (`#texts-language-modal`); lưu qua AJAX `TextsController::... | TXT-001 | TXT-001 |
| TXT-001-P3 | Xác nhận xóa văn bản/ngôn ngữ | Popup | Modal tĩnh dùng chung trong `index.ctp` (`#texts-delete-modal`); xác nhận gọi AJAX `Tex... | TXT-001 | TXT-001 |

### PHO — Hình ảnh (8 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| PHO-001 | Kế hoạch chụp ảnh (Photo Shoot Planning) | Trang đầy đủ | `PhotosController::planning($shootId)` — mặc định `/photos/planning/:shootId` |  |  |
| PHO-002 | Danh sách villa quản lý ảnh (Photo Sets) | Trang đầy đủ | `PhotosController::index()` — mặc định `/photos/index` (hoặc `/photos/`) |  | PHO-006, PHO-007 |
| PHO-003 | Ảnh khu vực chung (Common Areas) | Trang đầy đủ | `PhotosController::commonAreas()` — route đẹp `/photos/common-areas` (khai báo tường mi... |  | PHO-002, PHO-004, PHO-005, PHO-008 |
| PHO-004 | Ảnh khu vực chung theo Residence | Trang đầy đủ | `PhotosController::residence($residenceId)` — route đẹp `/photos/residence/:id` (khai b... |  | PHO-003, PHO-005 |
| PHO-005 | Chi tiết bộ ảnh khu vực chung (Residence) | Trang đầy đủ | `PhotosController::residenceDetail($residenceId, $setType = 'ota')` — route đẹp `/photo... |  | PHO-003, PHO-004 |
| PHO-006 | Trang ảnh property (Villa) | Trang đầy đủ | `PhotosController::property($villaId)` — route mặc định `/photos/property/:id` (không k... |  | PHO-002, PHO-003, PHO-004, PHO-005, PHO-007, PHO-008 |
| PHO-007 | Chi tiết bộ ảnh property (Villa) | Trang đầy đủ | `PhotosController::detail($villaId, $setType = 'ota')` — route mặc định `/photos/detail... |  | PHO-002, PHO-004, PHO-006 |
| PHO-008 | Cài đặt tiêu chuẩn ảnh (Photo Settings) | Trang đầy đủ | `PhotosController::settings()` — route mặc định `/photos/settings` |  | PHO-002, PHO-003, PHO-004, PHO-006, PHO-007 |

### VID — Video (5 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| VID-001 | Thư viện video (Video Library) | Trang đầy đủ | `VideosController::index()` — mặc định `/videos` |  | VID-001-P1, VID-001-P2, VID-001-P3, VID-001-P4 |
| VID-001-P1 | Thêm video mới | Popup | Modal tĩnh trong `index.ctp` (`#video-add-modal`); lưu qua `VideosController::add()` — ... | VID-001 | VID-001 |
| VID-001-P2 | Sửa video | Popup | Modal tĩnh trong `index.ctp` (`#video-edit-modal`); lưu qua `VideosController::edit($id... | VID-001 | VID-001 |
| VID-001-P3 | Xem video (Video Player) | Popup | Modal tĩnh trong `index.ctp` (`#video-player-modal`); nội dung phát qua `VideosControll... | VID-001 | VID-001 |
| VID-001-P4 | Xác nhận xóa video | Popup | Modal tĩnh trong `index.ctp` (`#video-confirm-modal`); xác nhận gọi AJAX `VideosControl... | VID-001 | VID-001 |

### OTA — Nội dung OTA (3 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| OTA-001 | Nội dung Listing của một kênh OTA (Listing Content) | Trang đầy đủ | `OtaContentController::listing($platformId)` — mặc định `/ota-content/listing/:platformId` |  | OTA-001-P1, OTA-001-P2 |
| OTA-001-P1 | Chọn Content Element cho listing OTA | Popup | Modal tĩnh trong `listing.ctp`; lưu lựa chọn qua AJAX `OtaContentController::assignElem... | OTA-001 | OTA-001 |
| OTA-001-P2 | Xác nhận xóa Content Element khỏi listing | Popup | Modal tĩnh trong `listing.ctp`; xác nhận gọi AJAX `OtaContentController::removeAssignme... | OTA-001 | OTA-001 |

### PAGE — Trang tĩnh (1 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| PAGE-001 | Trang chào mặc định CakePHP (Default Home / Scaffold Page) | Trang đầy đủ | `PagesController::display(...$path)` — mặc định `/pages/*` (route được comment tắt tron... |  |  |

## 12. Tài khoản & Nhân sự

### ACC — Tài khoản & Nhân sự (41 màn hình)

| Mã | Tên màn hình | Loại | Route | Mở từ | Điều hướng đến |
|---|---|---|---|---|---|
| ACC-007 | Sao kê tài khoản (Statements) | Trang đầy đủ | `AccountController::statements($account_id)` — mặc định `/account/statements/<account_i... |  | ACC-007-P1, ACC-007-P2 |
| ACC-007-P1 | Popup thêm bút toán sao kê | Popup | `AccountController::addStatement($account_id)` — mặc định `/account/add-statement/<acco... | ACC-007 | ACC-007 |
| ACC-007-P2 | Popup sửa bút toán sao kê | Popup | `AccountController::editStatement($id)` — mặc định `/account/edit-statement/<id>` (`id`... | ACC-007 | ACC-007 |
| ACC-008 | Danh mục kế toán (Accounting Categories) | Trang đầy đủ | `AccountController::accountingCategories()` — mặc định `/account/accounting-categories` |  |  |
| ACC-009 | Đối soát sao kê tài khoản (Statement Reconcile) | Trang đầy đủ | `AccountController::statementReconcile()` — mặc định `/account/statement-reconcile` |  |  |
| ACC-023 | Sơ đồ tài khoản kế toán (Chart of Accounts) | Trang đầy đủ | `AccountController::chartAccounts()` — mặc định `/account/chart-accounts` |  | ACC-023-P1, ACC-023-P2 |
| ACC-023-P1 | Xem chi tiết tài khoản kế toán | Popup | `AccountController::viewChartAccount($id)` — mặc định `/account/view-chart-account/<id>... | ACC-023 | ACC-023 |
| ACC-023-P2 | Sửa chi tiết tài khoản kế toán | Popup | `AccountController::editChartAccount($id)` — mặc định `/account/edit-chart-account/<id>... | ACC-023 | ACC-023 |
| ACC-028 | Đối soát tài khoản (bản cũ/legacy) | Trang đầy đủ | `AccountController::reconcile()` — mặc định `/account/reconcile` |  | ACC-009 |
| ACC-029 | Trang tổng quan Tài khoản & Nhân sự | Trang đầy đủ | `AccountController::index()` — mặc định `/account/index` (không có tham số) |  | ACC-007, ACC-030, ACC-031, ACC-032 |
| ACC-030 | Đối soát OTA (OTA Reconciliation) | Trang đầy đủ |  |  | ACC-007 |
| ACC-031 | Cài đặt (Settings) | Trang đầy đủ | `AccountController::setting()` — mặc định `/account/setting` (không có tham số) |  | ACC-032 |
| ACC-032 | Quản lý xe (Vehicles) | Trang đầy đủ |  |  |  |
| ACC-033 | Chấm công (Timesheet) | Trang đầy đủ | `AccountController::timesheet()` — mặc định `/account/timesheet` |  |  |
| ACC-034 | Bảng lương (Payroll) | Trang đầy đủ | `AccountController::payroll()` — mặc định `/account/payroll` |  |  |
| ACC-038 | Quản lý điện thoại (Phones) | Trang đầy đủ | `AccountController::phones()` — mặc định `/account/phones` |  |  |
| ACC-039 | Quản lý máy tính (Computers) | Trang đầy đủ | `AccountController::computers()` — mặc định `/account/computers` |  |  |
| ACC-040 | Quản lý SIM (SIM Cards) | Trang đầy đủ | `AccountController::simCards()` — mặc định `/account/sim-cards` |  |  |
| ACC-041 | Kỳ lương (Wage Periods) | Trang đầy đủ | `AccountController::wagePeriods()` — mặc định `/account/wage-periods` |  |  |
| ACC-042 | Lương theo ngày (Daily Wages) | Trang đầy đủ | `AccountController::dailyWages()` — mặc định `/account/daily-wages` |  |  |
| ACC-053 | Ngày lễ (Public Holidays) | Trang đầy đủ | `AccountController::publicHolidays()` — mặc định `/account/public-holidays` |  | ACC-053-P1, ACC-053-P2 |
| ACC-053-P1 | Popup thêm ngày lễ | Popup | `AccountController::addPublicHoliday()` — mặc định `/account/add-public-holiday` | ACC-053 | ACC-053 |
| ACC-053-P2 | Popup sửa ngày lễ | Popup | `AccountController::editPublicHoliday($id)` — mặc định `/account/edit-public-holiday/<i... | ACC-053 | ACC-053 |
| ACC-054 | Chi phí định kỳ (Recurring) | Trang đầy đủ | `AccountController::recurring()` — mặc định `/account/recurring` |  |  |
| ACC-055 | Loại chi phí (Expense Type) | Trang đầy đủ | `AccountController::expenseType()` — mặc định `/account/expense-type` |  |  |
| ACC-056 | Rebill | Trang đầy đủ | `AccountController::rebill()` — mặc định `/account/rebill` |  | ACC-056-P1, ACC-056-P2 |
| ACC-056-P1 | Popup thêm Rebill | Popup | `AccountController::addRebill()` — mặc định `/account/add-rebill` | ACC-056 | ACC-056 |
| ACC-056-P2 | Popup sửa Rebill | Popup | `AccountController::editRebill($id)` — mặc định `/account/edit-rebill/<id>` | ACC-056 | ACC-056 |
| ACC-057 | Nhà cung cấp sản phẩm | Trang đầy đủ | `AccountController::suppliers()` — mặc định `/account/suppliers` |  | ACC-057-P1, ACC-058 |
| ACC-057-P1 | Popup thêm/sửa nhà cung cấp sản phẩm | Popup | `AccountController::addSupplier($tab, $id, $show_page, $payment_detail_id)` — mặc định ... | ACC-057 | ACC-057 |
| ACC-058 | Sản phẩm | Trang đầy đủ | `AccountController::products($tab)` — mặc định `/account/products/<tab>` |  | ACC-058-P1 |
| ACC-058-P1 | Popup thêm/sửa sản phẩm | Popup | `AccountController::addProduct($id)` — mặc định `/account/add-product/<id>` | ACC-058 | ACC-058 |
| ACC-059 | Nhà cung cấp dịch vụ | Trang đầy đủ | `AccountController::servicesSupplier()` — mặc định `/account/services-supplier` |  | ACC-059-P1, ACC-060 |
| ACC-059-P1 | Popup thêm/sửa nhà cung cấp dịch vụ | Popup | `AccountController::addServicesSupplier($tab, $id, $show_page, $payment_detail_id)` — m... | ACC-059 | ACC-059 |
| ACC-060 | Dịch vụ | Trang đầy đủ | `AccountController::services($tab)` — mặc định `/account/services/<tab>` |  |  |
| ACC-061 | Ma trận phê duyệt (Approval Matrix) | Trang đầy đủ | `AccountController::approvalMatrix()` — mặc định `/account/approval-matrix` |  |  |
| ACC-062 | Tạm ứng / Hoàn ứng (Petty Cash) | Trang đầy đủ | `AccountController::pettyCash($tab, $sub_tab)` — mặc định `/account/petty-cash/<tab>/<s... |  | ACC-063 |
| ACC-063 | Thanh toán chi phí (Payments) | Trang đầy đủ | `AccountController::expensePayment($tab)` — mặc định `/account/expense-payment/<tab>` |  | ACC-007, ACC-062 |
| ACC-064 | Danh sách yêu cầu thanh toán (Payment Requests) | Trang đầy đủ | `AccountController::paymentRequestList()` — mặc định `/account/payment-request-list` |  | ACC-062, ACC-063, ACC-064-P1, ACC-064-P2 |
| ACC-064-P1 | Popup tạo yêu cầu thanh toán | Popup | `AccountController::paymentRequest()` (hiển thị form) + `AccountController::addPaymentR... | ACC-064 | ACC-064 |
| ACC-064-P2 | Popup sửa yêu cầu thanh toán | Popup | `AccountController::editPaymentRequest($id)` (hiển thị form) + `AccountController::upda... | ACC-064 | ACC-064 |
