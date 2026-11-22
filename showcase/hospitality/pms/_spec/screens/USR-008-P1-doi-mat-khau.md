# USR-008-P1 — Cập nhật mật khẩu (Update Password)

**Loại:** Popup/Modal (mở từ USR-008)

**Route:** `UserController::changePassword()` — mặc định `user/changePassword`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Popup cho phép người dùng đang đăng nhập tự đổi mật khẩu, yêu cầu nhập đúng mật khẩu hiện tại trước khi đặt mật khẩu mới. Sau khi đổi thành công, hệ thống buộc đăng xuất để đăng nhập lại bằng mật khẩu mới.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mật khẩu cũ | `old_password` | Password | Có | Tối thiểu 2 ký tự; kiểm tra khớp với mật khẩu hiện có |
| 2 | Mật khẩu mới | `new_password` | Password | Có | Tối thiểu 2 ký tự |
| 3 | Xác nhận mật khẩu mới | `confirm_password` | Password | Có | |

## Chức năng/nút thao tác
- **Đổi mật khẩu (submit):** kiểm tra mật khẩu cũ khớp, lưu mật khẩu mới, ghi log hoạt động, đăng xuất người dùng và chuyển tới LOG-001.
- Nếu mật khẩu cũ sai hoặc lưu thất bại: hiển thị flash lỗi và ở lại USR-008 (anchor `#change-password`).

## Điều hướng
- Mở từ: USR-008 (link "Đổi mật khẩu").
- Điều hướng đến: LOG-001 (Đăng nhập) sau khi đổi mật khẩu thành công.
