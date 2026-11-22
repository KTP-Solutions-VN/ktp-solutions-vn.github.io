# ACC-034 — Kỳ trả lương (Pay Runs)

**Loại:** Trang đầy đủ

**Route:** `AccountController::payroll()` — mặc định `/account/payroll`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Danh sách nhân viên (role "Employee") thuộc Business Unit đang chọn, dùng làm danh mục nhân sự tham chiếu cho nghiệp vụ lương — không hiển thị số liệu lương, chỉ liệt kê thông tin định danh nhân viên.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`), lấy `User` có `UserBusinessUnit.user_type = Employee`, `User.status = Active`, `User.employment = Internal`, `UserRole.role_id = 27`:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Name | `first_name family_name` | |
| 2 | Usual | `usage_name` | Tên thường gọi |
| 3 | Emoticon | `emoticon` | |
| 4 | User Type | `user_type` | |
| 5 | Created at | `created_at` (định dạng `d M y H:i`) | |

Filter: **Business Unit** (`business_unit`) — select theo BU thuộc quyền user (`_getAuthBasedBuVilla`), mặc định "All".

## Chức năng/nút thao tác
- **Đổi Business Unit:** chọn lại select → tự động reload trang qua GET `payroll?id=<business_unit>`, đồng thời set cookie BU đang chọn.
- Không có nút Add/Edit/Delete trên trang (nút "Add new" trong view đang bị comment, chưa kích hoạt).
- Action AJAX `getUserTrackingLog()` (POST `/account/getUserTrackingLog`) có tồn tại trong controller (dùng để lấy `tracking_location` của một `UserClockIn` — hiện code hard-code ngày `2024-08-29`) nhưng **không được gọi** từ `payroll.ctp` hay bất kỳ view/JS nào khác trong dự án — có vẻ là mã còn sót lại/chưa được nối vào giao diện.

## Điều hướng
- Vào từ: Sidebar > Finance & Admin > Pay Runs (`active_menu = acc-payroll`).
- Điều hướng đến: không có trang con/popup nào từ màn hình này.
