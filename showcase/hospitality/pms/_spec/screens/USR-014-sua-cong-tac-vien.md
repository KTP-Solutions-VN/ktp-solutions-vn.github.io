# USR-014 — Sửa Cộng tác viên (Edit Agent)

**Loại:** Trang đầy đủ

**Route:** `UserController::editAgents($id)` — mặc định `user/editAgents/:id`

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Form chỉnh sửa thông tin của một Cộng tác viên đã tồn tại, các field giống USR-013 nhưng được nạp sẵn giá trị hiện có.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | ID (ẩn) | `id` | Hidden | — | `user_id` của agent |
| 2 | Họ | `first_name` | Text | Có | |
| 3 | Tên | `family_name` | Text | Có | |
| 4 | Tên thường gọi | `usage_name` | Text | Có | |
| 5 | Tên công ty | `company_name` | Text | Có | |
| 6 | Avatar/emoticon | `emoticon` | Hidden (emoji picker) | Không | |
| 7 | Ngôn ngữ | `language` | Select2 | Có | |
| 8 | Email | `email` | Email | Có | |
| 9 | Username | `username` | Text | Có | |
| 10 | Mật khẩu | `password` | Password | Có | Hiển thị mật khẩu hiện tại (giải mã base64 legecy_key) |
| 11 | Số điện thoại | `phone_number` | Text | Có | |
| 12 | Khu vực địa lý | `geo_graphical_location` | Select2 | Có | |
| 13 | Ngày liên hệ | `contact_date` | Text (date picker) | Có | |
| 14 | Trạng thái hoạt động | `status` | Select | Có | |
| 15 | Ghi chú | `note` | Textarea | Có | |
| 16 | Gửi email tài khoản | `send_mail` | Checkbox | Không | |

## Chức năng/nút thao tác
- **Lưu (Save):** cập nhật `User` + `Agent`, gửi lại email nếu chọn, ghi log hoạt động.
- **Huỷ:** quay về USR-012.

## Điều hướng
- Mở từ: USR-012 (icon Sửa).
- Điều hướng đến: USR-012 (Danh sách Cộng tác viên) sau khi lưu thành công.
