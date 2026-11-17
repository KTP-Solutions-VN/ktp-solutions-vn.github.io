# OWP-004 — Hồ sơ cá nhân

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::profile()` — không có route đẹp riêng (mặc định `/external-user/profile`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Trang xem và cập nhật thông tin cá nhân của Chủ sở hữu/nhân viên đại lý: họ tên, quốc tịch, email, số điện thoại, công ty, ngôn ngữ hiển thị. Gồm 2 tab: "Hồ sơ" (Profile) và "Đổi mật khẩu" (OWP-004-P1).

## Mô tả chi tiết

Bảng field (tab Hồ sơ):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên | first_name | Text | Có | Tối thiểu 2 ký tự |
| 2 | Họ | family_name | Text | Có | Tối thiểu 2 ký tự |
| 3 | Quốc tịch | nationality | Select | Có | Danh sách quốc gia |
| 4 | Email | email | Email | Có | Validate email tồn tại (AJAX checkEmail) |
| 5 | Số điện thoại | phone_number | Text | Có | |
| 6 | Công ty | company_id | Select | Có (nếu không phải Superadmin) | Danh sách công ty |
| 7 | Ngôn ngữ hiển thị | language_id | Radio | Có (nếu không phải Superadmin) | Danh sách ngôn ngữ hệ thống |
| 8 | Id ẩn | id | Hidden | — | |

Thông tin chỉ đọc hiển thị bên trái: avatar/emoticon, họ tên, vai trò, email, số điện thoại, quốc tịch, công ty, ngôn ngữ.

## Chức năng/nút thao tác

- Cập nhật hồ sơ (nút "Update Profile", submit form, ghi log hoạt động)
- Chuyển tab sang "Đổi mật khẩu" (mở OWP-004-P1)

## Điều hướng

- Truy cập từ menu người dùng (avatar/user menu) sau khi đăng nhập
- Cập nhật thành công → ở lại trang, hiển thị Flash thông báo
- Tab "Đổi mật khẩu" → OWP-004-P1
