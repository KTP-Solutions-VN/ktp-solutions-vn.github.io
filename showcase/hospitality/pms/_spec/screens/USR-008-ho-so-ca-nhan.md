# USR-008 — Tài khoản của tôi (My Account)

**Loại:** Trang đầy đủ

**Route:** `UserController::profile()` — mặc định `user/profile`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Trang cho phép người dùng đang đăng nhập (nhân viên nội bộ hoặc nhân viên đại lý — Agency Staff) tự xem và cập nhật thông tin cá nhân của chính mình (không sửa được các field quản trị như lương, business unit, work permit — các field đó chỉ hiển thị). Có link nhanh tới đổi mật khẩu (USR-008-P1).

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Họ | `first_name` | Text | Có | Tối thiểu 2 ký tự |
| 2 | Tên | `family_name` | Text | Có | |
| 3 | ID (ẩn) | `id` | Hidden | — | |
| 4 | Quốc tịch | `nationality` | Select2 | Có | |
| 5 | Email | `email` | Email | Có | Check trùng qua ajax |
| 6 | Số điện thoại | `phone_number` | Text | Có | |
| 7 | Công ty | `company_id` | Select2 | Có | Chỉ hiển thị, thường readonly với nhân viên |
| 8 | Business unit | `business_unit_id` | Select2 | Có | |
| 9 | Avatar/emoticon | `emoticon` | Hidden (emoji picker) | Không | |
| 10 | Ngôn ngữ sử dụng | `user_language[]` | Checkbox nhiều lựa chọn | Không | Nguồn: `_getLanguages()` |

Thông tin chỉ hiển thị (không sửa): loại người dùng, vai trò, business unit đang thuộc, ngôn ngữ hiện tại.

## Chức năng/nút thao tác
- **Cập nhật hồ sơ (Save):** lưu vào bảng `User` (hoặc `AgencyStaff` nếu là nhân viên đại lý), đồng bộ lại session (first_name, family_name, email, emoticon), cập nhật danh sách ngôn ngữ.
- **Đổi mật khẩu:** mở popup USR-008-P1 (anchor `#change-password` trên cùng trang).

## Điều hướng
- Mở từ: menu tài khoản cá nhân (avatar/user menu) ở mọi trang sau khi đăng nhập.
- Điều hướng đến: USR-008-P1 (Cập nhật mật khẩu — popup con). Sau khi đổi mật khẩu thành công, hệ thống tự đăng xuất và quay về LOG-001.
