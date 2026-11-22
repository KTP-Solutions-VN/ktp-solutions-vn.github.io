# ACC-023 — Cấu trúc tài khoản (Account Structure)

**Loại:** Trang đầy đủ

**Route:** `AccountController::chartAccounts()` — mặc định `/account/chart-accounts`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Danh sách các "Chart of Account" (khung sơ đồ tài khoản kế toán) theo Business Unit, chỉ Superadmin thấy trong menu. Cho phép thêm/sửa tên + Business Unit áp dụng qua popup, xóa (kèm xóa toàn bộ chi tiết `ChartAccountDetails` liên quan), và điều hướng sang xem/sửa chi tiết cấu trúc tài khoản.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, không có bộ lọc):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Sr No | — | Số thứ tự |
| 2 | Chart of Account | `name` | |
| 3 | Created On | `created_at` | Định dạng `d M y` |
| 4 | By | `created_user.usage_name` | |
| 5 | Availability | `business_unit` (giải mã từ `business_unit_id` JSON) | Tên các Business Unit được gán, nối bằng dấu phẩy |
| 6 | Actions | — | Sửa cấu trúc (popup), Xem chi tiết (ACC-023-P1), Sửa chi tiết (ACC-023-P2), Xóa |

Popup thêm/sửa (modal `#exampleModal`, form `#chart_account_form`):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Chart Title | `chart_of_account` | Text | Có (`required`, validate remote trùng tên qua `checkAccount`) | |
| 2 | Availability (Business Unit) | `business_unit_id` | Select2 multiple (danh sách BU từ `_getBusinessUnit()`) | Có (custom rule `select2Required`) | Các BU đã được gán cho Chart Account khác sẽ bị disable trong dropdown (trừ chính các BU của bản ghi đang sửa) |
| — | Action | `action` (hidden) | Hidden: `add`/`edit`/`delete` | — | |
| — | Id | `id` (hidden) | Hidden | — | |

## Chức năng/nút thao tác
- **Add new:** mở popup ở chế độ thêm mới; validate tên trùng qua AJAX `checkAccount`, disable các BU đã được Chart Account khác sử dụng.
- **Sửa cấu trúc (icon bút trên dòng):** mở lại popup Thêm/Sửa để đổi tên và Business Unit áp dụng (không phải sửa chi tiết tài khoản).
- **Xem (icon mắt):** điều hướng sang ACC-023-P1 (`viewChartAccount`).
- **Sửa nội dung chi tiết (icon file):** điều hướng sang ACC-023-P2 (`editChartAccount`).
- **Xóa (icon thùng rác):** mở lại popup ở chế độ xác nhận xóa; khi xóa sẽ xóa toàn bộ `ChartAccountDetails` liên quan (`chart_account_id`) trước, sau đó xóa `ChartAccount`.
- Cả 3 thao tác Thêm/Sửa/Xóa submit POST về cùng action `chartAccounts`; sau khi xử lý redirect về trang gọi (`referer()`).
- Validate ẩn: action `checkAccount()` — AJAX kiểm tra tên Chart of Account trùng (phân biệt thêm mới/sửa qua `id`).

## Điều hướng
- Vào từ: Sidebar > (nhóm Superadmin, dưới Settings) > "Account Structure" (`user_type = Superadmin` và `filterSidebar($user, 'ChartAccount-chartOfAccount') == 1`).
- Điều hướng đến: ACC-023-P1 (Chi tiết cấu trúc tài khoản), ACC-023-P2 (Sửa cấu trúc tài khoản).
