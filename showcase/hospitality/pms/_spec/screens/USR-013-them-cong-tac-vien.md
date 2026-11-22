# USR-013 — Thêm đại lý bán hàng (New Sales Agent)

**Loại:** Trang đầy đủ

**Route:** `UserController::addAgents()` — mặc định `user/addAgents`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Form tạo mới một tài khoản Cộng tác viên bán hàng (Agent), gồm thông tin cá nhân, thông tin đăng nhập, khu vực hoạt động và trạng thái hoạt động của cộng tác viên.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Họ | `first_name` | Text | Có | Tối thiểu 2 ký tự |
| 2 | Tên | `family_name` | Text | Có | |
| 3 | Tên thường gọi | `usage_name` | Text | Có | |
| 4 | Tên công ty | `company_name` | Text | Có | |
| 5 | Avatar/emoticon | `emoticon` | Hidden (emoji picker) | Không | |
| 6 | Ngôn ngữ | `language` | Select2 | Có | English/French |
| 7 | Email | `email` | Email | Có | Check trùng qua ajax `checkemail` |
| 8 | Username | `username` | Text | Có | Check trùng qua ajax `checkUserName` |
| 9 | Mật khẩu | `password` | Password | Có | |
| 10 | Số điện thoại | `phone_number` | Text | Có | |
| 11 | Khu vực địa lý | `geo_graphical_location` | Select2 | Có | China/Sentosa/Singapore/Other |
| 12 | Ngày liên hệ | `contact_date` | Text (date picker) | Có | |
| 13 | Trạng thái hoạt động | `status` | Select | Có | New/Top Performer/Active/Occasional/Dormant |
| 14 | Ghi chú | `note` | Textarea | Có | |
| 15 | Gửi email tài khoản | `send_mail` | Checkbox | Không | |

## Chức năng/nút thao tác
- **Lưu (Save):** tạo `User` (employment=Agent) + bản ghi `Agent`, gửi email tài khoản nếu chọn, ghi log hoạt động.
- **Huỷ:** quay về USR-012.

## Điều hướng
- Mở từ: USR-012 (nút "Thêm mới").
- Điều hướng đến: USR-012 (Đại lý bán hàng) sau khi lưu thành công.
