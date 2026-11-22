# ACC-023-P1 — Chi tiết cấu trúc tài khoản (Account Structure Details)

**Loại:** Popup/Trang xem chi tiết (mở từ ACC-023)

**Route:** `AccountController::viewChartAccount($id)` — mặc định `/account/view-chart-account/<id>` (`id` truyền dạng base64)

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Xem (chỉ đọc) toàn bộ các dòng chi tiết (`ChartAccountDetails`) thuộc một Chart of Account: rank, nature, category, sub-category, details, allocation.

## Mô tả chi tiết

Tiêu đề trang hiển thị: `<tên Chart of Account> - <danh sách tên Business Unit áp dụng>`.

Bảng chi tiết (không phải DataTable, không phân trang, không filter):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Rank | `account_rank` | Thứ hạng tài khoản |
| 2 | Nature | `nature` | Hiển thị tên diễn giải theo danh sách `$natures` (từ `_getNature()`) |
| 3 | Category | `category` | Hiển thị tên diễn giải theo danh sách `$categories` (từ `_getCategory()`) |
| 4 | Sub Category | `sub_category` | Text tự do |
| 5 | Details | `details` | Text tự do |
| 6 | Allocation | `allocation_type` | Hiển thị "Property" hoặc "Business Unit" tùy giá trị |

Nếu chưa có dòng chi tiết nào: hiển thị "No entry yet."

## Chức năng/nút thao tác
- Trang thuần túy chỉ đọc — không có nút Thêm/Sửa/Xóa nào, không có form submit.
- Không có AJAX; chỉ dựng breadcrumb tĩnh khi tải trang.

## Điều hướng
- Vào từ: ACC-023 (Cấu trúc tài khoản) — icon con mắt (See Content) trên từng dòng.
- Điều hướng đến: không có (chỉ có link breadcrumb quay lại danh sách Account Structure qua tên menu).
