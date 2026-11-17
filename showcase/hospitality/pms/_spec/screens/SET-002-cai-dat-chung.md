# SET-002 — Cài đặt chung (General Settings)

**Loại:** Trang đầy đủ

**Route:** `SettingController::generalSettings($tab = null)` — mặc định `/setting/general-settings/:tab` (`:tab` là tham số truyền, ví dụ `/setting/general-settings/owner-portal-url`)

**Module:** SET = Cài đặt hệ thống

## Mô tả ngắn gọn
Màn hình cấu hình chung của hệ thống, tổ chức theo 3 tab: (1) Cài đặt chung — thông tin site & SMTP mặc định, (2) Hostex Coefficient — hệ số quy đổi theo Agency dùng cho tích hợp Hostex, (3) Owner Portal URL — quản lý các đường dẫn cổng thông tin chủ nhà theo khu vực/đơn vị kinh doanh.

## Mô tả chi tiết

### Tab 1 — Cài đặt chung (`general-settings`, element `technical-settings/general_settings`)
Form cập nhật bản ghi `Setting` (id = 1):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Site Title | `site_title` | Text | Có | |
| 2 | Admin Email | `admin_email` | Email | Có | |
| 3 | From Email | `from_email` | Email | Có | |
| 4 | Reply To | `reply_to` | Email | Có | |
| 5 | SMTP Email | `smtp_email` | Email | Có | |
| 6 | SMTP Host | `smtp_host` | Text | Có | |
| 7 | SMTP Port | `smtp_port` | Text | Có | |
| 8 | SMTP Password | `smtp_password` | Text | Có | |
| 9 | Enable SMTP | `enable_smtp` | Checkbox | Không | Lưu 0/1 |
| 10 | Forex Rates Website | `forex_rates_website` | Text (URL) | Không | |

### Tab 2 — Hostex Coefficient (`hostex-coefficient`, element `technical-settings/hostex_coefficient`)
Form cập nhật hệ số quy đổi cho một Agency:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Agency | `agency_id` | Select (danh sách Agency có `is_hostex_account = 1`) | Không | Đổi lựa chọn sẽ tải lại `coefficient` hiện tại qua AJAX `getAgencyCoefficient` |
| 2 | Coefficient | `coefficient` | Text (số) | Không | Lưu vào bảng `Agency` |

### Tab 3 — Owner Portal URL (`owner-portal-url`, element `technical-settings/owner_portal_url`)
Danh sách các Owner Portal URL đã cấu hình:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tiêu đề | `title` | |
| 2 | URL | `url` | |
| 3 | Phạm vi áp dụng | `pills` | Danh sách "Quốc gia — Vùng" mà URL này áp dụng; URL mặc định (`is_default=1`) áp dụng cho mọi Vùng chưa bị URL khác nhận |
| 4 | Cập nhật lúc / bởi ai | `updated_at`, `creator.usage_name` | |

Không có bộ lọc; sắp xếp URL mặc định lên đầu, sau đó theo `created_at` giảm dần. Chỉ áp dụng cho Quốc gia thuộc {Greece, France, Thailand}.

## Chức năng/nút thao tác
- **Lưu (Tab 1, Tab 2):** submit form tương ứng, cập nhật `Setting`/`Agency`, ghi log hoạt động.
- **+ ADD URL:** mở popup SET-002-P1 (Thêm Owner Portal URL).
- **Sửa (icon bút) trên từng dòng URL:** mở popup SET-002-P2 (Sửa Owner Portal URL).
- **Xóa (icon thùng rác, ẩn với URL mặc định):** mở popup SET-002-P3 (xác nhận xóa).
- Chuyển tab cập nhật URL trình duyệt (`window.history.replaceState`) và breadcrumb động.

## Điều hướng
- Vào từ: SET-001, hoặc menu Cài đặt hệ thống > Cài đặt chung.
- Điều hướng đến: SET-002-P1, SET-002-P2, SET-002-P3.
