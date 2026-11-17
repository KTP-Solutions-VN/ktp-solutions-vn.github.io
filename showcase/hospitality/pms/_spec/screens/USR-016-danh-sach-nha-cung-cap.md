# USR-016 — Danh sách Nhà cung cấp dịch vụ (Providers)

**Loại:** Trang đầy đủ

**Route:** `UserController::providers($tab)` — mặc định `user/providers`

**Module:** Đăng nhập & Người dùng hệ thống

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
- **Thêm mới:** mở USR-017 (Thêm Nhà cung cấp dịch vụ).
- **Xem chi tiết:** mở USR-019 (Xem chi tiết Nhà cung cấp dịch vụ).
- **Sửa:** mở USR-018 (Sửa Nhà cung cấp dịch vụ).
- **Xoá:** popup xác nhận, gọi `user/delete/:base64(id)`.

## Điều hướng
- Vào từ: menu Settings/Users → Providers.
- Điều hướng đến: USR-017 (Thêm), USR-018 (Sửa), USR-019 (Xem chi tiết).
