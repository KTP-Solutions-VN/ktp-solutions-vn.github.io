# OWP-004-P1 — Popup Đổi mật khẩu

**Loại:** Popup (mở từ OWP-004, dạng tab trong cùng trang)

**Route:** `ExternalUserController::changePassword()` — không có route đẹp riêng, không có view riêng (form nằm trong tab `#change-password` của `profile.ctp`), submit POST tới action `changePassword`

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Form đổi mật khẩu đăng nhập, xác thực mật khẩu cũ trước khi cho phép đặt mật khẩu mới.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mật khẩu cũ | old_password | Password | Có | So khớp với mật khẩu hiện tại (`Owner.password`) |
| 2 | Mật khẩu mới | new_password | Password | Có | Tối thiểu 6 ký tự |
| 3 | Xác nhận mật khẩu mới | confirm_password | Password | Có | Phải khớp new_password (validate JS `equalTo`) |

## Chức năng/nút thao tác

- Cập nhật mật khẩu (nút "Update Password", submit form)
- Thông báo lỗi nếu mật khẩu cũ không đúng
- Ghi log hoạt động đổi mật khẩu

## Điều hướng

- Sau khi đổi thành công → chuyển hướng về OWP-004 (tab Hồ sơ)
- Đổi thất bại → quay lại OWP-004 tab "Đổi mật khẩu" kèm thông báo lỗi
