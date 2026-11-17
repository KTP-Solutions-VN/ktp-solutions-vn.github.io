# LOG-002 — Đặt lại mật khẩu (Reset Password)

**Loại:** Trang đầy đủ

**Route:** `LoginController::resetPassword($token)` — mặc định `login/resetPassword/:token`; route đẹp: `/reset-password/:token`

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Trang cho phép người dùng đặt mật khẩu mới sau khi bấm vào liên kết trong email quên mật khẩu (LOG-001-P1). Token có hiệu lực 1 ngày kể từ lúc yêu cầu; nếu token hết hạn hoặc không hợp lệ, form không hiển thị mà chỉ báo lỗi.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mật khẩu mới | `new_password` | Password | Có | Tối thiểu 6 ký tự (validate JS) |
| 2 | Xác nhận mật khẩu | `con_password` | Password | Có | Phải trùng khớp với `new_password` (rule `equalTo`) |

## Chức năng/nút thao tác
- **Reset (submit):** cập nhật `password`/`legecy_key` cho `User`, xoá `forget_token`, ghi log, hiển thị flash thành công và điều hướng về LOG-001.
- Nếu token hết hạn/không hợp lệ: hiển thị flash lỗi, không hiện form.

## Điều hướng
- Vào từ: link trong email quên mật khẩu (xuất phát từ LOG-001-P1).
- Điều hướng đến: LOG-001 (Đăng nhập) sau khi đặt lại mật khẩu thành công.
