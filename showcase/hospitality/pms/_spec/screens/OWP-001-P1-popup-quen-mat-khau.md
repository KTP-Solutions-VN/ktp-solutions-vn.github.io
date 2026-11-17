# OWP-001-P1 — Popup Quên mật khẩu

**Loại:** Popup (mở từ OWP-001)

**Route:** `ExternalUserController::forgotPassword()` — không có route đẹp riêng, không có view riêng (autoRender = false), giao diện popup nằm ngay trong `index.ctp` (div `#recoverform`), submit AJAX/POST tới action `forgotPassword`

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Popup cho phép người dùng nhập email để nhận liên kết đặt lại mật khẩu. Hệ thống tìm Owner theo email, sinh token đặt lại mật khẩu (`forget_token`, có hiệu lực trong 24 giờ) và gửi email chứa link tới OWP-003.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Email | email | Email | Có | Đối chiếu với `Owner.email` |

## Chức năng/nút thao tác

- Gửi yêu cầu đặt lại mật khẩu (nút submit, gửi email chứa token reset)
- Thông báo thành công/thất bại (Flash message), ghi log hoạt động

## Điều hướng

- Sau khi submit → quay lại OWP-001 (redirect referer) kèm thông báo
- Email nhận được chứa link → OWP-003 Đặt lại mật khẩu
