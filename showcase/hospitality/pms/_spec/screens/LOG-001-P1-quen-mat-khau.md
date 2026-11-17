# LOG-001-P1 — Quên mật khẩu (Forgot Password)

**Loại:** Popup/Modal (mở từ LOG-001)

**Route:** `LoginController::forgotPassword()` — mặc định `login/forgotPassword`; route đẹp: `/forgot-password`

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Panel "Quên mật khẩu" hiển thị/ẩn (toggle bằng JS) ngay trên màn hình đăng nhập LOG-001, cho phép người dùng nhập email để nhận liên kết đặt lại mật khẩu. Action xử lý phía server không render view riêng (autoRender=false), chỉ gửi mail và redirect quay lại trang trước đó kèm flash message.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Email | `email` | Email (input type=email) | Có | Tìm theo `User.email`; nếu không tìm thấy sẽ báo lỗi |

## Chức năng/nút thao tác
- **Reset (submit):** sinh `forget_token` (hạn 1 ngày) lưu vào bảng `User`, gửi email chứa link đặt lại mật khẩu tới LOG-002, ghi log truy cập, hiển thị flash thành công/thất bại rồi quay lại LOG-001.

## Điều hướng
- Mở từ: LOG-001, bấm link "Quên mật khẩu?".
- Điều hướng đến: sau khi submit, quay lại LOG-001 (flash message); email nhận được dẫn tới LOG-002 (Đặt lại mật khẩu) kèm token.
