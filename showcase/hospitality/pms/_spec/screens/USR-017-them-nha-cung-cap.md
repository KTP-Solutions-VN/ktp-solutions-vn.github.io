# USR-017 — Thêm nhà thầu (New Contractor)

**Loại:** Trang đầy đủ

**Route:** `UserController::addProviders()` — mặc định `user/addProviders`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Form tạo mới tài khoản nhân sự cho một nhà cung cấp dịch vụ bên ngoài (`employment = External`), gồm thông tin dịch vụ/công ty cung cấp, thông tin cá nhân, thông tin đăng nhập, phân quyền vai trò/module, đơn vị kinh doanh và ngôn ngữ.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Dịch vụ | `service_id` | Select2 | Có | |
| 2 | Nhà cung cấp (Provider) | `provider_id` | Select2 | Có | Nạp động theo dịch vụ đã chọn |
| 3 | Họ | `first_name` | Text | Có | Tối thiểu 2 ký tự |
| 4 | Tên | `family_name` | Text | Có | Tối thiểu 2 ký tự |
| 5 | Tên thường gọi | `usage_name` | Text | Có | Tối thiểu 2 ký tự |
| 6 | Avatar/emoticon | `emoticon` | Hidden (emoji picker) | Không | |
| 7 | Quốc tịch | `nationality` | Select2 | Có | |
| 8 | Email | `email` | Email | Có | Check trùng qua ajax `checkemail` |
| 9 | Username | `username` | Text | Có | Check trùng qua ajax `checkUserName` |
| 10 | Mật khẩu | `password` | Password | Có | |
| 11 | Số điện thoại | `phone_number` | Text | Có | |
| 12 | Trạng thái | `status` | Select | Có | Active/Inactive |
| 13 | Quyền truy cập | `access[]` | Checkbox | Không | Web/App |
| 14 | Vai trò (Role) | `role` | Select | Có | Manager/Operator |
| 15 | Phân quyền module | `user_role[]` | Checkbox nhóm | Có | Danh sách quyền truy cập theo module |
| 16 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhóm | Có | |
| 17 | Ngôn ngữ sử dụng | `user_language[]` | Checkbox nhóm | Không | |
| 18 | Ảnh đại diện (Image) | `image` (file) | Upload ảnh | Không | jpg/png/jpeg |
| 19 | Avatar (icon) | `avatar` (file) | Upload ảnh | Không | jpg/png/jpeg |
| 20 | Gửi email thông báo tài khoản | `send_mail[]` | Checkbox | Không | |

## Chức năng/nút thao tác
- **Lưu (Save):** tạo `User` (employment=External, user_type=Employee) gắn với công ty cung cấp dịch vụ (`company_id`), lưu vai trò/đơn vị kinh doanh/ngôn ngữ, upload ảnh, gửi email tài khoản nếu chọn, ghi log hoạt động.
- **Huỷ:** quay về USR-016.

## Điều hướng
- Mở từ: USR-016 (nút "Thêm mới").
- Điều hướng đến: USR-016 (Nhà thầu dịch vụ) sau khi lưu thành công.
