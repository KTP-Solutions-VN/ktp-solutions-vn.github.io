# SET-003 — Máy chủ gửi thư (Outgoing Mail Server)

**Loại:** Trang đầy đủ

**Route:** `SettingController::smtpSettings()` — mặc định `/setting/smtp-settings` (không có route đẹp khai báo trong `config/Routes.php`; có 1 dòng route cũ tới controller `user` bị comment, không dùng)

**Module:** SET = Cài đặt nền tảng

## Mô tả ngắn gọn
Form riêng để cấu hình thông số máy chủ SMTP dùng gửi email hệ thống (độc lập với Tab "Tùy chọn cốt lõi" (Core Preferences) ở SET-002, nhưng cùng cập nhật vào bản ghi `Setting` id = 1, cùng các field `smtp_host`, `smtp_email`, `smtp_password`, `smtp_port`).

## Mô tả chi tiết

Form cập nhật bản ghi `Setting` (id = 1):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | SMTP Email | `smtp_email` | Email | Có | |
| 2 | SMTP Host | `smtp_host` | Text | Có | |
| 3 | SMTP Port | `smtp_port` | Text | Có | |
| 4 | SMTP Password | `smtp_password` | Text | Có | Hiển thị dạng text (không mask) |

## Chức năng/nút thao tác
- **Save:** submit form, cập nhật bản ghi `Setting`, ghi log hoạt động ("smtp settings changed by ..."), hiện Flash message, redirect lại trang hiện tại.
- **Cancel:** reset form về giá trị đã nhập (nút `type=reset`), không submit.

## Điều hướng
- Vào từ: SET-001, hoặc menu Cài đặt nền tảng > Máy chủ gửi thư.
- Không điều hướng tới trang/popup con nào khác.
