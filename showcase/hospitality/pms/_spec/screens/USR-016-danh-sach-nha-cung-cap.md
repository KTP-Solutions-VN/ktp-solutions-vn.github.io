# USR-016 — Nhà thầu dịch vụ (Contractors)

**Loại:** Trang đầy đủ

**Route:** `UserController::providers($tab)` — mặc định `user/providers`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Danh sách tài khoản `User` thuộc nhóm nhà cung cấp dịch vụ bên ngoài (`employment = External`, `user_type = Employee`), ví dụ: nhân sự công ty dịch vụ vệ sinh, bảo trì... Cho phép lọc theo đơn vị kinh doanh, xem/sửa/xoá.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select2 (auto-submit khi đổi) | Không | Mặc định "All" |

**Cột hiển thị:**

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Nhà cung cấp (Provider) | `provider.name` | |
| 3 | Tên | `first_name` + `family_name` | |
| 4 | Tên thường gọi | `usage_name` | |
| 5 | Vai trò người dùng | `user_role` | Danh sách role phân quyền, hoặc "All access" |
| 6 | Loại người dùng | `user_type` | |
| 7 | Ngày tạo | `created_at` | |
| 8 | Người tạo | `created_user.usage_name` | |
| 9 | Thao tác | — | Xem, Sửa, Xoá |

## Chức năng/nút thao tác
- **Thêm mới:** mở USR-017 (Thêm nhà thầu).
- **Xem chi tiết:** mở USR-019 (Hồ sơ nhà thầu).
- **Sửa:** mở USR-018 (Sửa nhà thầu).
- **Xoá:** popup xác nhận, gọi `user/delete/:base64(id)`.

## Điều hướng
- Vào từ: menu Workforce → Contractors.
- Điều hướng đến: USR-017 (Thêm), USR-018 (Sửa), USR-019 (Xem chi tiết).
