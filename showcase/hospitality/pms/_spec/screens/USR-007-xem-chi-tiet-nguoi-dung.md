# USR-007 — Xem chi tiết người dùng

**Loại:** Trang đầy đủ

**Route:** `UserController::viewDetails($id, $tab)` — mặc định `user/viewDetails/:id/:tab`

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Trang xem (read-only) thông tin chi tiết của một nhân viên: định danh, business unit đang thuộc về, vai trò, ngôn ngữ, văn phòng đăng ký, và danh sách tài khoản ngân hàng. Dùng cho các vai trò không có quyền sửa nhưng cần tra cứu hồ sơ nhân viên, hoặc để xem nhanh trước khi quyết định vào sửa (USR-006).

## Mô tả chi tiết

**Tab Identification (chỉ xem):**

| # | Tên field (label) | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ảnh/Avatar | `image`, `avtar` | |
| 2 | Họ tên | `first_name`, `family_name` | |
| 3 | Tên thường gọi | `usage_name` | |
| 4 | Quốc tịch | `nationality` | |
| 5 | Email cá nhân / công việc | `email`, `professional_email` | |
| 6 | Username | `username` | |
| 7 | Số điện thoại | `phone_number` | |
| 8 | Công ty | `company_id` (tên hiển thị) | |
| 9 | Business Unit | `user_business_unit` | Nối chuỗi các BU |
| 10 | Loại người dùng / Vai trò | `user_type`, `user_role` | |
| 11 | Ngôn ngữ | `user_current_language` | |
| 12 | Văn phòng đăng ký | `office_names` | |
| 13 | Ngày bắt đầu làm việc | `starting_date` | |
| 14 | Quyền truy cập (access) | `access` | |

**Tab Bank Account (chỉ xem, danh sách):**

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên ngân hàng | `bank_id` (tên) | |
| 3 | Tên tài khoản | `account_name` | |
| 4 | Số tài khoản | `account_number` | |
| 5 | Mã SWIFT | `bank_swift` | |
| 6 | Tiền tệ | `currency_id` (tên) | |
| 7 | Quốc gia | `country` | |
| 8 | Tài liệu đính kèm | `document` | |

## Chức năng/nút thao tác
- Không có nút chỉnh sửa dữ liệu trực tiếp trên trang (thuần xem); có thể có link/nút để chuyển sang USR-006 (Sửa) tuỳ quyền.
- Chuyển đổi giữa các tab xem (Identification, Bank Account).

## Điều hướng
- Mở từ: USR-004 (icon Xem chi tiết).
- Điều hướng đến: USR-006 (Sửa người dùng) nếu có quyền chỉnh sửa; nếu không hợp lệ (`id` sai) sẽ báo lỗi và quay lại trang trước.
