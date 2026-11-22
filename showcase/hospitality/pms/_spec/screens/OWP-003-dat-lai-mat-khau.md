# OWP-003 — Mật khẩu mới (New Password)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::resetPassword($token)` — không có route đẹp riêng; truy cập qua link trong email `/external-user/reset-password/{token}` (mặc định CakePHP)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Trang đặt lại mật khẩu mới, truy cập từ link trong email được gửi ở OWP-001-P1. Token đặt lại chỉ có hiệu lực trong 24 giờ; nếu hết hạn hoặc không hợp lệ sẽ hiển thị thông báo lỗi và không hiện form.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mật khẩu mới | new_password | Password | Có | Tối thiểu 6 ký tự (validate JS) |
| 2 | Xác nhận mật khẩu | con_password | Password | Có | Phải khớp với new_password (validate JS `equalTo`) |

## Chức năng/nút thao tác

- Đặt lại mật khẩu (submit form, cập nhật `Owner.password`, xoá token đã dùng)
- Hiển thị thông báo lỗi nếu token hết hạn/không tồn tại (không hiện form trong trường hợp này)
- Ghi log hoạt động đặt lại mật khẩu

## Điều hướng

- Truy cập từ link email (nguồn: OWP-001-P1)
- Đặt lại thành công → chuyển hướng về OWP-001 Đăng nhập Owner Hub
