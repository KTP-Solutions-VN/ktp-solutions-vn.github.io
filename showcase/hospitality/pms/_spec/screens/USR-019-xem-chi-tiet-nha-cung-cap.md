# USR-019 — Hồ sơ nhà thầu (Contractor Profile)

**Loại:** Trang đầy đủ

**Route:** `UserController::viewProviderDetails($id)` — mặc định `user/viewProviderDetails/:id`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Trang xem chi tiết (chỉ đọc) thông tin một tài khoản nhân sự thuộc nhà cung cấp dịch vụ bên ngoài.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Họ | `first_name` | Text (readonly) | — | |
| 2 | Tên | `family_name` | Text (readonly) | — | |
| 3 | Quốc tịch | `nationality` | Text (readonly) | — | |
| 4 | Username | `username` | Text (readonly) | — | |
| 5 | Số điện thoại | `phone_number` | Text (readonly) | — | |
| 6 | Mật khẩu | `legecy_key` (giải mã base64) | Text (readonly) | — | Hiển thị mật khẩu dạng plain (legacy) |
| 7 | Email | `email` | Text (readonly) | — | |
| 8 | Emoticon | `emoticon` | Text (readonly) | — | |
| 9 | Nhà cung cấp | `provider.name` | Text (readonly) | — | |
| 10 | Loại người dùng | `user_type` | Text (readonly) | — | |
| 11 | Đơn vị kinh doanh | `user_business_unit` | Text (readonly) | — | Danh sách nối chuỗi |
| 12 | Vai trò | `user_role` | Text (readonly) | — | |
| 13 | Ngôn ngữ | `user_current_language` | Text (readonly) | — | |

## Chức năng/nút thao tác
- Chỉ xem thông tin, không có nút chỉnh sửa trực tiếp trên trang này.

## Điều hướng
- Mở từ: USR-016 (nút "Xem" trên từng dòng).
- Điều hướng đến: không có (trang chỉ đọc, quay lại bằng breadcrumb/back).
